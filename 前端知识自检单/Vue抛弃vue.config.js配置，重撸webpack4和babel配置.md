### Vue项目改造抛弃vue-cli配置，重撸webpack4和babel配置

抛弃自带的vue.config.js的配置模式，手动使用webpack进行构建：

[TOC]

#### webpack4

> webpack4 相关loaders和plugins

~~~js
>>>>>>>>>>>>>>>>>>>>>>>相关loader<<<<<<<<<<<<<<<<<<<<<<

vue-loader
编译.vue文件

babel-loader
编译成ES5

file-loader
解决文件中 import/require() 的资源，转化为URL，再输出到指定文件夹内

url-loader
把图片转化成 base64 URLs, 可以根据limit大小自由控制

css-loader
css-loader 解释 @import and url() 比如 import/require() 然后解析他们

file-loader
file-loader 解析文件中的 import/require() 成一个URL 然后输出到输出文件中

vue-style-loader
style-loader
dev环境，把css注入到DOM

>>>>>>>>>>>>>>>>>>>>>>>相关plugin<<<<<<<<<<<<<<<<<<<<<<

mini-css-extract-plugin
提取css到单独的文件

clean-webpack-plugin
清理构建的资源

webpack-build-notifier
构建完成桌面提醒

html-webpack-plugin
生成html入口模板

optimize-css-assets-webpack-plugin
css去重压缩

purgecss-webpack-plugin
去除css中未使用的代码

webpack-dev-server
本地server

webpack-spritesmith
自动整合成雪碧图

compression-webpack-plugin
@gfx/zopfli
压缩代码,根据算法生成gzip

webpack-bundle-analyzer
生成bundle后分析报告，方便优化

~~~

>安装依赖
~~~bash
yarn add -D webpack webpack-cli webpack-dev-server vue-loader babel-loader file-loader css-loader style-loader url-loader mini-css-extract-plugin  clean-webpack-plugin webpack-build-notifier html-webpack-plugin optimize-css-assets-webpack-plugin purgecss-webpack-plugin webpack-spritesmith compression-webpack-plugin webpack-bundle-analyzer
~~~

#### babel 7

~~~js
@babel/core
@babel/preset-env
@babel/cli
@babel/polyfill
// runtime
@babel/runtime
@babel/plugin-transform-runtime
// 动态插入
@babel/plugin-syntax-dynamic-import
// 支持 ...spread
@babel/plugin-syntax-object-rest-spread
// commonjs
@babel/plugin-transform-modules-commonjs
// 支持 vue jsx语法
@babel/plugin-syntax-jsx
babel-plugin-transform-vue-jsx

//支持 element-ui 按需加载
babel-plugin-component

//支持 lodash 按需加载
babel-plugin-lodash

// 移除 console.log
babel-plugin-transform-remove-console

~~~

> babel.config.js
~~~js
const removeConsolePlugin = [];

if (process.env.NODE_ENV === 'production') {
    removeConsolePlugin.push('transform-remove-console');
}

module.exports = {
    // presets: ['@vue/app'],
    presets: [
        [
            '@babel/preset-env',
            {
                // transform any
                loose: true
            }
        ]
    ],
    // 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的
    plugins: [
        // import
        '@babel/plugin-syntax-dynamic-import',
        // transform
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        // vue jsx语法
        '@babel/plugin-syntax-jsx',
		'transform-vue-jsx',
		'lodash',
        // spread ...
        // '@babel/plugin-syntax-object-rest-spread',
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        ...removeConsolePlugin
    ]
};

~~~

> webpack.config.js
~~~js
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
// vue loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 图片整合成雪碧图
const SpritesmithPlugin = require('webpack-spritesmith');
// bundle分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// path function
const resolve = src => {
    return path.resolve(__dirname, src);
};

// nginx 配置二级目录 base url
let serverBaseUrl = '';

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

    return '//out:false' + '\n' + shared + '\n' + perSprite;
};

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    console.log('isProduction', isProduction);

    // 传递给 babel.config.js
    process.env.NODE_ENV = argv.mode;

    // console.log(process.env.NODE_ENV);

    let plugins = [new VueLoaderPlugin()];

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
                    cwd: path.resolve(__dirname, 'src/assets/icons'),
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    //下面的路径，根据自己的实际路径配置
                    image: path.resolve(__dirname, 'src/assets/sprite.png'),
                    css: [
                        [
                            path.resolve(__dirname, 'src/less/sprite.less'),
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
                title: 'project build',
                suppressSuccess: true,
                suppressWarning: true,
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
                test: /\.(js|css|html|woff|ttf|png|jpg|jpeg)$/,
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
                title: 'Index',
                template: resolve('public/index.html'),
                filename: 'index.html',
                hash: true,
                minify,
                chunks: [...commonChunks, 'index'],
                favicon: resolve('public/favicon.ico')
            })
        ];

        // 分析生成的包
        plugins.push(
            new BundleAnalyzerPlugin({
                // 生成report.html
                analyzerMode: 'static'
            })
        );
    } else {
        // 生成模板
        HtmlTemplates = [
            new HtmlWebpackPlugin({
                title: 'Index',
                template: resolve('./public/index.html'),
                filename: 'index.html',
                favicon: resolve('public/favicon.ico'),
                chunks: ['index', 'runtime']
            })
        ];
    }

    return {
        entry: {
            index: resolve('src/main.js')
        },
        output: {
            path: resolve('cdn'),
            filename: 'js/[name].[hash:8].js',
            publicPath: isProduction ? './' + serverBaseUrl : ''
        },
        // 本地调试
        devtool: !isProduction ? 'inline-source-map' : '',
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            // 配置 browserHistory 路由，防止刷新就 404
            historyApiFallback: true,
            compress: true,
            contentBase: path.resolve(__dirname, ''),
            noInfo: false,
            overlay: {
                warnings: true,
                errors: true
            },
            proxy: {
                '/api/v1': {
                    target: 'http://192.168.1.100:18080',
                    changeOrigin: true,
                    router: {
                        '/shareIndex': 'http://192.168.1.110:18080',
                    }
                },
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
            extensions: ['.vue', '.js', '.less']
        },
        module: {
            rules: [
                {
                    test: /\.vue?$/,
                    use: 'vue-loader'
                },
                {
                    test: /\.js?$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css?$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                        {
                            loader: 'css-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|svg|gif|ico|woff|ttf)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                // 这里的options选项参数可以定义多大的图片转换为base64
                                fallback: 'file-loader',
                                limit: 10 * 1024, // 表示小于10kb的图片转为base64,大于10kb的是路径
                                outputPath: 'images', //定义输出的图片文件夹名字
                                publicPath: '../images', //css中的路径
                                name: '[name].[contenthash:8].[ext]'
                            }
                        }
                    ]
                }
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
                        minSize: 0,
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
~~~

> package.json

~~~js
scripts:{
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
}
~~~