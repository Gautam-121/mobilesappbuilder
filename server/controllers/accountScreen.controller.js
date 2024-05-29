const Payload = require("payload")
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const {accountScreenDetail} = require("../constant.js")

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

  if(store.docs.length == 0){
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
      shopId: { equals: store.docs[0].id },
    },
    depth: req.query.depth || 1,
    limit:1
  });

  if(accountScreenData.docs.length > 0){
    accountScreenData.docs[0].shopId = accountScreenData.docs[0].shopId.shopId
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: accountScreenData?.docs[0] || accountScreenDetail
  })
})

const getAccountScreenForWeb = asyncHandler( async(req , res , next)=> {

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

  const accountScreenData = await Payload.find({
    collection: "accountScreen",
    where: { 
      shopId: { equals: isSelectedTheme.docs[0].id },
    },
    limit: 1,
    depth: req.query?.depth || 1
  });

  if(accountScreenData.docs.length > 0){
    accountScreenData.docs[0].shopId = accountScreenData.docs[0].shopId.shopId
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: accountScreenData?.docs[0] || accountScreenDetail
  })
})

const updateAccountScreen = asyncHandler( async(req , res , next)=> {

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
        shopId: { equals: req.shop_id },
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

   const { main_section , footer_section } = req.body

   if(!main_section || !Array.isArray(main_section)){
     return next(
       new ApiError(
         "main-sectin should be array ",
         400
       )
     )
   }

   if(main_section.length == 0){
     return next(
       new ApiError(
         "main-section should not be empty",
          400
       )
     )
   }

   if(!footer_section || Object?.values(footer_section)?.length == 0){
     return next(
       new ApiError(
         "footer_section should not be empty",
         400
       )
     )
   }

   if(footer_section.socialLinks){
    if(isSelectedTheme.docs[0].socialMediaAccount.length  == 0){
      return next(
        new ApiError(
          "Please Provide Social links",
          400
        )
      )
    }
   }

   const selectedCount = main_section.filter(item => item.isVisible)

   if(selectedCount.length<3){
     return next(
       new ApiError(
         "At least 3 field should select to main-portion"
       )
     )
   }

   main_section.forEach((item)=>{
    if(!["profile","orders","wishlist","shipping_address","aboutUs"].includes(item?.type)){
      return next(
        new ApiError(
          "profile, orders, wishlist,shipping_address,aboutUs this are enum value only it contain",
          400
        )
      )
    }
  })

  const redirectPageValues  = main_section.map(item => item.type)
  const duplicate = redirectPageValues.filter( (val , index) => redirectPageValues.indexOf(val) !== index)

  if(duplicate.length > 0){
    return next(
      new ApiError(
        "type values must be unique",
        400
      )
    )
  }

   if(main_section.some(item=> (item.type == "aboutUs" && item.isVisible))){

     const isAboutUsDataExist = await Payload.find({
       collection: "aboutUsSection",
       where: { 
         shopId: { equals: isSelectedTheme.docs[0].id },
       },
       limit: 1,
       depth: req.query?.depth || 0
     });

     if(isAboutUsDataExist.docs.length == 0){
       return next(
         new ApiError(
           "Please send the AboutUs Data"
         )
       )
     }
   }

    const isExistAccountScreen = await Payload.find({
      collection: "accountScreen",
      where: { 
        shopId: { equals: isSelectedTheme.docs[0].id },
      },
      limit: 1,
      depth: req.query?.depth || 0
    });
  
    if (isExistAccountScreen.docs.length === 0) {

      try {
        
        const accountData = await Payload.create({
          collection: "accountScreen",
          data:{
            shopId: isSelectedTheme.docs[0].id,
            main_section: main_section,
            footer_section: footer_section
          }
        })

        if(!accountData){
          return next(
            new ApiError(
              "Something went wrong while creating account screen",
               500
            )
          )
        }

        return res.status(200).json({
          success: true,
          message: "Accout Screen Update Successfully"
        })

      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message || "something went wrong while updating the account screen"
        })
      }
      
    }

    try {

      const data = await Payload.update({
        collection: "accountScreen",
        id: isExistAccountScreen.docs[0].id,
        data: {
          main_section: main_section,
          footer_section: footer_section
        },
      })

      if(!data){
        return res.status(500).json({
          success: false,
          message:"something went wrong while updating the accountScreen"
        })
       }

       return res.status(200).json({
        success: true,
        message: "Accout Screen Update Successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "something went wrong while updating the account screen"
      })
    }
})

const createAboutUs = asyncHandler( async(req , res , next)=>{

  const { image , description } = req.body
  
  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id },
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

 if(!image || !description){
  return next(
    new ApiError(
      "Please provide all mandatory field",
       400
    )
  )
 }

  const accountScreenData = await Payload.find({
    collection: "aboutUsSection",
    where: { 
      shopId: { equals: isSelectedTheme.docs[0].id },
    },
    limit: 1,
    depth: req.query?.depth || 0
  });

  if(accountScreenData.docs.length > 0){
    return next(
      new ApiError(
        "About Us is already exist of shop",
         409
      )
    )
  }

  const aboutUs = await Payload.create({
    collection: "aboutUsSection",
    data:{
      shopId: isSelectedTheme.docs[0].id,
      image: image,
      description: description
    },
    depth: 1
  })

  if(!aboutUs){
    return next(
      new ApiError(
        "Something went wrong while creating about us details",
        500
      )
    )
  }

  aboutUs.shopId = aboutUs.shopId.shopId

  return res.status(200).json({
    success: true,
    message: "Data created Successfully",
    data: aboutUs
  })
})

const getAboutUsByWeb = asyncHandler( async(req , res , next)=>{
  
  const isSelectedTheme = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id },
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

  const aboutUs = await Payload.find({
    collection: "aboutUsSection",
    where: { 
      shopId: { equals: isSelectedTheme.docs[0].id },
    },
    limit: 1,
    depth: req.query?.depth || 1
  });

  if(aboutUs.docs.length == 0){
    return next(
      new ApiError(
        "No data found",
        404
      )
    )
  }

  if(aboutUs.docs.length > 0){
    aboutUs.docs[0].shopId = aboutUs.docs[0].shopId.shopId
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: aboutUs.docs[0]
  })
})

const getAboutUs = asyncHandler( async(req , res , next)=> {

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

  if(store.docs.length == 0){
    return next(
      new ApiError(
        `Shop not found with id: ${req.params.shopId}`,
         404
      )
    )
  }

  const aboutUs = await Payload.find({
    collection: "aboutUsSection",
    where: { 
      shopId: { equals: store.docs[0].id },
    },
    depth: req.query.depth || 1,
    limit:1
  });

  if(aboutUs.docs.length == 0){
    return next(
      new ApiError(
        "Data not found",
        404
      )
    )
  }

  if(aboutUs.docs.length > 0){
    aboutUs.docs[0].shopId = aboutUs.docs[0].shopId.shopId
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: aboutUs?.docs[0]
  })
})

const updateAboutUs = asyncHandler( async(req , res , next)=>{

  const { image , description } = req.body
  
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

 if(!image && !description){
  return next(
    new ApiError(
      "Please provide at field for update",
       400
    )
  )
 }

  const aboutUsData = await Payload.find({
    collection: "aboutUsSection",
    where: { 
      shopId: { equals: isSelectedTheme.docs[0].id },
    },
    limit: 1,
    depth: req.query?.depth || 0
  });

  if(aboutUsData.docs.length == 0){
    return next(
      new ApiError(
        "No data found",
        409
      )
    )
  }

  try {

    const aboutUs = await Payload.update({
      collection: "aboutUsSection",
      id:aboutUsData.docs[0].id,
      data:req.body
    })

    if(!aboutUs){
      return next(
        new ApiError(
          "Something went wrong while updating about us",
           500
        )
      )
    }

    return res.status(200).json({
      success: true,
      message: "data update successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while updating the account screen"
    })
  }
})


module.exports = {
  getAccountScreenForWeb,
  getAccountScreen,
  updateAccountScreen,
  createAboutUs,
  getAboutUs,
  getAboutUsByWeb,
  updateAboutUs
};