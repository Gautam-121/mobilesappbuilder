const {
  BotActivityDetected,
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
} = require("@shopify/shopify-api");
const authRedirect = require("../utils/authRedirect.js");
const sessionHandler = require("../utils/sessionHandler.js");
const shopify = require("../utils/shopifyConfig.js");
const payload = require('payload');
const axios = require("axios")
require("dotenv").config()
const {
  requestBodyForStorefrontToken,
  TEST_QUERY
} = require("../constant.js")

const authMiddleware = (app) => {

  app.get("/auth", async (req, res) => {
    try {
      await authRedirect(req, res);
    } catch (e) {
      console.error(`---> Error at /auth`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
          return res.redirect(`/exitframe/${shop}`);
          break;
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/auth/tokens", async (req, res) => {

    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;
      const client = new shopify.clients.Graphql({ session });
      const response = await client.request(TEST_QUERY);

      await sessionHandler.storeSession(session , response?.data?.shop?.id );
      const { shop } = session;

      const isShopAvaialble = await payload.find({
        collection: "Store",
        where: {
          shopId: { equals: response?.data?.shop?.id },
        },
      });

      let storefrontResponse;

      if( !isShopAvaialble.docs[0] || (isShopAvaialble.docs[0] && !isShopAvaialble.docs[0].storefront_access_token)){
        storefrontResponse = await axios.post(
          `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/storefront_access_tokens.json`,
          requestBodyForStorefrontToken,
          {
            headers: {
              "X-Shopify-Access-Token": session.accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        await payload.update({
          collection: "Store",
          where: {
            shopId: { equals: response?.data?.shop?.id },
          },
          data: {
            storefront_access_token:storefrontResponse.data?.storefront_access_token?.access_token,
          },
        });
      }

      if (!(isShopAvaialble.docs[0])
      ) {
        try {
          // Make the POST request to create the storefront access token
          storefrontResponse = await axios.post(
            `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/storefront_access_tokens.json`,
            requestBodyForStorefrontToken,
            {
              headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
              },
            }
          );

          // Create The document
          await payload.create({
            collection: "Store", // required
            data: {
              shopId: response?.data?.shop?.id,
              shopName: response?.data?.shop?.name,
              shopify_domain: session?.shop,
              storefront_access_token:storefrontResponse.data?.storefront_access_token?.access_token,
              isActive: false,
            },
          });

        } catch (error) {
        console.error("Error creating storefront access token:", error);
        res
        .status(403)
        .setHeader("Verify-Request-Failure", "1")
        .setHeader("Verify-Request-Reauth-URL", `/exitframe/${shop}`)
        .end();
         return;
        }
      }

      //Register all webhooks with offline token
      const webhookRegisterResponse = await shopify.webhooks.register({
        session,
      });
      //This is an array that includes all registry responses.
      console.dir(webhookRegisterResponse, { depth: null });

      return await shopify.auth.begin({
        shop: session.shop,
        callbackPath: "/auth/callback",
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
      
    } catch (e) {
      console.error(`---> Error at /auth/tokens`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/auth?shop=${shop}`);
          break;
        case e instanceof BotActivityDetected:
          res.status(410).send(e.message);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/auth/callback", async (req, res) => {
    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;
      const client = new shopify.clients.Graphql({ session });
      const response = await client.request(TEST_QUERY);

      await sessionHandler.storeSession(session , response?.data?.shop?.id);


      const host = req.query.host;
      const { shop } = session;

      const result = await payload.find({
        collection: "Store",
        where: {
          shopId: { equals: response?.data?.shop?.id },
        },
      });

      if (result.docs?.length != 0) {
        await payload.update({
          collection: "Store",
          where: {
            shopId: { equals: response?.data?.shop?.id },
          },
          data: {
            email: session?.onlineAccessInfo?.associated_user?.email,
            owner: session?.onlineAccessInfo?.associated_user?.first_name + " " + session?.onlineAccessInfo?.associated_user?.last_name,
            isActive: true,
          },
        });
      }

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${shop}&host=${host}`);
    } catch (e) {
      console.error(`---> Error at /auth/callback`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/auth?shop=${shop}`);
          break;
        case e instanceof BotActivityDetected:
          res.status(410).send(e.message);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });
};

module.exports =  authMiddleware;
