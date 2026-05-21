import React, { useState } from 'react';
import { User, MapPin, Save, ChevronLeft, CheckCircle } from 'lucide-react';

export default function Profile({ onBack, onUpdate }) {
  // Initialize state directly from persistent data stores
  const [profile, setProfile] = useState({
    farmName: localStorage.getItem('farm_name') || 'Olasunkanmi Farm',
    lga: localStorage.getItem('farm_lga') || 'Osogbo'
  });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('farm_name', profile.farmName);
    localStorage.setItem('farm_lga', profile.lga);
    
    // Bubble updates up to sync top level Sidebar layouts instantly
    if (onUpdate) onUpdate(profile);
    
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f0] dark:bg-[#0f110e] p-4 sm:p-6 md:p-10 font-sans transition-colors duration-300 w-full">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <header className="flex items-center gap-4">
          <button onClick={onBack} className="text-[#40916c] cursor-pointer p-1.5 hover:opacity-75 focus:outline-none">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a3a2a] dark:text-white">Farm Profile</h2>
            <p className="text-xs text-gray-400">Configure localized workspace identities.</p>
          </div>
        </header>

        {/* Success Alert Toast Notification */}
        {showSavedToast && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2 animate-fade-in shadow-xs">
            <CheckCircle size={16} className="shrink-0" />
            <p className="font-bold">Ìyípadà ti fìdí múlẹ̀! Profile credentials updated successfully.</p>
          </div>
        )}

        {/* Profile Card Interface */}
        <div className="bg-white dark:bg-[#1a1d1a] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleSave} className="space-y-5">
            
            {/* Visual Profile Avatar Banner */}
            <div className="flex items-center gap-4 border-b border-gray-50 dark:border-white/5 pb-5">
              <div className="w-16 h-16 bg-[#40916c]/10 text-[#40916c] rounded-full flex items-center justify-center shadow-inner shrink-0">
                <User size={32} />
              </div>
              <div>
                <h4 className="font-serif font-black text-lg dark:text-white">{profile.farmName}</h4>
                <p className="text-xs text-gray-400 font-mono flex items-center gap-1 mt-0.5"><MapPin size={12} /> {profile.lga} Axis</p>
              </div>
            </div>

            {/* Input Field: Farm Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#40916c]">Farm Name</label>
              <input 
                type="text"
                required
                value={profile.farmName}
                onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                className="w-full bg-[#fdf8f0] dark:bg-[#0f110e] border border-gray-200 dark:border-white/10 p-3.5 sm:p-4 rounded-xl focus:ring-2 ring-[#e9c46a] outline-none dark:text-white text-sm"
              />
            </div>

            {/* Selection Block: LGA Location Context */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#40916c]">Location Area (LGA)</label>
              <select 
                value={profile.lga}
                onChange={(e) => setProfile({ ...profile, lga: e.target.value })}
                className="w-full bg-[#fdf8f0] dark:bg-[#0f110e] border border-gray-200 dark:border-white/10 p-3.5 sm:p-4 rounded-xl dark:text-white appearance-none outline-none focus:ring-2 ring-[#e9c46a] text-sm cursor-pointer"
              >
                <option value="Osogbo">Osogbo</option>
                <option value="Ife Central">Ife Central</option>
                <option value="Ilesa East">Ilesa East</option>
              </select>
            </div>

            {/* Trigger Button */}
            <button 
              type="submit"
              className="w-full bg-[#40916c] hover:bg-[#2d6a4f] text-white py-3.5 sm:py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer focus:outline-none mt-4"
            >
              <Save size={18} /> Save Workspace Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}