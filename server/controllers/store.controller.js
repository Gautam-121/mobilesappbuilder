const Payload = require("payload");
const {
  shopifyApiData,
  axiosShopifyConfig,
  shopifyGraphQLEndpoint
} = require("../utils/shopifyBuildFun.js");
const {
  graphqlQueryForFirstCollection,
} = require("../constant.js") 
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const {
  isValidFacebookUrl,
  isValidInstagramUrl,
  isValidTwitterUrl,
  isValidWhatsAppUrl,
  isValidYoutubeUrl
} = require("../utils/validator.js")

const updateStoreAppDesignDetail = asyncHandler(  async (req, res, next) => {
  
  const {themeId} = req.body

  if (!themeId) {
    return next(
      new ApiError(
        "ThemeId is missing",
        400
      )
    )
  }

  let UserStoreData = await Payload.find({
    collection: "Store",
    where: {
      shopId: { equals: req.shop_id },
      isActive: { equals : true }
    },
    depth: req.query?.depth || 0
  });

  if(!UserStoreData?.docs[0]){
    return next(
      new ApiError(
        "Store not found",
        404
      )
    )
  }

  if (
    UserStoreData?.docs[0]?.themeId &&
    UserStoreData?.docs[0]?.themeId === themeId
  ) {
    return res.status(200).json({
      success: true,
      message: "UserStoreData Update Successfully",
    });
  }

  if (UserStoreData?.docs[0]?.themeId) {
    const isDataByThemeExist = await Payload.find({
      collection: "branding",
      where: {
        shopId: { equals: req.shop_id  },
        themeId: { equals: themeId },
      },
      depth: req.query?.depth || 0
    });

    if (isDataByThemeExist.docs[0]?.themeId) {
      UserStoreData = await Payload.update({
        collection: "Store",
        where: {
          shopId: { equals: req.shop_id },
        },
        data: {
          themeId: themeId
        },
      });

      return res.status(200).json({
        success: true,
        message: "UserStoreData Update Successfully",
      });
    }
  }

  const shop = UserStoreData.docs[0].shopify_domain;

  const fetchCollections = await shopifyApiData(
    shopifyGraphQLEndpoint(shop),
    graphqlQueryForFirstCollection,
    axiosShopifyConfig(req.accessToken)
  );

  const collections = fetchCollections?.data?.data?.collections?.nodes[0];

  const homeData = await Payload.find({
    collection: "homeScreen",
    where: {
      themeId: { equals: themeId },
      shopId: { equals: "Apprikart" },
    },
  });

  const brandingData = await Payload.find({
    collection: "branding",
    where: {
      themeId: { equals: themeId },
      shopId: { equals: "Apprikart" },
    },
  });

  const tabMenuData = await Payload.find({
    collection: "bottomMenuPannel",
    where: {
      themeId: { equals: themeId },
      shopId: { equals: "Apprikart" },
    },
  });

  const accountData = await Payload.find({
    collection: "accountScreen",
    where:{
      themeId: { equals: themeId},
      shopId: { equals: "Apprikart"}
    }
  })

  const productData = await Payload.find({
    collection: "productDetailScreen",
    where:{
      themeId: { equals: themeId},
      shopId: { equals: "Apprikart"}
    }
  })

  for (val of homeData?.docs[0].homeData) {

    if (val.featureType === "banner") {
      val?.data?.value?.data.forEach((element) => {
        element.imageUrl = element.imageUrl.id;
      });

      const banner = await Payload.create({
        collection: "banner",
        data: {
          data: val?.data?.value?.data,
        },
      });

      val.data = {
        relationTo: "banner",
        value: banner.id,
      };
    } 
    else if (val.featureType === "announcement") {
      const announcementBar = await Payload.create({
        collection: "announcementBanner",
        data: val?.data?.value,
      });

      val.data = {
        relationTo: "announcementBanner",
        value: announcementBar.id,
      };
    } 
    else if (val.featureType === "productGroup") {
      const productGroup = await Payload.create({
        collection: "productGroup",
        data: {
          ...val?.data?.value,
          productGroupId: collections?.id,
        },
      });

      val.data = {
        relationTo: "productGroup",
        value: productGroup.id,
      };
    } 
    else if (val.featureType === "categories") {
      const categories = await Payload.create({
        collection: "categories",
        data: {
          data: [
            {
              title: collections?.title,
              imageUrl: collections?.image,
              collection_id: collections?.id,
            },
          ],
        },
      });

      val.data = {
        relationTo: "categories",
        value: categories.id,
      };
    } 
    else if (val.featureType === "text_paragraph") {
      const textParagraph = await Payload.create({
        collection: "textParagraph",
        data: val?.data?.value,
      });

      val.data = {
        relationTo: "textParagraph",
        value: textParagraph.id,
      };
    } 
    else if (val.featureType === "countdown") {
      const eventTimer = await Payload.create({
        collection: "eventTimer",
        data: val?.data?.value,
      });

      val.data = {
        relationTo: "eventTimer",
        value: eventTimer.id,
      };
    } 
    else if (val.featureType === "social_channel") {
      const socialMedia = await Payload.create({
        collection: "socialMedia",
        data: val?.data?.value,
      });

      val.data = {
        relationTo: "socialMedia",
        value: socialMedia.id,
      };
    } 
    else if (val.featureType === "video") {
      const video = await Payload.create({
        collection: "video",
        data: val?.data?.value,
      });

      val.data = {
        relationTo: "video",
        value: video.id,
      };
    }
  }

  await Payload.create({
    collection: "homeScreen",
    data: {
      shopId: req.shop_id,
      themeId: themeId,
      homeData: homeData?.docs[0].homeData,
    },
  });

  await Payload.create({
    collection: "bottomMenuPannel",
    data: {
      setting: tabMenuData.docs[0]?.setting,
      shopId: req.shop_id,
      themeId: themeId,
    },
  });

  await Payload.create({
    collection: "accountScreen",
    data: {
      main_section: accountData.docs[0]?.main_section,
      footer_section: accountData.docs[0]?.footer_section,
      shopId: req.shop_id,
      themeId: themeId,
    },
  });


  brandingData.docs[0].app_title_text.app_name = UserStoreData?.docs[0]?.shopName;

  if(brandingData.docs[0]?.app_title_logo && brandingData.docs[0]?.app_title_logo?.id){
    brandingData.docs[0].app_title_logo  = brandingData.docs[0]?.app_title_logo?.id
  }

  await Payload.create({
    collection: "branding",
    data: {
      ...brandingData.docs[0],
      shopId: req.shop_id ,
      themeId: themeId,
    },
  });

  await Payload.create({
    collection: "productDetailScreen",
    data: {
      actions: productData.docs[0]?.actions,
      faster_checkout: productData.docs[0]?.faster_checkout,
      shopId: req.shop_id,
      themeId: themeId,
    },
  });

  UserStoreData = await Payload.update({
    collection: "Store",
    where: {
      shopId: { equals: req.shop_id },
    },
    data: req.body,
  });

  return res.status(200).json({
    success: true,
    message: "UserStoreData Update Successfully",
  });

})

const getStoreDetail = asyncHandler( async(req,res,next)=> {

  if (!req.params.shopId) {
    return next(
      new ApiError(
        "shopId is missing",
        400
      )
    )
  }

  const store = await Payload.find({
    collection: "Store",
    where: { 
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive: { equals: true }
    },
    depth: req.query?.depth || 0
  });

  if (store.docs.length === 0) {
    return next(
      new ApiError(
        "store not found with id: "+ req.params.shopId,
        400
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "shop Details send successfully",
    data: store.docs[0]
  })
})

const getStoreDetailByWeb = asyncHandler( async(req,res,next)=>{
   
  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id },
      isActive: { equals : true }
    },
    depth: req.query?.depth || 0
  })

  if (store.docs.length === 0) {
    return next(
      new ApiError(
        "store not found with id: "+ req.params.shopId ,
        400
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: store.docs[0]
  })

})

const updateSocialMediaOfStore = asyncHandler( async(req,res,next)=>{
   
  const socialMedia = req.body?.socialMedia

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id },
      isActive: { equals: true}
    },
  })

  if(!store.docs[0]){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

  if(!socialMedia || !Array.isArray(socialMedia) || socialMedia.length == 0){
    return next(
      new ApiError(
        "Please Provide all mandatory fields",
        400
      )
    )
  }

  socialMedia.forEach(policy => {

    const { title, profileUrl } = policy;

    if (!title || !profileUrl) {
      return next(
        new ApiError(
          "missing required field title and profileUrl",
           400
        )
      )
    }
  })

  if(socialMedia.some(account => !(["instagram","facebook","twitter","youTube","whatsApp"].includes(account?.title)))){
    return next(
      new ApiError(
        "title should be only instagram facebook twitter youTube whatsApp",
        400
      )
    )
  }

  socialMedia.forEach(account=>{
    if(account.title == "instagram" && !isValidInstagramUrl(account.profileUrl)){
      return next(
        new ApiError(
          "Invalid instagram Url",
          400
        )
      )
    }
    if(account.title == "facebook" && !isValidFacebookUrl(account.profileUrl)){
      return next(
        new ApiError(
          "Invalid facebook Url",
          400
        )
      )
    }
    if(account.title == "twitter" && !isValidTwitterUrl(account.profileUrl)){
      return next(
        new ApiError(
          "Invalid twitter Url",
          400
        )
      )
    }
    if(account.title == "youTube" && !isValidYoutubeUrl(account.profileUrl)){
      return next(
        new ApiError(
          "Invalid youTube Url",
          400
        )
      )
    }
    if(account.title == "whatsApp" && !isValidWhatsAppUrl(account.profileUrl)){
      return next(
        new ApiError(
          "Invalid whatsApp Url",
          400
        )
      )
    }
  })

   await Payload.update({
    collection: "Store",
    where: {
      shopId: { equals: req.shop_id },
    },
    data:{
      socialMediaAccount: socialMedia
    },
  });

  return res.status(200).json({
    success: true,
    message:"Data Updated Successfully"
  })
})

module.exports = {
  updateStoreAppDesignDetail, 
  getStoreDetail , 
  getStoreDetailByWeb,
  updateSocialMediaOfStore,
}