import React from 'react';
import { ChevronLeft, FileText, Download } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock data - Replace this with your model's actual N x N output
  const students = ["Student_A", "Student_B", "Student_C", "Student_D", "Student_E"];
  const matrix = [
    [null, 87, 22, 45, 33],
    [87, null, 30, 72, 28],
    [22, 30, null, 18, 65],
    [45, 72, 18, null, 41],
    [33, 28, 65, 41, null],
  ];

  const getCellColor = (value) => {
    if (value === null) return "bg-gray-800/50 text-gray-500"; // Diagonal
    if (value > 80) return "bg-red-500/80 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]";
    if (value > 60) return "bg-orange-500/80 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]";
    return "bg-green-500/80 text-white";
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-24 pb-20 px-4 z-10 animate-in fade-in duration-700">
      
      {/* Top Header Section */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Upload
        </button>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="w-full max-w-5xl bg-[#0d1117]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Similarity Matrix</h2>
            <p className="text-gray-400">Click on orange/red cells to view detailed code comparison</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">Files Analyzed</p>
            <p className="text-5xl font-black text-yellow-400">{students.length}</p>
          </div>
        </div>

        {/* The Matrix Grid */}
        <div className="overflow-x-auto custom-scrollbar pb-4">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="p-2"></th>
                  {students.map((s, i) => (
                    <th key={i} className="p-2 text-xs text-gray-500 font-mono rotate-[-45deg] whitespace-nowrap text-left h-20 uppercase tracking-tighter">
                      {s.length > 8 ? s.substring(0, 8) + '...' : s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="p-2 text-xs text-gray-500 font-mono uppercase pr-4">
                      {students[rowIndex]}
                    </td>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-1">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-sm font-bold cursor-pointer transition-all hover:scale-110 hover:z-20 ${getCellColor(cell)}`}>
                          {cell !== null ? `${cell}%` : '—'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend Section */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-gray-400">High Risk (&gt;80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-sm text-gray-400">Medium (60-80%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-400">Low (&lt;60%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;