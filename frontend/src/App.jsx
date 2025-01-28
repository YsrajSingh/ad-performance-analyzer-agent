import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UploadScreen from "./components/UploadScreen";
import AnalyzeScreen from "./components/AnalyzeScreen";

const App = () => {
  const [filePath, setFilePath] = useState(null);

  return (
    <div>
      <LandingPage />
      {!filePath ? (
        <UploadScreen onAnalyze={setFilePath} />
      ) : (
        <AnalyzeScreen filePath={filePath} />
      )}
    </div>
  );
};

export default App;