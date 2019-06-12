const path = require('path')
module.exports = {
  entry:{
    index: './src/index.js'
  },
  output:{
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}