import { CheckCircle, AlertTriangle, Activity } from "lucide-react";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const isPositive = result.result === "Positive";

  return (
    <div className={`rounded-xl border-2 p-6 ${isPositive ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}>
      <div className="flex items-center gap-3 mb-4">
        {isPositive
          ? <AlertTriangle className="text-red-500" size={28} />
          : <CheckCircle className="text-green-500" size={28} />
        }
        <div>
          <h3 className="font-bold text-slate-800 text-lg">{result.disease}</h3>
          <p className="text-xs text-slate-500">AI Diagnosis Result</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Result</p>
          <p className={`font-bold text-lg ${isPositive ? "text-red-600" : "text-green-600"}`}>
            {result.result}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Confidence</p>
          <p className="font-bold text-lg text-slate-800">{result.confidence}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-xs text-slate-500 mb-1">Detected</p>
          <p className="font-bold text-sm text-slate-800">{result.label || "N/A"}</p>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Confidence Level</span>
          <span>{result.confidence}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${isPositive ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      <p className={`text-xs mt-3 p-3 rounded-lg ${isPositive ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
        {isPositive
          ? "⚠️ Please consult a medical professional immediately for further evaluation."
          : "✅ No signs detected. Continue regular health checkups."}
      </p>
    </div>
  );
};

export default ResultCard;