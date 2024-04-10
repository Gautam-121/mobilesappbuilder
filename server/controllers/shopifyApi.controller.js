const ApiError = require("../utils/ApiError.js");
const {
  shopifyApiData ,
  axiosShopifyConfig , 
  shopifyGraphQLEndpoint
} = require("../utils/shopifyBuildFun.js")
const {
  graphqlQueryForProducts,
  graphqlQueryForCollections,
  graphqlQueryForProductsByCollectionId
} = require("../constant.js");
const asyncHandler = require("../utils/asyncHandler.js");


const getProduct = asyncHandler( async (req, res) => {

  const shop = req.query.shop;

  const fetchProducts = await shopifyApiData(
    shopifyGraphQLEndpoint(shop),
    graphqlQueryForProducts,
    axiosShopifyConfig(req.accessToken)
  );

  const products = fetchProducts?.data?.data?.products?.edges?.map(
    (edge) => edge.node
  );

  return res.status(200).json({
    success: true,
    products,
  });

})

const getCollection = asyncHandler( async (req, res) => {

  const shop = req.query.shop;

  const fetchCollections = await shopifyApiData(
    shopifyGraphQLEndpoint(shop),
    graphqlQueryForCollections,
    axiosShopifyConfig(req.accessToken)
  );

  const collections = fetchCollections?.data?.data?.collections?.nodes?.map(
    (edge) => edge
  );

  return res.status(200).json({
    success: true,
    collections,
  });
} )

const getProductByCollectionId = asyncHandler( async (req, res, next) => {

  if (!req.query.collectionId) {
    const error = new ApiError("Collection_Id is Missing", 400)
    return next(error);
  }

  const shop = req.query.shop

  const fetchCollectionsProducts = await shopifyApiData(
    shopifyGraphQLEndpoint(shop),
    graphqlQueryForProductsByCollectionId(req.query.collectionId),
    axiosShopifyConfig(req.accessToken)
  );

  const collectionsProducts =
    fetchCollectionsProducts?.data?.data?.collection?.products?.edges?.map(
      (edge) => edge.node
    );

  return res.status(200).json({
    success: true,
    data: collectionsProducts,
  });
}) 

module.exports = { 
  getProduct , 
  getCollection , 
  getProductByCollectionId
}

