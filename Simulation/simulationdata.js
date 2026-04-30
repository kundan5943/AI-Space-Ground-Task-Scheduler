function createSatellite(id) {
  return {
    id,
    type: "satellite",
    latency: Math.floor(Math.random() * 300) + 50,
    cost: Math.floor(Math.random() * 10) + 1,
    power: Math.floor(Math.random() * 100) + 1,
    status: Math.random() > 0.2 ? "active" : "down"
  };
}

function createGround(id) {
  return {
    id,
    type: "ground",
    latency: Math.floor(Math.random() * 120) + 20,
    cost: Math.floor(Math.random() * 5) + 1,
    power: Math.floor(Math.random() * 100) + 1,
    status: Math.random() > 0.2 ? "active" : "down"
  };
}

function getSimulationData() {
  const satellites = [
    createSatellite("sat-1"),
    createSatellite("sat-2"),
    createSatellite("sat-3"),
    createSatellite("sat-4"),
    createSatellite("sat-5"),
    createSatellite("sat-6"),
    createSatellite("sat-7")
  ];

  const grounds = [
    createGround("ground-1"),
    createGround("ground-2"),
    createGround("ground-3"),
    createGround("ground-4"),
    createGround("ground-5"),
    createGround("ground-6"),
    createGround("ground-7"),
    createGround("ground-8")
    
  ];

  return {
    satellites,
    grounds,
    allNodes: [...satellites, ...grounds],
  };
}

module.exports = getSimulationData;