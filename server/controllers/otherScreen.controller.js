const Payload = require("payload")
const {otherScreen} = require("../constant.js")
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const updateProductDetail = asyncHandler( async (req, res, next) => {

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
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true}
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

  const isProductDetailForThemeExist = await Payload.find({
    collection: "productDetailScreen",
    where:{
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    }
  })

  if(isProductDetailForThemeExist?.docs[0]){

    await Payload.update({
      collection: "productDetailScreen",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
      data: data,
    });

    return res.status(200).json({
      success: true,
      message: "Product detail updated successfully",
    })

  }
  else{
    const productDetail = await Payload.create({
      collection: "productDetailScreen",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: req.params?.themeId
      },
    });

    if(!productDetail){
      return next(
        new ApiError(
          "Something went wrong while updating product detail",
           500
        )
      )
    }

    return res.status(200).json({
      success: true,
      message: "Product detail updated successfully",
    })
  }
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

  const productDetail = await Payload.find({
    collection: "productDetailScreen",
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      themeId: { equals: store?.docs[0]?.themeId}
    },
  });

  if(productDetail?.docs[0]){
    productDetail.docs[0].themeId = productDetail.docs[0].themeId.id
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    productDetail: productDetail?.docs[0] || otherScreen?.data?.productDetail,
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



module.exports = {
  updateProductDetail,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getProductDetails
};