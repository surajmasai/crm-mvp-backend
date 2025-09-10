const presenter = require("../presenters/auth.presenter");
const view = require("../views/auth.view");

exports.register = async (req, res) => {
  try {
    const user = await presenter.register(req.body);
    res.status(201).json(view.successRegister(user));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await presenter.login(req.body);
    res.json(view.successLogin(result));
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
