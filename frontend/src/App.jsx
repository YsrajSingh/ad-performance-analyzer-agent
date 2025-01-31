import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UploadScreen from "./components/UploadScreen";
import AnalyzeScreen from "./components/AnalyzeScreen";
import './app.css'

const App = () => {
  const [filePath, setFilePath] = useState(null);
  const [step, setStep] = useState('landing'); // Added step state to handle transitions

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {step === 'landing' && (
        <div className="flex flex-col items-center">
          <LandingPage onNext={() => setStep('upload')} />
        </div>
      )}

      {step === 'upload' && (
        <div className="flex flex-col items-center">
          <UploadScreen onAnalyze={setFilePath} onNext={() => setStep('analyze')} />
        </div>
      )}

      {step === 'analyze' && (
        <div className="flex flex-col items-center">
          <AnalyzeScreen filePath={filePath} />
        </div>
      )}
    </div>
  );
};

export default App;
