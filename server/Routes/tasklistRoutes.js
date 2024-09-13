const express = require("express");
const router = express.Router();
const tasklistController = require("../Controller/tasklistController");

router.post("/add", tasklistController.addTasklist);
router.get("/:boardId", tasklistController.getTasklist);
router.delete("/:taskListId", tasklistController.deleteTasklist);

module.exports = router;