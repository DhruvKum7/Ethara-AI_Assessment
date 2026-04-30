const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  taskController.createTask
);

router.get(
  "/",
  authMiddleware,
  taskController.getTasks
);

router.patch(
  "/:id/status",
  authMiddleware,
  taskController.updateTaskStatus
);

module.exports = router;