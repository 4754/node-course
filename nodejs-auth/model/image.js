const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    url : {
        type: String,
        required: [true, "Image URL is required"],
    },
    publicId: {
        type: String,
        required: [true, "publicId is required"]
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "Who uploaded is required"]
    }
},{timestamps: true})

module.exports = mongoose.model("Image",ImageSchema)