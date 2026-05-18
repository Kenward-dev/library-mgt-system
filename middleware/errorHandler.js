const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value: '${err.keyValue[field]}' already exists for field '${field}'`;
    statusCode = 409;
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again.";
    statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    message = "Token has expired. Please log in again.";
    statusCode = 401;
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandler;
