const Payload = require("payload");


const createHomePage = async (req, res, next) => {
  try {

    const { datas } = req.body;

    const isHomeDataPresent = await Payload.find({
      collection: 'homePage',
      where: { shopId: { equals: "gid://shopify/Shop/814473874894"} }
    })

    if (isHomeDataPresent.docs.length != 0) {
      return res.status(400).json({
        success: false,
        message: "Shop_id Already Exist"
      })
    }

    for (let index in datas) {

      if (datas[index].featureType === "banner") {
        const isVisible = datas[index]?.data?.some(val => val.isVisible === true)
        const banner = await Payload.create({
          collection: "banner",
          data: {
            data: datas[index].data
          }
        });

        datas[index].data = {
          relationTo: "banner",
          value: banner.id,
        }
        datas[index].isVisible = isVisible
        datas[index].displayOrder = Number(index) + 1
      }
      else if (datas[index].featureType === "announcement") {
        const announcementBar = await Payload.create({
          collection: "announcementBanner",
          data:  datas[index].data
        });

        datas[index].data = {
          relationTo: "announcementBanner",
          value: announcementBar.id,
        }
        datas[index].displayOrder = Number(index) + 1

      }
      else if (datas[index].featureType === "productGroup") {
        const product = await Payload.create({
          collection: "product",
          data:  datas[index].data,
        });

        datas[index].data = {
          relationTo: "product",
          value: product.id,
        }
        datas[index].displayOrder = Number(index) + 1
      }
      else if (datas[index].featureType === "categories") {
        const collection = await Payload.create({
          collection: "collection",
          data: {
            data:  datas[index].data,
          }
        });

        datas[index].data = {
          relationTo: "collection",
          value: collection.id,
        }
        datas[index].displayOrder = Number(index) + 1
      }
    }
    console.log("Check enter Upto" , datas)
    const homeData = await Payload.create({
      collection: "homePage",
      data: {
        shopId: req.shop_id || "gid://shopify/Shop/814473874884",
        homeData: datas
      },
    });

    console.log("Check Finish Upto")


    return res.status(201).json({
      success: true,
      data: homeData,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHomePage = async (req, res, next) => {
  try {

    if (!req.params.shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop_id is Missing"
      })
    }

    const homeData = await Payload.find({
      collection: 'homePage',
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` }, },
    })

    if (homeData.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data found with shopId: "+ req.params.shopId
      })
    }

    // Update the homeData.docs[0].homeData array
    homeData.docs[0].homeData = homeData.docs[0].homeData.map((value) => {
      if (value.featureType === "banner" || value.featureType === "categories") {
        return { ...value, data: value.data.value.data };
      } 
      else {
        return { ...value, data: [value.data.value] };
      }
    });

    return res.status(200).json({
      success: true,
      message: "Send Successfully",
      data: {
        ...homeData.docs[0],
        themeId:homeData.docs[0]?.themeId.id
      }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getHomePageByWeb = async (req , res , next)=>{
  try {

    if(!req.params.themeId){
      return res.status(400).json({
        success: false,
        message: "themeId is missing"
      })
    }

    const homeData = await Payload.find({
      collection: 'homePage',
      where: {
        shopId: { equals:req.shop_id || "gid://shopify/Shop/81447387454"},
        themeId: { equals: req.params.themeId}
      },
      depth: 2
    })

    if(homeData.docs.length === 0){
      return res.status(400).json({
        success: false,
        message: "No Document Found"
      })
    }

    // Update the homeData.docs[0].homeData array
    homeData.docs[0].homeData = homeData.docs[0].homeData.map((value) => {
      if (value.featureType === "banner" || value.featureType === "categories") {
        return { ...value, data: value.data.value };
      } 
      else {
        return { ...value, data: value.data.value };
      }
    });

    return res.status(200).json({
      success: true,
      message: "Send Successfully",
      data: {
        ...homeData.docs[0],
        themeId:homeData.docs[0].themeId?.id
      }
    })
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateHomePage = async (req, res, next) => {
  try {
    
    const { datas } = req.body;

    if (!req.params.themeId) {
      return res.status(400).json({
        success: false,
        message: "themeId is missing",
      });
    }

    console.log("Enter" , req.params.themeId )

    const isExistHomeData = await Payload.find({
      collection: "homePage",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
        themeId: { equals: req.params.themeId },
      },
    });

    console.log("Enter" , isExistHomeData )

    if (isExistHomeData.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Document Found",
      });
    }

    for (let index in datas) {

      if (datas[index].featureType === "banner") {

        const isVisible = datas[index]?.data?.data.some(
          (val) => val.isVisible === true
        );

        if (datas[index]?.data?.id) {

          const banner = await Payload.update({
            collection: "banner",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data?.data,
            },
          });

          datas[index].data = {
            relationTo: "banner",
            value: banner.id,
          };

          datas[index].isVisible = isVisible;
          console.log("banner")

        } 
        else {
          
          const banner = await Payload.create({
            collection: "banner",
            data: {
              data: datas[index].data?.data
            },
          });

          datas[index].data = {
            relationTo: "banner",
            value: banner.id,
          };

          datas[index].isVisible = isVisible;

        }
      } 
      else if (datas[index].featureType === "announcement") {

        if (datas[index]?.data?.id) {

          const announcementBar = await Payload.update({
            collection: "announcementBanner",
            id: datas[index]?.data?.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "announcementBanner",
            value: announcementBar.id,
          };

          console.log("announcementBar")
        } 
        else {

          const announcementBar = await Payload.create({
            collection: "announcementBanner",
            data: datas[index]?.data
          });

          datas[index].data = {
            relationTo: "announcementBanner",
            value: announcementBar.id,
          };

        }
      } 
      else if (datas[index].featureType === "productGroup") {

        if (datas[index]?.data?.id) {

          const product = await Payload.update({
            collection: "product",
            id: datas[index]?.data?.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "product",
            value: product.id,
          };

          console.log("productGroup")
        } 
        else {

          const product = await Payload.create({
            collection: "product",
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "product",
            value: product.id,
          };
        }
      } 
      else if (datas[index].featureType === "categories") {

        if (datas[index]?.data?.id) {

          const collection = await Payload.update({
            collection: "collection",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data?.data,
            },
          });

          datas[index].data = {
            relationTo: "collection",
            value: collection.id,
          };
          console.log("collection")
        } 
        else {

          const collection = await Payload.create({
            collection: "collection",
            data: {
              data: datas[index]?.data?.data,
            },
          });

          datas[index].data = {
            relationTo: "collection",
            value: collection.id,
          };
        }
      }
      else if (datas[index].featureType === "text_paragraph") {

        if (datas[index]?.data?.id) {

          const text_paragraph = await Payload.update({
            collection: "paragraph",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "paragraph",
            value: text_paragraph.id,
          };

          console.log("textParagraph")

        } 
        else {

          const text_paragraph = await Payload.create({
            collection: "paragraph",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "paragraph",
            value: text_paragraph.id,
          };

        }
      }
      else if (datas[index].featureType === "countdown") {

        if (datas[index]?.data?.id) {

          const eventTimer = await Payload.update({
            collection: "eventTimer",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "eventTimer",
            value: eventTimer.id,
          };

          console.log("eventTimer")


        } 
        else {

          const eventTimer = await Payload.create({
            collection: "eventTimer",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "eventTimer",
            value: eventTimer.id,
          };
        }
      }
      else if (datas[index].featureType === "social_channel") {

        if (datas[index]?.data?.id) {

          const social = await Payload.update({
            collection: "social",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "social",
            value: social.id,
          };
          console.log("social")


        } 
        else {

          const social = await Payload.create({
            collection: "social",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "social",
            value: social.id,
          };
        }
      }
      else if (datas[index].featureType === "video") {

        if (datas[index]?.data?.id) {

          const video = await Payload.update({
            collection: "video",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "video",
            value: video.id,
          };

          console.log("video")

        } 
        else {

          const video = await Payload.create({
            collection: "video",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "video",
            value: video.id,
          };
        }
      }
    }


    const homeData = await Payload.update({
      collection: "homePage",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
        themeId: { equals: req.params.themeId },
      },
      data: {
        homeData: datas,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Data Updated Successfully",
      data: homeData,
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {createHomePage , getHomePage , updateHomePage , getHomePageByWeb}













