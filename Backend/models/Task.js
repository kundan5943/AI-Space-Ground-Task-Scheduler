const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema(
  {
    id: String,
    type: String,
    latency: Number,
    power: Number,
    cost: Number,
    status: String,
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema({
  taskName: String,
  compute: Number,
  dataSize: Number,
  urgency: String,

  satellites: [nodeSchema],
  grounds: [nodeSchema],
  allNodes: [nodeSchema],

  aiDecision: String,
  selectedNode: String,
  selectedNodeType: String,
  aiReason: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);