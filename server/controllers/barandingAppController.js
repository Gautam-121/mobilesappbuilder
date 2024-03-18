const Payload = require("payload");
const ErrorHandler = require("../utils/errorHandler");

const getBrandingApp = async (req, res, next) => {
  try {
    if (!req.params.shopId) {
      return next(new ErrorHandler("Shop_id is missing", 400));
    }

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: {
        shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      },
      depth: req.query.depth || 1,
    });

    if (brandingData.docs.length === 0) {
      return next(
        new ErrorHandler("No data found with shopId: " + req.params.shopId, 400)
      );
    }

    brandingData.docs[0].themeId = brandingData.docs[0].themeId.id;

    if (brandingData.docs[0].app_title === "appText") {
      brandingData.docs[0].app_title_logo = null;
    } else {
      brandingData.docs[0].app_title_text = null;
      brandingData.docs[0].app_title_logo =
      brandingData.docs[0].app_title_logo.url;
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: brandingData.docs[0],
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getBrandingAppWeb = async (req, res, next) => {
  try {
    if (!req.params.themeId) {
      return next(new ErrorHandler("themeId is missing", 400));
    }

    const brandingData = await Payload.find({
      collection: "brandingTheme",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
      depth: 0,
    });

    if (brandingData.docs.length === 0) {
      return next(new ErrorHandler("No Dcoument found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: brandingData.docs[0],
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const updateBrandingApp = async (req, res, next) => {
  try {
    if (!req.params.themeId) {
      return next(new ErrorHandler("themeId is missing", 400));
    }

    const isExistbrandingData = await Payload.find({
      collection: "brandingTheme",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
    });

    if (isExistbrandingData.docs.length === 0) {
      return next(new ErrorHandler("No document found", 400));
    }

    const brandingData = await Payload.update({
      collection: "brandingTheme",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
        themeId: { equals: req.params.themeId },
      },
      data: req.body,
    });

    return res.status(200).json({
      success: true,
      message: "BrandingData Update Successully",
      data: brandingData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = { getBrandingApp, updateBrandingApp, getBrandingAppWeb };
