import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Trash2,
  ShieldCheck,
  Check,
  CreditCard,
  QrCode,
  Zap,
  Luggage,
  Coffee,
  Building,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRailwayStore } from '../store/useRailwayStore';
import {
  MasterPassenger,
  BerthPreference,
  FoodPreference,
  AddonServices,
} from '../types/railway';
import { CATERING_MENU } from '../data/mockData';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    activeBookingTrain,
    activeBookingClass,
    closeBookingModal,
    masterPassengers,
    quota,
    journeyDate,
    walletBalance,
    tatkalAutoAuth,
    createBooking,
  } = useRailwayStore();

  // Booking step: 1: Passengers & Addons, 2: Coach Layout Preview, 3: Payment
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Selected passengers
  const [passengers, setPassengers] = useState<MasterPassenger[]>(
    masterPassengers.length > 0 ? [masterPassengers[0]] : []
  );

  // Add new manual passenger form state
  const [showAddManual, setShowAddManual] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(28);
  const [newGender, setNewGender] = useState<'M' | 'F' | 'O'>('M');
  const [newBerth, setNewBerth] = useState<BerthPreference>('LOWER');
  const [newFood, setNewFood] = useState<FoodPreference>('VEG');

  // Addons
  const [addons, setAddons] = useState<AddonServices>({
    travelInsurance: true,
    freeCancellation: true,
    coolieBooking: false,
    coolieBags: 1,
    loungeAccess: false,
    mealPreOrder: false,
    selectedMeal: CATERING_MENU[0].name,
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<
    'RAILEASE_FASTPAY' | 'UPI' | 'NET_BANKING' | 'CARD'
  >(tatkalAutoAuth ? 'RAILEASE_FASTPAY' : 'UPI');

  // Payment processing state
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isBookingModalOpen || !activeBookingTrain || !activeBookingClass) {
    return null;
  }

  const classData =
    activeBookingTrain.classes.find((c) => c.classCode === activeBookingClass) ||
    activeBookingTrain.classes[0];
  const unitFare = quota === 'TQ' ? classData.tatkalFare : classData.fare;

  // Calculate pricing
  const baseTotal = unitFare * passengers.length;
  let addonsTotal = 0;
  if (addons.travelInsurance) addonsTotal += 0.45 * passengers.length;
  if (addons.freeCancellation) addonsTotal += 120 * passengers.length;
  if (addons.coolieBooking) addonsTotal += 150 * addons.coolieBags;
  if (addons.loungeAccess) addonsTotal += 180 * passengers.length;
  if (addons.mealPreOrder) {
    const mealItem = CATERING_MENU.find((m) => m.name === addons.selectedMeal) || CATERING_MENU[0];
    addonsTotal += mealItem.price * passengers.length;
  }
  const grandTotal = Math.round(baseTotal + addonsTotal);

  // Toggle passenger from Master list
  const toggleMasterPassenger = (mp: MasterPassenger) => {
    const exists = passengers.some((p) => p.name === mp.name);
    if (exists) {
      if (passengers.length === 1) return; // Keep at least one
      setPassengers(passengers.filter((p) => p.name !== mp.name));
    } else {
      if (passengers.length >= 6) {
        alert('IRCTC allows max 6 passengers per booking ticket.');
        return;
      }
      setPassengers([...passengers, mp]);
    }
  };

  const handleAddManualPassenger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const manualPassenger: MasterPassenger = {
      id: `manual-${Date.now()}`,
      name: newName.trim(),
      age: Number(newAge),
      gender: newGender,
      berthPreference: newBerth,
      foodPreference: newFood,
      seniorCitizen: Number(newAge) >= 60,
    };
    setPassengers([...passengers, manualPassenger]);
    setNewName('');
    setShowAddManual(false);
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Create booking in store
      createBooking({
        trainNumber: activeBookingTrain.number,
        trainName: activeBookingTrain.name,
        fromStation: activeBookingTrain.fromStation,
        fromStationName: activeBookingTrain.stops[0]?.stationName || activeBookingTrain.fromStation,
        toStation: activeBookingTrain.toStation,
        toStationName:
          activeBookingTrain.stops[activeBookingTrain.stops.length - 1]?.stationName ||
          activeBookingTrain.toStation,
        journeyDate,
        coachClass: activeBookingClass,
        quota,
        passengers: passengers as any,
        baseFare: baseTotal,
        addonsFare: Math.round(addonsTotal),
        totalFare: grandTotal,
        status: 'CONFIRMED',
        chartStatus: 'PREPARED',
        paymentMethod,
        addons,
      });

      closeBookingModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500 text-slate-950">
                {quota === 'TQ' ? 'Tatkal Quota' : 'General Quota'}
              </span>
              <h2 className="text-lg sm:text-xl font-black">
                {activeBookingTrain.name} (#{activeBookingTrain.number})
              </h2>
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              Class {activeBookingClass} • {activeBookingTrain.fromStation} ➔{' '}
              {activeBookingTrain.toStation} • Date: {journeyDate}
            </p>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tabs */}
        <div className="flex items-center justify-around border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold py-2.5 px-4">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center space-x-1.5 ${
              step === 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[11px]">
              1
            </span>
            <span>Passengers & Add-ons</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">➔</span>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center space-x-1.5 ${
              step === 2 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[11px]">
              2
            </span>
            <span>Coach Preview</span>
          </button>
          <span className="text-slate-300 dark:text-slate-700">➔</span>
          <button
            onClick={() => setStep(3)}
            className={`flex items-center space-x-1.5 ${
              step === 3 ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[11px]">
              3
            </span>
            <span>Payment ({paymentMethod === 'RAILEASE_FASTPAY' ? '15s Express' : 'Standard'})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 max-h-[68vh] overflow-y-auto space-y-6">
          {/* STEP 1: PASSENGERS & ADDONS */}
          {step === 1 && (
            <>
              {/* 1-Click Master Passenger Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                    <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Quick Select from Master Passenger List:</span>
                  </label>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    {passengers.length}/6 Selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {masterPassengers.map((mp) => {
                    const isSelected = passengers.some((p) => p.name === mp.name);
                    return (
                      <div
                        key={mp.id}
                        onClick={() => toggleMasterPassenger(mp)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {mp.name}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {mp.age} yrs • {mp.gender === 'M' ? 'Male' : 'Female'} • Pref:{' '}
                              {mp.berthPreference}
                            </div>
                          </div>
                        </div>
                        {mp.seniorCitizen && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Senior (60+)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Add Manual Passenger Toggle */}
                {!showAddManual ? (
                  <button
                    onClick={() => setShowAddManual(true)}
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Add Another / Custom Passenger</span>
                  </button>
                ) : (
                  <form
                    onSubmit={handleAddManualPassenger}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs space-y-3"
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      Add Custom Passenger Details:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Full Name (as per Govt ID)"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        value={newAge}
                        min={1}
                        max={110}
                        onChange={(e) => setNewAge(parseInt(e.target.value, 10))}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none"
                      />
                      <select
                        value={newGender}
                        onChange={(e) => setNewGender(e.target.value as any)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none"
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={newBerth}
                        onChange={(e) => setNewBerth(e.target.value as any)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none"
                      >
                        <option value="LOWER">Lower Berth</option>
                        <option value="MIDDLE">Middle Berth</option>
                        <option value="UPPER">Upper Berth</option>
                        <option value="SIDE_LOWER">Side Lower</option>
                        <option value="SIDE_UPPER">Side Upper</option>
                        <option value="NO_PREF">No Preference</option>
                      </select>
                      <select
                        value={newFood}
                        onChange={(e) => setNewFood(e.target.value as any)}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none"
                      >
                        <option value="VEG">Vegetarian Food</option>
                        <option value="NON_VEG">Non-Vegetarian Food</option>
                        <option value="JAIN">Pure Jain Food</option>
                        <option value="NONE">No Food / None</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold"
                      >
                        Add to Booking
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddManual(false)}
                        className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Station Facility Add-ons */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Trip Protections & Station Amenities:
                </h4>
                <div className="space-y-2">
                  {/* Free Cancellation */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={addons.freeCancellation}
                        onChange={(e) =>
                          setAddons({ ...addons, freeCancellation: e.target.checked })
                        }
                        className="rounded text-blue-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                          <span>RailEase 100% Free Cancellation Protection</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Get instant full refund without any IRCTC deduction fees if cancelled before charting.
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ₹120/pax
                    </span>
                  </label>

                  {/* Travel Insurance */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={addons.travelInsurance}
                        onChange={(e) =>
                          setAddons({ ...addons, travelInsurance: e.target.checked })
                        }
                        className="rounded text-blue-600"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          Comprehensive IRCTC Travel Insurance (₹10 Lakh Cover)
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          Personal accident coverage underwritten by Bharti AXA / SBI General.
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ₹0.45/pax
                    </span>
                  </label>

                  {/* Coolie Booking */}
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs flex flex-wrap items-center justify-between gap-2">
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.coolieBooking}
                        onChange={(e) =>
                          setAddons({ ...addons, coolieBooking: e.target.checked })
                        }
                        className="rounded text-blue-600"
                      />
                      <div className="flex items-center space-x-1.5">
                        <Luggage className="w-4 h-4 text-amber-600" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            Station Sahayak / Porter (Coolie) Booking
                          </span>
                          <p className="text-[10px] text-slate-500">
                            Fixed standard rate, porter waits at coach door with OTP.
                          </p>
                        </div>
                      </div>
                    </label>

                    {addons.coolieBooking && (
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500">Luggage Bags:</span>
                        <select
                          value={addons.coolieBags}
                          onChange={(e) =>
                            setAddons({ ...addons, coolieBags: parseInt(e.target.value, 10) })
                          }
                          className="p-1 rounded bg-white dark:bg-slate-900 border text-xs"
                        >
                          <option value={1}>1 Bag (₹150)</option>
                          <option value={2}>2 Bags (₹300)</option>
                          <option value={3}>3 Bags (₹450)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Lounge Access */}
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={addons.loungeAccess}
                        onChange={(e) => setAddons({ ...addons, loungeAccess: e.target.checked })}
                        className="rounded text-blue-600"
                      />
                      <div className="flex items-center space-x-1.5">
                        <Building className="w-4 h-4 text-indigo-600" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            Executive Lounge Pass at Destination Station (2 Hours)
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Complimentary buffet snack, plush recliners, shower & Wi-Fi.
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      ₹180/pax
                    </span>
                  </label>

                  {/* Rail-Dine Meal Pre-order */}
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-2">
                    <label className="flex items-center space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.mealPreOrder}
                        onChange={(e) =>
                          setAddons({ ...addons, mealPreOrder: e.target.checked })
                        }
                        className="rounded text-blue-600"
                      />
                      <div className="flex items-center space-x-1.5">
                        <Coffee className="w-4 h-4 text-rose-600" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          Pre-order Hot Restaurant Meal to Coach Seat
                        </span>
                      </div>
                    </label>

                    {addons.mealPreOrder && (
                      <select
                        value={addons.selectedMeal}
                        onChange={(e) => setAddons({ ...addons, selectedMeal: e.target.value })}
                        className="w-full p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
                      >
                        {CATERING_MENU.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name} ({m.brand}) - ₹{m.price}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: COACH & BERTH PREVIEW */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Smart Coach Allocation Preview ({activeBookingClass})
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Allocating adjoining berths based on passenger preferences.
                </p>
              </div>

              {/* Coach Layout representation */}
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span>Coach: {activeBookingClass === 'CC' ? 'C3' : activeBookingClass === '2A' ? 'A1' : 'B3'}</span>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded bg-blue-600"></span>
                      <span>Your Allocated Seats</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-600"></span>
                      <span>Occupied</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-3 h-3 rounded border border-slate-400 bg-white dark:bg-slate-900"></span>
                      <span>Vacant</span>
                    </span>
                  </div>
                </div>

                {/* Grid of Seats */}
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {Array.from({ length: 32 }, (_, i) => {
                    const seatNum = i + 1;
                    const isAllocated = passengers.some((_, pIdx) => seatNum === 12 + pIdx * 2);
                    const isOccupied = !isAllocated && (seatNum % 3 === 0 || seatNum % 5 === 0);

                    return (
                      <div
                        key={seatNum}
                        className={`p-2 rounded-lg text-center text-xs font-bold border transition-all ${
                          isAllocated
                            ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400'
                            : isOccupied
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 border-slate-300 dark:border-slate-600 cursor-not-allowed'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px]">{seatNum}</div>
                        <div className="text-[8px] font-normal uppercase opacity-75">
                          {seatNum % 8 === 1 || seatNum % 8 === 4
                            ? 'LB'
                            : seatNum % 8 === 2 || seatNum % 8 === 5
                            ? 'MB'
                            : seatNum % 8 === 3 || seatNum % 8 === 6
                            ? 'UB'
                            : 'SL'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Passengers allocated list */}
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs">
                <div className="font-bold text-blue-900 dark:text-blue-200 mb-1">
                  Confirmed Berth Assignment Preview:
                </div>
                {passengers.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 border-b border-blue-200/50 dark:border-blue-800/50 last:border-none"
                  >
                    <span>{p.name} ({p.age} yrs, {p.gender})</span>
                    <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                      Coach {activeBookingClass === 'CC' ? 'C3' : 'B3'}, Berth {12 + idx * 2} (
                      {p.berthPreference === 'LOWER' ? 'Lower Berth' : 'Upper Berth'})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT GATEWAY */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Choose Payment Method:
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1-Click FastPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('RAILEASE_FASTPAY')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'RAILEASE_FASTPAY'
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 ring-1 ring-amber-500'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-amber-700 dark:text-amber-400 mb-1">
                    <Zap className="w-4 h-4 fill-amber-500" />
                    <span>FastPay (1-Click)</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Pre-auth wallet (₹{walletBalance})
                  </div>
                </button>

                {/* UPI QR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-blue-700 dark:text-blue-400 mb-1">
                    <QrCode className="w-4 h-4" />
                    <span>Instant UPI QR</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    GPay, PhonePe, Paytm
                  </div>
                </button>

                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('NET_BANKING')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'NET_BANKING'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-blue-700 dark:text-blue-400 mb-1">
                    <Building className="w-4 h-4" />
                    <span>Net Banking</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    SBI, HDFC, ICICI, Axis
                  </div>
                </button>

                {/* Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    paymentMethod === 'CARD'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 ring-1 ring-blue-600'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold text-blue-700 dark:text-blue-400 mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span>Debit / Credit</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Visa, RuPay, MC
                  </div>
                </button>
              </div>

              {/* Payment Details Drawer */}
              {paymentMethod === 'RAILEASE_FASTPAY' && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs">
                  <div className="flex items-center space-x-2 font-bold text-amber-900 dark:text-amber-200 mb-1">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Tatkal Express Auto-Debit Enabled</span>
                  </div>
                  <p className="text-amber-800 dark:text-amber-300 text-[11px]">
                    No OTP or 3D secure delay. ₹{grandTotal} will be instantly debited from your linked RailEase FastPay balance (Current: ₹{walletBalance}). Instant booking confirmation in ~1 second.
                  </p>
                </div>
              )}

              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="inline-block p-2 bg-white rounded-xl shadow-md mb-2">
                    {/* SVG QR Code */}
                    <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto">
                      <rect width="100" height="100" fill="white" />
                      {/* Stylized QR points */}
                      <rect x="10" y="10" width="25" height="25" fill="#0354a2" />
                      <rect x="15" y="15" width="15" height="15" fill="white" />
                      <rect x="18" y="18" width="9" height="9" fill="#0354a2" />

                      <rect x="65" y="10" width="25" height="25" fill="#0354a2" />
                      <rect x="70" y="15" width="15" height="15" fill="white" />
                      <rect x="73" y="18" width="9" height="9" fill="#0354a2" />

                      <rect x="10" y="65" width="25" height="25" fill="#0354a2" />
                      <rect x="15" y="70" width="15" height="15" fill="white" />
                      <rect x="18" y="73" width="9" height="9" fill="#0354a2" />

                      {/* Random inner matrix dots */}
                      <rect x="42" y="15" width="6" height="6" fill="#0354a2" />
                      <rect x="52" y="25" width="6" height="6" fill="#0354a2" />
                      <rect x="40" y="40" width="20" height="20" rx="4" fill="#f59e0b" />
                      <rect x="25" y="45" width="6" height="6" fill="#0354a2" />
                      <rect x="70" y="45" width="6" height="6" fill="#0354a2" />
                      <rect x="45" y="70" width="6" height="6" fill="#0354a2" />
                      <rect x="55" y="80" width="6" height="6" fill="#0354a2" />
                      <rect x="75" y="75" width="6" height="6" fill="#0354a2" />
                    </svg>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    UPI ID: railease.pay@cris.railway
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer / Price & Navigation */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Total Payable Amount</div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{grandTotal}{' '}
              <span className="text-xs font-normal text-slate-500">
                ({passengers.length} {passengers.length === 1 ? 'Passenger' : 'Passengers'})
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                <span>Continue to {step === 1 ? 'Coach Layout' : 'Payment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmAndPay}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Reservation & PNR...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Pay ₹{grandTotal} & Confirm Ticket</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
