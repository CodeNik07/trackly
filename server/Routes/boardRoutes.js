const express = require("express");
const router = express.Router();
const boardController = require("../Controller/boardController");

router.post("/add", boardController.addBoard);
router.get("/:userId", boardController.getBoards);
router.delete("/:boardId", boardController.deleteBoard);

module.exports = router;
