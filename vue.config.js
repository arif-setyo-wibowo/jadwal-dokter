const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  devServer: {
    before: function (app) {
      app.use(
        "/api",
        createProxyMiddleware({
          target: "http://10.126.0.1",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/api/api",
          },
        })
      );
    },
  },
};
