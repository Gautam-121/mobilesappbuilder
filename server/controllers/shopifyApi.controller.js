const ApiError = require("../utils/ApiError.js");
const {
  shopifyApiData ,
  axiosShopifyConfig , 
  shopifyGraphQLEndpoint
} = require("../utils/shopifyBuildFun.js")
const {
  graphqlQueryForProducts,
  graphqlQueryForCollections,
  graphqlQueryForProductsByCollectionId,
  graphqlQueryForSegments
} = require("../constant.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Payload = require("payload")
const Cryptr = require("cryptr");
const cryption = new Cryptr(process.env.ENCRYPTION_STRING);
const axios = require("axios")


const getProduct = asyncHandler( async (req, res , next) => {

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!store.docs[0]){
    const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
    return next(error);
  }

  const per_page = req.query?.per_page ?  parseInt(req.query.per_page) : 8
  const next_page = req.query.next_page || null

  const fetchProducts = await shopifyApiData(
    shopifyGraphQLEndpoint(req?.shop),
    graphqlQueryForProducts,
    axiosShopifyConfig(req.accessToken),
    {first: per_page , after: next_page}
  );

 if(fetchProducts?.data?.errors?.length > 0){
  const error = new ApiError("Something went wrong while fetching graphql query" , 500)
  return next(error)
 }

const product = fetchProducts?.data?.data?.products;
const hasNextPage = product.pageInfo.hasNextPage;
const nextCursor = hasNextPage ? product.pageInfo.endCursor : null;
const items = product.edges.map((edge) => edge.node);

return res.status(200).json({
  success: true,
  hasNextPage,
  nextCursor,
  products:items,
});

})

const getCollection = asyncHandler( async (req, res) => {

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!store.docs[0]){
    const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
    return next(error);
  }

  const per_page = req.query?.per_page ?  parseInt(req.query.per_page) : 8
  const next_page = req.query.next_page || null

  const fetchCollections = await shopifyApiData(
    shopifyGraphQLEndpoint(req?.shop),
    graphqlQueryForCollections,
    axiosShopifyConfig(req.accessToken),
    {first: per_page , after: next_page}
  );

  console.log(fetchCollections?.data)

  if(fetchCollections?.data?.errors?.length > 0){
    const error = new ApiError("Something went wrong while fetching graphql query" , 500)
    return next(error)
   }

  const collection = fetchCollections?.data?.data?.collections;
  const hasNextPage = collection.pageInfo.hasNextPage;
  const nextCursor = hasNextPage ? collection.pageInfo.endCursor : null;
  const collections = collection.nodes.map(
    (edge) => edge
  )

  return res.status(200).json({
    success: true,
    hasNextPage,
    nextCursor,
    collections,
  });
} )

const getProductByCollectionId = asyncHandler( async (req, res, next) => {

  if (!req.query.collectionId) {
    const error = new ApiError("Category id is Missing", 400)
    return next(error);
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!store.docs[0]){
    const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
    return next(error);
  }

  const per_page = req.query?.per_page ?  parseInt(req.query.per_page) : 8
  const next_page = req.query.next_page || null

  const fetchCollectionsProducts = await shopifyApiData(
    shopifyGraphQLEndpoint(req?.shop),
    graphqlQueryForProductsByCollectionId,
    axiosShopifyConfig(req.accessToken),
    { collectionId: req.query.collectionId, first: per_page, after: next_page }
  );

  if(fetchCollectionsProducts?.data?.errors?.length > 0){
    const error = new ApiError("Something went wrong while fetching graphql query" , 500)
    return next(error)
   }

  const collectionProducts = fetchCollectionsProducts?.data?.data?.collection?.products;
  const hasNextPage = collectionProducts.pageInfo.hasNextPage;
  const nextCursor = hasNextPage ? collectionProducts.pageInfo.endCursor : null;
  const products = collectionProducts.edges.map((edge) => edge.node);

  return res.status(200).json({
    success: true,
    hasNextPage,
    nextCursor,
    data: products,
  });
})

const metafieldByProductId = asyncHandler( async(req,res,next)=>{

  if(!req.params?.shopId || !req?.params?.productId){
    const error = new ApiError("shopId and productId is required", 400)
    return next(error);
  }

  const storeExist = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.params?.id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true}
    },
  })

  if(!storeExist.docs[0]){
    const error = new ApiError(`store not found with id: ${req.params?.shopId}`, 404)
    return next(error);
  }

  const offlineAccessToken =  await Payload.find({
    collection: 'Session',
    where: { 
      shopId: { equals: req.params?.id || "gid://shopify/Shop/81447387454" },
      isOnline: false
    },
  })

  if(!offlineAccessToken?.docs[0]){
    const error = new ApiError(`store not found with id: ${req.params?.shopId}`, 404)
    return next(error);
  }

  // fetch metafield of product from shopify
  const shopName = storeExist.docs[0].shopName;
  const offlineSession =  JSON.parse(
    cryption.decrypt(offlineAccessToken.docs[0].token)
  );

  try {
    const response = await axios.get(
      `https://${shopName}.myshopify.com/admin/api/2023-07/products/${req.params.productId}/metafields.json`,
      {
        headers: {
          'X-Shopify-Access-Token':  offlineSession?.accessToken,
          'Content-Type': 'application/json',
        },
      }
    );

    const {metafields} = response?.data

    return res.status(200).json({
      success: true,
      message: "Metafield send successfully",
      metafields
    })
  } catch (error) {
    if (error.response) {
      // The error is from the server's response
      const apiError = new ApiError(error.message, error.response.status);
      return next(apiError);
    } else {
      // The error is not from the server's response
      const apiError = new ApiError(error.message, 500);
      return next(apiError);
    }
  }

})

const getAllSegment = asyncHandler( async (req, res , next) => {

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!store.docs[0]){
    const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
    return next(error);
  }

  const per_page = req.query?.per_page ?  parseInt(req.query.per_page) : 8
  const next_page = req.query.next_page || null

  const fetchSegment = await shopifyApiData(
    shopifyGraphQLEndpoint(req?.shop),
    graphqlQueryForSegments,
    axiosShopifyConfig(req.accessToken),
    {first: per_page , after: next_page}
  );

  if(fetchSegment?.data?.errors?.length > 0){
    const error = new ApiError("Something went wrong while fetching graphql query" , 500)
    return next(error)
  }

  const segments = fetchSegment?.data?.data?.segments;
  const hasNextPage = segments.pageInfo.hasNextPage;
  const nextCursor = hasNextPage ? segments.pageInfo.endCursor : null;
  const segmentItems = segments.edges.map((edge) => edge.node);

  return res.status(200).json({
    success: true,
    hasNextPage,
    nextCursor,
    segments:segmentItems
  })
})

module.exports = { 
  getProduct , 
  getCollection , 
  getProductByCollectionId,
  metafieldByProductId,
  getAllSegment
}

