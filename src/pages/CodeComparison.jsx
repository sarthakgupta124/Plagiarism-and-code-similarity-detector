import React from 'react';
import { ChevronLeft, AlertCircle } from 'lucide-react';

const CodeComparison = ({ data, onBack }) => {
  const { fileA, fileB, score } = data;

  // Example code content - in a real app, fetch this based on file names
  const codeA = `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint fibonacci(int n) {\n  if (n <= 1) return n;\n  vector<int> dp(n + 1);\n  dp[0] = 0;\n  dp[1] = 1;\n  for (int i = 2; i <= n; i++) {\n    dp[i] = dp[i-1] + dp[i-2];\n  }\n  return dp[n];\n}`;
  const codeB = `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint fib(int num) {\n  if (num <= 1) return num;\n  vector<int> memo(num + 1);\n  memo[0] = 0;\n  memo[1] = 1;\n  for (int i = 2; i <= num; i++) {\n    memo[i] = memo[i-1] + memo[i-2];\n  }\n  return memo[num];\n}`;

  return (
    <div className="relative flex flex-col items-center min-h-screen pt-24 pb-10 px-6 z-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Header Info */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors">
          <ChevronLeft /> Back to Matrix
        </button>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Similarity:</span>
          <span className={`text-2xl font-black ${score > 80 ? 'text-red-500' : 'text-orange-500'}`}>
            {score}%
          </span>
        </div>
      </div>

      {/* Comparison Container */}
      <div className="w-full max-w-7xl bg-[#0d1117]/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-4 p-6 border-b border-white/5 bg-white/5">
          <h2 className="text-2xl font-bold text-white">Code Comparison</h2>
          {score > 80 && (
            <span className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold border border-red-500/30">
              <AlertCircle size={14} /> High Risk Plagiarism
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-white/5">
          {/* File A View */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4 text-orange-400 font-mono text-sm">
              <FileCode size={18} /> {fileA}.cpp
            </div>
            <pre className="p-4 bg-black/40 rounded-xl overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed border border-white/5 custom-scrollbar">
              <code>{codeA}</code>
            </pre>
          </div>

          {/* File B View */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4 text-orange-400 font-mono text-sm">
              <FileCode size={18} /> {fileB}.cpp
            </div>
            <pre className="p-4 bg-black/40 rounded-xl overflow-x-auto text-gray-300 font-mono text-sm leading-relaxed border border-white/5 custom-scrollbar">
              <code>{codeB}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeComparison;