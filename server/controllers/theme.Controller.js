const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");

const getAllTheme = asyncHandler( async (req, res, next) => {

    const theme = await Payload.find({
      collection: "theme",
    });

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: theme.docs,
    });
})

const getThemeById = asyncHandler( async (req, res, next) => {

  if (!req.params.themeId) {
    const error = new ApiError("Theme_id is missing", 400)
    return next(error);
  }

  const theme = await Payload.findByID({
    collection: "theme", // required
    id: req.params.themeId, // required
  });

  if (!theme) {
    return next(new ApiError("Theme not found", 400));
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