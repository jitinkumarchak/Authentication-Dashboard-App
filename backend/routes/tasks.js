const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.userId,
  });
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
