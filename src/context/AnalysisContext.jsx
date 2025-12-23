import React, { createContext, useContext, useState } from "react";

const AnalysisContext = createContext(null);

export const AnalysisProvider = ({ children }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [files, setFiles] = useState([]);

  return (
    <AnalysisContext.Provider
      value={{
        analysisResult,
        setAnalysisResult,
        files,
        setFiles,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error("useAnalysis must be used inside AnalysisProvider");
  }
  return context;
};
