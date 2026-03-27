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
  const [selectedModel, setSelectedModel] = useState('cnn');

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
    
    const endpoint = selectedModel === 'cnn' ? 'http://localhost:8000/predict/' : 'http://localhost:8000/vit-predict/';
    
    try {
      const res = await axios.post(endpoint, data);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Deepfake Forensic</h1>
      <p className="text-gray-400 mb-8 text-sm">AI-powered detection using advanced computer vision</p>
      
      <div className="flex gap-8 items-start flex-wrap justify-center">
        <div className="max-w-md w-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl ring-1 ring-gray-700/50 hover:ring-teal-500/30 transition-all duration-300">
          {/* Model Selection Dropdown */}
          <div className="mb-6">
            <label htmlFor="modelSelect" className="block text-sm font-semibold mb-3 text-gray-300">
              Select Detection Model
            </label>
            <select
              id="modelSelect"
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setResult(null);
              }}
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600"
            >
              <option value="cnn">CNN Model</option>
              <option value="vit">Vision Transformer (ViT)</option>
            </select>
          </div>

          <UploadZone onFileSelect={handleFileSelect} />
          
          {previewURL && (
            <PreviewImage src={previewURL} alt="Upload Preview" />
          )}
          
          <button 
            onClick={handleSubmit}
            disabled={!file || loading}
            className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-teal-500/20 transform transition-all active:scale-95 rounded-lg text-white font-semibold shadow-lg"
          >
            {loading ? <Spinner /> : "Analyze Image"}
          </button>
          
          {result && (
            <ResultCard result={result} />
          )}
        </div>
        
        {result && (
          <GradCAMHeatmap gradHeatmap={result?.gradcam_image} />
        )}
      </div>
      <ModelStats />
    </div>
  );
}

export default App;
