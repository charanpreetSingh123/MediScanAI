const HeatmapViewer = ({ scanPath, heatmapPath }) => {
  if (!scanPath && !heatmapPath) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Scan Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        {scanPath && (
          <div>
            <p className="text-xs text-slate-500 mb-2 text-center">Original Scan</p>
            <img
              src={`http://localhost:8000/${scanPath}`}
              alt="Original Scan"
              className="w-full rounded-lg border border-slate-200 object-cover"
            />
          </div>
        )}
        {heatmapPath && (
          <div>
            <p className="text-xs text-slate-500 mb-2 text-center">AI Heatmap (Grad-CAM)</p>
            <img
              src={`http://localhost:8000/${heatmapPath}`}
              alt="Heatmap"
              className="w-full rounded-lg border border-slate-200 object-cover"
            />
          </div>
        )}
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">
        Highlighted areas show regions the AI focused on for diagnosis
      </p>
    </div>
  );
};

export default HeatmapViewer;