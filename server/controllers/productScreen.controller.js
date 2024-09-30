const Payload = require("payload")
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const {productDetailScreen} = require("../constant.js");
const { validationResult } = require("express-validator");

const updateProductScreenDetail = asyncHandler( async (req, res, next) => {

  const errors = validationResult(req)
  const data = req.body?.data;

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array({onlyFirstError: true})})
  }

  if(!data){
    return next(
      new ApiError(
        "Privide all required fields",
        400
      )
    )
  }

  // if (!req.params.themeId) {
  //   return next(
  //     new ApiError(
  //       "ThemeId is missing",
  //        400
  //     )
  //   )
  // }

  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      id: { equals: req.shop_id},
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

  // if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
  //   return next(
  //     new ApiError(
  //       "Params is not matched with store themeId",
  //       400
  //     )
  //   )
  // }

  const isProductDetailForThemeExist = await Payload.find({
    collection: "productDetailScreen",
    where: { 
      shopId: { equals: isSelectedTheme.docs[0].id },
    },
    limit: 1
  })

  if (isProductDetailForThemeExist.docs.length === 0) {

    try {
      
      const productDetail = await Payload.create({
        collection: "productDetailScreen",
        data:{
          shopId: isSelectedTheme.docs[0].id,
          ...data
        }
      })

      if(!productDetail){
        return next(
          new ApiError(
            "Something went wrong while updating product detail screen",
            500
          )
        )
      }

      return res.status(200).json({
        success: true,
        message: "Product detail updated successfully"
      })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Something went wrong while updating the product detail screen"
      })
    }
  }

  try {

    const productDetails = await Payload.update({
      collection: "productDetailScreen",
      id:isProductDetailForThemeExist.docs[0].id,
      data: data,
    })

    if(!productDetails){
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

  // if (!req.params.shopId) { //htana
  //   return next(
  //     new ApiError(
  //       "ShopId is Missing",
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

  const productDetail = await Payload.find({
    collection: "productDetailScreen",
    where: { 
      shopId: { equals: req.user.id  },
    },
    limit: 1,
    depth: req.query?.depth || 0
  });

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    productDetail: productDetail?.docs[0] || productDetailScreen
  })
})

const getProductScreenDetailByWeb = asyncHandler( async(req , res , next)=>{

  // if (!req.params.themeId) {
  //   return next(
  //     new ApiError(
  //       "ThemeId is missing",
  //        400
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

//  if(!isSelectedTheme.docs[0]?.themeId || isSelectedTheme.docs[0]?.themeId != req.params.themeId ){
//     return next(
//       new ApiError(
//         "Params is not matched with store themeId",
//          400
//       )
//     )
//  }

 const productDetail = await Payload.find({
  collection: "productDetailScreen",
  where: { 
    shopId: { equals: isSelectedTheme.docs[0].id },
  },
  limit: 1,
  depth: req.query?.depth || 0
});

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: productDetail.docs[0] || productDetailScreen,
  });

})


module.exports = {
  updateProductScreenDetail,
  getProductScreenDetails,
  getProductScreenDetailByWeb
};