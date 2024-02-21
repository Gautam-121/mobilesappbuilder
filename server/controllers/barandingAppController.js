const Payload = require("payload");

const createBrandingApp = async (req, res, next) => {
  try {

    const data = req.body;

    const isBrandingDataExist = await Payload.find({
        collection: 'brandingTheme',
        where: {shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454",}},
      })
  
    if(isBrandingDataExist.docs.length!=0){
        return res.status(400).json({
          success: false,
          message: "Shop_id Already Exist"
        })
      }

    const brandingData = await Payload.create({
      collection: "brandingTheme",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454"
      },
    });

    return res.status(200).json({
        success: true,
        message: "Data Created Successfully",
        brandingData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBrandingApp = async (req, res, next) => {
    try {

        if(!req.params.shopId){
            return res.status(400).json({
                success: false,
                message: "Shop_id is missing"
            })
        }
    
        const brandingData = await Payload.find({
            collection: 'brandingTheme',
            where: {shopId: { equals: `gid://shopify/Shop/${req.params.shopId}`},},
            depth:req.query.depth || 0
        })

        if(brandingData.docs.length === 0){
            return res.status(400).json({
              success: false,
              message: "No data found with shopId: " + req.params.shopId
            })
          }
    
        return res.status(200).json({
            success: true,
            message: "Data Send Successfully",
            data: brandingData.docs[0]
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getBrandingAppWeb = async (req, res, next) => {
  try {

    if (!req.params.themeId) {
      return res.status(400).json({
        success: false,
        message: "themeId is missing",
      });
    }

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
        themeId: { equals: req.params.themeId },
      },
      depth:0
    });

    if (brandingData.docs.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Dcoument found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: brandingData.docs[0],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBrandingApp = async (req, res, next) => {
    try {
        if(!req.params.themeId){
            return res.status(400).json({
                success: false,
                message: "themeId is missing"
            })
        }

        const isExistbrandingData = await Payload.find({
          collection: 'brandingTheme',
          where: {
            shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
            themeId: { equals: req.params.themeId}
          },
      })

      if(isExistbrandingData.docs.length === 0){
          return res.status(400).json({
            success: false,
            message: "No Dcoument found"
          })
        }
    
        const brandingData = await Payload.update({
            collection: "brandingTheme",
            where: {
              shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
              themeId: { equals: req.params.themeId}
            },
            data: req.body,
        });
    
        return res.status(200).json({
            success: true,
            message: "BrandingData Update Successully",
            data: brandingData
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = { createBrandingApp, getBrandingApp, updateBrandingApp , getBrandingAppWeb };
