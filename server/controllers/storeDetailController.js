const Payload = require("payload");
const {shopifyApiData} = require("../utils/generalFunctions.js");
const ErrorHandler = require("../utils/errorHandler.js");


const updateStoreDetail = async (req, res, next) => {
  try {
    const data = req.body.themeId;

    if (!data) {
      return next(new ErrorHandler("Data is missing", 400));
    }

    let UserStoreData = await Payload.find({
      collection: "activeStores",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      },
    });

    if (
      UserStoreData?.docs[0]?.themeId &&
      UserStoreData?.docs[0]?.themeId === data
    ) {
      return res.status(200).json({
        success: true,
        message: "UserStoreData Update Successfully",
      });
    }

    if (UserStoreData?.docs[0]?.themeId) {
      const isDataByThemeExist = await Payload.find({
        collection: "brandingTheme",
        where: {
          shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
          themeId: { equals: data },
        },
      });

      if (isDataByThemeExist.docs[0]?.themeId) {
        UserStoreData = await Payload.update({
          collection: "activeStores",
          where: {
            shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
          },
          data: req.body,
        });

        return res.status(200).json({
          success: true,
          message: "UserStoreData Update Successfully",
        });
      }
    }

    const shop = req.query.shop || "renergii.myshopify.com";
    const shopifyGraphQLEndpoint = `https://${shop || "renergii.myshopify.com"}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
    query MyQuery {
      collections(first: 1) {
        nodes {
          id
          title
          image {
            height
            src
            url
          }
        }
      }
    }
  `;
    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          req.accessToken || "shpua_177ec0655453453b3619532c8a216b04",
      },
    };

    const fetchCollections = await shopifyApiData(
      shopifyGraphQLEndpoint,
      graphqlQuery,
      axiosShopifyConfig
    );

    const collections = fetchCollections?.data?.data?.collections?.nodes[0];

    const homeData = await Payload.find({
      collection: "homePage",
      where: {
        themeId: { equals: data },
        shopId: { equals: "Apprikart" },
      },
    });

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: {
        themeId: { equals: data },
        shopId: { equals: "Apprikart" },
      },
    });

    const tabMenuData = await Payload.find({
      collection: "tabMenuNav",
      where: {
        themeId: { equals: data },
        shopId: { equals: "Apprikart" },
      },
    });

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
        const product = await Payload.create({
          collection: "product",
          data: {
            ...val?.data?.value,
            productGroupId: collections?.id,
          },
        });

        val.data = {
          relationTo: "product",
          value: product.id,
        };
      } 
      else if (val.featureType === "categories") {
        const collection = await Payload.create({
          collection: "collection",
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
          relationTo: "collection",
          value: collection.id,
        };
      } 
      else if (val.featureType === "text_paragraph") {
        const text_paragraph = await Payload.create({
          collection: "paragraph",
          data: val?.data?.value,
        });

        val.data = {
          relationTo: "paragraph",
          value: text_paragraph.id,
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
        const social = await Payload.create({
          collection: "social",
          data: val?.data?.value,
        });

        val.data = {
          relationTo: "social",
          value: social.id,
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
      collection: "homePage",
      data: {
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: data,
        homeData: homeData?.docs[0].homeData,
      },
    });

    await Payload.create({
      collection: "tabMenuNav",
      data: {
        setting: tabMenuData.docs[0]?.setting,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: data,
      },
    });

    if (brandingData.app_title === "appText") {
      brandingData.app_title_text.app_name = UserStoreData?.docs[0]?.shopName;
    }

    await Payload.create({
      collection: "brandingTheme",
      data: {
        ...brandingData,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: data,
      },
    });

    UserStoreData = await Payload.update({
      collection: "activeStores",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      },
      data: req.body,
    });
    return res.status(200).json({
      success: true,
      message: "UserStoreData Update Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getStoreDetail = async(req,res,next)=>{
  try {

    if (!req.params.shopId) {
      return next(new ErrorHandler("shop_id is missing",400))
    }
  
    const store = await Payload.find({
      collection: 'activeStores',
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` }},
    })
  
    if (store.docs.length === 0) {
      return next(new ErrorHandler("No data found with shopId: "+ req.params.shopId , 400))
    }

  return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: store.docs[0]
  })
  
  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }
}

const getStoreDetailByWeb = async(req,res,next)=>{
  try {
  
    const store = await Payload.find({
      collection: 'activeStores',
      where: { shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" }},
    })
  
    if (store.docs.length === 0) {
      return next(new ErrorHandler("No data found with shopId: "+ req.params.shopId , 400))
    }

  return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: store.docs[0]
  })
  
  } catch (error) {
    return next(new ErrorHandler(error.message , 500))
  }
}


module.exports = {updateStoreDetail , getStoreDetail , getStoreDetailByWeb}