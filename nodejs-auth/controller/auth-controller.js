const bcrypt = require('bcrypt')
const Users  = require('../model/user');
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) =>{
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(403).json({
                success: false,
                message: "Error in creating user"
            })
        }
        const searchedUserInDB = await Users.find({ $or:[{email:email},{username:username}]})
        if(searchedUserInDB.length > 0){
            return res.status(409).json({
                success: false,
                message: "Account already exists",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({username:username,email:email,password: hashedPassword});
        if(!newUser){
            return res.status(403).json({
                success: false,
                message: "Error in creating user"
            })
        }
        const token = jwt.sign({userId:newUser._id,username: newUser.username, email: newUser.email, role: newUser.role},process.env.JSON_SECRET,{expiresIn: '35min'})
        return res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
                token: token,
            })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error: error.message,
            massage: "Could not processs request"
        })
    }
}

const loginUser = async (req,res) =>{
    try {
        const { username, password } = req.body;
        if (!username || !password){
            return res.status(403).json({
                success: false,
                message: "Error in login user"
            })
        }
        const userInDB = await Users.findOne({username:username});
        if(!userInDB){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,userInDB.password);
        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message:"Invalid Credentials!"
            })
        }

        const token = jwt.sign({userId:userInDB._id,username: userInDB.username, email: userInDB.email, role: userInDB.role},process.env.JSON_SECRET,{expiresIn: '35min'});

        return res.status(200).json({
            message: "Successfully loged In",
            data: userInDB,
            token: token
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message: "Error registering user"
        })
    }
}

const changePassword = async (req,res)=>{
    try {
        const {userId } = req.user;
        const { oldPassword, newPassword} = req.body;

        if(!oldPassword && !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please valid old and new Password!"
            })
        }
        const user = await Users.findById(userId);
        console.log("user",user)
        if(!user){
           return res.status(400).json({
                success: false,
                message: "No such user found, Please create an account!"
            }) 
        }

        const isOldPasswordCorrect = await  bcrypt.compare(oldPassword,user.password);

        if(!isOldPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Plesae input correct Password"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);
       user.password = hashedPassword;

       await user.save();

        return res.status(200).json({
            success: true,
            message: "Successfully changed Password!"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Plesae try again!",
            error: error.message
        })
    }
}

module.exports =  {
    registerUser,
    loginUser,
    changePassword,
}