const express = require("express");
const router = express.Router();
const taskController = require("../Controller/taskController");

router.post("/add", taskController.addNewTask);
router.get("/:userId", taskController.getTasks);
router.delete("/:taskId", taskController.deleteTask);

module.exports = router;
