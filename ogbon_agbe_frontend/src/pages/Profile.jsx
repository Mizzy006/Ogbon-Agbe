import React, { useState } from 'react';
import { Save, MapPin, User, ArrowLeft } from 'lucide-react';

export default function Profile({ userData, onUpdate, onBack }) {
  const [profile, setProfile] = useState(userData);

  const handleSave = () => {
    // PM Note: This will eventually update the Firebase Firestore record [cite: 22, 66]
    onUpdate(profile);
    onBack();
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-osun-green-mid mb-8 hover:opacity-70 transition-opacity font-bold">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <header className="mb-10">
        <h2 className="font-serif text-4xl font-black text-osun-green-deep dark:text-white mb-2">Ètò (Settings)</h2>
        <p className="text-sm text-gray-500">Update your farm details and preferences</p>
      </header>

      <div className="space-y-8 bg-white dark:bg-osun-card-dark p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-white/5">
        {/* Farm Name Input  */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-osun-green-mid tracking-widest">Farm Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              value={profile.farmName}
              onChange={(e) => setProfile({...profile, farmName: e.target.value})}
              className="w-full bg-osun-cream dark:bg-osun-bg-dark border border-transparent p-4 pl-12 rounded-2xl focus:border-osun-gold outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* LGA Selection  */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-osun-green-mid tracking-widest">Location (LGA in Osun)</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={profile.lga}
              onChange={(e) => setProfile({...profile, lga: e.target.value})}
              className="w-full bg-osun-cream dark:bg-osun-bg-dark border border-transparent p-4 pl-12 rounded-2xl outline-none appearance-none dark:text-white"
            >
              <option>Osogbo</option>
              <option>Ife Central</option>
              <option>Ilesa East</option>
              <option>Ede North</option>
              <option>Iwo</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-osun-green-mid text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-osun-green-mid/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
}