import { useEffect, useState } from "react";
import { fetchSimulation } from "../services/api";

const LiveMonitor = () => {
  const [simulation, setSimulation] = useState(null);

  useEffect(() => {
    const loadSimulation = async () => {
      try {
        const res = await fetchSimulation();
        setSimulation(res.data);
      } catch (error) {
        console.error("Error fetching simulation data:", error);
      }
    };

    loadSimulation();

    const interval = setInterval(() => {
      loadSimulation();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="section-title">Live System Monitor</div>

      {!simulation ? (
        <div className="glass card-padding">Loading simulation data...</div>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
              marginBottom: "30px",
            }}
          >
            <div className="glass card-padding hover-lift">
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Satellite Nodes
              </div>

              {simulation.satellites.map((node) => (
                <NodeCard key={node.id} node={node} />
              ))}
            </div>

            <div className="glass card-padding hover-lift">
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Ground Nodes
              </div>

              {simulation.grounds.map((node) => (
                <NodeCard key={node.id} node={node} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const NodeCard = ({ node }) => {
  return (
    <div
      style={{
        marginBottom: "24px",
        padding: "16px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
          marginBottom: "14px",
          color: "#00f0ff",
        }}
      >
        {node.id} ({node.type})
      </div>

      <StatusBar label="Latency" value={node.latency} unit="ms" max={500} />
      <StatusBar label="Power Usage" value={node.power} unit="%" max={100} />
      <StatusBar label="Operational Cost" value={node.cost} unit="" max={10} />

      <div style={{ marginTop: "8px", color: "#9aa4b2" }}>
        Status:{" "}
        <strong style={{ color: "white" }}>{node.status}</strong>
      </div>
    </div>
  );
};

const StatusBar = ({ label, value, unit, max }) => {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div style={{ marginBottom: "18px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: "#9aa4b2" }}>{label}</span>
        <span style={{ fontWeight: "600" }}>
          {value} {unit}
        </span>
      </div>

      <div
        style={{
          height: "10px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: percent + "%",
            height: "100%",
            background: "linear-gradient(90deg,#00f0ff,#7a5cff)",
            boxShadow: "0 0 10px rgba(0,240,255,0.7)",
            transition: "width .6s ease",
          }}
        />
      </div>
    </div>
  );
};

export default LiveMonitor;