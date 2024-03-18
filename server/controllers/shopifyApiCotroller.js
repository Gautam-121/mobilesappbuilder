const ErrorHandler = require("../utils/errorHandler.js");
const {shopifyApiData} = require("../utils/generalFunctions.js")

const getProduct = async (req, res) => {
  try {

    const shop = req.query.shop;
    const shopifyGraphQLEndpoint = `https://${shop || "renergii.myshopify.com"}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
    {
      products(first: 100) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          req.accessToken || "shpua_177ec0655453453b3619532c8a216b04",
      },
    };

    const fetchProducts = await shopifyApiData(
      shopifyGraphQLEndpoint,
      graphqlQuery,
      axiosShopifyConfig
    );

    const products = fetchProducts?.data?.data?.products?.edges?.map(
      (edge) => edge.node
    );

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getCollection = async (req, res) => {
  try {
    const shop = req.query.shop;
    const shopifyGraphQLEndpoint = `https://${shop || "renergii.myshopify.com"}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
    query MyQuery {
      collections(first: 10) {
        nodes {
          id
          title
          image {
            height
            src
            url
          }
        }
      }
    }
  `;
    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          req.accessToken || "shpua_177ec0655453453b3619532c8a216b04",
      },
    };

    const fetchCollections = await shopifyApiData(
      shopifyGraphQLEndpoint,
      graphqlQuery,
      axiosShopifyConfig
    );

    const collections = fetchCollections?.data?.data?.collections?.nodes?.map(
      (edge) => edge
    );

    return res.status(200).json({
      success: true,
      collections,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getProductByCollectionId = async (req, res, next) => {
  try {
    if (!req.query.collectionId) {
      return next(new ErrorHandler("Collection_Id is Missing", 400));
    }

    const shop = req.query.shop;
    const shopifyGraphQLEndpoint = `https://${shop || "renergii.myshopify.com"}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
    query MyQuery {
      collection(id: "gid://shopify/Collection/456868004158") {
        products(first:10) {
          edges {
            node {
              id
              productType
              title
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                edges {
                  node {
                    src
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          req.accessToken || "shpua_177ec0655453453b3619532c8a216b04",
      },
    };

    const fetchCollectionsProducts = await shopifyApiData(
      shopifyGraphQLEndpoint,
      graphqlQuery,
      axiosShopifyConfig
    );

    const collectionsProducts =
      fetchCollectionsProducts?.data?.data?.collection?.products?.edges?.map(
        (edge) => edge.node
      );

    return res.status(200).json({
      success: true,
      data: collectionsProducts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = { getProduct , getCollection , getProductByCollectionId}

