import React from 'react';
import { Activity, Droplets, CloudLightning, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ClimateAlert() {
  return (
    <div className="min-h-screen bg-osun-cream dark:bg-osun-bg-dark p-6 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header view indicators for Check-in */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-black text-osun-green-deep dark:text-white">ClimateAlert</h2>
            <p className="text-xs text-gray-500 font-mono italic mt-0.5">Ìkìlọ̀ Ojú Ọjọ́ (Satellite Intelligence)</p>
          </div>
          <div className="bg-white dark:bg-osun-card-dark border border-gray-100 dark:border-white/5 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm text-xs font-bold text-gray-500 dark:text-gray-400 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            G-Engine Region: Osun Central
          </div>
        </header>

        {/* CA-01 GeoData Integration Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* NDVI Metric Card */}
          <div className="bg-white dark:bg-osun-card-dark border-l-4 border-l-[#2D7D46] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">NDVI Canopy Cover</span>
              <Activity size={18} className="text-[#2D7D46]" />
            </div>
            <p className="text-3xl font-serif font-black dark:text-white mb-1">0.82</p>
            <span className="text-[10px] text-[#2D7D46] bg-[#2D7D46]/10 px-2 py-0.5 rounded font-bold">Optimal Health</span>
          </div>

          {/* Precipitation Metric Card */}
          <div className="bg-white dark:bg-osun-card-dark border-l-4 border-l-[#3D5A80] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">Rainfall Anomaly</span>
              <Droplets size={18} className="text-[#3D5A80]" />
            </div>
            <p className="text-3xl font-serif font-black dark:text-white mb-1">-4.2mm</p>
            <span className="text-[10px] text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded font-bold">Mild Dry Spell</span>
          </div>

          {/* Threat Metric Card */}
          <div className="bg-white dark:bg-osun-card-dark border-l-4 border-l-[#C8860A] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase">Risk Level</span>
              <CloudLightning size={18} className="text-[#C8860A]" />
            </div>
            <p className="text-3xl font-serif font-black dark:text-white mb-1">Moderate</p>
            <span className="text-[10px] text-[#C8860A] bg-[#C8860A]/10 px-2 py-0.5 rounded font-bold">Heat Stress Risk</span>
          </div>
        </div>

        {/* CA-02: Precise Context Actions Framework */}
        <div className="bg-white dark:bg-osun-card-dark border border-gray-100 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-amber-500 border-b border-gray-100 dark:border-white/5 pb-4">
            <AlertTriangle size={24} />
            <h3 className="text-xl font-serif font-bold dark:text-white">Ìgbésẹ̀ Àbájáde (Action Steps)</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-amber-500/10 rounded-xl text-amber-600 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold dark:text-white mb-0.5">Fertilizer Warning</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Due to the current dry spell anomaly detected via satellite observations, delay all Nitrogen application on Cassava plots to prevent systemic root burn.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start border-t border-gray-100 dark:border-white/5 pt-4">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600 shrink-0">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold dark:text-white mb-0.5">Water Management</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Focus on localized moisture conservation. Mulching should be reinforced around Cocoa seedlings across all fields over the next 72 hours.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}