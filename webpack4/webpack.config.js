const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// notifier
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// clean project
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 去重，压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 去除css中未使用的代码
const glob = require('glob');
const PurifyCSSPlugin = require('purgecss-webpack-plugin');
// bundle分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 压缩代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');

const resolve = dir => {
    return path.resolve(__dirname, dir);
};

// 所有页面模板
const pages = [
    {
        title: 'page one',
        filename: 'index',
        chunkname: 'index'
    },
    {
        title: 'page two',
        filename: 'hello',
        chunkname: 'hello'
    }
];

// webpack4
module.exports = (env, argv) => {
    console.log('argv', process.env.NAMESPACE, env);
    const { mode } = argv;

    const isProduction = mode == 'production';

    // 生成html模板
    const HtmlTemplates = [];
    const OtherChunkname = ['runtime', 'chunk-vendors', 'chunk-commons', 'css-commons'];
    const minify = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
    };
    pages.forEach(n => {
        const { title, filename, chunkname } = n;
        HtmlTemplates.push(
            new HtmlWebpackPlugin({
                title: title,
                template: resolve(`public/${filename}.html`),
                filename: `${filename}.html`,
                minify,
                chunks: [chunkname, ...OtherChunkname]
            })
        );
    });

    // 所有插件
    let plugins = [];

    if (isProduction) {
        const prodPlugins = [
            // 清理项目
            new CleanWebpackPlugin(),
            // 抽离css
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
                publicPath: './',
                ignoreOrder: false // Enable to remove warnings about conflicting order
            }),
            //去除 unused css, 要放在 MiniCssExtractPlugin 后面
            new PurifyCSSPlugin({
                // 扫描内容路径
                paths: glob.sync(`${resolve('src')}/**/*`, { nodir: true }),
                // 设置白名单
                // whitelistPatterns: function collectWhitelistPatterns() {
                //     // do something to collect the whitelist
                //     return [/^pure-/];
                // }
            }),
            // css 压缩去重
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'advanced',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                },
                canPrint: true
            }),
            // 根据算法压缩代码
            new CompressionWebpackPlugin({
                deleteOriginalAssets: false,
                test: /\.(js|css|html|woff|ttf|png|jpe?g)$/,
                compressionOptions: {
                    numiterations: 15
                },
                threshold: 10240,
                minRatio: 0.8,
                algorithm(input, compressionOptions, callback) {
                    return zopfli.gzip(input, compressionOptions, callback);
                }
            }),
            // 构建提醒
            new WebpackBuildNotifierPlugin({
                title: 'project build',
                suppressSuccess: true,
                suppressWarning: true,
                messageFormatter: function() {
                    return 'build completely';
                }
            }),
            // 生成静态报告
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            })
        ];
        plugins = [...prodPlugins];
    }

    return {
        entry: {
            index: './src/index',
            hello: './src/hello'
        },
        output: {
            filename: 'js/[name].[hash:8].js',
            path: resolve('cdn'),
            publicPath: './'
        },
        devtool: !isProduction ? 'inline-source-map' : '',
        devServer: {
            port: 9000,
            open: true,
            hot: true,
            compress: true,
            contentBase: resolve('./'),
            publicPath: '/',
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                // css module
                                modules: {
                                    mode: 'local',
                                    // 前标识 pure 防止被当前 unused code 移除
                                    // localIdentName: 'pure-[local]-[hash:base64:6]',
                                    localIdentName: '[local]',
                                    context: resolve('src')
                                }
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpg|png|gif|jpeg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10 * 1024,
                                fallback: 'file-loader',
                                // 指定一个目标文件的路径
                                publicPath: '../',
                                // 输出文件夹
                                // outputPath: 'images',
                                // 最简短写法，可以指定输出文件夹
                                name: 'images/[sha512:contenthash:base64:8].[ext]'
                                // postTransformPublicPath: p => `__webpack_public_path__ + ${p}`
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            // 别名
            alias: {
                '@': resolve('src'),
                '@css': resolve('src/css'),
                '@util': resolve('src/utils'),
                '@assets': resolve('src/assets'),
                '@pages': resolve('src/pages')
            },
            // 自动添加后缀
            extensions: ['.css', '.js', '.less']
        },
        plugins: [
            // 生成模板
            ...HtmlTemplates,
            // prod
            ...plugins
        ],
        optimization: {
            splitChunks: {
                // 静态资源缓存
                // test, priority and reuseExistingChunk can only be configured on cache group level.
                cacheGroups: {
                    // 提取 node_modules 里面依赖的代码
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'chunk-vendors',
                        chunks: 'all',
                        minChunks: 2, //2个共享以及以上都提取
                        priority: -10 //优先级
                    },
                    // 提出每个模块公共的代码
                    commons: {
                        name: 'chunk-commons',
                        test: /\.js$/,
                        chunks: 'initial',
                        minChunks: 2, //两个共享以及以上都提取,
                        minSize: 0,
                        priority: -20, //优先级
                        reuseExistingChunk: true
                    },
                    css: {
                        name: 'css-commons',
                        test: /\.css$/,
                        minChunks: 2,
                        minSize: 0,
                        priority: -30,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            },
            // I pull the Webpack runtime out into its own bundle file so that the
            // contentHash of each subsequent bundle will remain the same as long as the
            // source code of said bundles remain the same.
            runtimeChunk: 'single'
        }
    };
};
