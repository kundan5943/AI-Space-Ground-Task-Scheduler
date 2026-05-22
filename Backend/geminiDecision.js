require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const apiKeys = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
];

let currentKeyIndex = 0;

async function getAIDecision(task, nodes) {
  //  SAFETY CHECK

  if (
    !nodes ||
    !Array.isArray(nodes.satellites) ||
    !Array.isArray(nodes.grounds) ||
    !Array.isArray(nodes.allNodes)
  ) {
    throw new Error("Simulation data missing nodes");
  }

  //  FILTER ACTIVE NODES

  const activeSatellites = nodes.satellites.filter(
    (node) =>
      node.status === "active" && node.power > 15 && node.currentLoad < 95,
  );

  const activeGrounds = nodes.grounds.filter(
    (node) =>
      node.status === "active" && node.power > 15 && node.currentLoad < 95,
  );

  //  FALLBACK IF NO ACTIVE NODES

  if (activeSatellites.length === 0 && activeGrounds.length === 0) {
    return {
      decision: "No Available Node",
      selectedNode: "none",
      nodeType: "none",
      confidence: 0,
      reason: "No active nodes available.",
    };
  }

  //  GEMINI MODEL

  // const model = genAI.getGenerativeModel({
  //   model: "models/gemini-2.5-flash",
  // });

  //  COMPACT NODE TEXT

  const satelliteText = activeSatellites
    .map(
      (node) =>
        `${node.id} | latency:${node.latency} | power:${node.power}% | cost:${node.cost} | load:${node.currentLoad}%`,
    )
    .join("\n");

  const groundText = activeGrounds
    .map(
      (node) =>
        `${node.id} | latency:${node.latency} | power:${node.power}% | cost:${node.cost} | load:${node.currentLoad}%`,
    )
    .join("\n");

  //  PROMPT

  const prompt = `
You are an AI scheduler for a distributed space-ground computing system.

Choose the SINGLE BEST node for this task.

Task:
- Name: ${task.taskName}
- Compute: ${task.compute}
- Data Size: ${task.dataSize} MB
- Urgency: ${task.urgency}

Satellite Nodes:
${satelliteText}

Ground Nodes:
${groundText}

Scheduling Mode:
${task.schedulingMode}
Scheduling Strategy Rules:

1. Balanced AI
- Balance latency, power, cost, and load.

2. Latency Optimized
- Strongly prioritize lowest latency.
- Ideal for real-time and urgent tasks.

3. Cost Optimized
- Prefer lower operational cost.
- Accept slightly higher latency if needed.

4. Power Optimized
- Avoid low-power nodes.
- Preserve satellite energy when possible.

5. Load Balanced
- Prefer nodes with lower current load.
- Avoid overloaded nodes.
Return ONLY valid JSON.

Expected format:
{
  "decision": "Satellite or Ground",
  "selectedNode": "sat-1",
  "nodeType": "satellite",
  "confidence": 0.87,
  "reason": "Short explanation"
}
`;

  //  RETRY MECHANISM

  let result;

  for (let attempt = 1; attempt <= 4; attempt++) {
    const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    try {
      result = await model.generateContent(prompt);

      break;
    } catch (error) {
      console.log(
        `Gemini attempt ${attempt} failed using API Key ${currentKeyIndex + 1}`,
      );

      // ================= SWITCH KEY =================

      if (error.status === 429 || error.status === 503) {
        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;

        console.log(`Switched to API Key ${currentKeyIndex + 1}`);
      }
      if (attempt === 4) {
        console.log("Using fallback scheduler");

        //  FALLBACK LOGIC

        const bestNode = [...activeSatellites, ...activeGrounds].sort(
          (a, b) => {
            return (
              a.latency +
              a.currentLoad +
              a.cost -
              (b.latency + b.currentLoad + b.cost)
            );
          },
        )[0];

        return {
          decision: bestNode.type === "satellite" ? "Satellite" : "Ground",

          selectedNode: bestNode.id,

          nodeType: bestNode.type,

          confidence: 0.5,

          reason:
            "Fallback scheduling used because AI service was temporarily unavailable.",
        };
      }

      // wait before retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  //  CLEAN RESPONSE

  let text = result.response.text().trim();

  text = text.replace(/```json/gi, "");
  text = text.replace(/```/g, "").trim();

  //  PARSE JSON

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini RAW RESPONSE:", text);

    throw new Error("Invalid JSON received from Gemini");
  }
}

module.exports = getAIDecision;
