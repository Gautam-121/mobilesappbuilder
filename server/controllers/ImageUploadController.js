const dotenv = require("dotenv");
const Payload = require("payload");
dotenv.config();

const uploadImages = async (req, res, next) => {
  try {

    const file = req.files

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "file is missing",
      });
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

    console.log(image)

    return res.status(200).json({
      success: true,
      message: "Upload Images SuccessFully",
      data: image
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};


module.exports = { uploadImages };
