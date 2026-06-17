import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import PatientUploadScan from "../components/Patient/UploadScan";
import ScanHistory from "../components/Patient/ScanHistory";
import ResultCard from "../components/Patient/ResultCard";
import { getPatientDashboard } from "../utils/api";
import { ScanLine, CheckCircle, AlertTriangle } from "lucide-react";

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </div>
);

const PatientDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getPatientDashboard()
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  const renderContent = () => {
    switch (active) {
      case "Upload Scan":
        return <PatientUploadScan onResult={(r) => { setResult(r); setActive("Dashboard"); }} />;
      case "Scan History":
        return <ScanHistory />;
      default:
        return (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-4">
              <StatCard label="Total Scans" value={stats?.total_scans || 0} icon={<ScanLine className="text-blue-600" size={22} />} color="bg-blue-50" />
              <StatCard
                label="Positive Results"
                value={stats?.scans?.filter(s => s.result === "Positive").length || 0}
                icon={<AlertTriangle className="text-red-600" size={22} />}
                color="bg-red-50"
              />
              <StatCard
                label="Negative Results"
                value={stats?.scans?.filter(s => s.result === "Negative").length || 0}
                icon={<CheckCircle className="text-green-600" size={22} />}
                color="bg-green-50"
              />
            </div>
            {result && <ResultCard result={result} />}
            <ScanHistory />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="patient" active={active} setActive={setActive} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default PatientDashboard;