const sessionHandler = require("../utils/sessionHandler.js");
const shopify = require("../utils/shopifyConfig.js");


const TEST_QUERY = `
{
  shop {
    name
    id
  }
}`;

const verifyRequest = async (req, res, next) => {
  try {

    let { shop } = req.query;

    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });

    const session = await sessionHandler.loadSession(sessionId);
    
    if ( 
      new Date(session?.expires) > new Date() &&
      shopify.config.scopes.equals(session.scope)
      ) {

      const client = new shopify.clients.Graphql({ session });      
      const response = await client.request(TEST_QUERY);

      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${session.shop} https://admin.shopify.com;`
      );
      
      res.locals.user_session = session;
      req.shop = session.shop
      req.shop_id = response?.data?.shop?.id
      req.accessToken = session.accessToken

      return next();
    }
   
    const authBearer = req.headers.authorization?.match(/Bearer (.*)/);
    if (authBearer) {
      if (!shop) {
        console.log(shop)
        if (session) {
          shop = session?.shop
        } else if (shopify.config.isEmbeddedApp) {
          if (authBearer) {
            const payload = await shopify.session.decodeSessionToken(
              authBearer[1]
            );
            shop = payload.dest.replace("https://", "")
          }
        }
      }
      res
        .status(403)
        .setHeader("Verify-Request-Failure", "1")
        .setHeader("Verify-Request-Reauth-URL", `/exitframe/${shop}`)
        .end();
    } else {
      res
      .status(403)
      .setHeader("Verify-Request-Failure", "1")
      .setHeader("Verify-Request-Reauth-URL", `/exitframe/${shop}`)
      .end();
    return;
    }
  } catch (e) {
    console.error(e);
    return res.status(401).send({ error: "Nah I ain't serving this request" });
  }
};

module.exports =  verifyRequest;
