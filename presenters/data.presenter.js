const Data = require("../models/data.model");

exports.getAll = async () => {
  return Data.findAll({ include: ["User"], order: [["createdAt", "DESC"]] });
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
