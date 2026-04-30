import { useState } from "react";
import { submitTask } from "../services/api";

const SubmitTask = () => {
  const [taskName, setTaskName] = useState("");
  const [computePower, setComputePower] = useState(50);
  const [dataSize, setDataSize] = useState(300);
  const [urgency, setUrgency] = useState("Medium");

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAiResult(null);

    try {
      const res = await submitTask({
        taskName,
        computePower,
        dataSize,
        urgency,
      });

      // Backend sends error inside response
      if (res.data.error) {
        setError(res.data.error);
      } else {
        setAiResult(res.data);
      }

    } catch (err) {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <h1>Submit Task</h1>

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Urgency</label>
            <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="form-group">
            <label>Compute Power: {computePower}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={computePower}
              onChange={(e) => setComputePower(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Data Size: {dataSize} MB</label>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={dataSize}
              onChange={(e) => setDataSize(e.target.value)}
            />
          </div>

        </div>

        <button className="btn" disabled={loading}>
          {loading ? "Processing..." : "Submit Task"}
        </button>
      </form>

      {error && (
        <div className="card" style={{ marginTop: "20px", color: "#ff4d4f" }}>
          {error}
        </div>
      )}

{aiResult && (
  <div
    className="glass card-padding hover-lift"
    style={{
      marginTop: "28px",
      border: "1px solid rgba(0,240,255,0.25)",
      boxShadow: "0 0 18px rgba(0,240,255,0.12)",
      borderRadius: "18px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px",
      }}
    >
      <h2 style={{ margin: 0 }}>AI Decision Result</h2>

      <span
        style={{
          padding: "8px 14px",
          borderRadius: "999px",
          fontWeight: "700",
          background:
            aiResult.nodeType === "satellite"
              ? "rgba(0,240,255,0.15)"
              : "rgba(122,92,255,0.18)",
          color:
            aiResult.nodeType === "satellite" ? "#00f0ff" : "#a78bfa",
          border:
            aiResult.nodeType === "satellite"
              ? "1px solid rgba(0,240,255,0.35)"
              : "1px solid rgba(167,139,250,0.35)",
        }}
      >
        {aiResult.decision}
      </span>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          padding: "14px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ color: "#9aa4b2", marginBottom: "6px" }}>
          Selected Node
        </div>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>
          {aiResult.selectedNode || "--"}
        </div>
      </div>

      <div
        style={{
          padding: "14px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ color: "#9aa4b2", marginBottom: "6px" }}>
          Node Type
        </div>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>
          {aiResult.nodeType || "--"}
        </div>
      </div>
    </div>

    <div
      style={{
        padding: "16px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ color: "#9aa4b2", marginBottom: "8px" }}>AI Reasoning</div>
      <div style={{ lineHeight: "28px" }}>{aiResult.reason}</div>
    </div>
  </div>
)}
    </div>
  );
};

export default SubmitTask;