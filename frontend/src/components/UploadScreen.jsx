import { useState } from "react";
import axios from "axios";

const UploadScreen = ({ onAnalyze, onNext }) => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [filePath, setFilePath] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:9000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploaded(true);
      setFilePath(response.data.filePath);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleAnalyze = () => {
    if (filePath) {
      onAnalyze(filePath);
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h2 className="text-3xl text-gray-100 mb-4">Upload Your Ad Data</h2>
      
      <input
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setUploaded(false);
        }}
        className="mb-4 p-2 bg-gray-700 text-white rounded-lg"
      />

      <button
        onClick={uploaded ? handleAnalyze : handleUpload}
        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
        disabled={!file}
      >
        {uploaded ? "Analyze" : "Upload"}
      </button>
    </div>
  );
};

export default UploadScreen;
