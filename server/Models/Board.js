const mongoose = require("mongoose");
const { Schema } = mongoose;

const BoardSchema = new Schema(
  {
    boardTitle: String,
    _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Task_manager_DB = mongoose.connection.useDb("task_manager");

const BoardModel = Task_manager_DB.model("Boards", BoardSchema);
module.exports = BoardModel;
