const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000", // 本地测试
        target: "http://43.138.199.62:3000", // 服务器
        changeOrigin: true, // 允许改变 Origin
        pathRewrite: {
          "^/api": "", // 重写请求，将/api替换为空字符串
        },
      },
    },
  },
};
