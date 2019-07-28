
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://172.20.10.8:8080',
        changeOrigin: true
      },
    }
  }
}