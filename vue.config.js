const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 目标 API 服务器地址
        changeOrigin: true, // 允许改变 Origin
        pathRewrite: {
          "^/api": "", // 重写请求，将/api替换为空字符串
        },
      },
    },
  },
};
