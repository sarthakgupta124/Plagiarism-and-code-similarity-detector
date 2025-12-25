import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Fix 1: Added Import

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    // Fix 2: Changed selectedFiles to files
    navigate("/analysis", { state: { uploadedFiles: files } });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-40 px-4 z-10">
      <div className="relative w-full max-w-2xl border-2 border-dashed border-gray-500/40 rounded-xl p-12 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md hover:border-yellow-400 transition-all cursor-pointer group">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800/80 mb-4 group-hover:scale-110 transition-transform">
          <Upload className="text-yellow-400" size={32} />
        </div>
        <p className="text-xl font-medium text-white">Drop your source code files here</p>
        <p className="text-sm text-gray-400 mt-2">or click to browse</p>
        
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer" 
        />
      </div>

      {files.length > 0 && (
        <div className="mt-8 w-full max-w-2xl bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <p className="text-gray-400 mb-3 font-medium">Uploaded Files ({files.length})</p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 border border-gray-700/50 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={files.length < 2}
            className={`mt-6 w-full py-3 rounded-lg font-bold shadow-lg transition-all duration-300
              ${files.length < 2
                ? "bg-gray-600/50 cursor-not-allowed text-gray-400"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white transform hover:-translate-y-1"
              }`}
          >
            Analyze Code
          </button>
        </div>
      )}

      <p className="mt-12 text-gray-500 text-sm">
        Built for hackathons • Powered by BugSmashers 🌞
      </p>
    </div>
  );
};

export default Dashboard;