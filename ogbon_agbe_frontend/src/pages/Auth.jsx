import React, { useState } from 'react';
import { MapPin, Sprout, ArrowRight } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ farmName: '', lga: 'Osogbo' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Persist user session context for structural dashboard continuity
    localStorage.setItem('farm_name', formData.farmName);
    localStorage.setItem('farm_lga', formData.lga);
    
    // 2. Mock Firebase Identity Token to satisfy Abdullahi's `Depends(verify_firebase_token)` check
    // Replace "MOCK_DEVELOPMENT_TOKEN" with your real Firebase JWT string once Phone Auth is wired up
    localStorage.setItem('fb_auth_token', 'MOCK_DEVELOPMENT_TOKEN');

    // Return the complete object to the top-level handler state wrapper
    onLoginSuccess(formData);
  };

  return (
    <div className="min-h-screen bg-osun-cream dark:bg-osun-bg-dark p-4 sm:p-8 flex flex-col justify-center font-sans w-full max-w-full overflow-x-hidden transition-colors duration-300">
      <div className="max-w-md mx-auto w-full bg-white dark:bg-osun-card-dark border border-gray-100 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        <header className="mb-8 text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-osun-green-mid rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout size={28} className="text-osun-gold" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-osun-green-deep dark:text-white">Ẹ káàárọ̀!</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Enter your farm details to start workspace tracking.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Block: Farm Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-osun-green-mid">Farm Name</label>
            <input 
              type="text"
              required
              value={formData.farmName}
              onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              className="w-full bg-[#fdf8f0] dark:bg-[#0f110e] border border-gray-200 dark:border-white/10 p-3.5 sm:p-4 rounded-2xl focus:ring-2 ring-osun-gold outline-none dark:text-white text-sm"
              placeholder="e.g. Olasunkanmi Farm"
            />
          </div>

          {/* Input Block: LGA Selector */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-osun-green-mid">Location (LGA)</label>
            <div className="relative w-full">
              <select 
                value={formData.lga}
                onChange={(e) => setFormData({...formData, lga: e.target.value})}
                className="w-full bg-[#fdf8f0] dark:bg-[#0f110e] border border-gray-200 dark:border-white/10 p-3.5 sm:p-4 rounded-2xl dark:text-white appearance-none outline-none focus:ring-2 ring-osun-gold text-sm cursor-pointer"
              >
                <option value="Osogbo">Osogbo</option>
                <option value="Ife Central">Ife Central</option>
                <option value="Ilesa East">Ilesa East</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <MapPin size={16} />
              </div>
            </div>
          </div>

          {/* Action Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-osun-green-mid hover:bg-[#2d6a4f] text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer focus:outline-none mt-2"
          >
            Continue to Farm <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}