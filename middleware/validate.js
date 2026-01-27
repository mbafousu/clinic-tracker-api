export function validate(req, res, next) {

  // Only validate when request has JSON body
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentType = req.headers["content-type"] || "";

    // Allow forms too 
    if (contentType.includes("application/json") || contentType.includes("application/x-www-form-urlencoded")) {
      return next();
    }
    return res.status(415).json({ error: "Unsupported Content-Type" });
  }
  next();
}
