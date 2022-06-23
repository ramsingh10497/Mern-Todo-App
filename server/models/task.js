const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", taskSchema);