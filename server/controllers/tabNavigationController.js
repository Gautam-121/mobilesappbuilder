const Payload = require("payload");
const ErrorHandler = require("../utils/errorHandler");


const getTabMenuDataByWeb = async (req, res, next) => {
  try {
    if (!req.params.themeId) {
      return next(new ErrorHandler("themeId is missing", 400));
    }

    const tabData = await Payload.find({
      collection: "tabMenuNav",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
      depth: 0,
    });

    if (tabData.docs.length === 0) {
      return next(new ErrorHandler("No Document found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: tabData.docs[0],
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getTabMenu = async (req, res, next) => {
  try {
    if (!req.params.shopId) {
      return next(new ErrorHandler("shopId is missing", 400));
    }

    const tabData = await Payload.find({
      collection: "tabMenuNav",
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
      depth: 0,
    });

    if (tabData.docs.length === 0) {
      return next(new ErrorHandler("No Dcoument found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: tabData.docs[0],
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};


module.exports = {getTabMenuDataByWeb , getTabMenu}