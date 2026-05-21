import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 1. Persistent State Settings (Theme & Language)
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('app_lang') || 'en');
  
  // 2. Persistent User Context State Settings
  const [userData, setUserData] = useState({ 
    farmName: localStorage.getItem('farm_name') || 'Olasunkanmi Farm', 
    lga: localStorage.getItem('farm_lga') || 'Osogbo' 
  });

  // 3. Structural Theme Observer Effect Engine
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 4. Global Control Triggers (Enables clean Sidebar bindings)
  const toggleTheme = () => setIsDarkMode(prev => !prev);
  
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('app_lang', lang);
  };

  const handleProfileUpdate = (newData) => {
    setUserData({
      farmName: newData.farmName,
      lga: newData.lga
    });
  };

  // 5. App Component Render Router
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} currentLang={language} />;
      case 'FG-01':
        return <FarmGuardHome onBack={() => setCurrentView('dashboard')} />;
      case 'CA-01':
        return <ClimateAlert onBack={() => setCurrentView('dashboard')} />;
      case 'AV-01':
        return <AgbeVoice onBack={() => setCurrentView('dashboard')} />;
      case 'profile':
        return <Profile onUpdate={handleProfileUpdate} onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} currentLang={language} />;
    }
  };

  if (currentView === 'splash') return <Splash onEnter={() => setCurrentView('auth')} />;
  
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
    /* Top Wrapping Container Container: Evaluates Light/Dark configurations dynamically */
    <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-osun-cream dark:bg-osun-bg-dark text-osun-green-deep dark:text-white transition-colors duration-300 font-sans">
      
      {/* Structural Side Navigation Component */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        userName={userData.farmName}
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        currentLang={language}
        onLanguageChange={handleLanguageChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Primary Main Content Canvas field Area */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full">
        
        {/* Floating Top Nav Strip strictly visible on Mobile screen aspect ratios */}
        <header className="p-4 flex items-center justify-between bg-white dark:bg-osun-card-dark border-b border-gray-200 dark:border-white/5 lg:hidden shrink-0 transition-colors duration-300">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-osun-green-bright dark:text-osun-gold cursor-pointer focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
            <span className="font-serif font-black text-lg text-osun-green-bright dark:text-osun-gold ml-2">
              Ọgbọ́nÀgbẹ̀
            </span>
          </div>
        </header>

        {/* Dynamic Route View Context Canvas Display Window */}
        <main className="flex-1 overflow-y-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}