export default function Header() {
  return (
    <header
      className="glass"
      style={{
        margin: "20px 30px 0 30px",
        padding: "18px 28px",
        borderRadius: "18px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: "20px",
        zIndex: 10
      }}
    >
      <div>
        <div style={{
          fontSize: "20px",
          fontWeight: "700",
          letterSpacing: "0.6px",
          background: "linear-gradient(90deg,#00f0ff,#ffffff)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          AI Smart Task Scheduling Dashboard
        </div>

        <div style={{
          fontSize: "13px",
          color: "#9aa4b2",
          marginTop: "4px"
        }}>
          Real-time monitoring • Intelligent decisions • Analytics
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        
        <div style={{
          padding: "8px 14px",
          borderRadius: "30px",
          background: "rgba(0,240,255,0.08)",
          border: "1px solid rgba(0,240,255,0.35)",
          fontSize: "13px",
          letterSpacing: ".4px"
        }}>
          System Active
        </div>

        <div style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#00f0ff,#7a5cff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700"
        }}>
          AI
        </div>

      </div>
    </header>
  );
}