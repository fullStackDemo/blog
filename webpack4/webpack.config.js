const path = require('path')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry:{
    index: './src/index.js'
  },
  output:{
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/,
      // query: {
      //   plugins: ['transform-runtime', 'lodash'],
      //   presets: ['es2015']
      // }
    }]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    // new webpack.optimize.UglifyJsPlugin
  ]
}