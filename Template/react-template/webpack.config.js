/**
 * webpack 4 config
 * @author master2011zhao@gmail.com
 * @Date 20190910
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4 使用 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// extract 被废弃
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// clean project
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// notifier
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// 压缩代码
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
// 图片整合成雪碧图
const SpritesmithPlugin = require('webpack-spritesmith');
// 移动端适配
const postcssPxToViewport = require('postcss-px-to-viewport');
// bundle分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// path function
const resolve = src => {
    return path.resolve(__dirname, src);
};

// customerTemplate
const templateFunction = function(data) {
    // console.log('---', data)
    const shared = `.sprite_ico { background-image: url(I);display:inline-block;background-size: Wpx Hpx;}`
        .replace('I', data.sprites[0].image)
        .replace('W', data.spritesheet.width)
        .replace('H', data.spritesheet.height);

    const perSprite = data.sprites
        .map(function(sprite) {
            return `.sprite_ico_N { width: Wpx; height: Hpx; background-position: Xpx Ypx;}`
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return "//out:false" + '\n'+shared + '\n' + perSprite;
};

// nginx 配置二级目录 base url
let serverBaseUrl = '';

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    console.log('isProduction', isProduction);

    // 传递给 babel.config.js
    process.env.NODE_ENV = argv.mode;

    // console.log(process.env.NODE_ENV);

    let plugins = [];

    // 生成模板
    let HtmlTemplates = [];

    // 生产环境
    if (isProduction) {
        // 清理项目, 清理不干净，需要使用 rm.sh
        plugins.push(
            new CleanWebpackPlugin({
                dry: false,
                verbose: true
            })
        );

        // 雪碧图
        plugins.push(
            new SpritesmithPlugin({
                src: {
                    //下面的路径，根据自己的实际路径配置
                    cwd: path.resolve(__dirname, './src/assets/icons'),
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    //下面的路径，根据自己的实际路径配置
                    image: path.resolve(__dirname, './src/assets/sprite.png'),
                    css: [
                        [
                            path.resolve(__dirname, './src/less/sprite.less'),
                            {
                                format: 'function_based_template'
                            }
                        ]
                    ]
                    // css: path.resolve(__dirname, './src/less/sprite.less')
                },
                // 自定义模板
                customTemplates: {
                    function_based_template: templateFunction
                },
                // 样式文件中调用雪碧图地址写法
                apiOptions: {
                    // 这个路径根据自己页面配置
                    cssImageRef: '../assets/sprite.png'
                },
                spritesmithOptions: {
                    // algorithm: 'top-down'
                    padding: 5
                }
            })
        );

        // 构建完成提醒
        plugins.push(
            new WebpackBuildNotifierPlugin({
                title: 'react project build',
                suppressSuccess: true,
                suppressWarning: false,
                messageFormatter: function() {
                    return 'build completely';
                }
            })
        );

        // 分离css
        // plugins.push(new ExtractTextPlugin('css/[name].[hash:8].css'));
        plugins.push(
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
                publicPath: './' + serverBaseUrl,
                ignoreOrder: false // Enable to remove warnings about conflicting order
            })
        );

        // 去除重复的 less, 比如 common
        plugins.push(
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                },
                canPrint: true
            })
        );

        //再次压缩代码
        plugins.push(
            new CompressionWebpackPlugin({
                deleteOriginalAssets: false,
                test: /\.(js|css|html|woff|ttf)$/,
                compressionOptions: {
                    numiterations: 15
                },
                threshold: 10240,
                minRatio: 0.8,
                algorithm(input, compressionOptions, callback) {
                    return zopfli.gzip(input, compressionOptions, callback);
                }
            })
        );

        // 公共提取的chunk
        const commonChunks = ['chunk-vendors', 'runtime', 'chunk-commons', 'css-commons'];

        const minify = {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        };

        // 生成模板
        HtmlTemplates = [
            new HtmlWebpackPlugin({
                title: 'Login',
                template: resolve('public/index.html'),
                filename: 'login.html',
                hash: true,
                minify,
                chunks: [...commonChunks, 'login'],
                favicon: resolve('public/favicon.ico')
            }),
            new HtmlWebpackPlugin({
                title: 'Index',
                template: resolve('public/index.html'),
                filename: 'index.html',
                hash: true,
                minify,
                chunks: [...commonChunks, 'index'],
                favicon: resolve('public/favicon.ico')
            })
        ];

        plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: "static"
        }));
    } else {
        // 生成模板
        HtmlTemplates = [
            new HtmlWebpackPlugin({
                title: 'Login',
                template: resolve('public/index.html'),
                filename: 'login.html',
                favicon: resolve('public/favicon.ico'),
                chunks: ['login'] //指定入口
            }),
            new HtmlWebpackPlugin({
                title: 'Index',
                template: resolve('./public/index.html'),
                filename: 'index.html',
                favicon: resolve('public/favicon.ico'),
                chunks: ['index'] //指定入口
            })
        ];
    }

    return {
        entry: {
            login: './src/login',
            index: './src/index'
        },
        output: {
            path: resolve('cdn'),
            filename: 'js/[name].[hash:8].js',
            publicPath: isProduction ? './' + serverBaseUrl : ''
        },
        // 本地调试
        devtool: !isProduction ? 'inline-source-map' : '',
        devServer: {
            port: 3002,
            open: true,
            hot: true,
            useLocalIp: true,
            // local ip
            host: '0.0.0.0',
            // 配置 browserHistory 路由，防止刷新就 404
            // historyApiFallback: {
            //     logger: console.log.bind(console),
            //     rewrites: [{ from: /\/react\/*/, to: '/index.html' }]
            // },
            historyApiFallback: true,
            compress: true,
            contentBase: path.join(__dirname, './'),
            noInfo: false,
            overlay: {
                warnings: true,
                errors: true
            },
            proxy: {
                '/api': {
                    target: 'http://111.200.244.194:18080',
                    changeOrigin: true
                }
            }
        },
        resolve: {
            // 别名
            alias: {
                '@': resolve('src'),
                '@c': resolve('src/components'),
                '@less': resolve('src/less'),
                '@util': resolve('src/utils'),
                '@assets': resolve('src/assets'),
                '@pages': resolve('src/pages')
            },
            // 自动添加后缀
            extensions: ['.jsx', '.js', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'less-loader',
                        // 配置相关移动端 VW 布局
                        {
                            loader: 'postcss-less-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    postcssPxToViewport({
                                        viewportWidth: 750, // (Number) The width of the viewport.
                                        viewportHeight: 1334, // (Number) The height of the viewport.
                                        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                                        viewportUnit: 'vw', // (String) Expected units.
                                        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                                        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                                        mediaQuery: false // (Boolean) Allow px to be converted in media queries.
                                    })
                                ]
                            }
                        }
                    ]
                    // webpack4 废弃
                    // use: ExtractTextPlugin.extract({
                    //     fallback: "style-loader",
                    //     use: [
                    //         'css-loader',
                    //         "less-loader"
                    //     ]
                    // })
                },
                {
                    test: /\.(png|jpg|svg|gif|ico)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // 这里的options选项参数可以定义多大的图片转换为base64
                                fallback: 'file-loader',
                                limit: 10 * 1024, // 表示小于10kb的图片转为base64,大于10kb的是路径
                                outputPath: 'images', //定义输出的图片文件夹
                                name: '[name].[contenthash:8].[ext]'
                            }
                        }
                    ]
                }
                // {
                //     test: /\.html$/,
                //     use: [{
                //         loader: "html-loader",
                //         options: {
                //             minimize: true,
                //             removeComments: true,
                //             collapseWhitespace: true
                //         }
                //     }]
                // }
            ]
        },
        plugins: [...plugins, ...HtmlTemplates],
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
                        test: /\.less$/,
                        minChunks: 2,
                        minSize: 0,
                        priority: -20,
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
