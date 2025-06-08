const cloudinary = require("../configs/cloudinaryConfig")
const { uploadImageToCloudinary } = require("../helpers/cloudinaryHelper");
const Image = require('../model/image');
const fs = require('node:fs')

const uploadImage = async (req,res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            })
        }
        const { url, publicId } = await uploadImageToCloudinary(req.file.path);
        const uploadedImage = await Image.create({
            url,
            publicId,
            uploadedBy: req.user.userId,
        })
        fs.unlinkSync(req.file.path);
        return res.status(201).json({
            success: true,
            message: "Successfully uploaded the image",
            data : uploadedImage
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    uploadImage,
}