const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing Authorization header" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ message: "Invalid Authorization header format" });
  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = { id: user.id, email: user.email, role: user.role, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(500).json({ message: "Auth middleware not applied" });
    if (allowedRoles.includes(req.user.role)) return next();
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  };
};
