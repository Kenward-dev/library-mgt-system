const Book = require("../models/Book");
const Author = require("../models/Author");
const BorrowTransaction = require("../models/BorrowTransaction");
const { buildPaginationOptions, buildPaginationMeta } = require("../utils/pagination");

const createBook = async (data) => {
  return Book.create(data);
};

const getBooks = async (query) => {
  const { page, limit, skip } = buildPaginationOptions(query);

  const filter = {};

  if (query.title) {
    filter.title = { $regex: query.title, $options: "i" };
  }

  if (query.status) {
    filter.status = query.status.toUpperCase();
  }

  if (query.author) {
    const matchingAuthors = await Author.find({
      name: { $regex: query.author, $options: "i" },
    }).select("_id");

    const authorIds = matchingAuthors.map((a) => a._id);
    filter.authors = { $in: authorIds };
  }

  const [books, total] = await Promise.all([
    Book.find(filter)
      .populate("authors", "name bio")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Book.countDocuments(filter),
  ]);

  return { books, pagination: buildPaginationMeta(total, page, limit) };
};

const getBookById = async (id) => {
  const book = await Book.findById(id).populate("authors", "name bio");
  if (!book) return null;

  let activeTransaction = null;

  if (book.status === "OUT") {
    activeTransaction = await BorrowTransaction.findOne({
      book: id,
      status: "BORROWED",
    })
      .populate("student", "name email studentId")
      .populate("issuedBy", "name staffId email");
  }

  return { book, activeTransaction };
};

const updateBook = async (id, data) => {
  return Book.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(
    "authors",
    "name bio"
  );
};

const deleteBook = async (id) => {
  return Book.findByIdAndDelete(id);
};

const borrowBook = async ({ bookId, studentId, attendantId, returnDate }) => {
  const book = await Book.findById(bookId);

  if (!book) {
    const err = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }

  if (book.status === "OUT") {
    const err = new Error("Book is already borrowed and not available");
    err.statusCode = 400;
    throw err;
  }

  const transaction = await BorrowTransaction.create({
    book: bookId,
    student: studentId,
    issuedBy: attendantId,
    expectedReturnDate: returnDate,
  });

  book.status = "OUT";
  await book.save();

  return BorrowTransaction.findById(transaction._id)
    .populate("book", "title isbn")
    .populate("student", "name email studentId")
    .populate("issuedBy", "name staffId");
};

const returnBook = async (bookId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    const err = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }

  if (book.status === "IN") {
    const err = new Error("Book is not currently borrowed");
    err.statusCode = 400;
    throw err;
  }

  const transaction = await BorrowTransaction.findOne({
    book: bookId,
    status: "BORROWED",
  });

  if (!transaction) {
    const err = new Error("No active borrow transaction found for this book");
    err.statusCode = 404;
    throw err;
  }

  transaction.actualReturnDate = new Date();
  transaction.status = "RETURNED";
  await transaction.save();

  book.status = "IN";
  await book.save();

  return BorrowTransaction.findById(transaction._id)
    .populate("book", "title isbn")
    .populate("student", "name email studentId")
    .populate("issuedBy", "name staffId");
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
