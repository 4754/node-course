const jwt = require("jsonwebtoken");
const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        message: "Token is not present!",
        success: false,
      });
    }

    const decodedUser = jwt.verify(token, process.env.JSON_SECRET);
    req.user = decodedUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: "Token has expired",
            success: false,
        });
    } else {
        return res.status(403).json({
            message: "Invalid token",
            success: false,
        });
    }
  }
};

module.exports = authMiddleWare;
