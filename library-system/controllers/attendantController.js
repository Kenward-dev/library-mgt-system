const attendantService = require("../services/attendantService");
const { sendSuccess } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createAttendant = asyncHandler(async (req, res) => {
  const attendant = await attendantService.createAttendant(req.body);
  // Never return the password
  const { password, ...data } = attendant.toObject();
  sendSuccess(res, "Attendant created successfully", data, 201);
});

const getAttendants = asyncHandler(async (req, res) => {
  const result = await attendantService.getAttendants(req.query);
  sendSuccess(res, "Attendants retrieved successfully", result);
});

module.exports = { createAttendant, getAttendants };
