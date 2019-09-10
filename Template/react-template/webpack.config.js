/**
 * webpack 4 config
 * @author master2011zhao@gmail.com
 * @Date 20190910
 */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// webpack4 使用 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// extract 被废弃
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// clean project
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// notifier
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// path function
const resolve = src => {
    return path.resolve(__dirname, src);
};


module.exports = (env, argv) => {

    const isProduction = argv.mode === "production";

    console.log("isProduction", isProduction);

    // 传递给 babel.config.js
    process.env.NODE_ENV = argv.mode;

    // console.log(process.env.NODE_ENV);

    let plugins = [];

    // 生成模板
    let HtmlTemplates = [];

    // 生产环境
    if (isProduction) {
        // 清理项目, 清理不干净，需要使用 rm.sh
        plugins.push(new CleanWebpackPlugin({
            dry: false,
            verbose: true,
        }));

        // 构建完成提醒
        plugins.push(new WebpackBuildNotifierPlugin({
            title: "react project build",
            suppressSuccess: true,
            suppressWarning: false,
            messageFormatter: function () {
                return "build completely"
            }
        }));

        // 分离css
        // plugins.push(new ExtractTextPlugin('css/[name].[hash:8].css'));
        plugins.push(new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:8].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }));

        // 去除重复的 less, 比如 common
        plugins.push(new OptimizeCssAssetsPlugin({
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
                ],
            },
            canPrint: true
        }));

        // 公共提取的chunk
        const commonChunks = ["chunk-vendors", "runtime", "chunk-commons", "css-commons"];

        const minify = {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }

        // 生成模板
        HtmlTemplates = [
            new HtmlWebpackPlugin({
                title: "Login",
                template: resolve("public/index.html"),
                filename: "login.html",
                hash: true,
                minify,
                chunks: [...commonChunks, 'login'],
                favicon: resolve("public/favicon.ico")
            }),
            new HtmlWebpackPlugin({
                title: "Index",
                template: resolve("public/index.html"),
                filename: "index.html",
                hash: true,
                minify,
                chunks: [...commonChunks, 'index'],
                favicon: resolve("public/favicon.ico")
            })
        ]


    } else {
        // 生成模板
        HtmlTemplates = [
            new HtmlWebpackPlugin({
                title: "Login",
                template: resolve("public/index.html"),
                filename: "login.html",
                favicon: resolve("public/favicon.ico"),
                chunks: ['login'], //指定入口
            }),
            new HtmlWebpackPlugin({
                title: "Index",
                template: resolve("./public/index.html"),
                filename: "index.html",
                favicon: resolve("public/favicon.ico"),
                chunks: ['index'], //指定入口
            })
        ]
    }

    return {
        entry: {
            "login": "./src/login",
            "index": "./src/index",
        },
        output: {
            path: resolve("cdn"),
            filename: 'js/[name].[hash:8].js',
            publicPath: '/',
        },
        devServer: {
            port: 3001,
            open: true,
            hot: true,
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
                    changeOrigin: true,
                },
            }
        },
        resolve: {
            // 别名
            alias: {
                "@": resolve('src'),
                "@c": resolve('src/components'),
                "@less": resolve('src/less'),
                "@util": resolve('src/utils'),
                "@assets": resolve('src/assets'),
            },
            // 自动添加后缀
            extensions: ['.jsx', '.js', '.less']
        },
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.less$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                        "less-loader"
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
                    use: [{
                        loader: 'url-loader',
                        options: { // 这里的options选项参数可以定义多大的图片转换为base64
                            fallback: "file-loader",
                            limit: 10 * 1024, // 表示小于10kb的图片转为base64,大于10kb的是路径
                            outputPath: 'images', //定义输出的图片文件夹
                            name: '[name].[contenthash:8].[ext]'
                        }
                    }]
                },
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
        plugins: [
            ...plugins,
            ...HtmlTemplates
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
                        test: /\.less$/,
                        minChunks: 2,
                        minSize: 0,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true,
                    }
                }
            },
            // I pull the Webpack runtime out into its own bundle file so that the
            // contentHash of each subsequent bundle will remain the same as long as the
            // source code of said bundles remain the same.
            runtimeChunk: "single"
        }

    };
}