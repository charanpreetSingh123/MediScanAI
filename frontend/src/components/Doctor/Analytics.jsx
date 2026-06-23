import { useEffect, useState } from "react";
import { getDoctorDashboard, getAllScans } from "../../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [scans, setScans] = useState([]);

  useEffect(() => {
    Promise.all([getDoctorDashboard(), getAllScans()])
      .then(([dashRes, scanRes]) => {
        setStats(dashRes.data);
        setScans(scanRes.data);
      }).catch(() => {});
  }, []);

  const diseaseData = [
    { name: "Brain Tumor", count: scans.filter(s => s.disease_type === "brain_tumor").length },
    { name: "Diabetic Ret.", count: scans.filter(s => s.disease_type === "diabetic_retinopathy").length },
    { name: "Skin Cancer", count: scans.filter(s => s.disease_type === "skin_cancer").length },
  ];

  const resultData = [
    { name: "Positive", value: stats?.positive_scans || 0 },
    { name: "Negative", value: stats?.negative_scans || 0 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Bar Chart */}
        <div style={{
          background: "white", borderRadius: "16px", padding: "24px",
          border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>Scans by Disease</p>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Total scans per category</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={diseaseData} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={{
          background: "white", borderRadius: "16px", padding: "24px",
          border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <p style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>Result Distribution</p>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Positive vs Negative results</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={resultData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={4}>
                <Cell fill="#ef4444" />
                <Cell fill="#22c55e" />
              </Pie>
              <Legend iconType="circle" />
              <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;