const dotenv = require("dotenv");
const Payload = require("payload");
const ErrorHandler = require("../utils/errorHandler");
dotenv.config();

const uploadImages = async (req, res, next) => {
  try {
    
    const file = req.files

    if (!file) {
      return next(new ErrorHandler("file is missing",400))
    }

    const image = await Payload.create({
      collection: "media",
      file: {
        data: file[0].buffer,
        mimetype: file[0].mimetype,
        name: file[0].originalname,
        size: file[0].size,
      }
    });

    return res.status(200).json({
      success: true,
      message: "Upload Images SuccessFully",
      data: image
    });

  } catch (error) {
    return next(new ErrorHandler(error.message , 400))
  }
};


module.exports = { uploadImages };
