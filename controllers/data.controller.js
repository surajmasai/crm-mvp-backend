const presenter = require("../presenters/data.presenter");
const view = require("../views/data.view");

exports.getAll = async (req, res) => {
  try {
    const rows = await presenter.getAll();
    res.json(view.successList(rows));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const row = await presenter.create({ ...req.body, created_by: req.user.id });
    res.status(201).json(view.successOne(row));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const row = await presenter.update(req.params.id, req.body);
    res.json(view.successOne(row));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await presenter.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
