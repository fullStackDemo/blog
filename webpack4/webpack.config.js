const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = dir => {
    return path.resolve(__dirname, dir);
};

module.exports = (env, argv) => {
    console.log('argv', argv);
    const { mode } = argv;

    const isProduction = mode == 'production';

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
                    use: isProduction ? MiniCssExtractPlugin.loader : 'css-loader',
                    exclude: /node_modules/
                }
            ]
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
            extensions: ['.css', '.js', '.less']
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'index',
                template: resolve('public/index.html'),
                filename: 'index.html',
                chunks: ['index']
            }),
            new HtmlWebpackPlugin({
                title: 'hello',
                template: resolve('public/hello.html'),
                filename: 'hello.html',
                chunks: ['hello']
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
                publicPath: './',
                ignoreOrder: false // Enable to remove warnings about conflicting order
            })
        ]
    };
};
