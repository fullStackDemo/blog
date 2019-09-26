const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// notifier
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
// clean project
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = dir => {
    return path.resolve(__dirname, dir);
};

// 所有页面模板
const pages = [
    {
        title: 'index',
        filename: 'index.html',
        chunkname: 'index'
    },
    {
        title: 'hello',
        filename: 'hello.html',
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
    pages.forEach(n => {
        const { title, filename, chunkname } = n;
        HtmlTemplates.push(
            new HtmlWebpackPlugin({
                title: title,
                template: resolve('public/' + filename),
                filename: filename,
                chunks: [chunkname]
            })
        );
    });

    const namespace = process.env.NAMESPACE;
    const assetPrefixForNamespace = namespace => {
        switch (namespace) {
            case 'prod':
                return 'https://cache.myserver.net/web';
            case 'uat':
                return 'https://cache-uat.myserver.net/web';
            case 'st':
                return 'https://cache-st.myserver.net/web';
            case 'dev':
                return 'https://cache-dev.myserver.net/web';
            default:
                return '';
        }
    };
    __webpack_public_path__ = `${assetPrefixForNamespace(namespace)}/`;
    console.log(__webpack_public_path__);
    return {
        entry: {
            index: './src/index',
            hello: './src/hello'
        },
        output: {
            filename: 'js/[name].[chunkhash:8].js',
            path: resolve('cdn'),
            publicPath: './'
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
                            loader: MiniCssExtractPlugin.loader,
                            options: {}
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpg|png|gif|jpeg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                // limit: 10 * 1024,
                                // fallback: 'file-loader',
                                // 指定一个目标文件的路径
                                publicPath: '../',
                                // 输出文件夹
                                // outputPath: 'images',
                                // 最简短写法，可以指定输出文件夹
                                name: 'images/[sha512:contenthash:base64:8].[ext]',
                                postTransformPublicPath: p => `__webpack_public_path__ + ${p}`
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
            // 清理项目
            new CleanWebpackPlugin(),
            // 生成模板
            ...HtmlTemplates,
            // 抽离css
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
                publicPath: './',
                ignoreOrder: false // Enable to remove warnings about conflicting order
            }),
            // 构建提醒
            new WebpackBuildNotifierPlugin({
                title: 'project build',
                suppressSuccess: true,
                suppressWarning: true,
                messageFormatter: function() {
                    return 'build completely';
                }
            })
        ]
    };
};
