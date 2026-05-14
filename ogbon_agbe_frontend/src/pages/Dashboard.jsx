import React from 'react';
import { Sun, Activity, Mic } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function Dashboard({ onNavigate, isDarkMode, toggleTheme }) {
  return (
    <div className="flex min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] transition-colors duration-300">
      <Sidebar 
        onNavigate={onNavigate} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        currentView="dashboard" 
      />

      <main className="flex-1 p-10">
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-2 text-[#1a3a2a] dark:text-white">Ẹ káàárọ̀, Olasunkanmi Farm</h2>
            <p className="text-gray-500 dark:text-gray-400 font-sans">Your fields are looking healthy today.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm">
              <Sun size={16} className="text-[#e9c46a]" /> 29°C
            </div>
            <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm">
              <Activity size={16} className="text-[#40916c]" /> 0.82 NDVI
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Module 1: FarmGuard Card */}
          <section className="col-span-8 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">FarmGuard</h3>
                <p className="text-xs text-gray-500 font-mono italic">Ìṣàkóso Oko (Farm Management)</p>
              </div>
              <button 
                onClick={() => onNavigate('FG-01')}
                className="bg-[#40916c] text-white px-6 py-2 rounded-full font-bold text-sm active:scale-95 transition-transform"
              >
                Check Field
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 font-sans">
              {['Cassava Plot', 'Cocoa Unit', 'Yield Forecast'].map((item) => (
                <div key={item} className="bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                  <p className="text-[10px] text-gray-400 uppercase mb-1">{item}</p>
                  <p className="font-bold text-[#2d6a4f] dark:text-[#40916c]">Optimal</p>
                </div>
              ))}
            </div>
          </section>

          {/* Module 3: Àgbẹ̀ Voice Card */}
          <section className="col-span-4 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-8 border-l-4 border-l-[#e9c46a] shadow-sm">
              <h3 className="text-xl font-bold dark:text-white leading-tight">Àgbẹ̀ Voice</h3>
              <p className="text-[10px] text-gray-500 mb-6 italic">Ọgbọ́n AI (Speak to advisor)</p>
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5 mb-4 italic text-xs text-[#2d6a4f] dark:text-[#e9c46a]">
                "How do I prevent root rot in my cassava?"
              </div>
              <button className="w-full bg-[#e9c46a] text-[#1a3a2a] py-3 rounded-lg text-sm font-black active:scale-95 transition-transform">
                Ask Now
              </button>
          </section>
        </div>
      </main>
    </div>
  );
}