const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getBrandingApp = asyncHandler(async (req, res, next) => {

  if (!req.params.shopId) {
    const error = new ApiError("Shop_id is missing", 400);
    return next(error);
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive : { equals: true }
    },
  })

  if(!store.docs[0]){
    const error = new ApiError(`Shop not found with id: ${req.params.shopId}`, 404)
    return next(error);
  }

  const brandingData = await Payload.find({
    collection: "branding",
    where: {
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      themeId: { equals: store.docs[0]?.themeId}
    },
    depth: req.query.depth || 1,
  });

  if (brandingData.docs.length === 0) {
    const error = new ApiError(`No data found with shopId: ${req.params.shopId}`, 400);
    return next(error);
  }

  brandingData.docs[0].themeId = brandingData.docs[0].themeId.id;

  if (brandingData.docs[0].app_title === "appText") {
    brandingData.docs[0].app_title_logo = null;
  } 
  else {
    brandingData.docs[0].app_title_text = null;
    brandingData.docs[0].app_title_logo = brandingData.docs[0].app_title_logo.url;
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: brandingData.docs[0],
  });
}) 

const getBrandingAppWeb = asyncHandler(async (req, res, next) => {

    if (!req.params.themeId) {
      const error = new ApiError("themeId is missing", 400);
      return next(error);
    }
    
    const isSelectedTheme = await Payload.find({
      collection: 'Store',
      where: { 
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        isActive: { equals: true}
      },
    })
  
    if(!isSelectedTheme.docs[0]){
      const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
      return next(error);
    }

   if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
      const error = new ApiError("Params is not matched with store themeId", 400)
      return next(error);
   }

    const brandingData = await Payload.find({
      collection: "branding",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
      depth: 0,
    });

    if (brandingData.docs.length === 0) {
      const error = new ApiError("No Document found", 400);
      return next(error);
    }

    if (brandingData.docs[0].app_title === "appText") {
      brandingData.docs[0].app_title_logo = null;
    } 
    else {
      brandingData.docs[0].app_title_text = null;
      brandingData.docs[0].app_title_logo = brandingData.docs[0]?.app_title_logo?.url;
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: brandingData.docs[0],
    });
})

const updateBrandingApp = asyncHandler(async (req, res, next) => {

  if (!req.params.themeId) {
    const error = new ApiError("themeId is missing", 400);
    return next(error);
  }

  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true }
    },
  })

  if(!isSelectedTheme.docs[0]){
    const error = new ApiError(`store not found with id: ${req.shop_id}`, 404)
    return next(error);
  }

  if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
    const error = new ApiError("Params is not matched with store themeId", 400)
    return next(error);
  }

  const isExistbrandingData = await Payload.find({
    collection: "branding",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
  });

  if (isExistbrandingData.docs.length === 0) {
    const error = new ApiError("No document found", 400);
    return next(error);
  }

  const brandingData = await Payload.update({
    collection: "branding",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    data: req.body,
  });

  return res.status(200).json({
    success: true,
    message: "BrandingData Update Successfully",
    data: brandingData,
  });
  
})


module.exports = { 
  getBrandingApp, 
  updateBrandingApp, 
  getBrandingAppWeb 
};
