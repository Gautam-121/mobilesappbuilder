const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");


const getTabMenuDataByWeb = asyncHandler( async (req, res, next) => {

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

  const tabData = await Payload.find({
    collection: "bottomMenuPannel",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    depth: 0,
  });

  if (tabData.docs.length === 0) {
    return next(
      new ApiError(
        "No Document found",
         404
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: tabData.docs[0],
  });
})

const getTabMenu = asyncHandler( async (req, res, next) => {

  if (!req.params.shopId) {
    return next(
      new ApiError(
        "shopId is missing",
         400
      )
    )
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive: { equals: true}
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

  const tabData = await Payload.find({
    collection: "bottomMenuPannel",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
    depth: 0,
  });

  if (tabData.docs.length === 0) {
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
    data: tabData.docs[0],
  });
})

const updateTabMenu = asyncHandler( async(req , res , next) => {

  const setting = req.body?.setting

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
        400
      )
    )
  }

  if(!setting || !Array.isArray(setting) || setting.length < 3 || setting.length > 5){
    return next(
      new ApiError(
        "bottom navigation menu should be minimum 3 and max 5",
        400
      )
    )
  }

  setting.forEach((key)=>{
    if(!["home" , "search" , "cart" , "account" , "wishlist" , "categories" ].includes(key?.redirect_page)){
      return next(
        new ApiError(
          "home , search, cart, account, wishlist, categories this are enum value only it contain",
          400
        )
      )
    }
  })

  
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

  const isExistTabMenu = await Payload.find({
    collection: "bottomMenuPannel",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
  });

  if (isExistTabMenu.docs.length === 0) {
    return next(
      new ApiError(
        "No Document Found",
         400
      )
    )
  }

  await Payload.update({
    collection: "bottomMenuPannel",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    data: {
      setting: setting,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Data Updated Successfully",
  });

  
})

module.exports = {
  getTabMenuDataByWeb , 
  getTabMenu,
  updateTabMenu
}