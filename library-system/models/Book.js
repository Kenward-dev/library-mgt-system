const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
