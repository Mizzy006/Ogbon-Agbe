import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react'; // Trigger element icon for small device screens
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import FarmGuardHome from './pages/FarmGuardHome';
import ClimateAlert from './pages/ClimateAlert';
import AgbeVoice from './pages/AgbeVoice';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';

export default function App() {
  const [currentView, setCurrentView] = useState('splash');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar Modal State Controller
  const [userData, setUserData] = useState({ 
    farmName: 'Olasunkanmi Farm', 
    lga: 'Osogbo' 
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard farmName={userData.farmName} onNavigate={setCurrentView} />;
      case 'FG-01':
        return <FarmGuardHome onBack={() => setCurrentView('dashboard')} />;
      case 'CA-01':
        return <ClimateAlert />;
      case 'AV-01':
        return <AgbeVoice onBack={() => setCurrentView('dashboard')} />;
      case 'profile':
        return <Profile userData={userData} onUpdate={(newData) => setUserData(newData)} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard farmName={userData.farmName} onNavigate={setCurrentView} />;
    }
  };

// Quick check of your App.jsx view router routing mechanism:
if (currentView === 'splash') {
  return <Splash onEnter={() => setCurrentView('auth')} />;
}// Change this line inside your App.jsx component's switch renderer:
if (currentView === 'auth') {
  return (
    <Auth 
      onLoginSuccess={(data) => { 
        setUserData({ farmName: data.farmName, lga: data.lga }); 
        setCurrentView('dashboard'); 
      }} 
    />
  );
}
  return (
    <div className="flex min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] transition-colors duration-300 max-w-full overflow-x-hidden">
      
      {/* 1. Global Side Navigation Control - Managed layout responsive drawer mapping triggers */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        userName={userData.farmName}
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* 2. Main Content Display Field with Global Mobile Floating Top Strip */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        
        {/* Floating Toggle Header bar strictly displaying for screen aspect break margins under desktop layout */}
        <header className="p-4 flex items-center bg-white dark:bg-[#1a1d1a] border-b border-gray-200 dark:border-white/5 lg:hidden shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-osun-green-mid dark:text-osun-gold cursor-pointer focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
          <span className="font-serif font-black text-lg text-osun-green-deep dark:text-white ml-3">
            Ọgbọ́nÀgbẹ̀
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}