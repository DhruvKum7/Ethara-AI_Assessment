const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Authentication token is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = authMiddleware;