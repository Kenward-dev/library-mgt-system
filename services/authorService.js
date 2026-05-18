const Author = require("../models/Author");
const { buildPaginationOptions, buildPaginationMeta } = require("../utils/pagination");

const createAuthor = async (data) => {
  return Author.create(data);
};

const getAuthors = async (query) => {
  const { page, limit, skip } = buildPaginationOptions(query);

  const filter = {};
  if (query.search) {
    filter.name = { $regex: query.search, $options: "i" };
  }

  const [authors, total] = await Promise.all([
    Author.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Author.countDocuments(filter),
  ]);

  return { authors, pagination: buildPaginationMeta(total, page, limit) };
};

const getAuthorById = async (id) => {
  return Author.findById(id);
};

const updateAuthor = async (id, data) => {
  return Author.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteAuthor = async (id) => {
  return Author.findByIdAndDelete(id);
};

module.exports = { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };
