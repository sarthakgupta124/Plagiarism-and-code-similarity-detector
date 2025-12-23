import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import SolarSystem from '@/components/SolarSystem';
import FileUploadZone from '@/components/FileUploadZone';
import { useAnalysis } from '@/context/AnalysisContext';

// Mock analysis result
const mockAnalysisResult = {
  files: ['student_A.cpp', 'student_B.cpp', 'student_C.cpp', 'student_D.cpp', 'student_E.cpp'],
  matrix: [
    [1.0, 0.87, 0.22, 0.45, 0.33],
    [0.87, 1.0, 0.30, 0.72, 0.28],
    [0.22, 0.30, 1.0, 0.18, 0.65],
    [0.45, 0.72, 0.18, 1.0, 0.41],
    [0.33, 0.28, 0.65, 0.41, 1.0],
  ],
};

const Upload = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { setAnalysisResult } = useAnalysis();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    setAnalysisResult(mockAnalysisResult);
    setIsAnalyzing(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background starfield relative overflow-hidden">
      <SolarSystem />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sun-core via-primary to-warning bg-clip-text text-transparent">
              CodeSun
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Illuminate code similarities with solar precision. 
            Upload source files and detect potential plagiarism instantly.
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto">
          <FileUploadZone 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground animate-fade-in">
          <p>Built for hackathons • Powered by solar energy ☀️</p>
        </footer>
      </div>
    </div>
  );
};

export default Upload;
