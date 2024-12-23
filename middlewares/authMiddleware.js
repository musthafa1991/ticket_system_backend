const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authenticate the user (check the token)
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("Authentication failed");
    }
    req.user = decoded;
    req.body.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Authorize admin (check if the user is an admin)
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
