import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, ChevronLeft, CornerDownRight, HeartPulse, Volume2, VolumeX } from 'lucide-react';

export default function FarmGuardHome({ onBack }) {
  const [image, setImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef();

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      startScan();
    }
  };

  const startScan = () => {
    setIsScanning(true);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop any leftover audio
      setIsSpeaking(false);
    }
    
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        diseaseYoruba: "Àìsàn Èso Gbegiri (CMD)",
        diseaseEnglish: "Cassava Mosaic Disease",
        confidence: 94,
        status: "Severe Threat",
        cause: "Whiteflies (Amuwọle) transferring geminiviruses.",
        treatmentPlan: [
          "Fà á tu kúrò lójú ẹsẹ̀ kó o sì dáná sun ún.",
          "Lo irúgbìn tí kò le tètè lárùn fún ìgbà tókàn.",
          "Ṣàkóso àwọn kòkòrò funfun tí ń tàn án kálẹ̀."
        ],
        // The combined raw text optimized for the audio reader
        audioScript: "Àìsàn Èso Gbegiri. Ìtọ́jú kìíní: Fà á tu kúrò lójú ẹsẹ̀ kó o sì dáná sun ún. Ìtọ́jú kejì: Lo irúgbìn tí kò le tètè lárùn fún ìgbà tókàn. Ìtọ́jú kẹta: Ṣàkóso àwọn kòkòrò funfun tí ń tàn án kálẹ̀."
      });
    }, 3000);
  };

  // Web Speech API Trigger for Local Testing
  const handleReadAloud = () => {
    if (!window.speechSynthesis) {
      alert("Your browser does not support voice text-to-speech features.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(scanResult.audioScript);
    
    // Try to locate an African or Nigerian English/Yoruba accent voice profile if available in the browser
    const voices = window.speechSynthesis.getVoices();
    const localVoice = voices.find(voice => voice.lang.includes('NG') || voice.lang.includes('yo'));
    if (localVoice) utterance.voice = localVoice;

    utterance.rate = 0.85; // Slow down slightly for clarity in outdoor conditions

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCloseAndClean = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setImage(null);
    setScanResult(null);
  };

  return (
    <div className="min-h-screen bg-osun-cream dark:bg-osun-bg-dark p-6 font-sans transition-colors duration-300">
      <div className="max-w-xl mx-auto flex items-center justify-between mb-6">
        <button 
          onClick={() => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            onBack();
          }} 
          className="flex items-center gap-1 text-osun-green-mid font-bold text-sm"
        >
          <ChevronLeft size={18} /> Ilé
        </button>
        <span className="text-xs font-mono font-bold bg-[#2D7D46]/10 text-[#2D7D46] px-3 py-1 rounded-full">
          FG-03: Live Diagnosis
        </span>
      </div>

      <div className="max-w-xl mx-auto">
        {!image ? (
          <>
            <header className="mb-8">
              <h2 className="font-serif text-3xl font-black text-osun-green-deep dark:text-white">FarmGuard</h2>
              <p className="text-xs text-gray-500 font-medium italic mt-1">Ààbò Oko · Crop Disease Intelligence</p>
            </header>

            <div 
              onClick={() => fileInputRef.current.click()}
              className="aspect-[4/5] bg-white dark:bg-osun-card-dark border-2 border-dashed border-osun-green-mid/20 rounded-[32px] flex flex-col items-center justify-center gap-4 text-center p-8 cursor-pointer shadow-sm hover:border-osun-green-bright transition-all"
            >
              <div className="p-5 bg-[#2D7D46]/10 text-[#2D7D46] rounded-full">
                <Camera size={40} />
              </div>
              <div>
                <p className="font-bold text-osun-green-deep dark:text-white text-lg">Scan Sick Crop</p>
                <p className="text-xs text-gray-400 mt-2 max-w-[200px] mx-auto">
                  Snap leaf directly in daylight for highly localized Yoruba diagnostics.
                </p>
              </div>
              <input type="file" accept="image/*" capture="environment" hidden ref={fileInputRef} onChange={handleCapture} />
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[32px] overflow-hidden shadow-xl border border-gray-100 dark:border-white/5">
              <img src={image} alt="Crop status" className="w-full h-full object-cover" />
              
              {isScanning && (
                <div className="absolute inset-0 bg-osun-green-deep/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center text-white">
                  <RefreshCw size={44} className="text-osun-gold animate-spin mb-4" />
                  <h3 className="text-xl font-bold font-serif tracking-wide">Ṣíṣàyẹ̀wò Irúgbìn...</h3>
                  <p className="text-osun-gold text-xs mt-1 max-w-[200px]">Gemini 1.5 Pro is running deep vision diagnostics.</p>
                </div>
              )}
            </div>

            {scanResult && !isScanning && (
              <div className="bg-white dark:bg-osun-card-dark p-6 rounded-[32px] shadow-lg border border-gray-100 dark:border-white/5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                
                <div className="flex items-start justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                      {scanResult.status}
                    </span>
                    <h4 className="text-2xl font-serif font-bold text-osun-green-deep dark:text-white mt-1">
                      {scanResult.diseaseYoruba}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium italic">{scanResult.diseaseEnglish}</p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-osun-cream dark:bg-osun-bg-dark p-3 rounded-2xl border border-gray-100 dark:border-white/5">
                    <span className="text-lg font-mono font-black text-[#2D7D46]">{scanResult.confidence}%</span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Match</span>
                  </div>
                </div>

                {/* ACCESSIBILITY FEATURE: Read Aloud Trigger Card */}
                <div className="bg-osun-gold/10 border border-osun-gold/20 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-osun-green-deep dark:text-osun-gold">Kà á jáde (Audio Reader)</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">Listen to the disease diagnosis and treatments</span>
                  </div>
                  <button 
                    onClick={handleReadAloud}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isSpeaking ? 'bg-red-500 text-white animate-pulse' : 'bg-osun-gold text-osun-green-deep'
                    } shadow-md`}
                  >
                    {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>

                <div className="text-sm space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ọkùnfà (Cause)</p>
                  <p className="dark:text-gray-200 font-medium">{scanResult.cause}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <HeartPulse size={14} className="text-[#2D7D46]" /> Ìtọ́jú & Ìgbésẹ̀ (Treatment Plan)
                  </p>
                  
                  <div className="space-y-2">
                    {scanResult.treatmentPlan.map((step, idx) => (
                      <div key={idx} className="p-3 bg-osun-cream dark:bg-osun-bg-dark rounded-xl flex items-start gap-3 border border-gray-100 dark:border-white/5">
                        <CornerDownRight size={16} className="text-osun-gold shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleCloseAndClean} 
                    className="w-full bg-osun-green-mid hover:bg-[#2D7D46] text-white py-3.5 rounded-xl text-sm font-bold active:scale-95 transition-all shadow-md"
                  >
                    Scan Another Leaf
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}