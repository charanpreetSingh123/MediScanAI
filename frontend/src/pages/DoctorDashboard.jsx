import { useEffect, useState } from "react";
import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import DoctorUploadScan from "../components/Doctor/UploadScan";
import PatientList from "../components/Doctor/PatientList";
import ReportViewer from "../components/Doctor/ReportViewer";
import Analytics from "../components/Doctor/Analytics";
import { getDoctorDashboard } from "../utils/api";
import { Users, ScanLine, CheckCircle, AlertTriangle } from "lucide-react";

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </div>
);

const DoctorDashboard = () => {
  const [active, setActive] = useState("Dashboard");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDoctorDashboard()
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  const renderContent = () => {
    switch (active) {
      case "Upload Scan": return <DoctorUploadScan />;
      case "Patients": return <PatientList />;
      case "Reports": return <ReportViewer />;
      case "Analytics": return <Analytics />;
      default:
        return (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Total Scans" value={stats?.total_scans || 0} icon={<ScanLine className="text-blue-600" size={22} />} color="bg-blue-50" />
              <StatCard label="Total Patients" value={stats?.total_patients || 0} icon={<Users className="text-purple-600" size={22} />} color="bg-purple-50" />
              <StatCard label="Positive Cases" value={stats?.positive_scans || 0} icon={<AlertTriangle className="text-red-600" size={22} />} color="bg-red-50" />
              <StatCard label="Negative Cases" value={stats?.negative_scans || 0} icon={<CheckCircle className="text-green-600" size={22} />} color="bg-green-50" />
            </div>
            <Analytics />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="doctor" active={active} setActive={setActive} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DoctorDashboard;