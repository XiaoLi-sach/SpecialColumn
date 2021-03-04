module.exports = {
  devServer: {
    prot: 8080,
    proxy: {
      '/api': {
        target: 'http://47.99.204.18:8080'
      }
    }
  }
}