const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getBrandingApp = asyncHandler(async (req, res, next) => {

  // if (!req.params.shopId) { // htana
  //   return next(
  //     new ApiError(
  //       "ShopId is missing",
  //        400
  //     )
  //   )
  // }

  // const store = await Payload.find({ // htana
  //   collection: 'Store',
  //   where: { 
  //     shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
  //     isActive : { equals: true }
  //   },
  //   limit:1,
  //   showHiddenFields: true,
  //   depth: req.query?.depth || 0
  // })

  // if(store.docs.length == 0){ // htana
  //   return next(
  //     new ApiError(
  //       `Shop not found with id: ${req.params.shopId}`,
  //        404
  //     )
  //   )
  // }


  const brandingData = await Payload.find({
    collection: "branding",
    where: {
      shopId: { equals: req.user.id },
      themeId: { equals: req.user.themeId }
    },
    limit:1,
    depth: req.query.depth || 1,
  });

  if (brandingData.docs.length === 0) {
    return next(
      new ApiError(
        `No data found with shopId: ${req.user.id}`,
         400
      )
    )
  }

  if(!brandingData.docs[0].app_title_logo){
    brandingData.docs[0].app_title_logo = null
  }

  brandingData.docs[0].themeId = brandingData.docs[0].themeId.id;

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: brandingData.docs[0],
  });
}) 

const getBrandingAppWeb = asyncHandler(async (req, res, next) => {

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
        id: { equals: req.shop_id},
        isActive: { equals: true}
      },
      limit:1,
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

    const brandingData = await Payload.find({
      collection: "branding",
      where: {
        shopId: { equals: req.shop_id },
        themeId: { equals: req.params.themeId },
      },
      limit: 1,
      depth: req.query.depth || 1
    });

    if (brandingData.docs.length === 0) {
      return next(
        new ApiError(
          "No Document found",
           400
        )
      )
    }

    if(!brandingData.docs[0].app_title_logo){
      brandingData.docs[0].app_title_logo = null
    }

    brandingData.docs[0].themeId = brandingData.docs[0].themeId.id;


    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: brandingData.docs[0],
    });
})

const updateBrandingApp = asyncHandler(async (req, res, next) => {

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
      id : { equals: req.shop_id  },
      isActive: { equals: true }
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

  const isExistbrandingData = await Payload.find({
    collection: "branding",
    where: {
      shopId: { equals: req.shop_id },
      themeId: { equals: req.params.themeId },
    },
    limit: 1,
    depth:0
  });

  if (isExistbrandingData.docs.length === 0) {
    return next(
      new ApiError(
        "No document found",
         400
      )
    )
  }

 try {
   const data = await Payload.update({
     collection: "branding",
     id: isExistbrandingData.docs[0].id,
     data: req.body,
   })

   if(!data){
    return res.status(500).json({
      success: false,
      message:"something went wrong while updating the branding"
    })
   }
 } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while updating the branding"
    })
 }

  return res.status(200).json({
    success: true,
    message: "BrandingData Update Successfully",
  });
})


module.exports = { 
  getBrandingApp, 
  updateBrandingApp, 
  getBrandingAppWeb 
};
