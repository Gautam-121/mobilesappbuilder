const dotenv = require("dotenv");
const Payload = require("payload");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
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
