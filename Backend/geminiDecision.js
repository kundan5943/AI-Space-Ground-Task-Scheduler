require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getAIDecision(task, nodes) {
  // Safety check for multi-node simulation data
  if (
    !nodes ||
    !Array.isArray(nodes.satellites) ||
    !Array.isArray(nodes.grounds) ||
    !Array.isArray(nodes.allNodes)
  ) {
    throw new Error("Simulation data missing satellites, grounds, or allNodes");
  }

  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash",
  });

  const satelliteText = nodes.satellites
    .map(
      (node) => `
- ID: ${node.id}
  Type: ${node.type}
  Latency: ${node.latency} ms
  Power: ${node.power} %
  Cost: ${node.cost}
  Status: ${node.status}`
    )
    .join("\n");

  const groundText = nodes.grounds
    .map(
      (node) => `
- ID: ${node.id}
  Type: ${node.type}
  Latency: ${node.latency} ms
  Power: ${node.power} %
  Cost: ${node.cost}
  Status: ${node.status}`
    )
    .join("\n");

  const prompt = `
You are an AI task scheduler for a space-ground computing system.

Your job is to select the single best node for task execution from the available satellite and ground nodes.

Task Details:
- Task Name: ${task.taskName}
- Compute Power Required: ${task.compute}
- Data Size: ${task.dataSize} MB
- Urgency: ${task.urgency}

Available Satellite Nodes:
${satelliteText}

Available Ground Nodes:
${groundText}

Decision Rules:
- Prefer lower latency for urgent tasks.
- Prefer nodes with sufficient power.
- Prefer lower cost when performance is acceptable.
- Ignore nodes that are not active.
- Return only one best node.

IMPORTANT:
Respond ONLY in pure JSON.
Do NOT add markdown, backticks, or extra text.

Expected JSON format:
{
  "decision": "Satellite or Ground",
  "selectedNode": "sat-1 or ground-1",
  "nodeType": "satellite or ground",
  "reason": "4 to 5 line explanation"
}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Remove markdown fences if Gemini adds them
  text = text.replace(/```json/gi, "");
  text = text.replace(/```/g, "").trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini RAW RESPONSE:", text);
    throw new Error("Invalid JSON received from Gemini");
  }
}

module.exports = getAIDecision;