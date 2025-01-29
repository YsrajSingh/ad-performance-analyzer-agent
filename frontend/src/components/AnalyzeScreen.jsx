import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const AnalyzeScreen = ({ filePath }) => {
  const [analysis, setAnalysis] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!filePath || hasFetched.current) return;

    hasFetched.current = true;

    const fetchAnalysis = async () => {
      try {
        const response = await axios.post("http://localhost:9000/analyze", { filePath });
        setAnalysis(response.data.summary); // Expecting Markdown response
      } catch (error) {
        console.error("Error analyzing file:", error);
        setAnalysis("**Error:** Failed to analyze file.");
      }
    };

    fetchAnalysis();
  }, [filePath]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h2 className="text-3xl text-gray-100 mb-4">Analyzing Results</h2>
      <div className="prose prose-invert max-w-2xl text-gray-300">
        <ReactMarkdown>{analysis || "Processing..."}</ReactMarkdown>
      </div>
    </div>
  );
};

export default AnalyzeScreen;
