const jwt = require("jsonwebtoken");
const LibraryAttendant = require("../models/LibraryAttendant");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const attendant = await LibraryAttendant.findById(decoded.id);
  if (!attendant) {
    return res.status(401).json({
      success: false,
      message: "Token is valid but attendant no longer exists.",
    });
  }

  req.user = attendant;
  next();
});

module.exports = protect;
