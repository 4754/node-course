
const adminMiddleware = (req,res,next) =>{
    const user = req.user;
    if(user?.role !== 'admin'){
        return res.status(400).json({
            success: false,
            message: "You do not right permission to access this "
        })
    }
    next();
}

module.exports = adminMiddleware;