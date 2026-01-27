export function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  const status = err.status || 500;

  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({
      error: err.message || "Server error",
    });
  }

  res.status(status).send(`Error: ${err.message || "Server error"}`);
}
