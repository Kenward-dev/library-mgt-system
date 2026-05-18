const studentService = require("../services/studentService");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  sendSuccess(res, "Student created successfully", student, 201);
});

const getStudents = asyncHandler(async (req, res) => {
  const result = await studentService.getStudents(req.query);
  sendSuccess(res, "Students retrieved successfully", result);
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) return sendError(res, "Student not found", 404);
  sendSuccess(res, "Student retrieved successfully", student);
});

module.exports = { createStudent, getStudents, getStudentById };
