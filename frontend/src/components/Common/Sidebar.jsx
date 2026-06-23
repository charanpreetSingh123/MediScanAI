const doctorLinks = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Upload Scan", icon: "⬆" },
  { label: "Patients", icon: "👥" },
  { label: "Reports", icon: "📋" },
  { label: "Analytics", icon: "📊" },
];

const patientLinks = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Upload Scan", icon: "⬆" },
  { label: "Scan History", icon: "🕐" },
];

const Sidebar = ({ role, active, setActive }) => {
  const links = role === "doctor" ? doctorLinks : patientLinks;

  return (
    <aside style={{
      width: "240px",
      minHeight: "calc(100vh - 64px)",
      background: "white",
      borderRight: "1px solid #f1f5f9",
      padding: "20px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      fontFamily: "Inter, sans-serif",
      flexShrink: 0
    }}>
      <p style={{ fontSize: "11px", fontWeight: "600", color: "#94a3b8", padding: "0 12px 8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
        Menu
      </p>
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => setActive(link.label)}
          style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "11px 14px", borderRadius: "10px",
            border: "none", cursor: "pointer", width: "100%",
            textAlign: "left", fontSize: "14px", fontWeight: "500",
            fontFamily: "Inter, sans-serif",
            background: active === link.label ? "#eff6ff" : "transparent",
            color: active === link.label ? "#1d4ed8" : "#64748b",
            transition: "all 0.15s"
          }}
          onMouseEnter={e => { if (active !== link.label) e.currentTarget.style.background = "#f8fafc"; }}
          onMouseLeave={e => { if (active !== link.label) e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{link.icon}</span>
          {link.label}
          {active === link.label && (
            <span style={{ marginLeft: "auto", width: "6px", height: "6px", borderRadius: "50%", background: "#1d4ed8" }} />
          )}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;