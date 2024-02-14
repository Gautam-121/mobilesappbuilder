const Payload = require("payload");


const getTabMenuDataByWeb = async(req , res , next)=>{
    try {

        if (!req.params.themeId) {
          return res.status(400).json({
            success: false,
            message: "themeId is missing",
          });
        }
    
        const tabData = await Payload.find({
          collection: "tabMenuNav",
          where: {
            shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454"},
            themeId: { equals: req.params.themeId },
          },
          depth:0
        });
    
        if (tabData.docs.length === 0) {
          return res.status(400).json({
            success: false,
            message: "No Dcoument found",
          });
        }
    
        return res.status(200).json({
          success: true,
          message: "Data Send Successfully",
          data: tabData.docs[0],
        });
    
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
}


const getTabMenu = async(req , res , next)=>{
  try {

      if (!req.params.shopId) {
        return res.status(400).json({
          success: false,
          message: "shopId is missing",
        });
      }

      const tabData = await Payload.find({
        collection: "tabMenuNav",
        where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}`} },
        depth:0
      });
  
      if (tabData.docs.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No Dcoument found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Data Send Successfully",
        data: tabData.docs[0],
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}


module.exports = {getTabMenuDataByWeb , getTabMenu}