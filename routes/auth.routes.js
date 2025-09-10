const express = require("express");
const controller = require("../controllers/auth.controller");
const { authMiddleware, roleMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", controller.login);
router.post("/register", authMiddleware, roleMiddleware(["super_admin"]), controller.register);

module.exports = router;
