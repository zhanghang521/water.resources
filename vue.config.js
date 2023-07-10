
module.exports = {
  lintOnSave: false,
  devServer: {
    //open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: "8080",
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:9999/", //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
