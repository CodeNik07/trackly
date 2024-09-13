const TasksList = require("../Models/TasksList.js");
const Tasks = require("../Models/Tasks.js");

exports.addTasklist = async (req, res) => {
  const { tasklisttitle, _board } = req.body;

  try {
    const TaskListDoc = await TasksList.create({
      tasklisttitle,
      _board,
    });
    res.json(TaskListDoc);
  } catch (err) {
    console.error(err);
  }
};

exports.getTasklist = async (req, res) => {
  const { boardId } = req.params;
  const taskListData = await TasksList.find({ _board: boardId });
  res.json(taskListData);
};

exports.deleteTasklist = async (req, res) => {
  const taskListId = req.params.taskListId;
  try {
    const taskList = await TasksList.findById(taskListId);

    if (!taskList) {
      return res.status(404).json({ message: "Task list not found." });
    }

    // Delete tasks associated with the task list
    await Tasks.deleteMany({ _tasklist: taskListId });

    // Delete the task list
    await TasksList.deleteOne({ _id: taskListId });

    res.status(200).json({
      message: "Task list and associated tasks deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task list." });
  }
};
