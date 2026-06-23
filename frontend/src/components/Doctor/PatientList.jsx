import { useEffect, useState } from "react";
import { getAllPatients } from "../../utils/api";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPatients().then(res => setPatients(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{
      background: "white", borderRadius: "16px", padding: "28px",
      border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>Patients</h2>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>{patients.length} registered patients</p>
      </div>

      {loading ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>Loading...</p>
      ) : patients.length === 0 ? (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px" }}>No patients yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {patients.map((p) => (
            <div key={p.id} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "16px", borderRadius: "12px",
              border: "1px solid #f1f5f9", background: "#fafafa"
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "50%",
                background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: "700", fontSize: "16px", flexShrink: 0
              }}>
                {p.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a", margin: "0 0 2px" }}>{p.name}</p>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>{p.email}</p>
              </div>
              <span style={{
                fontSize: "12px", fontWeight: "600", color: "#3b82f6",
                background: "#eff6ff", padding: "4px 10px", borderRadius: "20px"
              }}>
                ID #{p.id}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;