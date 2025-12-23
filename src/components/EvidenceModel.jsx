import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileCode } from 'lucide-react';
import CodeViewer from './CodeViewer';

// Mock code samples for demonstration
const mockCodeSamples = {
  'A.cpp': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    int sum = 0;
    
    for (int i = 0; i < numbers.size(); i++) {
        sum += numbers[i];
    }
    
    cout << "Sum: " << sum << endl;
    
    int average = sum / numbers.size();
    cout << "Average: " << average << endl;
    
    return 0;
}`,
  'B.cpp': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    int total = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        total += nums[i];
    }
    
    cout << "Sum: " << total << endl;
    
    int avg = total / nums.size();
    cout << "Average: " << avg << endl;
    
    return 0;
}`,
  'C.cpp': `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int arr[] = {5, 2, 8, 1, 9};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    sort(arr, arr + n);
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
  'D.cpp': `#include <iostream>
#include <string>
using namespace std;

class Student {
    string name;
    int age;
public:
    Student(string n, int a) : name(n), age(a) {}
    void display() {
        cout << name << " - " << age << endl;
    }
};

int main() {
    Student s("John", 20);
    s.display();
    return 0;
}`,
  'E.cpp': `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> values = {1, 2, 3, 4, 5};
    int result = 0;
    
    for (int i = 0; i < values.size(); i++) {
        result += values[i];
    }
    
    cout << "Sum: " << result << endl;
    
    int mean = result / values.size();
    cout << "Average: " << mean << endl;
    
    return 0;
}`
};

// Define which lines are similar between files
const getSimilarLines = (fileA, fileB) => {
  // Mock similar lines based on file pairs
  if ((fileA === 'A.cpp' && fileB === 'B.cpp') || (fileA === 'B.cpp' && fileB === 'A.cpp')) {
    return { a: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], b: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] };
  }
  if ((fileA === 'A.cpp' && fileB === 'E.cpp') || (fileA === 'E.cpp' && fileB === 'A.cpp')) {
    return { a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], b: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] };
  }
  if ((fileA === 'B.cpp' && fileB === 'E.cpp') || (fileA === 'E.cpp' && fileB === 'B.cpp')) {
    return { a: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], b: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] };
  }
  return { a: [], b: [] };
};

const EvidenceModal = ({ isOpen, onClose, fileA, fileB, similarity }) => {
  const isHighRisk = similarity >= 0.8;
  const similarLines = getSimilarLines(fileA, fileB);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] flex flex-col glass border-border">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-foreground">Code Comparison</span>
              {isHighRisk && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  High Risk Plagiarism
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Similarity:</span>
              <span className={`text-2xl font-bold ${isHighRisk ? 'text-danger' : 'text-warning'}`}>
                {Math.round(similarity * 100)}%
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden mt-4">
          <div className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-2 p-2 bg-secondary rounded-lg">
              <FileCode className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-foreground">{fileA}</span>
            </div>
            <div className="flex-1 overflow-auto rounded-lg bg-background/50">
              <CodeViewer 
                code={mockCodeSamples[fileA] || '// Code not available'} 
                highlightedLines={similarLines.a}
              />
            </div>
          </div>

          <div className="flex flex-col min-h-0">
            <div className="flex items-center gap-2 mb-2 p-2 bg-secondary rounded-lg">
              <FileCode className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-foreground">{fileB}</span>
            </div>
            <div className="flex-1 overflow-auto rounded-lg bg-background/50">
              <CodeViewer 
                code={mockCodeSamples[fileB] || '// Code not available'} 
                highlightedLines={similarLines.b}
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
          <p className="text-sm text-warning flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Highlighted lines indicate detected similar code patterns. Review carefully for false positives.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvidenceModal;
