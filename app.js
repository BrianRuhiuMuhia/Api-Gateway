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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Gateway is running on port ${PORT}`);
});
