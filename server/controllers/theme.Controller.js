const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getAllTheme = asyncHandler( async (req, res, next) => {

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      id: { equals: req.shop_id },
      isActive: { equals : true}
    },
    limit: 1,
    depth:0
  })

  if(store.docs.length == 0){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
        404
      )
    )
  }

  const theme = await Payload.find({
    collection: "theme",
    page: req.query?.page || 1,
    limit: req.query?.limit || 6,
    pagination: true,
  });

  return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: theme,
  });
})

const getThemeById = asyncHandler( async (req, res, next) => {

  if (!req.params.themeId) {
    return next(
      new ApiError(
        "Theme_id is missing",
         400
      )
    )
  }

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      id: { equals: req.shop_id },
      isActive: { equals : true}
    },
    limit: 1,
    depth:0
  })

  if(store.docs.length == 0){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

  const theme = await Payload.findByID({
    collection: "theme", // required
    id: req.params.themeId, // required
  });

  if (!theme) {
    return next(
      new ApiError(
        "Theme not found",
         400
      )
    )
  }

  return res.status(200).json({
    success: true,
    message: "Data Send Successfully",
    data: theme,
  });

})

module.exports = {
  getAllTheme , 
  getThemeById
}