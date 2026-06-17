import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { predictBrainTumor, predictDR, predictSkinCancer } from "../../utils/api";
import toast from "react-hot-toast";
import { Upload, Brain, Eye, Scan } from "lucide-react";

const diseases = [
  { key: "brain_tumor", label: "Brain Tumor", icon: <Brain size={20} />, color: "blue" },
  { key: "diabetic_retinopathy", label: "Diabetic Retinopathy", icon: <Eye size={20} />, color: "purple" },
  { key: "skin_cancer", label: "Skin Cancer", icon: <Scan size={20} />, color: "pink" },
];

const UploadScan = ({ onResult }) => {
  const [selectedDisease, setSelectedDisease] = useState("brain_tumor");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (files) => {
      setFile(files[0]);
      setPreview(URL.createObjectURL(files[0]));
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
      onResult(res.data);
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error("Prediction failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-5">Upload Medical Scan</h2>

      {/* Disease Selection */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {diseases.map((d) => (
          <button
            key={d.key}
            onClick={() => setSelectedDisease(d.key)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition
              ${selectedDisease === d.key
                ? "border-blue-600 bg-blue-50 text-blue-600"
                : "border-slate-200 text-slate-500 hover:border-slate-300"}`}
          >
            {d.icon}
            {d.label}
          </button>
        ))}
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition mb-4
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400"}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-400">
            <Upload size={36} />
            <p className="text-sm">Drag & drop your scan here, or click to browse</p>
            <p className="text-xs">Supports JPG, PNG, JPEG</p>
          </div>
        )}
      </div>

      {file && (
        <p className="text-xs text-slate-500 mb-4 text-center">📁 {file.name}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Scan"}
      </button>
    </div>
  );
};

export default UploadScan;