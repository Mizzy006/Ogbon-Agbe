import React from 'react';
import { Sprout } from 'lucide-react';

export default function Splash({ onEnter }) {
  return (
    <div className="h-screen bg-osun-green-deep flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-8 animate-bounce">
        <Sprout size={64} className="text-osun-gold" />
      </div>
      <h1 className="font-serif text-6xl font-black text-white mb-2">
        Ọgbọ́n<span className="text-osun-gold">Àgbẹ̀</span>
      </h1>
      <p className="font-sans text-green-100/60 max-w-xs mb-12">
        AI-driven farm intelligence for Osun State.
      </p>
      <button 
        onClick={onEnter}
        className="w-full max-w-xs bg-osun-gold text-osun-green-deep py-4 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all"
      >
        Get Started
      </button>
    </div>
  );
}