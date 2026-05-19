import React, { useState, useEffect } from 'react';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import FarmGuardHome from './pages/FarmGuardHome';
import ClimateAlert from './pages/ClimateAlert';
import AgbeVoice from './pages/AgbeVoice';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';

export default function App() {
  // Navigation & Auth State
  const [currentView, setCurrentView] = useState('splash');
  const [userData, setUserData] = useState({ 
    farmName: 'Olasunkanmi Farm', 
    lga: 'Osogbo' 
  });

  // Theme State (Light Mode default as requested)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply Tailwind 'dark' class to the root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Main Content Router
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          farmName={userData.farmName} 
          onNavigate={setCurrentView} 
        />;
      case 'FG-01':
        return <FarmGuardHome 
          onBack={() => setCurrentView('dashboard')} 
        />;
      case 'CA-01':
        return <ClimateAlert />;
      case 'AV-01':
        return <AgbeVoice 
          onBack={() => setCurrentView('dashboard')} 
        />;
      case 'profile':
        return <Profile 
          userData={userData} 
          onUpdate={(newData) => setUserData(newData)} 
          onBack={() => setCurrentView('dashboard')} 
        />;
      default:
        return <Dashboard 
          farmName={userData.farmName} 
          onNavigate={setCurrentView} 
        />;
    }
  };

  // High-level "Gates" (Splash and Auth)
  if (currentView === 'splash') {
    return <Splash onEnter={() => setCurrentView('auth')} />;
  }

  if (currentView === 'auth') {
    return (
      <Auth 
        onLoginSuccess={(data) => {
          setUserData(data);
          setCurrentView('dashboard');
        }} 
      />
    );
  }

  // Authenticated Layout with Sidebar
  return (
    <div className="flex min-h-screen bg-osun-cream dark:bg-osun-bg-dark transition-colors duration-300">
      {/* Persistent Sidebar for global navigation */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        userName={userData.farmName}
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      {/* Dynamic Module Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}