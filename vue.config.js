var px2rem = require("postcss-px2rem");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [px2rem({ remUnit: 375 / 10 })], //375是设计稿宽度
      },
    },
  },
  lintOnSave: false,
  devServer: {
    port: "8800",
    proxy: {
      "/api1": {
        target: "https://m.you.163.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api1": "",
        },
      },
      "/my": {
        target: "http://39.98.123.211",
        changeOrigin: true,
        pathRewrite: {
          "^/my": "",
        },
      },
    },
  },
};
