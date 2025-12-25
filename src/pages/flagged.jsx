import React from "react";
import { ChevronLeft, AlertTriangle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlaggedFiles = () => {
  const navigate = useNavigate();

  // Mock flagged data (replace with backend output)
  const flaggedPairs = [
    {
      id: 1,
      fileA: "student_A.cpp",
      fileB: "student_B.cpp",
      similarity: 87,
      risk: "HIGH",
    },
    {
      id: 2,
      fileA: "student_B.cpp",
      fileB: "student_D.cpp",
      similarity: 72,
      risk: "MEDIUM",
    },
    {
      id: 3,
      fileA: "student_C.cpp",
      fileB: "student_E.cpp",
      similarity: 65,
      risk: "MEDIUM",
    },
  ];

  const getRiskStyles = (risk) => {
    switch (risk) {
      case "HIGH":
        return {
          border: "border-red-500/40",
          bar: "bg-red-500",
          badge: "bg-red-500/20 text-red-500",
        };
      default:
        return {
          border: "border-orange-500/30",
          bar: "bg-orange-500",
          badge: "bg-orange-500/20 text-orange-400",
        };
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-6 z-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
        >
          <ChevronLeft /> Back
        </button>

        <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-500 text-sm font-semibold flex items-center gap-2">
          <AlertTriangle size={16} />
          Flagged Files ({flaggedPairs.length})
        </span>
      </div>

      {/* Page Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <AlertTriangle className="text-red-500" />
          Flagged Files
        </h1>
        <p className="text-gray-400 mt-2">
          {flaggedPairs.length} suspicious pairs detected
        </p>
      </div>

      {/* Flagged Cards */}
      <div className="max-w-6xl mx-auto space-y-6">
        {flaggedPairs.map((pair) => {
          const styles = getRiskStyles(pair.risk);

          return (
            <div
              key={pair.id}
              className={`relative bg-[#0d1117]/80 backdrop-blur-xl border ${styles.border} rounded-2xl p-6 shadow-xl`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-mono text-white">
                    {pair.fileA} <span className="text-gray-500">↔</span>{" "}
                    {pair.fileB}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-white font-bold">
                      {pair.similarity}% Similar
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold tracking-wide ${styles.badge}`}
                    >
                      {pair.risk} RISK
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/analysis", {
                      state: {
                        fileA: pair.fileA,
                        fileB: pair.fileB,
                        score: pair.similarity,
                      },
                    })
                  }
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-bold transition"
                >
                  <Eye size={16} />
                  View Evidence
                </button>
              </div>

              {/* Similarity Bar */}
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div
                  className={`h-full ${styles.bar}`}
                  style={{ width: `${pair.similarity}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <p className="mt-16 text-center text-gray-500 text-sm">
        Built for hackathons • Powered by BugSmashers 🌞
      </p>
    </div>
  );
};

export default FlaggedFiles;
