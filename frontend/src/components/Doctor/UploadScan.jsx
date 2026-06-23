import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { predictBrainTumor, predictDR, predictSkinCancer } from "../../utils/api";
import toast from "react-hot-toast";

const diseases = [
  { key: "brain_tumor", label: "Brain Tumor", icon: "🧠", desc: "MRI Scan", color: "#1d4ed8", bg: "#eff6ff" },
  { key: "diabetic_retinopathy", label: "Diabetic Retinopathy", icon: "👁️", desc: "Eye Fundus", color: "#7c3aed", bg: "#f5f3ff" },
  { key: "skin_cancer", label: "Skin Cancer", icon: "🩺", desc: "Skin Image", color: "#be185d", bg: "#fdf2f8" },
];

const DoctorUploadScan = () => {
  const [selectedDisease, setSelectedDisease] = useState("brain_tumor");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (files) => {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
      setResult(null);
    },
  });

  const handleSubmit = async () => {
    if (!file) return toast.error("Please upload a scan first!");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      let res;
      if (selectedDisease === "brain_tumor") res = await predictBrainTumor(formData);
      else if (selectedDisease === "diabetic_retinopathy") res = await predictDR(formData);
      else res = await predictSkinCancer(formData);
      toast.success("Scan analyzed successfully!");
      setResult(res.data);
    } catch {
      toast.error("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPositive = result?.result === "Positive";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontFamily: "Inter, sans-serif" }}>
      <div style={{
        background: "white", borderRadius: "16px", padding: "28px",
        border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>Analyze Patient Scan</h2>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 24px" }}>Select disease type and upload medical scan</p>

        {/* Disease Selection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "24px" }}>
          {diseases.map((d) => (
            <button
              key={d.key}
              onClick={() => setSelectedDisease(d.key)}
              style={{
                padding: "16px", borderRadius: "12px", border: `2px solid ${selectedDisease === d.key ? d.color : "#f1f5f9"}`,
                background: selectedDisease === d.key ? d.bg : "white",
                cursor: "pointer", textAlign: "center", transition: "all 0.15s", fontFamily: "Inter, sans-serif"
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{d.icon}</div>
              <p style={{ fontSize: "13px", fontWeight: "600", color: selectedDisease === d.key ? d.color : "#64748b", margin: "0 0 2px" }}>{d.label}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{d.desc}</p>
            </button>
          ))}
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? "#3b82f6" : "#e2e8f0"}`,
            borderRadius: "12px", padding: "40px 20px", textAlign: "center",
            cursor: "pointer", background: isDragActive ? "#eff6ff" : "#fafafa",
            marginBottom: "16px", transition: "all 0.15s"
          }}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxHeight: "200px", borderRadius: "10px", objectFit: "contain" }} />
          ) : (
            <div>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>📤</div>
              <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 4px", fontWeight: "500" }}>
                Drag & drop your scan here
              </p>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Supports JPG, PNG, JPEG</p>
            </div>
          )}
        </div>

        {file && (
          <p style={{ fontSize: "12px", color: "#94a3b8", textAlign: "center", marginBottom: "16px" }}>
            📁 {file.name}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !file}
          style={{
            width: "100%", padding: "14px",
            background: loading || !file ? "#cbd5e1" : "linear-gradient(135deg, #1e40af, #3b82f6)",
            color: "white", border: "none", borderRadius: "12px",
            fontSize: "15px", fontWeight: "600", cursor: loading || !file ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif", transition: "all 0.15s"
          }}
        >
          {loading ? "⏳ Analyzing..." : "🔬 Run AI Analysis"}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div style={{
          background: "white", borderRadius: "16px", padding: "28px",
          border: `2px solid ${isPositive ? "#fecaca" : "#bbf7d0"}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: isPositive ? "#fef2f2" : "#f0fdf4",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
            }}>
              {isPositive ? "⚠️" : "✅"}
            </div>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#0f172a", margin: "0 0 2px" }}>{result.disease}</h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>AI Diagnosis Result</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
            {[
              { label: "Result", value: result.result, color: isPositive ? "#ef4444" : "#22c55e" },
              { label: "Confidence", value: `${result.confidence}%`, color: "#0f172a" },
              { label: "Detected", value: result.label || "N/A", color: "#0f172a" },
            ].map(item => (
              <div key={item.label} style={{
                background: "#f8fafc", borderRadius: "10px", padding: "14px", textAlign: "center"
              }}>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600" }}>{item.label}</p>
                <p style={{ fontSize: "16px", fontWeight: "700", color: item.color, margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Confidence Bar */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "500" }}>Confidence Level</span>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>{result.confidence}%</span>
            </div>
            <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${result.confidence}%`,
                background: isPositive ? "linear-gradient(90deg, #ef4444, #f87171)" : "linear-gradient(90deg, #22c55e, #4ade80)",
                borderRadius: "4px", transition: "width 0.5s ease"
              }} />
            </div>
          </div>

          <div style={{
            padding: "12px 16px", borderRadius: "10px",
            background: isPositive ? "#fef2f2" : "#f0fdf4",
            fontSize: "13px", color: isPositive ? "#dc2626" : "#16a34a", fontWeight: "500"
          }}>
            {isPositive
              ? "⚠️ Please consult a medical professional immediately for further evaluation."
              : "✅ No signs detected. Continue regular health checkups."}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorUploadScan;