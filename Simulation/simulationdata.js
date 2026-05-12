// old random values for node logic
// function createSatellite(id) {
//   return {
//     id,
//     type: "satellite",
//     latency: Math.floor(Math.random() * 300) + 50,
//     cost: Math.floor(Math.random() * 10) + 1,
//     power: Math.floor(Math.random() * 100) + 1,
//     status: Math.random() > 0.2 ? "active" : "down"
//   };
// }

function createSatellite(id) {
  return {
    id,
    type: "satellite",

    latency: 30 + Math.random() * 35,
    power: 75 + Math.random() * 15,
    cost: 6 + Math.random() * 2,

    currentLoad: 10 + Math.random() * 20,

    status: "active",
  };
}
// old random values for node logic
// function createGround(id) {
//   return {
//     id,
//     type: "ground",
//     latency: Math.floor(Math.random() * 120) + 20,
//     cost: Math.floor(Math.random() * 5) + 1,
//     power: Math.floor(Math.random() * 100) + 1,
//     status: Math.random() > 0.2 ? "active" : "down",
//   };
// }

function createGround(id) {
  return {
    id,
    type: "ground",

    latency: 50 + Math.random() * 50,
    power: 85 + Math.random() * 15,
    cost: 2 + Math.random() * 2,

    currentLoad: 10 + Math.random() * 20,

    status: "active",
  };
}

const satellites = [
  createSatellite("sat-1"),
  createSatellite("sat-2"),
  createSatellite("sat-3"),
  createSatellite("sat-4"),
  createSatellite("sat-5"),
  createSatellite("sat-6"),
  createSatellite("sat-7"),
];

const grounds = [
  createGround("ground-1"),
  createGround("ground-2"),
  createGround("ground-3"),
  createGround("ground-4"),
  createGround("ground-5"),
  createGround("ground-6"),
  createGround("ground-7"),
  createGround("ground-8"),
];

function fluctuate(value, min, max, step) {
  const change = Math.random() * step * 2 - step;

  let newValue = value + change;

  if (newValue < min) newValue = min;
  if (newValue > max) newValue = max;

  return Number(newValue.toFixed(1));
}

function updateNode(node) {
  // Smooth latency fluctuation
  node.latency = fluctuate(node.latency, 40, 300, 8);

  // Load changes
  node.currentLoad = fluctuate(node.currentLoad, 0, 100, 10);

  // Power changes slowly
  node.power = fluctuate(node.power, 20, 100, 3);

  // Cost changes slightly
  node.cost = fluctuate(node.cost, 1, 10, 0.5);

  // Load affects latency
  if (node.currentLoad > 80) {
    node.latency += 15;
  }

  // Rare network spike
  if (Math.random() < 0.03) {
    node.latency += 50;
  }

  // Prevent overflow
  node.latency = Number(node.latency.toFixed(1));

  return node;
}

function updateSimulation() {
  satellites.forEach(updateNode);

  grounds.forEach(updateNode);
}

function getSimulationData() {
  updateSimulation();

  return {
    satellites,
    grounds,
    allNodes: [...satellites, ...grounds],
  };
}
module.exports = getSimulationData;
