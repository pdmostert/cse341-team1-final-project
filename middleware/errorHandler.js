// Simple error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  const status = err.status || 500;
  const message = err.message || "Internal server Error";

  res.status(status).json({ message: message });
};

module.exports = errorHandler;
