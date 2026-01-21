const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "pending" },
  userId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Task", taskSchema);

