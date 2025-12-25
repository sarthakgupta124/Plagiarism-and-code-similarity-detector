// import React from "react";
// import { Upload } from "lucide-react";

// const Dashboard = () => {
//   return (
//     /* Removed background colors and absolute elements to let global BG show through */
//     <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
      
//       {/* Title */}
//       <h1 className="text-4xl font-bold text-yellow-400 flex items-center gap-2 drop-shadow-lg">
//         ⚡ CodeSun
//       </h1>

//       {/* Subtitle */}
//       <p className="mt-3 text-gray-300 text-center max-w-xl">
//         Illuminate code similarities with solar precision. Upload source files
//         and detect potential plagiarism instantly.
//       </p>

//       {/* Upload Box - Glassmorphism style to blend with background */}
//       <div className="mt-12 w-full max-w-2xl border-2 border-dashed border-gray-500/50 rounded-xl p-10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm hover:border-yellow-400 transition-all duration-300 group">
        
//         <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800/80 mb-4 group-hover:scale-110 transition-transform">
//           <Upload className="text-yellow-400" size={28} />
//         </div>

//         <p className="text-lg font-medium text-white">
//           Drop your source code files here
//         </p>

//         <p className="text-sm text-gray-400 mt-2 text-center">
//           or click to browse • Supports{" "}
//           <span className="text-gray-300 italic">
//             .cpp, .c, .py, .java, .js, .ts, .zip
//           </span>
//         </p>

//         {/* The hidden file input */}
//         <input
//           type="file"
//           multiple
//           className="absolute inset-0 opacity-0 cursor-pointer"
//         />
//       </div>

//       {/* Footer */}
//       <p className="mt-10 text-gray-500 text-sm">
//         Built for hackathons • Powered by solar energy 🌞
//       </p>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Upload } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-40 px-4">
      {/* Upload Box only */}
      <div className="w-full max-w-2xl border-2 border-dashed border-gray-500/40 rounded-xl p-12 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md hover:border-yellow-400 transition-all cursor-pointer group">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-800/80 mb-4 group-hover:scale-110 transition-transform">
          <Upload className="text-yellow-400" size={32} />
        </div>
        <p className="text-xl font-medium text-white">Drop your source code files here</p>
        <p className="text-sm text-gray-400 mt-2">or click to browse</p>
        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>
      
      <p className="mt-12 text-gray-500 text-sm">Built for hackathons • Powered by BugSmashers 🌞</p>
    </div>
  );
};

export default Dashboard;