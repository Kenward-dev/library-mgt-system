const mongoose = require("mongoose");

const borrowTransactionSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LibraryAttendant",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    expectedReturnDate: {
      type: Date,
      required: [true, "Expected return date is required"],
    },
    actualReturnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["BORROWED", "RETURNED", "OVERDUE"],
      default: "BORROWED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowTransaction", borrowTransactionSchema);
