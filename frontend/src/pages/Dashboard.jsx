import { useEffect, useState } from "react";
import { fetchSimulation, fetchDecisions } from "../services/api";

const Dashboard = () => {
  const [simulation, setSimulation] = useState(null);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const simRes = await fetchSimulation();
        setSimulation(simRes.data);

        const decRes = await fetchDecisions();
        setDecisions(decRes.data || []);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
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

  const lastDecision = decisions[0];

  const satelliteCount = simulation?.satellites?.length || 0;
  const groundCount = simulation?.grounds?.length || 0;

  const avgLatency =
    simulation?.allNodes?.length
      ? Math.round(
          simulation.allNodes.reduce((sum, node) => sum + node.latency, 0) /
            simulation.allNodes.length
        )
      : "--";

  const avgSatLatency =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.latency, 0) /
            simulation.satellites.length
        )
      : "--";

  const avgSatPower =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.power, 0) /
            simulation.satellites.length
        )
      : "--";

  const avgSatCost =
    simulation?.satellites?.length
      ? Math.round(
          simulation.satellites.reduce((sum, node) => sum + node.cost, 0) /
            simulation.satellites.length
        )
      : "--";

  const avgGroundLatency =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.latency, 0) /
            simulation.grounds.length
        )
      : "--";

  const avgGroundPower =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.power, 0) /
            simulation.grounds.length
        )
      : "--";

  const avgGroundCost =
    simulation?.grounds?.length
      ? Math.round(
          simulation.grounds.reduce((sum, node) => sum + node.cost, 0) /
            simulation.grounds.length
        )
      : "--";

  return (
    <>
      <div className="section-title">System Overview</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "22px",
          marginBottom: "35px",
        }}
      >
        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Active Satellites
          </div>
          <div style={{ fontSize: "34px", fontWeight: "700" }}>
            {satelliteCount}
          </div>
          <div style={{ color: "#6b7686", marginTop: "6px" }}>
            Live simulation count
          </div>
        </div>

        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Ground Nodes
          </div>
          <div style={{ fontSize: "34px", fontWeight: "700" }}>
            {groundCount}
          </div>
          <div style={{ color: "#6b7686", marginTop: "6px" }}>
            Live simulation count
          </div>
        </div>

        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Tasks Today
          </div>
          <div style={{ fontSize: "34px", fontWeight: "700" }}>
            {totalTasks}
          </div>
          <div style={{ color: "#6b7686", marginTop: "6px" }}>
            From database
          </div>
        </div>

        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Avg Latency
          </div>
          <div style={{ fontSize: "34px", fontWeight: "700" }}>
            {avgLatency} ms
          </div>
          <div style={{ color: "#6b7686", marginTop: "6px" }}>
            Across all nodes
          </div>
        </div>
      </div>

      {simulation && (
        <>
          <div className="section-title">Live Simulation State</div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
              marginBottom: "35px",
            }}
          >
            <div className="glass card-padding hover-lift">
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}
              >
                Satellite System
              </div>
              <div style={{ color: "#9aa4b2", lineHeight: "28px" }}>
                <div>
                  Latency:{" "}
                  <strong style={{ color: "white" }}>
                    {avgSatLatency} ms
                  </strong>
                </div>
                <div>
                  Power:{" "}
                  <strong style={{ color: "white" }}>
                    {avgSatPower}%
                  </strong>
                </div>
                <div>
                  Cost:{" "}
                  <strong style={{ color: "white" }}>
                    {avgSatCost}
                  </strong>
                </div>
              </div>
            </div>

            <div className="glass card-padding hover-lift">
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "14px",
                }}
              >
                Ground System
              </div>
              <div style={{ color: "#9aa4b2", lineHeight: "28px" }}>
                <div>
                  Latency:{" "}
                  <strong style={{ color: "white" }}>
                    {avgGroundLatency} ms
                  </strong>
                </div>
                <div>
                  Power:{" "}
                  <strong style={{ color: "white" }}>
                    {avgGroundPower}%
                  </strong>
                </div>
                <div>
                  Cost:{" "}
                  <strong style={{ color: "white" }}>
                    {avgGroundCost}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="section-title">Task Distribution</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "22px",
          marginBottom: "35px",
        }}
      >
        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Satellite Decisions
          </div>
          <div style={{ fontSize: "30px", fontWeight: "700" }}>
            {satelliteTasks}
          </div>
        </div>

        <div className="glass card-padding hover-lift">
          <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>
            Ground Decisions
          </div>
          <div style={{ fontSize: "30px", fontWeight: "700" }}>
            {groundTasks}
          </div>
        </div>
      </div>

      {lastDecision && (
        <>
          <div className="section-title">Last AI Decision</div>

          <div
            className="glass card-padding hover-lift"
            style={{ maxWidth: "700px" }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ color: "#9aa4b2" }}>Task Name</span>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>
                {lastDecision.taskName}
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <span style={{ color: "#9aa4b2" }}>AI Decision</span>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#00f0ff",
                }}
              >
                {lastDecision.aiDecision}
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <span style={{ color: "#9aa4b2" }}>Selected Node</span>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>
                {lastDecision.selectedNode || "--"}
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <span style={{ color: "#9aa4b2" }}>Node Type</span>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>
                {lastDecision.selectedNodeType || "--"}
              </div>
            </div>

            <div>
              <span style={{ color: "#9aa4b2" }}>Reason</span>
              <div style={{ lineHeight: "26px" }}>{lastDecision.aiReason}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;