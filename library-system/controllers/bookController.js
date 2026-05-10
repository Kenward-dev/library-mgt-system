const bookService = require("../services/bookService");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createBook = asyncHandler(async (req, res) => {
  const book = await bookService.createBook(req.body);
  sendSuccess(res, "Book created successfully", book, 201);
});

const getBooks = asyncHandler(async (req, res) => {
  const result = await bookService.getBooks(req.query);
  sendSuccess(res, "Books retrieved successfully", result);
});

const getBookById = asyncHandler(async (req, res) => {
  const result = await bookService.getBookById(req.params.id);
  if (!result) return sendError(res, "Book not found", 404);
  sendSuccess(res, "Book retrieved successfully", result);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await bookService.updateBook(req.params.id, req.body);
  if (!book) return sendError(res, "Book not found", 404);
  sendSuccess(res, "Book updated successfully", book);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await bookService.deleteBook(req.params.id);
  if (!book) return sendError(res, "Book not found", 404);
  sendSuccess(res, "Book deleted successfully");
});

const borrowBook = asyncHandler(async (req, res) => {
  const { studentId, attendantId, returnDate } = req.body;
  const transaction = await bookService.borrowBook({
    bookId: req.params.id,
    studentId,
    attendantId,
    returnDate,
  });
  sendSuccess(res, "Book borrowed successfully", transaction, 201);
});

const returnBook = asyncHandler(async (req, res) => {
  const transaction = await bookService.returnBook(req.params.id);
  sendSuccess(res, "Book returned successfully", transaction);
});

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
