import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolarSystem from '@/components/SolarSystem';
import SimilarityMatrix from '@/components/SimilarityMatrix';
import { useAnalysis } from '@/context/AnalysisContext';

const Dashboard = () => {
  const { analysisResult, setEvidenceData } = useAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    if (!analysisResult) {
      navigate('/');
    }
  }, [analysisResult, navigate]);

  const handleCellClick = (i, j) => {
    if (analysisResult) {
      setEvidenceData({
        fileA: analysisResult.files[i],
        fileB: analysisResult.files[j],
        similarity: analysisResult.matrix[i][j],
      });
      navigate('/evidence');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!analysisResult) {
    return null;
  }

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
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto animate-fade-in">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>

          {/* Dashboard Card */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 card-glow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Similarity Matrix
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Click on orange/red cells to view code comparison
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Files Analyzed</p>
                <p className="text-3xl font-bold text-primary">
                  {analysisResult.files.length}
                </p>
              </div>
            </div>

            <SimilarityMatrix
              files={analysisResult.files}
              matrix={analysisResult.matrix}
              onCellClick={handleCellClick}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground animate-fade-in">
          <p>Built for hackathons • Powered by solar energy ☀️</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
