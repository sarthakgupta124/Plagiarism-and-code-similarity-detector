import React, { useState } from "react";
import { Upload } from "lucide-react";

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#050812] via-[#070b18] to-[#050812] text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Sun graphic */}
      <div className="absolute top-16 right-20">
        <div className="w-28 h-28 rounded-full bg-yellow-400 shadow-[0_0_80px_20px_rgba(250,204,21,0.6)]" />
        <div className="w-3 h-3 rounded-full bg-blue-400 absolute -bottom-6 left-10 shadow-[0_0_15px_4px_rgba(96,165,250,0.8)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Title */}
        <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-2">
          ⚡ CodeSun
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-gray-300 text-center max-w-xl text-xl">
          Illuminate code similarities with solar precision. Upload source files
          and detect potential plagiarism instantly.
        </p>

        {/* Upload Box */}
        <div className="mt-12 w-full max-w-2xl border-2 border-dashed border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md hover:border-yellow-400 transition">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 mb-4">
            <Upload className="text-yellow-400" size={28} />
          </div>

          <p className="text-lg font-medium">
            Drop your source code files here
          </p>

          <p className="text-sm text-gray-400 mt-2 text-center">
            or click to browse • Supports{" "}
            <span className="text-gray-300">
              .cpp, .c, .py, .java, .js, .ts, .zip
            </span>
          </p>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Uploaded Files Section */}
        {files.length > 0 && (
          <div className="mt-8 w-full max-w-2xl">
            <p className="text-gray-400 mb-3">
              Uploaded Files ({files.length})
            </p>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/5 border border-gray-700 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-sm">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Analyze Button */}
            <button
              disabled={files.length < 2}
              className={`mt-5 w-full py-3 rounded-lg font-semibold transition
                ${
                  files.length < 2
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }
              `}
            >
              Analyze Code
            </button>

            {files.length < 2 && (
              <p className="mt-2 text-center text-xs text-gray-500">
                Upload at least 2 files to compare
              </p>
            )}
          </div>
        )}

        {/* //footer */}
        <p className="mt-10 text-gray-500 text-sm">
          Built for hackathons • Powered by solar energy 🌞
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
