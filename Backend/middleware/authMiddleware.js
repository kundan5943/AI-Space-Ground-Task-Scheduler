const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies.token;

    // check token exists
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user data except password
    const userData = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token failed",
    });
  }
};

module.exports = protect;
