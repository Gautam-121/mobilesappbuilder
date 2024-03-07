const Payload = require("payload");
const {shopifyApiData} = require("../utils/generalFunctions.js")


const updateStoreDetail = async (req, res, next) => {
  try {

    const data = req.body.themeId;

    if (!data) {
      return res.status(200).json({
        success: false,
        message: "Data is missing",
      });
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
        "X-Shopify-Access-Token": req.accessToken || "shpua_177ec0655453453b3619532c8a216b04",
      },
    };

    const fetchCollections = await shopifyApiData(shopifyGraphQLEndpoint , graphqlQuery , axiosShopifyConfig)

    const collections = fetchCollections?.data?.data?.collections?.nodes[0];

    const homeData = await Payload.find({
      collection: "homePage",
      where: { 
        themeId: { equals: data },
        shopId: {equals: "Apprikart"}
      },
    });

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: { 
        themeId: { equals: data },
        shopId: { equals: "Apprikart" } 
      },
    });

    const tabMenuData = await Payload.find({
      collection: "tabMenuNav",
      where: { 
        themeId: { equals: data },
        shopId: {equals: "Apprikart"}
      },
    });

    for(val of homeData?.docs[0].homeData){
      if (val.featureType === "banner") {
        console.log("Enter in Banner")

        val?.data?.value?.data.forEach(element => {
          element.imageUrl = element.imageUrl.id
        });

        const banner = await Payload.create({
          collection: "banner",
          data: {
            data: val?.data?.value?.data
          }
        });

        val.data = {
          relationTo: "banner",
          value: banner.id,
        }

        console.log("banner" , val)
      }
      else if (val.featureType === "announcement") {
        console.log("Enter in announcement")
        const announcementBar = await Payload.create({
          collection: "announcementBanner",
          data: val?.data?.value
        });

        val.data = {
          relationTo: "announcementBanner",
          value: announcementBar.id,
        }
        console.log("announcementBanner" , val)
      }
      else if (val.featureType === "productGroup") {
        console.log("Enter in productGroup")
        const product = await Payload.create({
          collection: "product",
          data:{
            ...val?.data?.value,
            productGroupId:collections?.id
          }
        });

        val.data = {
          relationTo: "product",
          value: product.id,
        }

        console.log("product" , val)
      }
      else if (val.featureType === "categories") {
        console.log("Enter in categories")
        const collection = await Payload.create({
          collection: "collection",
          data: {
            data: [{
              title:collections?.title,
              imageUrl:collections?.image,
              collection_id:collections?.id
            }]
          }
        });

        val.data = {
          relationTo: "collection",
          value: collection.id,
        }
        console.log("collection" , val)
      }
      else if(val.featureType === "text_paragraph"){

        console.log("Enter in text_paragraph")
        const text_paragraph = await Payload.create({
          collection: "paragraph",
          data: val?.data?.value
        });

        val.data = {
          relationTo: "paragraph",
          value: text_paragraph.id,
        }

        console.log("text_paragrapg" , val)
      }
      else if(val.featureType === "countdown"){

        console.log("Enter in countdown")
        const eventTimer = await Payload.create({
          collection: "eventTimer",
          data: val?.data?.value
        });

        val.data = {
          relationTo: "eventTimer",
          value: eventTimer.id,
        }

        console.log("eventTimer" , val)
      }
      else if(val.featureType === "social_channel"){

        console.log("Enter in social_channel")
        const social = await Payload.create({
          collection: "social",
          data: val?.data?.value
        });

        val.data = {
          relationTo: "social",
          value: social.id,
        }

        console.log("social" , val)
      }
      else if(val.featureType === "video"){

        console.log("Enter in video")
        const video = await Payload.create({
          collection: "video",
          data: val?.data?.value
        });

        val.data = {
          relationTo: "video",
          value: video.id,
        }

        console.log("video" , val)
      }
    }

    console.log("Enter Inside the Page No 138", homeData?.docs[0])

    await Payload.create({
      collection: "homePage",
      data: {
        shopId: req.shop_id ||"gid://shopify/Shop/81447387454",
        themeId: data,
        homeData: homeData?.docs[0].homeData,
      },
    });

    console.log("Enter Inside the Page No 83" , tabMenuData)

    await Payload.create({
      collection: "tabMenuNav",
      data: {
        setting:tabMenuData.docs[0]?.setting,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: data,
      },
    });

    await Payload.create({
      collection: "brandingTheme",
      data: {
        ...brandingData,
        app_name : UserStoreData?.docs[0]?.shopName,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
        themeId: data,
      },
    });

    console.log("Enter Inside the Page No 93")

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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStoreDetail = async(req,res,next)=>{
  try {

    if (!req.params.shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop_id is Missing"
      })
    }
  
    const store = await Payload.find({
      collection: 'activeStores',
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` }},
    })
  
    if (store.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data found with shopId: "+ req.params.shopId
      })
    }

  return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: store.docs[0]
  })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getStoreDetailByWeb = async(req,res,next)=>{
  try {
  
    const store = await Payload.find({
      collection: 'activeStores',
      where: { shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" }},
    })
  
    if (store.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data found with shopId: "+ req.params.shopId
      })
    }

  return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: store.docs[0]
  })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


module.exports = {updateStoreDetail , getStoreDetail , getStoreDetailByWeb}