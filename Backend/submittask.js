const axios = require("axios");
const Task = require("./models/task"); // adjust path if different
const { getSimulationData } = require("./simulation"); // adjust path if different

app.post("/submit-task", async (req, res) => {
  try {
    const task = req.body;

    // ===============================
    // 🧠 AI VALIDATION START
    // ===============================
    try {
      const taskText = task.taskName || task.name || task.title || "";

console.log("Task sent to AI:", taskText);

const aiCheck = await axios.post("http://127.0.0.1:5001/validate-task", {
  task: taskText
});

      if (aiCheck.data.status !== "VALID") {
        return res.status(400).json({
          error: "Task rejected: Not a valid AI/space computing task"
        });
      }

    } catch (err) {
      return res.status(400).json({
        error: "Task rejected by AI validation server"
      });
    }
    // ===============================
    // 🧠 AI VALIDATION END
    // ===============================


    const nodes = getSimulationData();

    let decision = "space";
    if (task.urgency === "high" || nodes.ground.latency < 50) {
      decision = "ground";
    }

    // Save task in MongoDB
    const newTask = new Task({
      ...task,
      decision,
      nodes
    });

    await newTask.save();

    res.json({
      message: "Task saved successfully!",
      task,
      nodes,
      decision
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});