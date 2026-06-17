import { useEffect, useState } from "react";
import { getAllScans } from "../../utils/api";
import Loader from "../Common/Loader";
import { FileText, AlertTriangle, CheckCircle } from "lucide-react";

const ReportViewer = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllScans()
      .then((res) => setScans(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading reports..." />;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-5">All Scan Reports ({scans.length})</h2>
      {scans.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-8">No reports yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">ID</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Patient</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Disease</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Result</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Confidence</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-500">#{scan.id}</td>
                  <td className="py-3 px-4 text-slate-700">Patient #{scan.patient_id}</td>
                  <td className="py-3 px-4 text-slate-700 capitalize">{scan.disease_type.replace(/_/g, " ")}</td>
                  <td className="py-3 px-4">
                    <span className={`flex items-center gap-1 text-xs font-semibold w-fit px-2 py-1 rounded-full
                      ${scan.result === "Positive" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                      {scan.result === "Positive"
                        ? <AlertTriangle size={12} />
                        : <CheckCircle size={12} />}
                      {scan.result}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{scan.confidence}%</td>
                  <td className="py-3 px-4 text-slate-400">{new Date(scan.created_at).toLocaleDateString()}</td>
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