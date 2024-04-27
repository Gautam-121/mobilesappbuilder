const dotenv = require("dotenv");
const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
dotenv.config();

const uploadImages = asyncHandler(async (req, res, next) => {
    
  const file = req.files

  if (!file) {
    return next(
      new ApiError(
        "file is missing",
         400
      )
    )
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
})


module.exports = { uploadImages };
