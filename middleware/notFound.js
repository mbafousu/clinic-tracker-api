export function notFound(req, res, next) {
  res.status(404);

  // If API route, return JSON
  if (req.originalUrl.startsWith("/api")) {
    return res.json({ error: "Route not found" });
  }
  
  // Otherwise render text
  return res.send("404 - Page Not Found");
}
