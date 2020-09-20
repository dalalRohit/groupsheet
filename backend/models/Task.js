require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

var TaskSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: moment().format("MMM Do YY hh:mm:ss"),
  },
});

var Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
