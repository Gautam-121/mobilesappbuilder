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
        return { ...value, data: value.data.value.data };
    })

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
      depth: 1
    })

    if(homeData.docs.length === 0){
      return res.status(400).json({
        success: false,
        message: "No Document Found"
      })
    }

    homeData.docs[0].homeData = homeData.docs[0].homeData.map((value) => {
      console.log("enter")
      if (value.featureType === "banner" || value.featureType === "categories") {
        return { ...value, data: value.data.value };
      } 
      else if (value.featureType === "announcement" ||value.featureType === "productGroup") {
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

    const isExistHomeData = await Payload.find({
      collection: "homePage",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
        themeId: { equals: req.params.themeId },
      },
    });

    if (isExistHomeData.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Document Found",
      });
    }

    for (let index in datas) {

      if (datas[index].featureType === "banner") {

        const isVisible = datas[index]?.data?.some(
          (val) => val.isVisible === true
        );

        if (datas[index]?.data?.id) {

          const banner = await Payload.update({
            collection: "banner",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "banner",
            value: banner.id,
          };

          datas[index].isVisible = isVisible;
          datas[index].dispalyOrder = Number(index) + 1;
        } 
        else {
          
          const banner = await Payload.create({
            collection: "banner",
            data: {
              data: datas[index].data,
            },
          });

          datas[index].data = {
            relationTo: "banner",
            value: banner.id,
          };

          datas[index].isVisible = isVisible;
          datas[index].dispalyOrder = Number(index) + 1;
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

          datas[index].dispalyOrder = Number(index) + 1;

        } 
        else {

          const announcementBar = await Payload.create({
            collection: "announcementBanner",
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "announcementBanner",
            value: announcementBar.id,
          };

          datas[index].dispalyOrder = Number(index) + 1;
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

          datas[index].dispalyOrder = Number(index) + 1;
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

          datas[index].dispalyOrder = Number(index) + 1;
        }
      } 
      else if (datas[index].featureType === "categories") {

        if (datas[index]?.data?.id) {

          const collection = await Payload.update({
            collection: "collection",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "collection",
            value: collection.id,
          };

          datas[index].dispalyOrder = Number(index) + 1;

        } 
        else {

          const collection = await Payload.create({
            collection: "collection",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "collection",
            value: collection.id,
          };

          datas[index].dispalyOrder = Number(index) + 1;

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













