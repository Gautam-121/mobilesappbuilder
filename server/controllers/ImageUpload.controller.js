const dotenv = require("dotenv");
const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const fs = require("fs")
dotenv.config();

const uploadImages = asyncHandler(async (req, res, next) => {

  const file = req.files

  const store = await Payload.find({
    collection: 'Store',
    where: { 
      shopId: { equals: req.shop_id || "gid://shopify/Shop/81447387454" },
      isActive: { equals : true}
    },
  })

  if(!store.docs[0]){
    return next(
      new ApiError(
        `store not found with id: ${req.shop_id}`,
         404
      )
    )
  }

  if (!file) {
    return next(
      new ApiError(
        "file is missing",
         400
      )
    )
  }

  try {
    const image = await Payload.create({
      collection: "media",
      file: {
        data: file[0].buffer,
        mimetype: file[0].mimetype,
        name: file[0].originalname,
        size: file[0].size,
      }
    })

    if(!image){

      fs.unlinkSync(file[0].path)
      return res.status(500).json({
        success: false,
        message: "something went wrong while creating a media"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Upload Images SuccessFully",
      data: image
    });

  } catch (error) {

    fs.unlinkSync(file[0].path)
    return res.status(500).json({
      success: false,
      message: error.message || "something went wrong while creating a media"
    })
  }
})


module.exports = { uploadImages };
