function calculateExecutionTime(task, node) {
  const dataTransferTime = task.dataSize / 20;
  const computeTime = (task.compute / node.power) * 2;
  const latencyDelay = node.latency / 100;

  const totalTime = dataTransferTime + computeTime + latencyDelay;

  return Number(totalTime.toFixed(2));
}

module.exports = calculateExecutionTime;