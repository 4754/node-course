const bcrypt = require('bcrypt')
const Users  = require('../model/user');
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) =>{
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            res.status(403).json({
                success: false,
                message: "Error in creating user"
            })
        }
        const searchedUserInDB = await Users.find({ $or:[{email:email},{username:username}]})
        if(searchedUserInDB.length > 0){
            res.status(409).json({
                success: false,
                message: "Account already exists",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({username:username,email:email,password: hashedPassword});
        if(!newUser){
            res.status(403).json({
                success: false,
                message: "Error in creating user"
            })
        }
        const token = jwt.sign({username: newUser.username, email: newUser.email, role: newUser.role},process.env.JSON_SECRET,{expiresIn: '5min'})
        res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser,
                token: token,
            })
    } catch (error) {
        res.status(500).json({
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
            res.status(403).json({
                success: false,
                message: "Error in login user"
            })
        }
        const userInDB = await Users.findOne({username:username});
        if(!userInDB){
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,userInDB.password);
        if(!isPasswordCorrect){
            res.status(400).json({
                success: false,
                message:"Invalid Credentials!"
            })
        }

        const token = jwt.sign({username: userInDB.username, email: userInDB.email, role: userInDB.role},process.env.JSON_SECRET,{expiresIn: '5min'});

        res.status(200).json({
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

module.exports =  {
    registerUser,
    loginUser,
}