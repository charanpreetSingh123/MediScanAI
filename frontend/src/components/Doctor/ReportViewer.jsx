import { useEffect, useState } from "react";
import { getAllScans } from "../../utils/api";

const ReportViewer = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllScans().then(res => setScans(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "28px",
      border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
          Scan Reports
        </h2>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
          {scans.length} total records
        </p>
      </div>

      {loading ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>Loading...</p>
      ) : scans.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>No reports yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                {["ID", "Patient", "Disease", "Result", "Confidence", "Date"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#94a3b8", fontWeight: "600" }}>#{scan.id}</td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#0f172a", fontWeight: "500" }}>Patient #{scan.patient_id}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontSize: "13px", fontWeight: "500", padding: "4px 10px", borderRadius: "20px",
                      background: scan.disease_type === "brain_tumor" ? "#eff6ff" : scan.disease_type === "diabetic_retinopathy" ? "#f5f3ff" : "#fdf2f8",
                      color: scan.disease_type === "brain_tumor" ? "#1d4ed8" : scan.disease_type === "diabetic_retinopathy" ? "#7c3aed" : "#be185d"
                    }}>
                      {scan.disease_type.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      fontSize: "13px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px",
                      background: scan.result === "Positive" ? "#fef2f2" : scan.result === "Negative" ? "#f0fdf4" : "#f8fafc",
                      color: scan.result === "Positive" ? "#ef4444" : scan.result === "Negative" ? "#22c55e" : "#94a3b8"
                    }}>
                      {scan.result === "Positive" ? "⚠️ " : scan.result === "Negative" ? "✅ " : "⏳ "}{scan.result}
                    </span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>
                    {scan.confidence > 0 ? `${scan.confidence}%` : "—"}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#94a3b8" }}>
                    {new Date(scan.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportViewer;