const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getHomePage = asyncHandler(async (req, res, next) => {
  if (!req.params.shopId) {
    return next(new ApiError("ShopId is missing", 400));
  }

  const store = await Payload.find({
    collection: "Store",
    where: {
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      isActive: { equals: true },
    },
  });

  if (!store.docs[0]) {
    return next(
      new ApiError(`Shop not found with id: ${req.params.shopId}`, 404)
    );
  }

  const homeData = await Payload.find({
    collection: "homeScreen",
    where: {
      shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` },
      themeId: { equals: store.docs[0]?.themeId },
    },
  });

  if (homeData.docs.length === 0) {
    return next(
      new ApiError(`No data found with shopId: ${req.params.shopId}`, 400)
    );
  }

  // Update the homeData.docs[0].homeData array
  homeData.docs[0].homeData = homeData.docs[0].homeData.map((value) => {
    if (value.featureType === "banner" || value.featureType === "categories") {
      return { ...value, data: value.data.value.data };
    } else {
      return { ...value, data: [value.data.value] };
    }
  });

  return res.status(200).json({
    success: true,
    message: "Send Successfully",
    data: {
      ...homeData.docs[0],
      themeId: homeData.docs[0]?.themeId.id,
    },
  });
});

const getHomePageByWeb = asyncHandler(async (req, res, next) => {

  if (!req.params.themeId) {
    return next(new ApiError("themeId is missing", 400));
  }

  const isSelectedTheme = await Payload.find({
    collection: "Store",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true },
    },
    depth: req.query?.depth || 0
  });

  if (!isSelectedTheme.docs[0]) {
    return next(new ApiError(`store not found with id: ${req.shop_id}`, 404));
  }

  if (
    !isSelectedTheme.docs[0]?.themeId ||
    isSelectedTheme.docs[0]?.themeId != req.params.themeId
  ) {
    return next(new ApiError("Params is not matched with store themeId", 400));
  }

  const homeData = await Payload.find({
    collection: "homeScreen",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    depth: 2,
  });

  if (homeData.docs.length === 0) {
    return next(new ApiError("No Document Found", 400));
  }

  // Update the homeData.docs[0].homeData array
  homeData.docs[0].homeData = homeData.docs[0].homeData.map((value) => {
    if (value.featureType === "banner" || value.featureType === "categories") {
      return { ...value, data: value.data.value };
    } else {
      return { ...value, data: value.data.value };
    }
  });

  return res.status(200).json({
    success: true,
    message: "Send Successfully",
    data: {
      ...homeData.docs[0],
      themeId: homeData.docs[0].themeId?.id,
    },
  });
});

const updateHomePage = asyncHandler(async (req, res, next) => {

  const { datas } = req.body;

  console.log("datas from line 149", datas);

  if (!req.params.themeId) {
    return next(new ApiError("ThemeId is missing"));
  }

  const isSelectedTheme = await Payload.find({
    collection: "Store",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals: true },
    },
    depth: req.query?.depth || 0 
  });

  if (!isSelectedTheme.docs[0]) {
    return next(new ApiError(`store not found with id: ${req.shop_id}`, 404));
  }

  if (
    !isSelectedTheme.docs[0]?.themeId ||
    isSelectedTheme.docs[0]?.themeId != req.params.themeId
  ) {
    return next(new ApiError("Params is not matched with store themeId", 400));
  }

  const isExistHomeData = await Payload.find({
    collection: "homeScreen",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
  });

  if (isExistHomeData.docs.length === 0) {
    return next(new ApiError("No Document Found", 400));
  }

  try {
    for (let index in datas) {
      if (datas[index].featureType === "banner") {
        const isVisible = datas[index]?.data?.data.some(
          (val) => val.isVisible === true
        );

        console.log(datas[index]?.data?.data)

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
        } else {
          console.log(datas[index].data?.data);
          const banner = await Payload.create({
            collection: "banner",
            data: {
              data: datas[index].data?.data,
            },
          });

          datas[index].data = {
            relationTo: "banner",
            value: banner.id,
          };

          datas[index].isVisible = isVisible;
        }
      } else if (datas[index].featureType === "announcement") {
        if (datas[index]?.data?.id) {
          const announcementBar = await Payload.update({
            collection: "announcementBanner",
            id: datas[index]?.data?.id,
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "announcementBanner",
            value: announcementBar.id,
          };
        } else {
          const announcementBar = await Payload.create({
            collection: "announcementBanner",
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "announcementBanner",
            value: announcementBar.id,
          };
        }
      } else if (datas[index].featureType === "productGroup") {
        if (datas[index]?.data?.id) {
          const productGroup = await Payload.update({
            collection: "productGroup",
            id: datas[index]?.data?.id,
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "productGroup",
            value: productGroup.id,
          };
        } else {
          const productGroup = await Payload.create({
            collection: "productGroup",
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "productGroup",
            value: productGroup.id,
          };
        }
      } else if (datas[index].featureType === "categories") {
        if (datas[index]?.data?.id) {
          const categories = await Payload.update({
            collection: "categories",
            id: datas[index].data.id,
            data: {
              data: datas[index]?.data?.data,
            },
          });

          datas[index].data = {
            relationTo: "categories",
            value: categories.id,
          };
        } else {
          const categories = await Payload.create({
            collection: "categories",
            data: {
              data: datas[index]?.data?.data,
            },
          });

          datas[index].data = {
            relationTo: "categories",
            value: categories.id,
          };
        }
      } else if (datas[index].featureType === "text_paragraph") {
        if (datas[index]?.data?.id) {
          const textParagraph = await Payload.update({
            collection: "textParagraph",
            id: datas[index].data.id,
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "textParagraph",
            value: textParagraph.id,
          };
        } else {
          const textParagraph = await Payload.create({
            collection: "textParagraph",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "textParagraph",
            value: textParagraph.id,
          };
        }
      } else if (datas[index].featureType === "countdown") {
        if (datas[index]?.data?.id) {
          const eventTimer = await Payload.update({
            collection: "eventTimer",
            id: datas[index].data.id,
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "eventTimer",
            value: eventTimer.id,
          };
        } else {
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
      } else if (datas[index].featureType === "social_channel") {
        if (datas[index]?.data?.id) {
          const socialMedia = await Payload.update({
            collection: "socialMedia",
            id: datas[index].data.id,
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "socialMedia",
            value: socialMedia.id,
          };
        } else {
          const socialMedia = await Payload.create({
            collection: "socialMedia",
            data: {
              data: datas[index]?.data,
            },
          });

          datas[index].data = {
            relationTo: "socialMedia",
            value: socialMedia.id,
          };
        }
      } else if (datas[index].featureType === "video") {
        if (datas[index]?.data?.id) {
          const video = await Payload.update({
            collection: "video",
            id: datas[index].data.id,
            data:  datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "video",
            value: video.id,
          };
        } else {
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
  } catch (err) {
    return next(new ApiError(err, 500));
  }

  await Payload.update({
    collection: "homeScreen",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    data: {
      homeData: datas,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Data Updated Successfully",
  });
});

module.exports = {
  getHomePage,
  updateHomePage,
  getHomePageByWeb,
};
