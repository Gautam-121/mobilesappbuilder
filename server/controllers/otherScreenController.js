const Payload = require("payload")
const {otherScreen} = require("../data.js")
const ErrorHandler = require("../utils/errorHandler.js")

const createProductDetailPage = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      return next(new ErrorHandler("Please select all neccessary field", 400));
    }

    const productDetail = await Payload.create({
      collection: "productPageDetail",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      data: productDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const createCartDetailPage = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      return next(new ErrorHandler("Please select all neccessary field", 400));
    }

    const cartDetail = await Payload.create({
      collection: "emptyCartPageDetail",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      data: cartDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const createAccountDetailPage = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data) {
      return next(new ErrorHandler("Please select all neccessary field", 400));
    }

    const accountDetail = await Payload.create({
      collection: "accountPageDetail",
      data: {
        ...data,
        shopId: req.shop_id || "gid://shopify/Shop/81447387454",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Created Successfully",
      data: accountDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getOtherScreenPageDetailByWeb = async (req, res, next) => {
  try {
    const productDetail = await Payload.find({
      collection: "productPageDetail",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      },
    });

    const cartDetail = await Payload.find({
      collection: "emptyCartPageDetail",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      },
    });

    const accountDetail = await Payload.find({
      collection: "accountPageDetail",
      where: {
        shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: {
        productDetail:
          productDetail?.docs[0] || otherScreen?.data?.productDetail,
        cart: cartDetail?.docs[0] || otherScreen?.data?.cart,
        account: accountDetail?.docs[0] || otherScreen?.data?.account,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};


const getOtherScreen = async (req, res, next) => {
  try {
    const productDetail = await Payload.find({
      collection: "productPageDetail",
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
    });

    const cartDetail = await Payload.find({
      collection: "emptyCartPageDetail",
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
    });

    const accountDetail = await Payload.find({
      collection: "accountPageDetail",
      where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
    });

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: {
        productDetail:
          productDetail?.docs[0] || otherScreen?.data?.productDetail,
        cart: cartDetail?.docs[0] || otherScreen?.data?.cart,
        account: accountDetail?.docs[0] || otherScreen?.data?.account,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createProductDetailPage,
  createCartDetailPage,
  createAccountDetailPage,
  getOtherScreenPageDetailByWeb,
  getOtherScreen,
};