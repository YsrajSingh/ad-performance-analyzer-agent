import { useState, useEffect } from "react";
import axios from "axios";

const AnalyzeScreen = ({ filePath }) => {
    const [analysis, setAnalysis] = useState("");

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:9000/analyze",
                    { filePath }
                );
                setAnalysis(response.data.summary);
            } catch (error) {
                console.error("Error analyzing file:", error);
            }
        };
        fetchAnalysis();
    }, [filePath]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
            <h2 className="text-3xl text-gray-100 mb-4">Analyzing Results</h2>
            <p className="text-xl text-gray-300">
                {analysis}
            </p>
        </div>
    );
};

export default AnalyzeScreen;
