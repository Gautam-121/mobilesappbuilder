require("@shopify/shopify-api/adapters/node");
require("dotenv").config();
const express = require("express");
const { resolve } = require("path");
const cors = require("cors");
const csp = require("./middleware/csp.js");
const applyAuthMiddleware = require("./middleware/auth.js");
const isShopActive = require("./middleware/isShopActive.js");
const errorMiddleware = require("./middleware/error.js");

const isDev = process.env.NODE_ENV === "dev";
const root = process.cwd();
const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");
applyAuthMiddleware(app);
app.use(csp);
app.use(isShopActive);

//Import Routes
const router = require("./routes/index.js");

app.use("/apps", router)

// Handles Error
app.use(errorMiddleware);


if (!isDev) {
    import("compression").then(({ default: compression }) => {
      app.use(compression());
    });
  
    import("serve-static").then(({ default: serveStatic }) => {
      app.use(serveStatic(resolve("dist/client")));
    });
  
    const fs = require("fs");
    app.use("/*", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
}
  

module.exports = app