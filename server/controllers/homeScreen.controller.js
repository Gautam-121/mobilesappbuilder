const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { validationResult } = require("express-validator")

const getHomePage = asyncHandler(async (req, res, next) => {

  const homeData = await Payload.find({ 
    collection: "homeScreen",
    where: {
      shopId: { equals: req.user.id },
      themeId: { equals: req.user.themeId },
    },
    limit:1
  });

  if (homeData.docs.length === 0) { 
    return next(
      new ApiError(
        `No data found with shopId: ${req.user.id}`, 
        400
      )
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
    return next(
      new ApiError(
        "themeId is missing", 
        400
      )
    );
  }

  const isSelectedTheme = await Payload.find({
    collection: "Store",
    where: {
      id: { equals: req.shop_id },
      isActive: { equals: true },
    },
    limit: 1,
    depth: req.query?.depth || 0
  });

  if (isSelectedTheme.docs.length == 0) {
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    );
  }

  if (
    !isSelectedTheme.docs[0]?.themeId ||
    isSelectedTheme.docs[0]?.themeId != req.params.themeId
  ) {
    return next(
      new ApiError(
        "Params is not matched with store themeId", 
        400
      )
    );
  }

  const homeData = await Payload.find({
    collection: "homeScreen",
    where: {
      shopId: { equals: req.shop_id  },
      themeId: { equals: req.params.themeId },
    },
    limit: 1,
    depth: 2,
  });

  if (homeData.docs.length === 0) {
    return next(
      new ApiError(
        "No Document Found", 
        400
      )
    );
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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({onlyFirstError: true}) });
  }

  const { datas } = req.body;

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "ThemeId is missing" , 
        400
      )
    );
  }

  const isSelectedTheme = await Payload.find({
    collection: "Store",
    where: {
      id: { equals: req.shop_id },
      isActive: { equals: true },
    },
    limit: 1,
    depth: req.query?.depth || 0 
  });

  if (isSelectedTheme.docs.length == 0) {
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`, 
        404
      )
    );
  }

  if (
    !isSelectedTheme.docs[0]?.themeId ||
    isSelectedTheme.docs[0]?.themeId != req.params.themeId
  ) {
    return next(
      new ApiError(
        "Params is not matched with store themeId",
         400
      )
    );
  }

  const isExistHomeData = await Payload.find({
    collection: "homeScreen",
    where: {
      shopId: { equals: req.shop_id },
      themeId: { equals: req.params.themeId },
    },
    limit:1
  });

  if (isExistHomeData.docs.length === 0) {
    return next(
      new ApiError(
        "No Document Found",
         400
      )
    );
  }

  // Start Transcation
  const transactionID = await Payload.db.beginTransaction()

  console.log("transactionID" , transactionID)

  try {

    for (let index in datas) {
      if (datas[index].featureType === "banner") {
        const isVisible = datas[index]?.data?.data.some(
          (val) => val.isVisible === true
        );

        if (datas[index]?.data?.id) {
          const banner = await Payload.update({
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
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
            req:{transactionID},
            collection: "video",
            data: datas[index]?.data,
          });

          datas[index].data = {
            relationTo: "video",
            value: video.id,
          };
        }
      }
    }

    await Payload.update({
      req:{transactionID},
      collection: "homeScreen",
      id:isExistHomeData.docs[0].id,
      data: {
        homeData: datas,
      },
    })

    //Commit the transaction if everything is successful
    await Payload.db.commitTransaction(transactionID);

    return res.status(201).json({
      success: true,
      message: "Data Updated Successfully",
    });

  } catch (error) {

     console.error('Oh no, something went wrong!');
     await Payload.db.rollbackTransaction(transactionID);

     res.status(500).send({
      success: false,
      message: error.message
    });

  }
});

module.exports = {
  getHomePage,
  updateHomePage,
  getHomePageByWeb,
};
