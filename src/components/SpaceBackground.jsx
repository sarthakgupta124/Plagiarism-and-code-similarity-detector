import React from 'react';

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0e14] overflow-hidden -z-10">
      {/* 1. Enhanced Star Field Generation (150 stars) */}
      {[...Array(150)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-100 shadow-[0_0_2px_#fff]"
          style={{
            width: Math.random() * 3 + 'px', // Random sizes up to 3px
            height: Math.random() * 3 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            // Randomize animation delay so they don't all twinkle at once
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      {/* 2. Solar System Container (Fixed Top Right) */}
      <div className="absolute top-10 right-10 w-48 h-48 flex items-center justify-center">
        {/* The Sun */}
        <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_40px_rgba(251,191,36,0.6)] z-10" />

        {/* Orbit Path Ring */}
        <div className="absolute w-32 h-32 border border-white/10 rounded-full" />

        {/* Rotating Planet Container */}
        <div className="absolute w-32 h-32 animate-spin-slow">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
        </div>
      </div>

      {/* 3. Branding Content (Top) */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 px-4 pointer-events-none">
        <h1 className="text-5xl font-bold text-yellow-400 flex items-center gap-3 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
          ⚡ RayTrace
        </h1>
        <p className="mt-4 text-gray-300 text-center max-w-xl text-lg leading-relaxed">
          Illuminate code similarities with precision. Upload source files
          and detect potential plagiarism instantly.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Optional: Star Twinkle effect */
        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Apply twinkle to stars */
        .absolute.bg-white {
          animation: twinkle linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;