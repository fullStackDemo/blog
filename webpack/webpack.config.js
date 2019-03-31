const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const dirname = path.resolve(__dirname, 'dist');

// clear dist
function deleteFolder(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(name => {
      const curName = `${dir}/${name}`;
      if (fs.statSync(curName).isDirectory()) {
        deleteFolder(curName);
      } else {
        fs.unlinkSync(curName);
      }
    });
    fs.rmdirSync(dir);
  }
}

deleteFolder(dirname);

module.exports = {
  entry: {
    index: './pages/index.js',
    test: './pages/test/test.js'
  },
  output: {
    path: dirname,
    filename: 'bundle.[name].[chunkhash].js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use:['style-loader','css-loader']
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: {
        //     loader: 'css-loader',
        //     options: {
        //       minimize: true
        //     }
        //   }
        // })
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My app',
      filename: 'index.html',
      template: './pages/index.html',
      inject: 'body',
      minify: {
        // collapseWhitespace: true,
        // removeComments: true,
        // removeRedundantAttributes: true,
        // removeScriptTypeAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // useShortDoctype: true
      },
      hash: true,
      // chunks:['index'],
      base: {
        'href': 'http://example.com/some/page.html',
        'target': '_blank'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'test/index.html',
      template: './pages/test/test.html'
    }),
    new HtmlWebpackPlugin({
      title: 'custom template',
      filename: 'custom.html',
      template: './pages/custom.html'
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name]-[contenthash].css'
    // })





  ]
}