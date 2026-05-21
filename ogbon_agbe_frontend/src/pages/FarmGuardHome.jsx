import React, { useState } from 'react';
import { Camera, ShieldCheck, RefreshCw, AlertCircle, ChevronLeft } from 'lucide-react';
import { farmGuardService } from '../services/api';

export default function FarmGuardHome({ onBack }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Capture file from device file picker or viewport capture stream
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setAnalysisResult(null);
      setApiError(null);
    }
  };

  // Asynchronously submit payload directly to Abdullahi's live Cloud Run platform instance
  const triggerCloudAnalysis = async () => {
    if (!imageFile) return;

    try {
      setIsAnalyzing(true);
      setApiError(null);
      
      const response = await farmGuardService.analyzeCropDisease(imageFile);
      
      if (response.success) {
        setAnalysisResult(response.data); // Stores: diagnosis, confidence, treatment array
      }
    } catch (err) {
      console.error("Cloud engine error:", err);
      setApiError(err.response?.data?.detail || "Authentication token invalid or backend timeout.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] p-4 sm:p-6 md:p-10 font-sans transition-colors duration-300 w-full">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation Headbar */}
        <header className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="text-[#40916c] cursor-pointer p-1.5 hover:opacity-75 focus:outline-none">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a3a2a] dark:text-white">FarmGuard Diagnosis</h2>
            <p className="text-xs text-gray-400">Scan foliage for real-time machine learning telemetry.</p>
          </div>
        </header>

        {/* Main Interaction Layout Box */}
        <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* File Picker Display Area */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-white/10 rounded-xl p-8 bg-[#fdf8f0]/30 dark:bg-transparent text-center relative overflow-hidden min-h-[220px]">
            {selectedImage ? (
              <img src={selectedImage} alt="Crop file source" className="max-h-64 object-contain rounded-lg" />
            ) : (
              <div className="space-y-2 flex flex-col items-center">
                <Camera size={44} className="text-[#40916c] animate-bounce" />
                <p className="text-sm font-bold dark:text-white">Upload leaf or crop anomaly snapshot</p>
                <p className="text-xs text-gray-400">Supports PNG, JPG up to 10MB</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>

          {/* Trigger Request Actions Button group */}
          {imageFile && (
            <button
              onClick={triggerCloudAnalysis}
              disabled={isAnalyzing}
              className="w-full bg-[#40916c] hover:bg-[#2d6a4f] text-white py-3 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer focus:outline-none disabled:opacity-50"
            >
              {isAnalyzing ? (
                <><RefreshCw size={16} className="animate-spin" /> Querying Ibrahim's Engine...</>
              ) : (
                <><ShieldCheck size={18} /> Execute Cloud Analysis</>
              )}
            </button>
          )}

          {/* Error Visual Blocks */}
          {apiError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl flex items-start gap-2 animate-shake">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Execution Blocked: </span>
                <span>{apiError}</span>
              </div>
            </div>
          )}

          {/* Active Diagnostic JSON Mappings Output */}
          {analysisResult && (
            <div className="border-t border-gray-100 dark:border-white/5 pt-6 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Detected Condition</p>
                  <h4 className="text-lg font-bold text-[#1a3a2a] dark:text-white font-serif mt-0.5">{analysisResult.diagnosis}</h4>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Confidence Score</p>
                  <span className="text-sm font-mono font-black text-[#40916c]">{(analysisResult.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Recommended Treatment Actions</h5>
                <ul className="space-y-2">
                  {analysisResult.treatment?.map((step, index) => (
                    <li key={index} className="bg-white dark:bg-[#1a1d1a] border border-gray-100 dark:border-white/5 p-3 rounded-xl text-xs flex items-center gap-3 shadow-2xs text-gray-700 dark:text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-[#40916c]/10 text-[#40916c] font-bold font-mono flex items-center justify-center text-[10px] shrink-0">{index + 1}</span>
                      <span className="break-words flex-1 font-medium">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}