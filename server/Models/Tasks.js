const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    tasktitle: String,
    taskdesc: String,
    _tasklist: { type: mongoose.Schema.Types.ObjectId, ref: "TasksList" },
    _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Task_manager_DB = mongoose.connection.useDb("task_manager");

const TaskModel = Task_manager_DB.model("Tasks", TaskSchema);
module.exports = TaskModel;
