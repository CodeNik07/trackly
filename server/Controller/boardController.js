const Board = require("../Models/Board.js");
const TasksList = require("../Models/TasksList.js");
const Tasks = require("../Models/Tasks.js");

exports.addBoard = async (req, res) => {
  const { boardTitle, _user } = req.body;
  try {
    const BoardDoc = await Board.create({
      boardTitle,
      _user,
    });
    res.json(BoardDoc);
  } catch (err) {
    console.error(err);
  }
};

exports.getBoards = async (req, res) => {
  const { userId } = req.params;
  res.json(await Board.find({ _user: userId }));
};

exports.deleteBoard = async (req, res) => {
  try {
    const boardId = req.params.boardId;

    // Find and delete the board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found." });
    }

    // Delete associated task lists
    await TasksList.deleteMany({ _board: boardId });

    // Delete tasks associated with the task lists
    const taskLists = await TasksList.find({ _board: boardId });
    const taskListIds = taskLists.map((list) => list._id);
    await Tasks.deleteMany({ _tasklist: { $in: taskListIds } });

    // Finally, delete the board
    await Board.deleteOne({ _id: boardId });

    res
      .status(200)
      .json({ message: "Board and associated items deleted successfully." });
  } catch (err) {
    console.error("Error during deletion process:", err);
    res.status(500).json({ error: "Server error while deleting board." });
  }
};
