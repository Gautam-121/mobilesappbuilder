const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getHomePage = asyncHandler(async (req, res, next) => {

  if (!req.params.shopId) {
    const error = new ApiError("Shop_id is Missing", 400);
    return next(error);
  }

  const homeData = await Payload.find({
    collection: "homePage",
    where: { shopId: { equals: `gid://shopify/Shop/${req.params.shopId}` } },
  });

  if (homeData.docs.length === 0) {
    const error = new ApiError(`No data found with shopId: ${req.params.shopId}`, 400);
    return next(error);
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
      themeId: homeData.docs[0]?.themeId.id,
    },
  });

})

const getHomePageByWeb = asyncHandler(async (req, res, next) => {
    
  if (!req.params.themeId) {
    const error = new ApiError("themeId is missing", 400);
    return next(error);
  }

  const homeData = await Payload.find({
    collection: "homePage",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
    depth: 2,
  });

  if (homeData.docs.length === 0) {
    const error = new ApiError("No Document Found", 400);
    return next(error);
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
})

const updateHomePage = asyncHandler(async (req, res, next) => {

  const { datas } = req.body;

  if (!req.params.themeId) {
    const error = new ApiError("themeId is missing", 400)
    return next(error);
  }

  const isExistHomeData = await Payload.find({
    collection: "homePage",
    where: {
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      themeId: { equals: req.params.themeId },
    },
  });

  if (isExistHomeData.docs.length === 0) {
    const error = new ApiError("No Document Found", 400)
    return next(error);
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
      }
      else {
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
    data: homeData,
  });

})

module.exports = { 
  getHomePage, 
  updateHomePage, 
  getHomePageByWeb 
};