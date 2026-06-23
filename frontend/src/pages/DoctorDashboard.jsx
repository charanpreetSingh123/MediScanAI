import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import DoctorUploadScan from "../components/Doctor/UploadScan";
import PatientList from "../components/Doctor/PatientList";
import ReportViewer from "../components/Doctor/ReportViewer";
import Analytics from "../components/Doctor/Analytics";
import { getDoctorDashboard } from "../utils/api";

const StatCard = ({ label, value, icon, color, bg }) => (
  <div style={{
    background: "white",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    border: "1px solid #f1f5f9",
    flex: 1
  }}>
    <div style={{
      width: "52px", height: "52px", borderRadius: "14px",
      background: bg, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: "22px", flexShrink: 0
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0, lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0", fontWeight: "500" }}>
        {label}
      </p>
    </div>
  </div>
);

const DoctorDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDoctorDashboard().then(res => setStats(res.data)).catch(() => {});
  }, []);

  const renderContent = () => {
    switch (active) {
      case "Upload Scan": return <DoctorUploadScan />;
      case "Patients": return <PatientList />;
      case "Reports": return <ReportViewer />;
      case "Analytics": return <Analytics />;
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
                  Good day, Doctor 👋
                </p>
                <h2 style={{ color: "white", fontSize: "26px", fontWeight: "700", margin: "0 0 8px" }}>
                  MediScan AI Dashboard
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>
                  AI-powered multi-disease detection platform
                </p>
              </div>
              <div style={{ fontSize: "64px" }}>🏥</div>
            </div>

            {/* Stat Cards */}
            <div style={{ display: "flex", gap: "16px" }}>
              <StatCard label="Total Scans" value={stats?.total_scans || 0} icon="🔬" bg="#eff6ff" />
              <StatCard label="Total Patients" value={stats?.total_patients || 0} icon="👥" bg="#f0fdf4" />
              <StatCard label="Positive Cases" value={stats?.positive_scans || 0} icon="⚠️" bg="#fef2f2" />
              <StatCard label="Negative Cases" value={stats?.negative_scans || 0} icon="✅" bg="#f0fdf4" />
            </div>

            {/* Quick Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              {[
                { icon: "🧠", label: "Brain Tumor", desc: "MRI Scan Analysis", color: "#3b82f6", bg: "#eff6ff" },
                { icon: "👁️", label: "Diabetic Retinopathy", desc: "Eye Fundus Analysis", color: "#8b5cf6", bg: "#f5f3ff" },
                { icon: "🩺", label: "Skin Cancer", desc: "Dermoscopy Analysis", color: "#ec4899", bg: "#fdf2f8" },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={() => setActive("Upload Scan")}
                  style={{
                    background: "white", borderRadius: "16px", padding: "24px",
                    border: "1px solid #f1f5f9", cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: item.bg, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "22px", marginBottom: "12px"
                  }}>
                    {item.icon}
                  </div>
                  <p style={{ fontWeight: "700", color: "#0f172a", margin: "0 0 4px", fontSize: "15px" }}>{item.label}</p>
                  <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Recent Scans Preview */}
            <Analytics />
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar role="doctor" active={active} setActive={setActive} />
        <main style={{ flex: 1, padding: "28px", maxWidth: "calc(100vw - 240px)" }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;