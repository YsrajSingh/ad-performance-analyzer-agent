import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const AnalyzeScreen = ({ filePath }) => {
    const [analysis, setAnalysis] = useState("");
    const eventSourceRef = useRef(null);

    useEffect(() => {
      if (!filePath) return;
  
      fetch("http://localhost:9000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filePath }),
      })
          .then((res) => res.json())
          .then(({ sessionId }) => {
              if (!sessionId) throw new Error("Session ID missing");
  
              eventSourceRef.current = new EventSource(`http://localhost:9000/analyze/stream/${sessionId}`);
  
              eventSourceRef.current.onmessage = (event) => {
                  const data = JSON.parse(event.data);
                  console.log(data)
                  if (data.summary) {
                      setAnalysis((prev) => prev + data.summary);
                  } 
                  if (data.done || data.error) { 
                      eventSourceRef.current.close();  // ✅ **Close stream when done or error occurs**
                  }
              };
  
              eventSourceRef.current.onerror = () => {
                  eventSourceRef.current?.close();
              };
          })
          .catch((error) => console.error("Error:", error));
  
      return () => {
          eventSourceRef.current?.close();
      };
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
