const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const libraryAttendantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Attendant name is required"],
      trim: true,
    },
    staffId: {
      type: String,
      required: [true, "Staff ID is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, 
    },
  },
  { timestamps: true }
);

libraryAttendantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

libraryAttendantSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("LibraryAttendant", libraryAttendantSchema);
