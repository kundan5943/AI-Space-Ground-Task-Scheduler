import { useEffect, useState } from "react";
import { fetchDecisions, fetchSimulation } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  FaTasks,
  FaSatellite,
  FaBroadcastTower,
  FaClock,
} from "react-icons/fa";

const COLORS = ["#00f0ff", "#7a5cff"];

const Analytics = () => {
  const [decisions, setDecisions] = useState([]);
  const [simulation, setSimulation] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const decisionsRes = await fetchDecisions();
        setDecisions(decisionsRes.data || []);

        const simulationRes = await fetchSimulation();
        setSimulation(simulationRes.data);
      } catch (error) {
        console.error("Error loading analytics data:", error);
      }
    };

    loadData();
  }, []);

  const totalTasks = decisions.length;

  const satelliteTasks = decisions.filter(
    (d) => d.aiDecision === "Satellite"
  ).length;

  const groundTasks = decisions.filter(
    (d) => d.aiDecision === "Ground"
  ).length;

  const satellitePercent = totalTasks
    ? ((satelliteTasks / totalTasks) * 100).toFixed(1)
    : 0;

  const groundPercent = totalTasks
    ? ((groundTasks / totalTasks) * 100).toFixed(1)
    : 0;

  const donutData = [
    { name: "Satellite", value: satelliteTasks },
    { name: "Ground", value: groundTasks },
  ];

  const urgencyDataMap = {
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  };

  decisions.forEach((d) => {
    if (urgencyDataMap[d.urgency] !== undefined) {
      urgencyDataMap[d.urgency]++;
    }
  });

  const urgencyData = Object.keys(urgencyDataMap).map((key) => ({
    name: key,
    tasks: urgencyDataMap[key],
  }));

  const avgSatLatency =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.latency, 0) /
            simulation.satellites.length
        )
      : 0;

  const avgSatPower =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.power, 0) /
            simulation.satellites.length
        )
      : 0;

  const avgSatCost =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.cost, 0) /
            simulation.satellites.length
        )
      : 0;

  const avgGroundLatency =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.latency, 0) /
            simulation.grounds.length
        )
      : 0;

  const avgGroundPower =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.power, 0) /
            simulation.grounds.length
        )
      : 0;

  const avgGroundCost =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.cost, 0) /
            simulation.grounds.length
        )
      : 0;

  const satelliteMetrics = [
    { name: "Latency", value: avgSatLatency },
    { name: "Power", value: avgSatPower },
    { name: "Cost", value: avgSatCost },
  ];

  const groundMetrics = [
    { name: "Latency", value: avgGroundLatency },
    { name: "Power", value: avgGroundPower },
    { name: "Cost", value: avgGroundCost },
  ];

  return (
    <div>
      <div className="section-title">System Analytics</div>

      <div className="analytics-metric-row">
        <div className="glass card-padding metric-box">
          <FaTasks className="metric-icon" />
          <div>
            <div className="metric-label">Total Tasks</div>
            <div className="metric-value">{totalTasks}</div>
          </div>
        </div>

        <div className="glass card-padding metric-box">
          <FaSatellite className="metric-icon" />
          <div>
            <div className="metric-label">Satellite %</div>
            <div className="metric-value">{satellitePercent}%</div>
          </div>
        </div>

        <div className="glass card-padding metric-box">
          <FaBroadcastTower className="metric-icon" />
          <div>
            <div className="metric-label">Ground %</div>
            <div className="metric-value">{groundPercent}%</div>
          </div>
        </div>

        <div className="glass card-padding metric-box">
          <FaClock className="metric-icon" />
          <div>
            <div className="metric-label">Avg Sat Latency</div>
            <div className="metric-value">{avgSatLatency} ms</div>
          </div>
        </div>
      </div>

      <div className="glass card-padding chart-card">
        <div className="chart-title">Decision Split</div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={5}
              dataKey="value"
            >
              {donutData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="analytics-grid">
        <div className="glass card-padding chart-card">
          <div className="chart-title">Tasks by Urgency</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={urgencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9aa4b2" />
              <YAxis stroke="#9aa4b2" />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#00f0ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass card-padding chart-card">
          <div className="chart-title">Satellite Node Metrics</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={satelliteMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9aa4b2" />
              <YAxis stroke="#9aa4b2" />
              <Tooltip />
              <Bar dataKey="value" fill="#7a5cff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass card-padding chart-card">
          <div className="chart-title">Ground Node Metrics</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={groundMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9aa4b2" />
              <YAxis stroke="#9aa4b2" />
              <Tooltip />
              <Bar dataKey="value" fill="#00f0ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;