const Payload = require("payload");
const ErrorHandler = require("../utils/errorHandler");

const getAllTheme = async (req, res, next) => {
  try {
    const theme = await Payload.find({
      collection: "theme",
    });

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: theme.docs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getThemeById = async (req, res, next) => {
  try {
    if (!req.params.themeId) {
      return next(new ErrorHandler("Theme_id is missing", 400));
    }

    const theme = await Payload.findByID({
      collection: "theme", // required
      id: req.params.themeId, // required
    });

    if (!theme) {
      return next(new ErrorHandler("Theme not found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "Data Send Successfully",
      data: theme,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {getAllTheme , getThemeById}