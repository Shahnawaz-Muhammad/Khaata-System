const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("hello this is proxy file");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
