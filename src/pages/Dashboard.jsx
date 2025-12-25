import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    navigate("/analysis", { state: { uploadedFiles: files } });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen w-full pt-16 pb-20 px-4 z-10 overflow-y-auto">
      
      {/* 1. Branding Content - Changed from absolute to standard flow for better spacing */}
      <div className="flex flex-col items-center mb-12 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 flex items-center gap-3 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
          ⚡CosmosCode
        </h1>
        <p className="mt-4 text-gray-300 text-center max-w-xl text-lg leading-relaxed opacity-90">
          Illuminate code similarities with precision. Upload source files
          and detect potential plagiarism instantly.
        </p>
      </div>

      {/* 2. Upload Box - Enhanced Glassmorphism and Hover States */}
      <div className="relative w-full max-w-2xl border-2 border-dashed border-white/20 rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xl hover:border-yellow-400/60 hover:bg-white/10 transition-all duration-300 cursor-pointer group shadow-2xl">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-900/60 border border-white/10 mb-6 group-hover:scale-110 group-hover:border-yellow-400/40 transition-all duration-300 shadow-inner">
          <Upload className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" size={38} />
        </div>
        
        <p className="text-2xl font-semibold text-white tracking-tight">Drop your source code files here</p>
        <p className="text-sm text-gray-400 mt-3 font-medium">
          or click to browse • <span className="text-yellow-400/70">.cpp, .py, .js, .ts, .zip</span>
        </p>
        
        <input 
          type="file" 
          multiple 
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-20" 
        />
      </div>

      {/* 3. Uploaded Files Section - Improved visibility and scroll area */}
      {files.length > 0 && (
        <div className="mt-10 w-full max-w-2xl bg-[#0d1117]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center mb-4 px-1">
            <p className="text-gray-200 font-semibold text-lg">Uploaded Files</p>
            <span className="bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full">{files.length}</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 border border-white/5 hover:border-white/20 rounded-xl px-5 py-3 transition-colors group">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-100 font-medium truncate max-w-[250px] md:max-w-[400px]">{file.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-yellow-400/40 group-hover:bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)] transition-all"></div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={files.length < 2}
            className={`mt-8 w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all duration-500 shadow-xl
              ${files.length < 2
                ? "bg-gray-800/50 cursor-not-allowed text-gray-600 border border-white/5"
                : "bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 bg-[length:200%_auto] hover:bg-right text-black transform hover:-translate-y-1 active:scale-[0.98] shadow-yellow-500/20 hover:shadow-yellow-500/40"
              }`}
          >
            {files.length < 2 ? "Upload 2+ Files to Start" : "Analyze Code Now"}
          </button>
        </div>
      )}

      {/* 4. Footer */}
      <p className="mt-16 text-gray-500 text-sm font-medium tracking-wide opacity-60">
        Built for hackathons • Powered by <span className="text-yellow-400/80">BugSmashers</span> 🌞
      </p>

      {/* Custom Scrollbar Logic */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(250, 204, 21, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;