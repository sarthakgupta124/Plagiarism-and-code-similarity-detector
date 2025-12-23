import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, AlertTriangle, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SolarSystem from '@/components/SolarSystem';
import { useAnalysis } from '@/context/AnalysisContext';

const Evidence = () => {
  const { evidenceData, getCodeSample } = useAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    if (!evidenceData) {
      navigate('/dashboard');
    }
  }, [evidenceData, navigate]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!evidenceData) {
    return null;
  }

  const { fileA, fileB, similarity } = evidenceData;
  const codeA = getCodeSample(fileA);
  const codeB = getCodeSample(fileB);
  const isHighRisk = similarity > 0.8;
  const similarityPercent = Math.round(similarity * 100);

  const getSimilarityColor = () => {
    if (similarity > 0.8) return 'text-destructive';
    if (similarity > 0.6) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="min-h-screen bg-background starfield relative overflow-hidden">
      <SolarSystem />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sun-core via-primary to-warning bg-clip-text text-transparent">
              CodeSun
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto animate-fade-in">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          {/* Evidence Card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
            {/* Header */}
            <div className="p-6 border-b border-border bg-muted/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-foreground">
                    Code Comparison
                  </h2>
                  {isHighRisk && (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      High Risk Plagiarism
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Similarity:</span>
                  <span className={`text-2xl font-bold ${getSimilarityColor()}`}>
                    {similarityPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* File A */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 p-4 bg-muted/20 border-b border-border">
                  <FileCode className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm font-medium text-foreground">
                    {fileA}
                  </span>
                </div>
                <div className="p-4 overflow-auto max-h-[60vh]">
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                    <code>{codeA}</code>
                  </pre>
                </div>
              </div>

              {/* File B */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 p-4 bg-muted/20 border-b border-border">
                  <FileCode className="w-4 h-4 text-warning" />
                  <span className="font-mono text-sm font-medium text-foreground">
                    {fileB}
                  </span>
                </div>
                <div className="p-4 overflow-auto max-h-[60vh]">
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                    <code>{codeB}</code>
                  </pre>
                </div>
              </div>
            </div>
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

export default Evidence;
