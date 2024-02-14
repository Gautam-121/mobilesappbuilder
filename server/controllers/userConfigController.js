const Payload = require("payload");
const {shopifyApiData} = require("../utils/generalFunctions.js")


const updateUserThemeDetail = async (req, res, next) => {
  try {

    console.log("Enter Inside the Page")
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

      console.log(isDataByThemeExist)

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

    console.log("Enter Inside the Page No 57")

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
        "X-Shopify-Access-Token": req.accessToken || "shpua_761d3e29150e5c4321daa39c9f3627c3",
      },
    };

    const fetchCollections = await shopifyApiData(shopifyGraphQLEndpoint , graphqlQuery , axiosShopifyConfig)

    const collections = fetchCollections?.data?.data?.collections?.nodes[0];

    console.log(collections)

    const homeData = await Payload.find({
      collection: "homePage",
      where: { themeId: { equals: data } },
    });

    // return res.status(200).json({
    //     success: false,
    //     data: homeData?.docs[0]
    // })

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: { themeId: { equals: data } },
    });

    const tabMenuData = await Payload.find({
      collection: "tabMenuNav",
      where: { themeId: { equals: data } },
    });

    console.log("Enter Inside the Page No 72")

    for(val of homeData?.docs[0].homeData){
      if (val.featureType === "banner") {
        console.log("Enter in Banner")
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
    }

    console.log("Enter Inside the Page No 138", homeData?.docs[0])

    // return res.status(200).json({
    //     success: false,
    //     data: homeData?.docs[0]
    // })

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


module.exports = {updateUserThemeDetail}