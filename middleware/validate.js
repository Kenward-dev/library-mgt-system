const isValidObjectId = require("../utils/isValidObjectId");

const validateObjectId = (paramName = "id") => (req, res, next) => {
  const value = req.params[paramName];
  if (!isValidObjectId(value)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format for param '${paramName}': ${value}`,
    });
  }
  next();
};

const validateRequiredFields = (fields) => (req, res, next) => {
  const missing = fields.filter(
    (field) => req.body[field] === undefined || req.body[field] === ""
  );

  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missing.join(", ")}`,
    });
  }
  next();
};

module.exports = { validateObjectId, validateRequiredFields };
