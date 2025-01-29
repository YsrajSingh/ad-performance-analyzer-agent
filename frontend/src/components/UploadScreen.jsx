import { useState } from "react";
import axios from "axios";

const UploadScreen = ({ onAnalyze, onNext }) => {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      onAnalyze(file); // Update the file path (or file data)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h2 className="text-3xl text-gray-100 mb-4">Upload Your Ad Data</h2>
      <input
        type="file"
        onChange={handleUpload}
        className="mb-4 p-2 bg-gray-700 text-white rounded-lg"
      />
      <button
        onClick={onNext}
        className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
        disabled={!file} // Disable button until a file is uploaded
      >
        Analyze
      </button>
    </div>
  );
};

export default UploadScreen;