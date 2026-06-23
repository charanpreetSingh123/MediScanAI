import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import PatientUploadScan from "../components/Patient/UploadScan";
import ScanHistory from "../components/Patient/ScanHistory";
import { getPatientDashboard } from "../utils/api";

const StatCard = ({ label, value, icon, bg }) => (
  <div style={{
    background: "white", borderRadius: "16px", padding: "24px",
    display: "flex", alignItems: "center", gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", flex: 1
  }}>
    <div style={{
      width: "52px", height: "52px", borderRadius: "14px", background: bg,
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0", fontWeight: "500" }}>{label}</p>
    </div>
  </div>
);

const PatientDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getPatientDashboard().then(res => setStats(res.data)).catch(() => {});
  }, []);

  const renderContent = () => {
    switch (active) {
      case "Upload Scan":
        return <PatientUploadScan onResult={(r) => { setResult(r); setActive("Dashboard"); }} />;
      case "Scan History":
        return <ScanHistory />;
      default:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Welcome Banner */}
            <div style={{
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              borderRadius: "20px", padding: "32px",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", margin: "0 0 6px", fontWeight: "500" }}>
                  Welcome back 👋
                </p>
                <h2 style={{ color: "white", fontSize: "26px", fontWeight: "700", margin: "0 0 8px" }}>
                  {localStorage.getItem("name")}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>
                  Your health monitoring dashboard
                </p>
              </div>
              <div style={{ fontSize: "64px" }}>🏥</div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "16px" }}>
              <StatCard label="Total Scans" value={stats?.total_scans || 0} icon="🔬" bg="#eff6ff" />
              <StatCard
                label="Positive Results"
                value={stats?.scans?.filter(s => s.result === "Positive").length || 0}
                icon="⚠️" bg="#fef2f2"
              />
              <StatCard
                label="Negative Results"
                value={stats?.scans?.filter(s => s.result === "Negative").length || 0}
                icon="✅" bg="#f0fdf4"
              />
            </div>

            {/* Upload CTA */}
            <div
              onClick={() => setActive("Upload Scan")}
              style={{
                background: "white", borderRadius: "16px", padding: "24px",
                border: "2px dashed #e2e8f0", cursor: "pointer", textAlign: "center",
                transition: "all 0.15s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.background = "#f8fafc"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "white"; }}
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>📤</div>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "#0f172a", margin: "0 0 4px" }}>Upload New Scan</p>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Click to analyze a medical scan with AI</p>
            </div>

            {result && (
              <div style={{
                background: "white", borderRadius: "16px", padding: "24px",
                border: `2px solid ${result.result === "Positive" ? "#fecaca" : "#bbf7d0"}`,
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: "0 0 16px" }}>
                  Latest Result — {result.disease}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {[
                    { label: "Result", value: result.result, color: result.result === "Positive" ? "#ef4444" : "#22c55e" },
                    { label: "Confidence", value: `${result.confidence}%`, color: "#0f172a" },
                    { label: "Detected", value: result.label || "N/A", color: "#0f172a" },
                  ].map(item => (
                    <div key={item.label} style={{ background: "#f8fafc", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>{item.label}</p>
                      <p style={{ fontSize: "16px", fontWeight: "700", color: item.color, margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ScanHistory />
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar role="patient" active={active} setActive={setActive} />
        <main style={{ flex: 1, padding: "28px", maxWidth: "calc(100vw - 240px)" }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;