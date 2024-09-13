const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    minLength: 10,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
    timestamps:true,
});

const Task_manager_DB = mongoose.connection.useDb("task_manager");

const UserModel = Task_manager_DB.model("Users", UserSchema);
module.exports = UserModel;
