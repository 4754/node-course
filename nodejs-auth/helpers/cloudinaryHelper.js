const cloudinary = require("../configs/cloudinaryConfig");

const uploadImageToCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    };
  } catch (error) {
    console.error("Error while uploading Image to Cloudinary", error);
    throw new Error("Error while uploading Image to Cloudinary: " + error.message);
  }
};


module.exports = {
    uploadImageToCloudinary,
}
