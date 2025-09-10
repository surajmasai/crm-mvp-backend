const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = "1h";

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

exports.register = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hash = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hash, role });
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  return { token: signToken(user), expiresIn: JWT_EXPIRES_IN };
};
