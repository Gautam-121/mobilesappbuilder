const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");


const getTabMenuDataByWeb = asyncHandler( async (req, res, next) => {

  if (!req.params.themeId) {
    const error = new ApiError("themeId is missing", 400)
    return next(error);
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
    const error = new ApiError("No Document found", 400)
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: tabData.docs[0],
  });
})

const getTabMenu = asyncHandler( async (req, res, next) => {

  if (!req.params.shopId) {
    const error = new ApiError("shopId is missing", 400)
    return next(error);
  }

  const tabData = await Payload.find({
    collection: "tabMenuNav",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
    depth: 0,
  });

  if (tabData.docs.length === 0) {
    const error = new ApiError("No Dcoument found", 400)
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: tabData.docs[0],
  });
})

module.exports = {
  getTabMenuDataByWeb , 
  getTabMenu
}