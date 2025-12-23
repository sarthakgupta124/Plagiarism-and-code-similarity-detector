import { useState } from 'react';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SolarSystem from '@/components/SolarSystem';
import FileUploadZone from '@/components/FileUploadZone';
import SimilarityMatrix from '@/components/SimilarityMatrix';
import EvidenceModal from '@/components/EvidenceModal';

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

// Mock code samples
const mockCodeSamples = {
  'student_A.cpp': `#include <iostream>
#include <vector>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

int main() {
    int n;
    cin >> n;
    cout << fibonacci(n) << endl;
    return 0;
}`,
  'student_B.cpp': `#include <iostream>
#include <vector>
using namespace std;

int fib(int num) {
    if (num <= 1) return num;
    vector<int> memo(num + 1);
    memo[0] = 0;
    memo[1] = 1;
    for (int i = 2; i <= num; i++) {
        memo[i] = memo[i-1] + memo[i-2];
    }
    return memo[num];
}

int main() {
    int input;
    cin >> input;
    cout << fib(input) << endl;
    return 0;
}`,
  'student_C.cpp': `#include <iostream>
using namespace std;

long long factorial(int n) {
    if (n == 0 || n == 1) return 1;
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int n;
    cin >> n;
    cout << factorial(n) << endl;
    return 0;
}`,
  'student_D.cpp': `#include <iostream>
#include <vector>
using namespace std;

int calcFib(int x) {
    if (x < 2) return x;
    vector<int> arr(x + 1);
    arr[0] = 0;
    arr[1] = 1;
    for (int j = 2; j <= x; j++) {
        arr[j] = arr[j-1] + arr[j-2];
    }
    return arr[x];
}

int main() {
    int val;
    cin >> val;
    cout << calcFib(val) << endl;
    return 0;
}`,
  'student_E.cpp': `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << gcd(x, y) << endl;
    return 0;
}`,
};

const Index = () => {
  const [view, setView] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [evidenceModal, setEvidenceModal] = useState({
    isOpen: false,
    fileA: '',
    fileB: '',
    similarity: 0,
  });

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setAnalysisResult(mockAnalysisResult);
    setIsAnalyzing(false);
    setView('dashboard');
  };

  const handleCellClick = (i, j) => {
    if (analysisResult) {
      setEvidenceModal({
        isOpen: true,
        fileA: analysisResult.files[i],
        fileB: analysisResult.files[j],
        similarity: analysisResult.matrix[i][j],
      });
    }
  };

  const handleBack = () => {
    setView('upload');
    setAnalysisResult(null);
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
          {view === 'upload' ? (
            <FileUploadZone onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          ) : (
            <div className="animate-fade-in">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Button>

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
                      {analysisResult?.files.length || 0}
                    </p>
                  </div>
                </div>

                {analysisResult && (
                  <SimilarityMatrix
                    files={analysisResult.files}
                    matrix={analysisResult.matrix}
                    onCellClick={handleCellClick}
                  />
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center text-sm text-muted-foreground animate-fade-in">
          <p>Built for hackathons • Powered by solar energy ☀️</p>
        </footer>
      </div>

      <EvidenceModal
        isOpen={evidenceModal.isOpen}
        onClose={() =>
          setEvidenceModal((prev) => ({ ...prev, isOpen: false }))
        }
        fileA={evidenceModal.fileA}
        fileB={evidenceModal.fileB}
        similarity={evidenceModal.similarity}
        codeA={mockCodeSamples[evidenceModal.fileA] || '// No code available'}
        codeB={mockCodeSamples[evidenceModal.fileB] || '// No code available'}
      />
    </div>
  );
};

export default Index;
