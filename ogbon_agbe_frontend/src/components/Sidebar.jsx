import React from 'react';
import { Home, ShieldCheck, TrendingUp, PawPrint, MessageSquare, Settings, Sun, Moon, Mic } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all 
    ${active 
      ? 'bg-[#2d6a4f]/10 text-[#2d6a4f] dark:bg-[#2d6a4f]/30 dark:text-white border-l-4 border-[#e9c46a]' 
      : 'text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default function Sidebar({ onNavigate, isDarkMode, toggleTheme, currentView }) {
  return (
    <aside className="w-64 border-r border-gray-200 dark:border-white/10 p-6 flex flex-col gap-8 bg-white dark:bg-[#0f110e] h-screen sticky top-0 transition-colors duration-300">
      <h1 className="font-serif text-2xl font-bold text-[#2d6a4f] dark:text-[#e9c46a] px-4">Ọgbọ́nÀgbẹ̀</h1>
      
      <nav className="flex flex-col gap-2 flex-1">
        <SidebarItem 
          icon={Home} 
          label="Ilé (Home)" 
          active={currentView === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <SidebarItem 
          icon={ShieldCheck} 
          label="FarmGuard" 
          active={currentView === 'FG-01'} 
          onClick={() => onNavigate('FG-01')} 
        />
        {/* Placeholders for Phase 2 [cite: 55] */}
        <SidebarItem icon={TrendingUp} label="MarketPulse" onClick={() => {}} />
        <SidebarItem icon={PawPrint} label="LivestockCare" onClick={() => {}} />
        <SidebarItem icon={MessageSquare} label="Ìfọ̀rọ̀wérọ̀ (Chat)" onClick={() => {}} />
        <SidebarItem icon={Settings} label="Ètò (Profile)" onClick={() => {}} />
      </nav>

      <button 
        onClick={toggleTheme}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left"
      >
        {isDarkMode ? <Sun size={20} className="text-[#e9c46a]" /> : <Moon size={20} />}
        <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      <button className="bg-[#40916c] text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold active:scale-95 transition-all">
        <Mic size={18} /> Àgbẹ̀ Voice AI
      </button>
    </aside>
  );
}