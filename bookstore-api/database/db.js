const mongoose = require('mongoose');

const connectToDB= async ()=>{
    try{
       await mongoose.connect(process.env.DB_URL);
       console.log("Mongo DB connected")
    } catch(err){
        console.log("MongoDB connection error:", err);
        process.exit(1)
    }
}

module.exports = connectToDB;