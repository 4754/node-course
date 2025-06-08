const mongoose = require('mongoose')
const connectToDB = async () =>{
    try {
        const ctn = await mongoose.connect(process.env.DB_URL);
        console.log("Connected to mongo DB.")
    } catch (error) {
        console.log("error happend",error)
        process.exit(1);
    }
}

module.exports = connectToDB;