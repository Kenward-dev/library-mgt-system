const authorService = require("../services/authorService");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.createAuthor(req.body);
  sendSuccess(res, "Author created successfully", author, 201);
});

const getAuthors = asyncHandler(async (req, res) => {
  const result = await authorService.getAuthors(req.query);
  sendSuccess(res, "Authors retrieved successfully", result);
});

const getAuthorById = asyncHandler(async (req, res) => {
  const author = await authorService.getAuthorById(req.params.id);
  if (!author) return sendError(res, "Author not found", 404);
  sendSuccess(res, "Author retrieved successfully", author);
});

const updateAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.updateAuthor(req.params.id, req.body);
  if (!author) return sendError(res, "Author not found", 404);
  sendSuccess(res, "Author updated successfully", author);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await authorService.deleteAuthor(req.params.id);
  if (!author) return sendError(res, "Author not found", 404);
  sendSuccess(res, "Author deleted successfully");
});

module.exports = { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };
