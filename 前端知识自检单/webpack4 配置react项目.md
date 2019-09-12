## webpack 4 配置 React 项目，同时配置DEV和PROD环境

[TOC]

### 1、生成一个react项目

```shell
yarn add create-react-app -global
npx create-react-app my-app
```

文件结构目录如下：

![1568105472442](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568105472442.png)

### 2、从零配置webapck

安装：

```shell
yarn add webpack webpack-cli webpack-dev-server
```
在package.json增加

```json
"scripts": {
        "dev": "webpack-dev-server --mode development",
        "build": "webpack --mode production",
 },
# yarn dev 去启动本地server
# yarn build 去生成生产代码

```
生成配置文件：

```shell
touch webpack.config.js
```

在`webpack.config.js`增加

```js

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// path function
const resolve = src => {
    return path.resolve(__dirname, src);
};

module.exports = (env, argv) => {

    //argv 里面的 mode 分别是之前执行命令的的，development production
    // 传递给 babel.config.js
    process.env.NODE_ENV = argv.mode;

	return ({
		entry: {
            "login": "./src/login",
            "index": "./src/index",
        },
        output: {
            path: resolve("cdn"),
            filename: 'js/[name].[hash:8].js',
            publicPath: '/',
        },
        //解析 jsx
         rules: [{
                    test: /\.jsx?$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
          }],
        plugins:[
            // 生成最终需要的html模板
            new HtmlWebpackPlugin({
                title: "Login",
                template: resolve("public/index.html"),
                filename: "login.html",
                hash: true,//增加hash
                minify:true,//压缩html代码
                chunks: ['login'],
                favicon: resolve("public/favicon.ico")
            }),
            new HtmlWebpackPlugin({
                title: "Index",
                template: resolve("public/index.html"),
                filename: "index.html",
                hash: true,
                minify: true,
                chunks: ['index'],
                favicon: resolve("public/favicon.ico")
            })
        ]
	})

}

```
此时还需要配置 babel7，把 ES6\7转化为浏览器直接解析的语法；

webpack 4: transpiling Javascript ES6 with Babel 7

![webpack 4: transpiling Javascript ES6 with Babel](https://www.valentinog.com/blog/wp-content/uploads/2017/10/from-gulp-to-webpack-babel-300x136.png)

babel-loader把ES6甚至更高的版本，编译成ES5，这样浏览器就能解析了。

> babel core
babel loader
babel preset env for compiling Javascript ES6 code down to ES5

```shell
yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react
```

下一步，我们生成一个babel.config.js配置文件

```shell
touch babel.config.js
```

`babel.config.js`

在这里可以除无用的 `console.log()`来减少文件的体积。

```javascript
const removeConsolePlugin = [];

console.log("babel", process.env.NODE_ENV)
//移除console
if (process.env.NODE_ENV == "production") {
    console.log("====remove-console=====");
    removeConsolePlugin.push([
        "transform-remove-console",
        {
            "exclude": ["error", "warn"]
        }
    ]);
}

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": [
                        "last 2 Chrome versions",
                        "last 2 Firefox versions",
                        "last 2 Safari versions",
                        "last 2 iOS versions",
                        "last 1 Android version",
                        "last 1 ChromeAndroid version",
                        "ie 11"
                    ]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        ...removeConsolePlugin
    ]
}
```

这个时候`yarn dev`，我们启动本地server，应该是成功的了。

### 3、设置alias别名和自动填写后缀

```javascript
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
}
```

### 4、配置 devServer

```javascript
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
            target: 'http://****',
            changeOrigin: true,
        	},
    	}
    }
```

### 5、解析分离less到单独的文件


```javascript
// webpack4 使用 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 分离css
# plugins 增加
plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options webpackOptions.output
    // all options are optional
    filename: 'css/[name].[hash:8].css',
    chunkFilename: 'css/[name].[hash:8].css',
    ignoreOrder: false
}));

#rules 增加
rules:[
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
    }
]

```

### 6、url-loader, file-loader 解析图片地址，并导出到指定文件

```javascript
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
}
```

### 7、多个less文件公用的common.less，需要删除合并

```javascript
// 去除重复的 less, 比如 common.less里面的内容
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
```



8、提取各个模块的公共代码

```javascript
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
```
全部代码如下：

```javascript
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
                    target: 'http://*****:8093',
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
```
