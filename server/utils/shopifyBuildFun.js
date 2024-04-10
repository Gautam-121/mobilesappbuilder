const axios = require("axios");

const shopifyApiData = async (
  shopifyGraphQLEndpoint,
  graphqlQuery,
  axiosShopifyConfig
) => {
  const shopifyResult = await axios.post(
    shopifyGraphQLEndpoint,
    { query: graphqlQuery },
    axiosShopifyConfig
  );
  return shopifyResult;
};

const shopifyGraphQLEndpoint = (shop) =>  `https://${shop || "renergii.myshopify.com"}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

const axiosShopifyConfig = function(accessToken) {
    return {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken || "shpua_177ec0655453453b3619532c8a216b04",
        },
      };
}

module.exports = { 
  shopifyApiData,
  shopifyGraphQLEndpoint,
  axiosShopifyConfig
};