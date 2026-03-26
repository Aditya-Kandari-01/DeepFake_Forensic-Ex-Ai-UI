import { useState } from 'react';
import axios from 'axios';
import UploadZone from './components/UploadZone';
import PreviewImage from './components/PreviewImage';
import ResultCard from './components/ResultCard';
import Spinner from './components/Spinner';
import ModelStats from './components/ModelStats';
import GradCAMHeatmap from './components/GradCAMHeatmap';

function App() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileSelect = (file) => {
    setFile(file);
    setResult(null);
    setPreviewURL(URL.createObjectURL(file)); // create preview URL
  };

  // Submit to backend
  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await axios.post('http://localhost:8000/predict/', data);
      // Assuming res.data = { probability: 0.73, prediction: "Real" }
      setResult(res.data);
    } catch (error) {
      console.error("Prediction error:", error);
      // Handle error state if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-6">Deepfake Forensic</h1>
      
      <div className="flex gap-6 items-start">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg ring ring-gray-800/50" id='69'>
          <UploadZone onFileSelect={handleFileSelect} />
          
          {previewURL && (
            <PreviewImage src={previewURL} alt="Upload Preview" />
          )}
          
          <button 
            onClick={handleSubmit}
            className="mt-4 w-full py-2 bg-linear-to-r from-blue-500 to-teal-400 hover:scale-105 transform transition rounded-lg text-white font-semibold shadow-lg"
          >
            {loading ? <Spinner /> : "Predict"}
          </button>
          
          {result && (
            <ResultCard result={result} />
          )}
        </div>
        
        {result && (
          <GradCAMHeatmap gradHeatmap={result.result.gradcam_image} />
        )}
      </div>
      <ModelStats />
    </div>
  );
}

export default App;
