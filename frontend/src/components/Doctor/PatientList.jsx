import { useEffect, useState } from "react";
import { getAllPatients } from "../../utils/api";
import Loader from "../Common/Loader";
import { User } from "lucide-react";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPatients()
      .then((res) => setPatients(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading patients..." />;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-5">All Patients ({patients.length})</h2>
      {patients.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-8">No patients registered yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {patients.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="text-blue-600" size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-400">{p.email}</p>
              </div>
              <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
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