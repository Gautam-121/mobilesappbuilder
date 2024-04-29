require("@shopify/shopify-api/adapters/node");
require("dotenv").config();
const express = require("express");
const { resolve } = require("path");
const shopify = require("./utils/shopifyConfig.js");
const cors = require("cors");
const csp = require("./middleware/csp.middleware.js");
const applyAuthMiddleware = require("./middleware/auth.middleware.js");
const isShopActive = require("./middleware/isShopActive.middleware.js");
const errorMiddleware = require("./middleware/error.middleware.js");

const isDev = process.env.NODE_ENV === "dev";
const root = process.cwd();
const app = express();


app.use(cors());
app.disable("x-powered-by");
applyAuthMiddleware(app);
app.use(csp);
app.use(isShopActive);

// Incoming webhook requests
app.post(
  "/webhooks/:topic",
  express.text({ type: "*/*" }),
  async (req, res) => {
    const { topic } = req.params || "";
    const shop = req.headers["x-shopify-shop-domain"] || "";

    try {
      await shopify.webhooks.process({
        rawBody: req.body,
        rawRequest: req,
        rawResponse: res,
      });
      console.log(`--> Processed ${topic} webhook for ${shop}`);
    } catch (e) {
      console.error(
        `---> Error while registering ${topic} webhook for ${shop}`,
        e
      );
      if (!res.headersSent) {
        res.status(500).send(error.message);
      }
    }
  }
);

app.use(express.json());

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
      console.log(root)
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
}
  
module.exports = app