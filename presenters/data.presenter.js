const Data = require("../models/data.model");
const User = require("../models/user.model");

exports.getAll = async () => {
  return Data.findAll({ include: ["User"], order: [["createdAt", "DESC"]] });
};

exports.getAllUsers = async (req, res) => {
  console.log("Fetching users...");
  const users = await User.findAll().catch(err => {
    console.error("❌ Query failed:", err);
  });
  console.log("✅ Users fetched", users);
  res.json(users);
};

exports.create = async ({ title, content, created_by }) => {
  return Data.create({ title, content, created_by });
};

exports.update = async (id, { title, content }) => {
  const row = await Data.findByPk(id);
  if (!row) throw new Error("Not found");
  row.title = title ?? row.title;
  row.content = content ?? row.content;
  await row.save();
  return row;
};

exports.remove = async (id) => {
  const row = await Data.findByPk(id);
  if (!row) throw new Error("Not found");
  await row.destroy();
  return true;
};
