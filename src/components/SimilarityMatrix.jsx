import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const SimilarityMatrix = ({ files, matrix, onCellClick }) => {
  const getCellColor = (value, isSelf) => {
    if (isSelf) return 'bg-muted';
    if (value >= 0.8) return 'cell-danger';
    if (value >= 0.6) return 'cell-warning';
    return 'cell-success';
  };

  const getCellCursor = (value, isSelf) => {
    if (isSelf) return 'cursor-default';
    if (value >= 0.6) return 'cursor-pointer hover:scale-105';
    return 'cursor-default';
  };

  return (
    <div className="w-full animate-fade-in overflow-x-auto">
      <div className="min-w-fit">
        {/* Header Row */}
        <div className="flex">
          <div className="w-24 h-12 flex-shrink-0" />
          {files.map((file, i) => (
            <div
              key={`header-${i}`}
              className="w-20 h-12 flex items-center justify-center text-xs font-medium text-muted-foreground truncate px-1"
              title={file}
            >
              {file.length > 8 ? `${file.slice(0, 6)}...` : file}
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        {matrix.map((row, i) => (
          <div key={`row-${i}`} className="flex">
            {/* Row Label */}
            <div
              className="w-24 h-16 flex-shrink-0 flex items-center text-xs font-medium text-muted-foreground truncate pr-2"
              title={files[i]}
            >
              {files[i].length > 10 ? `${files[i].slice(0, 8)}...` : files[i]}
            </div>

            {/* Cells */}
            {row.map((value, j) => {
              const isSelf = i === j;
              const percentage = Math.round(value * 100);
              const isClickable = !isSelf && value >= 0.6;

              return (
                <Tooltip key={`cell-${i}-${j}`}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => isClickable && onCellClick(i, j)}
                      className={`
                        w-20 h-16 flex items-center justify-center text-sm font-bold
                        rounded-lg m-0.5 transition-all duration-200
                        ${getCellColor(value, isSelf)}
                        ${getCellCursor(value, isSelf)}
                      `}
                      style={{
                        animationDelay: `${(i * matrix.length + j) * 30}ms`,
                      }}
                    >
                      {isSelf ? '—' : `${percentage}%`}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-center">
                      <p className="font-medium">
                        {files[i]} ↔ {files[j]}
                      </p>
                      <p className="text-lg font-bold">
                        {isSelf ? 'Same file' : `${percentage}% similarity`}
                      </p>
                      {isClickable && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Click to view evidence
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded cell-danger" />
            <span className="text-xs text-muted-foreground">
              High Risk (&gt;80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded cell-warning" />
            <span className="text-xs text-muted-foreground">
              Medium (60-80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded cell-success" />
            <span className="text-xs text-muted-foreground">
              Low (&lt;60%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarityMatrix;
