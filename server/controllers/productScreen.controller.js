const Payload = require("payload")
const {otherScreen} = require("../constant.js")
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const updateProductScreenDetail = asyncHandler( async (req, res, next) => {

  const data = req.body?.data;

  if(!data){
    return next(
      new ApiError(
        "Privide all required fields",
        400
      )
    )
  }

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
         400
      )
    )
  }

  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id  },
      isActive: { equals: true}
    },
    limit: 1,
    depth: 0
  })

  if(isSelectedTheme.docs.length == 0){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

  if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
    return next(
      new ApiError(
        "Params is not matched with store themeId",
        400
      )
    )
  }

  const isProductDetailForThemeExist = await Payload.find({
    collection: "productDetailScreen",
    where:{
      shopId: { equals: req.shop_id  },
      themeId: { equals: req.params.themeId },
    },
    limit: 1
  })

  if (isProductDetailForThemeExist.docs.length === 0) {
    return next(
      new ApiError(
        "No document found",
         400
      )
    )
  }

  try {

    const data = await Payload.update({
      collection: "productDetailScreen",
      id:isProductDetailForThemeExist.docs[0].id,
      data: data,
    })

    if(!data){
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating the product screen detail"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Product detail updated successfully",
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating product screen detail"
    })
  }
})

const getProductScreenDetails = asyncHandler( async(req , res , next)=> {

  if (!req.params.shopId) {
    return next(
      new ApiError(
        "ShopId is Missing",
         400
      )
    )
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive : { equals: true }
    },
    limit: 1,
    depth: 0
  })

  if(store.docs.length == 0){
    return next(
      new ApiError(
        `Shop not found with id: ${req.params.shopId}`,
         404
      )
    )
  }

  const productDetail = await Payload.find({
    collection: "productDetailScreen",
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      themeId: { equals: store?.docs[0]?.themeId}
    },
    limit: 1,
    depth: req.query?.depth || 0
  });

  if (productDetail.docs.length === 0) {
    return next(
      new ApiError(
        `No data found with shopId: ${req.params.shopId}`,
         400
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    productDetail: productDetail?.docs[0]
  })
})

const getProductScreenDetailByWeb = asyncHandler( async(req , res , next)=>{

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
         400
      )
    )
  }
  
  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id  },
      isActive: { equals: true}
    },
    limit: 1,
    depth: req.query?.depth || 0
  })

  if(isSelectedTheme.docs.length == 0){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

 if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
    return next(
      new ApiError(
        "Params is not matched with store themeId",
         400
      )
    )
 }

 const productDetail = await Payload.find({
  collection: "productDetailScreen",
  where: { 
    where: {
      shopId: { equals: req.shop_id },
      themeId: { equals: req.params.themeId },
    },
  },
  limit: 1,
  depth: req.query?.depth || 0
});

  if (productDetail.docs.length === 0) {
    return next(
      new ApiError(
        "No Document found",
         400
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: productDetail.docs[0],
  });

})

const getAccountScreen = asyncHandler( async(req , res , next)=> {

  if (!req.params.shopId) {
    return next(
      new ApiError(
        "ShopId is Missing",
         400
      )
    )
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive : { equals: true }
    },
  })

  if(!store.docs[0]){
    return next(
      new ApiError(
        `Shop not found with id: ${req.params.shopId}`,
         404
      )
    )
  }

  const accountScreenData = await Payload.find({
    collection: "accountScreen",
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      themeId: { equals: store?.docs[0]?.themeId}
    },
  });

  if(accountScreenData?.docs[0]){
    accountScreenData.docs[0].themeId = accountScreenData.docs[0].themeId.id
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    dat: accountScreenData?.docs[0]
  })
})

const getOtherScreenPageDetailByWeb = asyncHandler( async (req, res, next) => {
  
  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
        400
      )
    )
  }

  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!isSelectedTheme.docs[0]){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

  if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
    return next(
      new ApiError(
        "Params is not matched with store themeId",
        400
      )
    )
  }

  const productDetail = await Payload.find({
    collection: "productDetailScreen",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId}
    },
  });

  const cartDetail = await Payload.find({
    collection: "emptyCartPageDetail",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId}
    },
  });

  const accountDetail = await Payload.find({
    collection: "accountPageDetail",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId}
    },
  });

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: {
      productDetail:
        productDetail?.docs[0] || otherScreen?.data?.productDetail,
      cart: 
        cartDetail?.docs[0] || otherScreen?.data?.cart,
      account: 
        accountDetail?.docs[0] || otherScreen?.data?.account,
    },
  })

})

const createCartDetailPage = asyncHandler( async (req, res, next) => {
  
  const data = req.body;

  if (!data) {
    return next(
      new ApiError(
        "Please select all neccessary field",
         400
      )
    )
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
    return next(
      new ApiError(
        "Please select all neccessary field",
         400
      )
    )
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


module.exports = {
  updateProductScreenDetail,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getProductScreenDetails,
  getAccountScreen,
  getProductScreenDetailByWeb
};