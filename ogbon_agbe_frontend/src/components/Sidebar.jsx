import React from 'react';
import { Home, ShieldCheck, CloudSun, Mic, UserCircle, Moon, Sun, Globe, X } from 'lucide-react';

export default function Sidebar({ currentView, onNavigate, isDarkMode, toggleTheme, userName, isOpen, onClose }) {
  const menuItems = [
    { id: 'dashboard', label: 'Ilé (Home)', icon: Home },
    { id: 'FG-01', label: 'FarmGuard', icon: ShieldCheck },
    { id: 'CA-01', label: 'ClimateAlert', icon: CloudSun },
    { id: 'AV-01', label: 'Àgbẹ̀ Voice', icon: Mic },
  ];

  const handleNavClick = (viewId) => {
    onNavigate(viewId);
    if (isOpen) onClose(); // Auto-collapse overlay drawer immediately upon choice on small viewports
  };

  return (
    <>
      {/* 1. Backdrop Overlay for Small Mobile Screens (Acts like a Modal modal element) */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden cursor-pointer transition-opacity duration-300"
        />
      )}

      {/* 2. Main Sidebar Shell Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 p-6 bg-white dark:bg-osun-bg-dark 
        border-r border-gray-200 dark:border-white/10 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:sticky lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header Block with Close Button for Mobile Layout Drawer Viewports */}
        <div className="flex items-center justify-between mb-8 px-4">
          <h1 className="font-serif text-2xl font-bold text-osun-green-mid dark:text-osun-gold">Ọgbọ́nÀgbẹ̀</h1>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white p-1 cursor-pointer focus:outline-none"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* User Profile Action Trigger */}
        <button 
          onClick={() => handleNavClick('profile')}
          className={`flex items-center gap-3 px-4 py-3 mb-6 rounded-2xl transition-all border cursor-pointer focus:outline-none ${
            currentView === 'profile' 
            ? 'bg-osun-gold/10 border-osun-gold text-osun-green-deep dark:text-white' 
            : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-osun-green-mid flex items-center justify-center text-white shrink-0 shadow-md">
            <UserCircle size={24} />
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-xs font-bold truncate dark:text-white">{userName || 'Àgbẹ̀ Farm'}</p>
            <p className="text-[10px] text-gray-400 uppercase font-black">Edit Profile</p>
          </div>
        </button>
        
        {/* Navigation Core Panel Items */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer focus:outline-none ${
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

        {/* Global Configuration Controls Section Footer */}
        <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-2 shrink-0">
          <button className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 w-full hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer focus:outline-none">
            <Globe size={16} /> EN | YOR
          </button>
          <button 
            onClick={toggleTheme} 
            className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 w-full hover:bg-black/5 dark:hover:bg-white/5 rounded-lg cursor-pointer focus:outline-none"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>
    </>
  );
}