const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { validationResult } = require("express-validator");


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
      id: { equals: req.shop_id  },
      isActive: { equals: true}
    },
    limit:1,
    depth:0
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

  const tabData = await Payload.find({
    collection: "bottomMenuPannel",
    where: {
      shopId: { equals: req.shop_id  },
      themeId: { equals: req.params.themeId },
    },
    limit: 1,
    depth: req.query?.depth || 0,
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

  // if (!req.params.shopId) { // htana
  //   return next(
  //     new ApiError(
  //       "shopId is missing",
  //        400
  //     )
  //   )
  // }

  // const store = await Payload.find({ // htana
  //   collection: 'Store',
  //   where: { 
  //     shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
  //     isActive: { equals: true}
  //   },
  //   limit: 1,
  //   depth: 0
  // })

  // if(store.docs.length == 0){ // htana
  //   return next(
  //     new ApiError(
  //       `Shop not found with id: ${req.params.shopId}`,
  //        404
  //     )
  //   )
  // }

  const tabData = await Payload.find({ // htana
    collection: "bottomMenuPannel",
    where: { 
      shopId: { equals: req.user.id  },
      themeId: { equals: req.user.themeId }
    },
    limit:1,
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

  const errors = validationResult(req)
  const setting = req.body?.setting

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array({onlyFirstError: true})})
  }

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
        400
      )
    )
  }

  // if(!setting || !Array.isArray(setting) || setting.length < 3 || setting.length > 5){
  //   return next(
  //     new ApiError(
  //       "bottom navigation menu should be minimum 3 and max 5",
  //       400
  //     )
  //   )
  // }

  // setting.forEach((key)=>{
  //   if(!["home" , "search" , "cart" , "account" , "wishlist" , "categories" ].includes(key?.redirect_page)){
  //     return next(
  //       new ApiError(
  //         "home , search, cart, account, wishlist, categories this are enum value only it contain",
  //         400
  //       )
  //     )
  //   }
  // })

  // const redirectPageValues  = setting.map(item => item.redirect_page)
  // const duplicate = redirectPageValues.filter( (val , index) => redirectPageValues.indexOf(val) !== index)

  // if(duplicate.length > 0){
  //   return next(
  //     new ApiError(
  //       "redirect_page values must be unique",
  //       400
  //     )
  //   )
  // }

  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      id: { equals: req.shop_id },
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

  const isExistTabMenu = await Payload.find({
    collection: "bottomMenuPannel",
    where: {
      shopId: { equals: req.shop_id  },
      themeId: { equals: req.params.themeId },
    },
    limit:1,
    depth:0
  });

  if (isExistTabMenu.docs.length === 0) {
    return next(
      new ApiError(
        "No Document Found",
         400
      )
    )
  }

  try {

    const data = await Payload.update({
      collection: "bottomMenuPannel",
      id: isExistTabMenu.docs[0].id,
      data: {
        setting: setting,
      },
    })

    if(!data){
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating bottom tab menu"
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating bottom tab menu"
    })
  }

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