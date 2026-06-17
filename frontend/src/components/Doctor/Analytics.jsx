import { useEffect, useState } from "react";
import { getDoctorDashboard, getAllScans } from "../../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import Loader from "../Common/Loader";

const COLORS = ["#2563eb", "#dc2626", "#16a34a", "#d97706", "#7c3aed"];

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDoctorDashboard(), getAllScans()])
      .then(([dashRes, scanRes]) => {
        setStats(dashRes.data);
        setScans(scanRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading analytics..." />;

  const diseaseData = ["brain_tumor", "diabetic_retinopathy", "skin_cancer"].map((d) => ({
    name: d.replace("_", " ").replace("_", " "),
    count: scans.filter((s) => s.disease_type === d).length,
  }));

  const resultData = [
    { name: "Positive", value: stats?.positive_scans || 0 },
    { name: "Negative", value: stats?.negative_scans || 0 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-600 mb-4">Scans by Disease</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={diseaseData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-600 mb-4">Result Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={resultData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label>
                {resultData.map((_, i) => <Cell key={i} fill={i === 0 ? "#dc2626" : "#16a34a"} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;