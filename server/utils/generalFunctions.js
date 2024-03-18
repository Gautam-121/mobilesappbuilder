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

module.exports = { shopifyApiData };
