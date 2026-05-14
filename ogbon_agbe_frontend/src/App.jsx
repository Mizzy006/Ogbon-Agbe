import React, { useState, useEffect } from 'react';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import FarmGuardHome from './pages/FarmGuardHome';

function App() {
  const [view, setView] = useState('splash');
  // Default: Dark Mode per briefing v2.0 [cite: 83]
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark class to root document to enable Tailwind's dark: mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Unified prop object to ensure consistency across screens
  const sharedProps = {
    onNavigate: setView,
    isDarkMode,
    toggleTheme
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {view === 'splash' && <Splash onEnter={() => setView('dashboard')} />}
      {view === 'dashboard' && <Dashboard {...sharedProps} />}
      {view === 'FG-01' && <FarmGuardHome {...sharedProps} />}
    </div>
  );
}

export default App;