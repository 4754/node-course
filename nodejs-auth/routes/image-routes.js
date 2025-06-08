const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleWare')
const adminMiddleware = require("../middlewares/adminMiddleware")
const {uploadImage} = require("../controller/image-controller")
const uploadMiddleware = require("../middlewares/uploadMiddleware")

// "image" => key where image is being uploaded
router.post("/upload",authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImage)

module.exports = router;