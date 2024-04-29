const payload = require("payload");
const shopify = require("../utils/shopifyConfig.js");


const isShopActive = async (req, res, next) => {
  
  const { shop, host } = req.query;

  if (!shop) {
    next();
    return;
  }

  const callbackResponse = await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });

  const { session } = callbackResponse;

  const client = new shopify.clients.Graphql({ session });
  const response = await client.request(TEST_QUERY);

  const isShopAvaialble = await payload.find({
    collection: "Store", // required
    where: {
      id: { equals: response?.data?.shop?.id },
    },
  });

  if (isShopAvaialble.docs?.length === 0 || !isShopAvaialble.docs[0].isActive) {
    if (isShopAvaialble.docs?.length === 0) {
      await payload.create({
        collection: "Store", // required
        data: {
            shopId: response?.data?.shop?.id,
            shopName: response?.data?.shop?.shopName,
            shopify_domain: session?.shop,
            isActive: false,
        },
      });
    } 
    else if (!isShopAvaialble.docs[0].isActive) {
      await payload.update({
        collection: "Store",
        where: {
          id: { equals: response?.data?.shop?.id }
        },
        data: {
          isActive: false,
        },
      });
    }
    res.redirect(`/auth?shop=${shop}&host=${host}`);
  } else {
    next();
  }
};

module.exports = isShopActive;
