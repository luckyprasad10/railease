import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  Edit2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useRailwayStore } from '../store/useRailwayStore';
import { MasterPassenger, BerthPreference, FoodPreference } from '../types/railway';

export const MasterPassengerList: React.FC = () => {
  const {
    masterPassengers,
    addMasterPassenger,
    updateMasterPassenger,
    deleteMasterPassenger,
    tatkalAutoAuth,
    toggleTatkalAutoAuth,
  } = useRailwayStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'M' | 'F' | 'O'>('M');
  const [berthPreference, setBerthPreference] = useState<BerthPreference>('LOWER');
  const [foodPreference, setFoodPreference] = useState<FoodPreference>('VEG');
  const [idCardNumber, setIdCardNumber] = useState('');

  const resetForm = () => {
    setName('');
    setAge(30);
    setGender('M');
    setBerthPreference('LOWER');
    setFoodPreference('VEG');
    setIdCardNumber('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const passengerData = {
      name: name.trim(),
      age: Number(age),
      gender,
      berthPreference,
      foodPreference,
      seniorCitizen: Number(age) >= 60,
      idCardNumber: idCardNumber.trim() ? idCardNumber.trim() : `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    if (editingId) {
      updateMasterPassenger(editingId, passengerData);
    } else {
      addMasterPassenger(passengerData);
    }

    resetForm();
  };

  const handleEdit = (passenger: MasterPassenger) => {
    setEditingId(passenger.id);
    setName(passenger.name);
    setAge(passenger.age);
    setGender(passenger.gender);
    setBerthPreference(passenger.berthPreference);
    setFoodPreference(passenger.foodPreference);
    setIdCardNumber(passenger.idCardNumber || '');
    setIsAdding(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2 border border-amber-300 dark:border-amber-800">
          <Zap className="w-3.5 h-3.5 fill-amber-500" />
          <span>Tatkal 1-Click Fast Checkout Setup</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Master Passenger Profile Vault
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Store your frequent travelers in advance. During the 10:00 AM Tatkal rush, select them with a single click and skip typing errors.
        </p>
      </div>

      {/* Turbo Tatkal Switch Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border border-amber-200 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Zap className="w-6 h-6 fill-slate-950" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Tatkal Turbo Mode (Auto-Fill & Pre-Auth)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-populates primary passengers and skips payment redirection for ~15-second confirmed Tatkal checkout.
            </p>
          </div>
        </div>

        <button
          onClick={toggleTatkalAutoAuth}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tatkalAutoAuth
              ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          {tatkalAutoAuth ? 'Turbo Mode: ACTIVE' : 'Enable Turbo Mode'}
        </button>
      </div>

      {/* Action Header: Add Button */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
          Saved Passengers ({masterPassengers.length}):
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Passenger</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal-like card */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-5 border border-blue-300 dark:border-blue-700 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Passenger Profile' : 'Add Frequent Passenger'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Name as per Aadhaar / ID"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Age</label>
              <input
                type="number"
                min={1}
                max={110}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10))}
                required
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Berth Preference
              </label>
              <select
                value={berthPreference}
                onChange={(e) => setBerthPreference(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              >
                <option value="LOWER">Lower Berth</option>
                <option value="MIDDLE">Middle Berth</option>
                <option value="UPPER">Upper Berth</option>
                <option value="SIDE_LOWER">Side Lower</option>
                <option value="SIDE_UPPER">Side Upper</option>
                <option value="NO_PREF">No Preference</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Meal Preference
              </label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              >
                <option value="VEG">Vegetarian</option>
                <option value="NON_VEG">Non-Vegetarian</option>
                <option value="JAIN">Pure Jain Food</option>
                <option value="NONE">No Food</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                ID Card Number (Masked)
              </label>
              <input
                type="text"
                placeholder="XXXX-XXXX-4912"
                value={idCardNumber}
                onChange={(e) => setIdCardNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20"
            >
              {editingId ? 'Save Changes' : 'Save to Vault'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Passengers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masterPassengers.map((passenger) => (
          <div
            key={passenger.id}
            className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 hover:border-blue-400 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">
                  {passenger.name}
                </span>
                {passenger.seniorCitizen && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Senior Citizen (60+)
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                {passenger.age} yrs • {passenger.gender === 'M' ? 'Male' : 'Female'} • Berth:{' '}
                <strong>{passenger.berthPreference}</strong>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ID: {passenger.idCardNumber || 'Verified'}</span>
                </span>
                <span>•</span>
                <span>Meal: {passenger.foodPreference}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleEdit(passenger)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Edit Passenger"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteMasterPassenger(passenger.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                title="Delete Passenger"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
