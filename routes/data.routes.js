const express = require("express");
const controller = require("../controllers/data.controller");
const { authMiddleware, roleMiddleware } = require("../middleware/auth.middleware");
const { getAllUsers } = require("../presenters/data.presenter");

const router = express.Router();

router.get("/", authMiddleware, controller.getAll);
router.get("/get", getAllUsers)
router.post("/", authMiddleware, roleMiddleware(["admin", "super_admin"]), controller.create);
router.put("/:id", authMiddleware, roleMiddleware(["admin", "super_admin"]), controller.update);
router.delete("/:id", authMiddleware, roleMiddleware(["super_admin"]), controller.remove);

module.exports = router;
