import React from 'react';
import { Sun, Activity, Mic, AlertTriangle, TrendingUp, CloudSun, Droplets, Wind, ChevronRight } from 'lucide-react';

export default function Dashboard({ onNavigate, isDarkMode, toggleTheme, farmName }) {
  // Localized mock data mapping common Osun State crop threats
  const trendingThreats = [
    { crop: "Cassava (Gbálùmọ́)", disease: "Cassava Mosaic Disease", risk: "High", color: "text-red-500 bg-red-500/10 font-bold" },
    { crop: "Maize (Àgbàdo)", disease: "Maize Rust (Ipese)", risk: "Moderate", color: "text-amber-600 bg-amber-500/10 font-bold" }
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] transition-colors duration-300">
      <main className="flex-1 p-10 space-y-8">
        
        {/* Header Section */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-2 text-[#1a3a2a] dark:text-white">
              Ẹ káàárọ̀, {farmName || 'Olasunkanmi Farm'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-sans">Your fields are looking healthy today.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm dark:text-white">
              <Sun size={16} className="text-[#e9c46a]" /> 29°C
            </div>
            <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow-sm dark:text-white">
              <Activity size={16} className="text-[#40916c]" /> 0.82 NDVI
            </div>
          </div>
        </header>

        {/* Top Block: Core App Modules */}
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

          {/* Module 2: Àgbẹ̀ Voice Card */}
          <section className="col-span-4 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-8 border-l-4 border-l-[#e9c46a] shadow-sm">
            <h3 className="text-xl font-bold dark:text-white">Àgbẹ̀ Voice</h3>
            <p className="text-[10px] text-gray-500 mb-6 italic">Ohùn Àgbẹ̀ (Speak to advisor)</p>
            <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5 mb-4 italic text-xs text-[#1a3a2a] dark:text-[#e9c46a]">
              "How do I prevent root rot in my cassava?"
            </div>
            <button 
              onClick={() => onNavigate('AV-01')} 
              className="w-full bg-[#e9c46a] text-[#1a3a2a] py-3 rounded-lg text-sm font-black active:scale-95 transition-all"
            >
              Ask Now
            </button>
          </section>
        </div>

        {/* Bottom Block: Real-Time Agricultural Insights (New Suggestions Location) */}
        <div className="grid grid-cols-12 gap-6 pt-2">
          
          {/* Dynamic Weather Conditions Strip */}
          <section className="col-span-7 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2 text-[#1a3a2a] dark:text-white">
                <CloudSun size={20} className="text-[#40916c]" />
                <h4 className="font-bold text-sm font-serif">Detailed Climate Strip</h4>
              </div>
              <button 
                onClick={() => onNavigate('CA-01')}
                className="text-xs text-[#40916c] font-bold flex items-center gap-0.5 hover:underline"
              >
                Satellite Panel <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 font-sans text-xs">
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-3 rounded-xl flex items-center gap-3">
                <Droplets className="text-blue-500" size={18} />
                <div>
                  <p className="text-gray-400 text-[10px]">HUMIDITY</p>
                  <p className="font-bold dark:text-white">74% Capacity</p>
                </div>
              </div>
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-3 rounded-xl flex items-center gap-3">
                <Wind className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-400 text-[10px]">WIND ANOMALY</p>
                  <p className="font-bold dark:text-white">14 km/h NE</p>
                </div>
              </div>
            </div>
          </section>

          {/* Localized Trending Crop Threats List */}
          <section className="col-span-5 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1a3a2a] dark:text-white border-b border-gray-50 dark:border-white/5 pb-3">
              <TrendingUp size={18} className="text-red-500" />
              <h4 className="font-bold text-sm font-serif">Osun Outbreak Watch</h4>
            </div>

            <div className="space-y-2">
              {trendingThreats.map((threat, idx) => (
                <div 
                  key={idx}
                  onClick={() => onNavigate('FG-01')}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#fdf8f0] dark:bg-[#0f110e] border border-transparent hover:border-[#e9c46a] cursor-pointer transition-all text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                    <div className="truncate">
                      <p className="font-bold dark:text-white truncate">{threat.crop}</p>
                      <p className="text-[10px] text-gray-400 truncate">{threat.disease}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded shrink-0 ${threat.color}`}>
                    {threat.risk}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}