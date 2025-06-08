const express = require('express');
const router = express.Router();

router.get("/welcome",(req,res)=>{
    console.log("ADMIN ", req.user)
    res.status(200).send(`Hellow in admin Route, ${req?.user?.username}`)
})

module.exports = router;