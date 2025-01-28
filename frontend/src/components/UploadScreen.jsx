import { useState } from "react";
import axios from "axios";

const UploadScreen = ({ onAnalyze }) => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:9000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploaded(true);
      onAnalyze(response.data.filePath);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2>Upload Ad Data</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>{uploaded ? "Analyze" : "Upload"}</button>
    </div>
  );
};

export default UploadScreen;