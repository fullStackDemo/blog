const path = require('path');
module.exports = {
  entry: './pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  mode: 'none'
}