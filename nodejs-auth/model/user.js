const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is manadatory"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is manadatory"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is manadatory"],
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    }
    
},{timestamp:true});

module.exports = mongoose.model('Users', userSchema)