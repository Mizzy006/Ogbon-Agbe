import React, { useEffect, useState } from 'react';
import { Sprout } from 'lucide-react';

export default function Splash({ onEnter }) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Progressive loading simulation to space out entrance pacing smoothly
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    // Automatically transition to Auth view when loader finishes
    const transitionTimeout = setTimeout(() => {
      if (onEnter) onEnter();
    }, 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(transitionTimeout);
    };
  }, [onEnter]);

  return (
    <div className="min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] flex flex-col items-center justify-between p-8 font-sans select-none overflow-hidden transition-colors duration-300 w-full">
      
      {/* Top Design Element: Subtle Cultural Grid Accent */}
      <div className="w-full flex justify-between opacity-20 dark:opacity-10 text-[10px] font-mono tracking-widest text-[#1a3a2a] dark:text-white pt-2 select-none">
        <span>ÌṢÀKÓSO OKO · OSUN AXIS</span>
        <span>AGRI-AI v1.0</span>
      </div>

      {/* Center Branding Content Block */}
      <div className="flex flex-col items-center space-y-6 max-w-sm text-center my-auto animate-fade-in">
        
        {/* Breathing Logo Icon Container */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#40916c] dark:bg-[#1a3a2a] rounded-[36px] flex items-center justify-center shadow-xl shadow-[#40916c]/20 dark:shadow-black/40 animate-pulse relative group">
          <div className="absolute inset-0 rounded-[36px] bg-[#e9c46a] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <Sprout size={48} className="text-[#e9c46a] transform group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Dynamic Brand Text Typography */}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-[#1a3a2a] dark:text-white tracking-tight">
            Ọgbọ́nÀgbẹ̀
          </h1>
          <p className="text-xs sm:text-sm text-[#C8860A] font-bold tracking-widest uppercase font-sans">
            AI-Driven Crop Protection
          </p>
        </div>

        {/* Premium Smooth Progress Bar Indicator */}
        <div className="w-48 bg-gray-200/60 dark:bg-white/5 h-1.5 rounded-full overflow-hidden relative top-4">
          <div 
            className="bg-[#40916c] dark:bg-[#e9c46a] h-full transition-all duration-300 ease-out rounded-full"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Bottom Footer: Cultural Context Stamp */}
      <footer className="text-center space-y-1 pb-4">
        <p className="text-xs font-serif font-bold text-[#1a3a2a] dark:text-gray-400">
          A dúpẹ́ fún iṣẹ́ àgbẹ̀
        </p>
        <p className="text-[10px] text-gray-400 font-mono tracking-wider">
          Built for Osun State Farmers · GDG Osogbo Build with AI
        </p>
      </footer>
    </div>
  );
}