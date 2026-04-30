import { useEffect, useState } from "react";
import { fetchDecisions } from "../services/api";

const AIDecisions = () => {
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    fetchDecisions().then((res) => setDecisions(res.data || []));
  }, []);

  return (
    <>
      <div className="section-title">AI Decision History</div>

      {decisions.length === 0 ? (
        <div className="glass card-padding">No decisions recorded yet.</div>
      ) : (
        <div className="glass card-padding" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Decision</th>
                <th>Reason</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {decisions.map((d, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: "600" }}>{d.taskName}</td>

                  <td>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background:
                          d.aiDecision === "Satellite"
                            ? "rgba(0,240,255,0.15)"
                            : "rgba(122,92,255,0.15)",
                        border:
                          d.aiDecision === "Satellite"
                            ? "1px solid rgba(0,240,255,0.5)"
                            : "1px solid rgba(122,92,255,0.5)",
                      }}
                    >
                      {d.aiDecision}
                    </span>
                  </td>

                  <td style={{ color: "#9aa4b2", maxWidth: "420px" }}>
                    {d.aiReason}
                  </td>

                  <td style={{ color: "#6b7686" }}>
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AIDecisions;