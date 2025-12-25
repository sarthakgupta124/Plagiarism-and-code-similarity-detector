import React, { useState } from 'react';
import { ChevronLeft, FileCode, AlertCircle, Download, FileText, History } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const AnalysisResult = () => {
  const navigate = useNavigate();
  
  // 1. State to manage which view to show: 'matrix' or 'comparison'
  const [view, setView] = useState('matrix');
  const [selectedPair, setSelectedPair] = useState(null);

  // Mock Data - Replace with your model's actual output
  const students = ["Student_A", "Student_B", "Student_C", "Student_D", "Student_E"];
  const matrix = [
    [null, 87, 22, 45, 33],
    [87, null, 30, 72, 28],
    [22, 30, null, 18, 65],
    [45, 72, 18, null, 41],
    [33, 28, 65, 41, null],
  ];

  // Mock Code Content for comparison
  const mockCode = {
    "Student_A": `#include <iostream>\nint main() {\n  int n;\n  std::cin >> n;\n  return 0;\n}`,
    "Student_B": `#include <iostream>\nint main() {\n  int input;\n  std::cin >> input;\n  return 0;\n}`
  };

  const getCellColor = (value) => {
    if (value === null) return "bg-gray-800/50 text-gray-500 cursor-default";
    if (value > 80) return "bg-red-500/80 text-white hover:scale-110 shadow-[0_0_15px_rgba(239,68,68,0.4)]";
    if (value > 60) return "bg-orange-500/80 text-white hover:scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)]";
    return "bg-green-500/80 text-white hover:scale-110";
  };

  const handleCellClick = (rowIndex, cellIndex, score) => {
    if (score !== null) {
      setSelectedPair({
        fileA: students[rowIndex],
        fileB: students[cellIndex],
        score: score
      });
      setView('comparison');
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-24 pb-20 px-4 z-10 animate-in fade-in duration-500">
      
      {/* VIEW 1: THE N x N MATRIX */}
      {view === 'matrix' ? (
        <div className="w-full max-w-5xl flex flex-col items-center">
         <div className="w-full flex justify-between items-center mb-8">
          {/* //buttons to navigate and flagged history */}
  <button
    onClick={() => navigate('/')}
    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
  >
    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
    Back to Upload
  </button>

  {/* Right Side Actions */}
  <div className="flex items-center gap-3">
    {/* Flagged History */}
    <button
      onClick={() => navigate('/flagged')}
      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-400 hover:bg-red-500/30 transition"
    >
      <History size={16} />
      Flagged History
    </button>

    {/* Export Report */}
    <button
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition"
    >
      <Download size={16} />
      Export Report
    </button>
  </div>
</div>


          <div className="w-full bg-[#0d1117]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Similarity Matrix</h2>
            
            <div className="overflow-x-auto custom-scrollbar pb-6">
              <table className="border-separate border-spacing-2 mx-auto">
                <thead>
                  <tr>
                    <th></th>
                    {students.map((s, i) => (
                      <th key={i} className="p-2 text-[10px] text-gray-500 font-mono rotate-[-45deg] whitespace-nowrap text-left h-16 uppercase">
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="p-2 text-xs text-gray-500 font-mono pr-4 text-right">{students[rowIndex]}</td>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} onClick={() => handleCellClick(rowIndex, cellIndex, cell)}>
                          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-all ${getCellColor(cell)}`}>
                            {cell !== null ? `${cell}%` : '—'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex justify-center gap-6 text-xs text-gray-400 border-t border-white/5 pt-6">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded" /> High Risk</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded" /> Medium</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /> Low</div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: SIDE-BY-SIDE COMPARISON */
        <div className="w-full max-w-7xl flex flex-col items-center animate-in zoom-in-95 duration-500">
          <div className="w-full flex justify-between items-center mb-6">
            <button onClick={() => setView('matrix')} className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
              <ChevronLeft /> Back to Matrix
            </button>
            <div className="text-right">
              <span className="text-gray-400 text-sm mr-3">Similarity Score:</span>
              <span className={`text-3xl font-black ${selectedPair.score > 80 ? 'text-red-500' : 'text-orange-500'}`}>
                {selectedPair.score}%
              </span>
            </div>
          </div>

          <div className="w-full bg-[#0d1117]/90 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-yellow-400" /> Comparison Analysis
              </h3>
              {selectedPair.score > 80 && (
                <span className="px-3 py-1 bg-red-500/20 text-red-500 border border-red-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  High Risk Plagiarism
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-white/5">
              <div className="p-6">
                <p className="text-orange-400 font-mono text-sm mb-4 flex items-center gap-2">
                  <FileCode size={16} /> {selectedPair.fileA}.cpp
                </p>
                <pre className="p-4 bg-black/40 rounded-xl overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed border border-white/5 custom-scrollbar h-[500px]">
                  <code>{mockCode[selectedPair.fileA] || "// Code content for " + selectedPair.fileA}</code>
                </pre>
              </div>
              <div className="p-6">
                <p className="text-orange-400 font-mono text-sm mb-4 flex items-center gap-2">
                  <FileCode size={16} /> {selectedPair.fileB}.cpp
                </p>
                <pre className="p-4 bg-black/40 rounded-xl overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed border border-white/5 custom-scrollbar h-[500px]">
                  <code>{mockCode[selectedPair.fileB] || "// Code content for " + selectedPair.fileB}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Footer */}
      <p className="mt-12 text-gray-500 text-sm">Built for hackathons • Powered by CodeSun 🌞</p>
    </div>
  );
};

export default AnalysisResult;