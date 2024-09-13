const mongoose = require("mongoose");
const { Schema } = mongoose;

const TasksListSchema = new Schema(
  {
    tasklisttitle: String,
    _board: { type: mongoose.Schema.Types.ObjectId, ref: "Boards" },
  },
  {
    timestamps: true,
  }
);

const Task_manager_DB = mongoose.connection.useDb("task_manager");

const TasksListModel = Task_manager_DB.model("TasksList", TasksListSchema);
module.exports = TasksListModel;
