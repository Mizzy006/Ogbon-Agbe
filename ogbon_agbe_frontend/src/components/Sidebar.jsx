import React from 'react';
import { Home, ShieldCheck, CloudSun, Mic, UserCircle, Settings, Moon, Sun, Globe } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate, isDarkMode, toggleTheme, userName }) {
  const menuItems = [
    { id: 'dashboard', label: 'Ilé (Home)', icon: Home },
    { id: 'FG-01', label: 'FarmGuard', icon: ShieldCheck },
    { id: 'CA-01', label: 'ClimateAlert', icon: CloudSun },
    { id: 'AV-01', label: 'Àgbẹ̀ Voice', icon: Mic },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-white/10 p-6 flex flex-col h-screen sticky top-0 bg-white dark:bg-osun-bg-dark transition-colors z-20">
      <h1 className="font-serif text-2xl font-bold text-osun-green-mid dark:text-osun-gold mb-8 px-4">Ọgbọ́nÀgbẹ̀</h1>
      
      {/* User Profile Entry in Sidebar  */}
      <button 
        onClick={() => onNavigate('profile')}
        className={`flex items-center gap-3 px-4 py-3 mb-6 rounded-2xl transition-all border ${
          currentView === 'profile' 
          ? 'bg-osun-gold/10 border-osun-gold text-osun-green-deep dark:text-white' 
          : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-osun-green-mid flex items-center justify-center text-white shrink-0 shadow-md">
          <UserCircle size={24} />
        </div>
        <div className="text-left overflow-hidden">
          <p className="text-xs font-bold truncate">{userName || 'Àgbẹ̀ Farm'}</p>
          <p className="text-[10px] text-gray-400 uppercase font-black">Edit Profile</p>
        </div>
      </button>
      
      <nav className="flex flex-col gap-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
              ? 'bg-osun-green-mid text-white shadow-lg shadow-osun-green-mid/20' 
              : 'text-gray-500 dark:text-gray-400 hover:bg-osun-green-mid/5'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-2">
        <button className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 w-full hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
          <Globe size={16} /> EN | YOR
        </button>
        <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 w-full hover:bg-black/5 dark:hover:bg-white/5 rounded-lg">
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </aside>
  );
}