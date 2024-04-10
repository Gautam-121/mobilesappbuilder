const Payload = require("payload")
const {otherScreen} = require("../data.js")
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const createProductDetailPage = asyncHandler( async (req, res, next) => {

  const data = req.body;

  if (!data) {
    const error = new ApiError("Please select all neccessary field", 400)
    return next(error);
  }

  const productDetail = await Payload.create({
    collection: "productPageDetail",
    data: {
      ...data,
      shopId: req.shop_id || "gid://shopify/Shop/81447387454",
    },
  });

  return res.status(200).json({
    success: true,
    message: "Created Successfully",
    data: productDetail,
  })
})

const createCartDetailPage = asyncHandler( async (req, res, next) => {
  
  const data = req.body;

  if (!data) {
    const error = new ApiError("Please select all neccessary field", 400)
    return next(error);
  }

  const cartDetail = await Payload.create({
    collection: "emptyCartPageDetail",
    data: {
      ...data,
      shopId: req.shop_id || "gid://shopify/Shop/81447387454",
    },
  });

  return res.status(200).json({
    success: true,
    message: "Created Successfully",
    data: cartDetail,
  })

})

const createAccountDetailPage = asyncHandler( async (req, res, next) => {

    const data = req.body;

    if (!data) {
      const error = new ApiError("Please select all neccessary field", 400)
      return next(error);
    }

    const accountDetail = await Payload.create({
      collection: "accountPageDetail",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      data: accountDetail,
    })
})

const getProductDetails = asyncHandler( async(req , res , next)=> {

  const productDetail = await Payload.find({
    collection: "productPageDetail",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
  });

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    productDetail: productDetail?.docs[0] || otherScreen?.data?.productDetail,
  })
})

const getOtherScreenPageDetailByWeb = asyncHandler( async (req, res, next) => {
  
  const productDetail = await Payload.find({
    collection: "productPageDetail",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
    },
  });

  const cartDetail = await Payload.find({
    collection: "emptyCartPageDetail",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
    },
  });

  const accountDetail = await Payload.find({
    collection: "accountPageDetail",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
    },
  });

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: {
      productDetail:
        productDetail?.docs[0] || otherScreen?.data?.productDetail,
      cart: cartDetail?.docs[0] || otherScreen?.data?.cart,
      account: accountDetail?.docs[0] || otherScreen?.data?.account,
    },
  })

})

const getOtherScreen = asyncHandler( async (req, res, next) => {
    
  const productDetail = await Payload.find({
    collection: "productPageDetail",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
  });

  const cartDetail = await Payload.find({
    collection: "emptyCartPageDetail",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
  });

  const accountDetail = await Payload.find({
    collection: "accountPageDetail",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
  });

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: {
      productDetail:
        productDetail?.docs[0] || otherScreen?.data?.productDetail,
      cart: cartDetail?.docs[0] || otherScreen?.data?.cart,
      account: accountDetail?.docs[0] || otherScreen?.data?.account,
    },
  })
})

module.exports = {
  createProductDetailPage,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getOtherScreen,
  getProductDetails
};