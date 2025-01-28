import { useState, useEffect } from "react";
import axios from "axios";

const AnalyzeScreen = ({ filePath }) => {
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post("http://localhost:9000/analyze", { filePath });
        setAnalysis(response.data.summary);
      } catch (error) {
        console.error("Error analyzing file:", error);
      }
    };
    fetchAnalysis();
  }, [filePath]);

  return (
    <div>
      <h2>Analysis Results</h2>
      <p>{analysis}</p>
    </div>
  );
};

export default AnalyzeScreen;