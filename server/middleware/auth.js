const {
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
} = require("@shopify/shopify-api");
const authRedirect = require("../utils/authRedirect.js");
const sessionHandler = require("../utils/sessionHandler.js");
const shopify = require("../utils/shopifyConfig.js");
const payload = require('payload');

const axios = require("axios")

// Define your Shopify store's domain, access token, and API version
const shopDomain = 'renergii.myshopify.com';
const apiVersion = '2024-01';

// Define the request body
const requestBody = {
  storefront_access_token: {
    title: 'Test' // An arbitrary title for the token
  }
};

const TEST_QUERY = `
{
  shop {
    name
    id
  }
}`

const authMiddleware = (app) => {
  
  app.get("/auth", async (req, res) => {
    try {
      console.log("Come")
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

      console.log("Enter inside the auth/token 59")
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;
      await sessionHandler.storeSession(session);

      const client = new shopify.clients.Graphql({ session });
      const data = await client.query({ data: TEST_QUERY });
      const { shop } = session;

      console.log("Enter inside the auth/token 71")
      
      const isShopAvaialble = await payload.find({
        collection: 'activeStores',
        where: {
          shopId: { equals: data?.body?.data?.shop?.id},
        }
      })

      if (!(isShopAvaialble.docs[0] && isShopAvaialble.docs[0].storefront_access_token)) {
        try {

          console.log("Enter inside storefrontToken")
          // Make the POST request to create the storefront access token
          const response = await axios.post(
            `https://${shopDomain}/admin/api/${apiVersion}/storefront_access_tokens.json`,
            requestBody,
            {
              headers: {
                "X-Shopify-Access-Token": session.accessToken,
                "Content-Type": "application/json",
              },
            })

          // Create The document
          await payload.create({
            collection: 'activeStores', // required
            data: {
              shopName: shop,
              shopId: data?.body?.data?.shop?.id,
              storefront_access_token: response.data?.storefront_access_token?.access_token,
              isActive: false
            },
          })
        } catch (error) {
          console.error("Error creating storefront access token:", error);
        }
      }
     //Register all webhooks with offline token
    const webhookRegisterResponse = await shopify.webhooks.register({session});
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

  app.get("/auth/callback", async (req, res) => {

    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;
      await sessionHandler.storeSession(session);

      const client = new shopify.clients.Graphql({ session });
      const data = await client.query({ data: TEST_QUERY });

      const host = req.query.host;
      const { shop } = session;
      
      console.log("SessionDetail" , session)
      const result = await payload.find({
        collection: 'activeStores',
        where: {
          shopId: { equals:  data?.body?.data?.shop?.id}
        }
      })

      if(result.docs?.length!=0){
        await payload.update({
          collection: 'activeStores',
          where: {
            shopId: { equals:  data?.body?.data?.shop?.id}
          },
          data: {
            isActive: true
          }
        })
      }

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${shop}&host=${host}`);

    } catch (e) {
      console.error(`---> Error at /auth/callback`, e);
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
};

module.exports =  authMiddleware;
