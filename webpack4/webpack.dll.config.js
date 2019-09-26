const path = require('path');
const webpack = require('webpack');
// clean project
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 项目依赖
const dependencies = require('./package.json').dependencies; // 引入package.json

module.exports = {
    mode: 'none',
    entry: {
        vendor: Object.keys(dependencies)
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: '[name]_[hash]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 打包静态资源
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            name: '[name]_[hash]'
        })
    ]
};
