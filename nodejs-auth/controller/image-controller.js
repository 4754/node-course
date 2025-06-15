const cloudinary = require("../configs/cloudinaryConfig");
const { uploadImageToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require("../model/image");
const fs = require("node:fs");
const Users = require("../model/user");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    const { url, publicId } = await uploadImageToCloudinary(req.file.path);
    const uploadedImage = await Image.create({
      url,
      publicId,
      uploadedBy: req.user.userId,
    });
    fs.unlinkSync(req.file.path);
    return res.status(201).json({
      success: true,
      message: "Successfully uploaded the image",
      data: uploadedImage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllImageController = async (req, res) => {
  try {
    const limit = req?.query?.limit ?? 2;
    const currentPage = req?.query?.page ?? 1;
    const sortBY = req?.query?.sortBy ?? "updatedAt";
    const sortOrder = req?.query?.sortOrder === 'asc' ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages/limit);
    const skip = (currentPage-1) * limit;

    const filterDoc = {};
    filterDoc[sortBY] = sortOrder;

    const images = await Image.find({}).sort(filterDoc).skip(skip).limit(limit);
    if (images) {
      return res.status(500).json({
        success: true,
        message: "Successfully fetched all images",
        totalPages:totalPages,
        totalImages: totalImages,
        currentPage: currentPage,
        data: images,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Network error while fetching data!",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const imageToDeleteId = req.params.imageId;
    const authenticatedUser = req.user;

    const imageFound = await Image.findById(imageToDeleteId);

    if(!imageFound){
        return res.status(400).json({
            success: false,
            message: "No such image found"
        })
    }

    if(imageFound.uploadedBy.toString() !== authenticatedUser.userId){
        return res.status(400).json({
            success: false,
            message: "Ca not delete the image"
        })
    }
    await cloudinary.uploader.destroy(imageFound.publicId);

    await Image.findByIdAndDelete(imageToDeleteId);

    return res.status(200).json({
        success: true,
        message: "Image deleted successfully!"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Network error while deleting image",
    });
  }
};

module.exports = {
  uploadImage,
  getAllImageController,
  deleteImageController,
};
