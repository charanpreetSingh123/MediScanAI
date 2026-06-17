import { useEffect, useState } from "react";
import { getPatientDashboard } from "../../utils/api";
import Loader from "../Common/Loader";
import { CheckCircle, AlertTriangle } from "lucide-react";

const ScanHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatientDashboard()
      .then((res) => setScans(res.data.scans || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading scan history..." />;

  if (scans.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
        <p className="text-slate-400 text-sm">No scans yet. Upload your first scan!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-5">Scan History</h2>
      <div className="flex flex-col gap-3">
        {scans.map((scan) => (
          <div key={scan.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              {scan.result === "Positive"
                ? <AlertTriangle className="text-red-500" size={18} />
                : <CheckCircle className="text-green-500" size={18} />
              }
              <div>
                <p className="text-sm font-medium text-slate-700 capitalize">
                  {scan.disease_type.replace("_", " ")}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(scan.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full
                ${scan.result === "Positive" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {scan.result}
              </span>
              <p className="text-xs text-slate-400 mt-1">{scan.confidence}% confidence</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;