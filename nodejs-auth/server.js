require('dotenv').config();
const express = require('express');
const connectToDB = require('./utils/db');
const authRoutes = require('./routes/auth-route');
const homeRoutes = require('./routes/home-route');
const adminRoutes = require('./routes/admin-rout');
const authMiddleWare = require("./middlewares/authMiddleWare");
const adminMiddleWare = require("./middlewares/adminMiddleware");
const imageRoutes = require('./routes/image-routes')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes);
app.use('/api/home',authMiddleWare,homeRoutes);
app.use('/api/admin/home',authMiddleWare,adminMiddleWare,adminRoutes);
app.use("/api/image",imageRoutes)
app.get("/",(req,res)=>{
    res.status(200).send("Hello world!")
})
connectToDB();
const PORT = process.env.port || 3000 
app.listen(PORT ,()=>{
    console.log(`server listning on port ${PORT}`)
})