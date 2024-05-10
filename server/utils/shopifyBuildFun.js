const axios = require("axios");

const shopifyApiData = async (
  shopifyGraphQLEndpoint,
  graphqlQuery,
  axiosShopifyConfig,
  variables
) => {
    const shopifyResult = await axios.post(
      shopifyGraphQLEndpoint,
      { 
        query: graphqlQuery , 
        variables: variables 
      },
      axiosShopifyConfig,
    );
    return shopifyResult;
};

const shopifyGraphQLEndpoint = (shop) =>  `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`;

const axiosShopifyConfig = function(accessToken) {
    return {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      };
}

module.exports = { 
  shopifyApiData,
  shopifyGraphQLEndpoint,
  axiosShopifyConfig
};
