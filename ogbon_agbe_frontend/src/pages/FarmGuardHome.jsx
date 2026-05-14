import React, { useState } from 'react';
import { Camera, Upload, Info } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function FarmGuardHome({ onNavigate, isDarkMode, toggleTheme }) {
  const [image, setImage] = useState(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex min-h-screen bg-osun-cream dark:bg-osun-bg-dark transition-colors duration-300">
      <Sidebar 
        onNavigate={onNavigate} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        currentView="FG-01" 
      />

      <main className="flex-1 p-10">
        <header className="mb-8">
          <h2 className="font-serif text-4xl font-bold dark:text-white">FarmGuard</h2>
          <p className="text-gray-500 dark:text-gray-400">Scan your crops for instant health diagnosis.</p>
        </header>

        <div className="max-w-4xl">
          <div className="bg-osun-green-bright/10 border border-osun-green-bright/20 p-5 rounded-2xl mb-8 flex gap-4">
            <Info className="text-osun-green-bright shrink-0" size={20} />
            <p className="text-sm text-osun-green-deep dark:text-green-100/70 leading-relaxed">
              <strong>Bí o ṣe lè lò ó:</strong> Ya fọ́tò ewé tó ṣàìsàn láti gba ìrànlọ́wọ́ lẹ́sẹ̀kẹsẹ̀.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-white/10 rounded-3xl h-96 bg-white dark:bg-osun-card-dark relative overflow-hidden shadow-inner">
            {image ? (
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8">
                <Camera size={64} className="mx-auto text-gray-200 dark:text-gray-700 mb-4" />
                <p className="text-gray-400 dark:text-gray-500">No photo captured yet</p>
              </div>
            )}
            
            <label className="absolute bottom-8 bg-[#2D7D46] text-white px-10 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all">
              <Upload size={20} />
              <span>{image ? "Yí Fọ́tò Padà" : "Ya Fọ́tò / Gbé wọlé"}</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCapture} />
            </label>
          </div>

          {image && (
            <button className="w-full mt-8 bg-osun-gold text-osun-green-deep py-4 rounded-2xl font-black text-xl shadow-xl hover:brightness-105 active:scale-95 transition-all">
              ṢÀYẸ̀WÒ (SCAN CROP)
            </button>
          )}
        </div>
      </main>
    </div>
  );
}