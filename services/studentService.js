const Student = require("../models/Student");
const { buildPaginationOptions, buildPaginationMeta } = require("../utils/pagination");

const createStudent = async (data) => {
  return Student.create(data);
};

const getStudents = async (query) => {
  const { page, limit, skip } = buildPaginationOptions(query);

  const filter = {};
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { studentId: { $regex: query.search, $options: "i" } },
    ];
  }

  const [students, total] = await Promise.all([
    Student.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Student.countDocuments(filter),
  ]);

  return { students, pagination: buildPaginationMeta(total, page, limit) };
};

const getStudentById = async (id) => {
  return Student.findById(id);
};

module.exports = { createStudent, getStudents, getStudentById };
