import { useCallback, useState } from 'react';
import { Upload, File, X, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FileUploadZone = ({ onAnalyze, isAnalyzing }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      name: file.name,
      size: file.size,
    }));

    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = useCallback((e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
      }));
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  }, []);

  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isZip = (name) => name.endsWith('.zip');

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center
          transition-all duration-300 cursor-pointer
          ${
            isDragging
              ? 'border-primary bg-primary/10 scale-[1.02]'
              : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept=".cpp,.c,.py,.java,.js,.ts,.zip"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`
              w-16 h-16 rounded-full bg-secondary flex items-center justify-center
              transition-transform duration-300
              ${isDragging ? 'scale-110' : ''}
            `}
          >
            <Upload className="w-8 h-8 text-primary" />
          </div>

          <div>
            <p className="text-lg font-medium text-foreground">
              Drop your source code files here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse • Supports .cpp, .c, .py, .java, .js, .ts, .zip
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3 animate-fade-in">
          <h3 className="text-sm font-medium text-muted-foreground">
            Uploaded Files ({files.length})
          </h3>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg group animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  {isZip(file.name) ? (
                    <FileArchive className="w-5 h-5 text-warning" />
                  ) : (
                    <File className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/20 transition-all"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Analyze Button */}
          <Button
            onClick={() => onAnalyze(files)}
            disabled={isAnalyzing || files.length < 2}
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 sun-glow"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing Code...
              </span>
            ) : (
              'Analyze Code'
            )}
          </Button>

          {files.length < 2 && (
            <p className="text-xs text-center text-muted-foreground">
              Upload at least 2 files to compare
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
