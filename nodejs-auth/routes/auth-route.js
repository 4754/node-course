const express = require('express');
const router = express.Router();
const { loginUser, registerUser, changePassword } =require('../controller/auth-controller');
const authMiddleWare = require('../middlewares/authMiddleWare');

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/change-password',authMiddleWare ,changePassword);


module.exports = router;