import React, { useState, useEffect } from 'react';
import { Sun, Activity, AlertTriangle, TrendingUp, CloudSun, Droplets, Wind, ChevronRight } from 'lucide-react';
import { farmGuardService, climateService } from '../services/api';

export default function Dashboard({ onNavigate, isDarkMode, toggleTheme }) {
  // Read localized session data dynamically from persistent storage
  const farmName = localStorage.getItem('farm_name') || 'Olasunkanmi Farm';
  const farmLga = localStorage.getItem('farm_lga') || 'Osogbo';

  const [trendingThreats, setTrendingThreats] = useState([]);
  const [climateMetrics, setClimateMetrics] = useState({ ndvi: 0.82, humidity: 74, temp: 29, windSpeed: 14 });
  const [isLoadingThreats, setIsLoadingThreats] = useState(true);

  useEffect(() => {
    // 1. Fetch live regional outbreak anomalies
    async function fetchThreats() {
      try {
        setIsLoadingThreats(true);
        const data = await farmGuardService.getMockThreats(); // Swaps out smoothly once backend route matches
        setTrendingThreats(data);
      } catch (error) {
        console.error("Threats sync error:", error);
      } finally {
        setIsLoadingThreats(false);
      }
    }

    // 2. Fetch active atmospheric tracking matrix
    async function fetchClimate() {
      try {
        const metrics = await climateService.getMetrics(farmLga);
        setClimateMetrics(metrics);
      } catch (error) {
        console.error("Dashboard climate telemetry fallback applied:", error);
      }
    }

    fetchThreats();
    fetchClimate();
  }, [farmLga]);

  return (
    <div className="flex min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] transition-colors duration-300 w-full max-w-full overflow-x-hidden">
      <main className="flex-1 p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8 w-full max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-8 w-full">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-[#1a3a2a] dark:text-white break-words">
              Ẹ káàárọ̀, {farmName}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">Your fields in {farmLga} are looking healthy today.</p>
          </div>
          
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto shrink-0">
            <div className="flex-1 sm:flex-initial bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-3 sm:px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm dark:text-white font-medium">
              <Sun size={16} className="text-[#e9c46a]" /> {climateMetrics.temp}°C
            </div>
            <div className="flex-1 sm:flex-initial bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 px-3 sm:px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-sm dark:text-white font-medium">
              <Activity size={16} className="text-[#40916c]" /> {climateMetrics.ndvi.toFixed(2)} NDVI
            </div>
          </div>
        </header>

        {/* Top Block: Core Modules */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* FarmGuard Card */}
          <section className="col-span-12 md:col-span-8 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8 w-full">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold dark:text-white">FarmGuard</h3>
                <p className="text-xs text-gray-500 font-mono italic mt-0.5">Ìṣàkóso Oko (Farm Management)</p>
              </div>
              <button 
                onClick={() => onNavigate('FG-01')}
                className="w-full sm:w-auto bg-[#40916c] hover:bg-[#2d6a4f] text-white px-6 py-2.5 rounded-full font-bold text-sm active:scale-95 transition-all cursor-pointer focus:outline-none shadow-sm text-center"
              >
                Check Field
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-sans w-full">
              {['Cassava Plot', 'Cocoa Unit', 'Yield Forecast'].map((item) => (
                <div key={item} className="bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5 text-center">
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1 tracking-wider">{item}</p>
                  <p className="font-bold text-[#2d6a4f] dark:text-[#40916c]">Optimal</p>
                </div>
              ))}
            </div>
          </section>

          {/* Àgbẹ̀ Voice Card */}
          <section className="col-span-12 md:col-span-4 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 sm:p-8 border-l-4 border-l-[#e9c46a] shadow-sm flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold dark:text-white">Àgbẹ̀ Voice</h3>
              <p className="text-[10px] text-gray-500 mb-4 sm:mb-6 italic">Ohùn Àgbẹ̀ (Speak to advisor)</p>
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-4 rounded-xl border border-gray-100 dark:border-white/5 italic text-xs text-[#1a3a2a] dark:text-[#e9c46a] leading-relaxed break-words">
                "How do I prevent root rot in my cassava?"
              </div>
            </div>
            <button 
              onClick={() => onNavigate('AV-01')} 
              className="w-full bg-[#e9c46a] hover:bg-[#dfb54b] text-[#1a3a2a] py-3 rounded-xl text-sm font-black active:scale-95 transition-all cursor-pointer focus:outline-none shadow-sm"
            >
              Ask Now
            </button>
          </section>
        </div>

        {/* Bottom Block: Insights */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* Detailed Climate Strip */}
          <section className="col-span-12 md:col-span-7 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 dark:border-white/5 pb-3 w-full">
              <div className="flex items-center gap-2 text-[#1a3a2a] dark:text-white min-w-0">
                <CloudSun size={20} className="text-[#40916c] shrink-0" />
                <h4 className="font-bold text-sm font-serif truncate">Detailed Climate Strip</h4>
              </div>
              <button 
                onClick={() => onNavigate('CA-01')}
                className="text-xs text-[#40916c] font-bold flex items-center gap-0.5 hover:underline cursor-pointer shrink-0 p-1 focus:outline-none"
              >
                Satellite Panel <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs w-full">
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-3 rounded-xl flex items-center gap-3 border border-gray-50 dark:border-white/5">
                <Droplets className="text-blue-500 shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-gray-400 text-[9px] font-bold tracking-wider">HUMIDITY</p>
                  <p className="font-bold dark:text-white truncate">{climateMetrics.humidity}% Capacity</p>
                </div>
              </div>
              <div className="bg-[#fdf8f0] dark:bg-[#0f110e] p-3 rounded-xl flex items-center gap-3 border border-gray-50 dark:border-white/5">
                <Wind className="text-gray-400 shrink-0" size={18} />
                <div className="min-w-0">
                  <p className="text-gray-400 text-[9px] font-bold tracking-wider">WIND ANOMALY</p>
                  <p className="font-bold dark:text-white truncate">{climateMetrics.windSpeed} km/h NE</p>
                </div>
              </div>
            </div>
          </section>

          {/* Outbreak Watch Panel */}
          <section className="col-span-12 md:col-span-5 bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#1a3a2a] dark:text-white border-b border-gray-50 dark:border-white/5 pb-3 w-full">
              <TrendingUp size={18} className="text-red-500 shrink-0" />
              <h4 className="font-bold text-sm font-serif truncate">Osun Outbreak Watch</h4>
            </div>

            <div className="space-y-2 w-full">
              {isLoadingThreats ? (
                <p className="text-xs text-gray-400 italic animate-pulse p-2">Syncing telemetry logs...</p>
              ) : (
                trendingThreats.map((threat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => onNavigate('FG-01')}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#fdf8f0] dark:bg-[#0f110e] border border-transparent hover:border-[#e9c46a] cursor-pointer transition-all text-xs w-full gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold dark:text-white truncate">{threat.crop}</p>
                        <p className="text-[10px] text-gray-400 truncate">{threat.disease}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded shrink-0 ${threat.color} whitespace-nowrap`}>
                      {threat.risk}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}