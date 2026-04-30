require("dotenv").config();
const calculateExecutionTime = require("./executionTime");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const getSimulationData = require("../Simulation/simulationdata");
const Task = require("./models/Task");
const getAIDecision = require("./geminiDecision");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  DATABASE 
mongoose
  .connect("mongodb://127.0.0.1:27017/ai_task_scheduler")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//  LIVE NODE STATE 
let currentNodes = getSimulationData();

// Update node environment every 5 seconds
setInterval(() => {
  currentNodes = getSimulationData();
  // console.log("Node environment updated");
}, 5000);

//  SERVER 
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

//  ROUTES 

// Simulation
app.get("/simulation", (req, res) => {
  res.json(currentNodes);
});

// Submit Task
app.post("/aiTaskSchedular/submitTask", async (req, res) => {
  try {
    const taskName = req.body.taskName;

    // AI VALIDATION CHECK
    let aiCheck;
    try {
      aiCheck = await axios.post("http://127.0.0.1:5001/validate-task", {
        task: taskName,
      });
    } catch (err) {
      return res.json({ error: "AI validation server not running" });
    }

    if (aiCheck.data.status !== "VALID") {
      return res.json({ error: "Entered task is invalid" });
    }

    // Normalize input
    const taskInput = {
      taskName,
      compute: Number(req.body.computePower),
      dataSize: Number(req.body.dataSize),
      urgency: req.body.urgency,
    };

    const nodes = currentNodes;

    const aiResult = await getAIDecision(taskInput, nodes);

    const savedTask = new Task({
      taskName: taskInput.taskName,
      compute: taskInput.compute,
      dataSize: taskInput.dataSize,
      urgency: taskInput.urgency,

      satellites: nodes.satellites,
      grounds: nodes.grounds,
      allNodes: nodes.allNodes,

      aiDecision: aiResult.decision,
      selectedNode: aiResult.selectedNode,
      selectedNodeType: aiResult.nodeType,
      aiReason: aiResult.reason,
    });

    await savedTask.save();

    res.json(aiResult);
  } catch (error) {
    console.log(error);
    res.json({ error: "Task processing failed" });
  }
});

// Decisions
app.get("/aiTaskSchedular/decisions", async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});