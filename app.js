const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const services=require("./services/services.js")
const limiter=require("./rateLimiter/rateLimiter.js")
const app = express();
app.use(cors()); 
app.use(helmet()); 
app.use(morgan("combined")); 
app.use(limiter);
app.disable("x-powered-by");
services.forEach(({ route, target }) => {
    const proxy = {
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: "",
      },
    };
  
    app.use(route,createProxyMiddleware(proxy));
  });
const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
 console.log(`Gateway is running on port ${PORT}`);
});
