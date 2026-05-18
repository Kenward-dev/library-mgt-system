const LibraryAttendant = require("../models/LibraryAttendant");
const { buildPaginationOptions, buildPaginationMeta } = require("../utils/pagination");

const createAttendant = async (data) => {
  return LibraryAttendant.create(data);
};

const getAttendants = async (query) => {
  const { page, limit, skip } = buildPaginationOptions(query);

  const [attendants, total] = await Promise.all([
    LibraryAttendant.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    LibraryAttendant.countDocuments(),
  ]);

  return { attendants, pagination: buildPaginationMeta(total, page, limit) };
};

module.exports = { createAttendant, getAttendants };
