const jwt = require("jsonwebtoken");
const LibraryAttendant = require("../models/LibraryAttendant");

const login = async ({ email, password }) => {
  const attendant = await LibraryAttendant.findOne({ email }).select("+password");

  if (!attendant) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await attendant.comparePassword(password);
  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ id: attendant._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  const { password: _, ...attendantData } = attendant.toObject();

  return { token, attendant: attendantData };
};

module.exports = { login };
