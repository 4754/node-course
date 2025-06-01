

const loggerMiddleWare = (req,res,next)=>{
    console.log(new Date().toISOString(), req.url);
    next();
}

module.exports = {
    loggerMiddleWare,
}