const Tasks = require("../Models/Tasks.js");

exports.addNewTask = async (req, res) => {
  const { tasktitle, taskdesc, _tasklist, _user } = req.body;

  try {
    const TaskDoc = await Tasks.create({
      tasktitle,
      taskdesc,
      _tasklist,
      _user,
    });
    res.json(TaskDoc);
  } catch (err) {
    console.error(err);
  }
};

exports.getTasks = async (req, res) => {
  const { userId } = req.params;
  const tasksData = await Tasks.find({ _user: userId });
  res.json(tasksData);
};

exports.deleteTask = async (req, res) => {
  try {
    await Tasks.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task." });
  }
};
