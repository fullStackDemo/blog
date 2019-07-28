
module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.103:8080',
        changeOrigin: true
      },
    }
  }
}