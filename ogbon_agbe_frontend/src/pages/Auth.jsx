import React, { useState } from 'react';
import { MapPin, Sprout, ArrowRight } from 'lucide-react';

export default function Auth({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ farmName: '', lga: 'Osogbo' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // PM Note: Later this will trigger Firebase Phone Auth [cite: 100, 107]
    onLoginSuccess(formData.farmName);
  };

  return (
    <div className="min-h-screen bg-osun-cream dark:bg-osun-bg-dark p-8 flex flex-col justify-center font-sans">
      <div className="max-w-md mx-auto w-full">
        <header className="mb-10 text-center">
          <div className="w-16 h-16 bg-osun-green-mid rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sprout size={32} className="text-osun-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-osun-green-deep dark:text-white">Ẹ káàárọ̀!</h2>
          <p className="text-sm text-gray-500 mt-2">Enter your farm details to start </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-osun-green-mid">Farm Name</label>
            <div className="relative">
              <input 
                required
                className="w-full bg-white dark:bg-osun-card-dark border border-gray-200 dark:border-white/10 p-4 rounded-2xl focus:ring-2 ring-osun-gold outline-none dark:text-white"
                placeholder="e.g. Olasunkanmi Farm"
                onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-osun-green-mid">Location (LGA)</label>
            <select 
              className="w-full bg-white dark:bg-osun-card-dark border border-gray-200 dark:border-white/10 p-4 rounded-2xl dark:text-white appearance-none"
              onChange={(e) => setFormData({...formData, lga: e.target.value})}
            >
              <option>Osogbo</option>
              <option>Ife Central</option>
              <option>Ilesa East</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-osun-green-mid text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
            Continue to Farm <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}