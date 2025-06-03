const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, 'Book Title is required'],
        maxLength: [100, 'Book Title cannot be greater than 100'],
    },
    author:{
        type: String,
        trim: true,
        required: [true, 'Book author is required']
    },
    year:{
        type: Number,
        required: [true, 'Publication year is required'],
        min: [1600, 'Publication year cannot be less than 1600'],
        max: [new Date().getFullYear(), `Publication year cannot be greater than ${new Date().getFullYear()}`],
    },
    createdAt: {
        type:   Date,
        default: Date.now,
    }
},{timestamps: true});

module.exports = mongoose.model('Books', bookSchema);