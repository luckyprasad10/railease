import React, { useState } from 'react';
import {
  Luggage,
  Building,
  Utensils,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  Coffee,
  Ticket,
} from 'lucide-react';
import { RETIRING_ROOMS, CATERING_MENU, POPULAR_STATIONS } from '../data/mockData';
import { useRailwayStore } from '../store/useRailwayStore';

export const StationServices: React.FC = () => {
  const { bookings } = useRailwayStore();

  const [activeTab, setActiveTab] = useState<'lounge' | 'coolie' | 'meals'>('lounge');

  // Retiring room booking state
  const [selectedStation, setSelectedStation] = useState('NDLS');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [roomHours, setRoomHours] = useState(3);
  const [roomBookingSuccess, setRoomBookingSuccess] = useState<string | null>(null);

  // Coolie booking state
  const [coolieStation, setCoolieStation] = useState('NDLS');
  const [coolieBags, setCoolieBags] = useState(2);
  const [coolieTrainNo, setCoolieTrainNo] = useState('22436');
  const [coolieCoach, setCoolieCoach] = useState('C4');
  const [coolieSuccessOtp, setCoolieSuccessOtp] = useState<string | null>(null);

  // Meal pre-order state
  const [mealCart, setMealCart] = useState<Record<string, number>>({
    'cat-2': 1, // Haldiram Thali
    'cat-6': 2, // Masala Chai & Samosa
  });
  const [mealSuccess, setMealSuccess] = useState(false);

  const handleBookRoom = (room: any) => {
    setSelectedRoom(room);
    setRoomBookingSuccess(`RR-PASS-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleBookCoolie = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    setCoolieSuccessOtp(otp);
  };

  const handleOrderMeals = () => {
    setMealSuccess(true);
    setTimeout(() => {
      setMealSuccess(false);
      setMealCart({});
    }, 5000);
  };

  const mealTotal = Object.entries(mealCart).reduce((sum, [id, qty]) => {
    const item = CATERING_MENU.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-semibold mb-2 border border-indigo-300 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Station Facilities & Onboard Comfort Hub</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Station Lounges, Sahayak Porters & Rail-Dine
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Government-regulated fixed tariffs for porters, instant Pod hotel and executive lounge reservations, and piping-hot meals delivered directly to your berth.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveTab('lounge')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'lounge'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Retiring Rooms & Pods</span>
          </button>
          <button
            onClick={() => setActiveTab('coolie')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'coolie'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Luggage className="w-4 h-4" />
            <span>Sahayak (Coolie) Booking</span>
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'meals'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Rail-Dine E-Catering</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RETIRING ROOMS & POD HOTELS */}
      {activeTab === 'lounge' && (
        <div className="space-y-6">
          {/* Station filter */}
          <div className="flex items-center justify-between glass-card p-4 rounded-2xl">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Select Railway Station:
            </span>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              <option value="NDLS">New Delhi (NDLS)</option>
              <option value="CSMT">Mumbai CSMT</option>
              <option value="HWH">Howrah Junction (HWH)</option>
              <option value="SBC">Bengaluru City (SBC)</option>
            </select>
          </div>

          {/* Success pass banner if booked */}
          {roomBookingSuccess && selectedRoom && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs flex flex-wrap items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                    Lounge Pass Confirmed! Access Pass: {roomBookingSuccess}
                  </div>
                  <div className="text-emerald-800 dark:text-emerald-300">
                    {selectedRoom.name} • Duration: {roomHours} Hours • Total Paid: ₹{selectedRoom.ratePerHour * roomHours}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setRoomBookingSuccess(null)}
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold"
              >
                Close Pass
              </button>
            </div>
          )}

          {/* Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RETIRING_ROOMS.map((room) => (
              <div
                key={room.id}
                className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-blue-400 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                      Station: {room.stationCode}
                    </span>
                    <span className="flex items-center space-x-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{room.rating} / 5.0</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {room.name}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {room.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Tariff Rate:</span>
                    <div className="font-mono text-lg font-bold text-blue-700 dark:text-blue-400">
                      ₹{room.ratePerHour} <span className="text-xs text-slate-500 font-normal">/ hour</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookRoom(room)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    Reserve Pass (Instant QR)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SAHAYAK (COOLIE) PORTER BOOKING */}
      {activeTab === 'coolie' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Luggage className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Government-Standardized Sahayak Porter Booking
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prevent platform haggling. The allocated licensed porter meets you at your coach door with an OTP handshake.
              </p>
            </div>
          </div>

          {coolieSuccessOtp ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Sahayak Porter Confirmed & Dispatched!</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  Share this OTP with Porter only when luggage is loaded:
                </span>
                <div className="font-mono text-3xl font-black text-blue-600 dark:text-blue-400 tracking-widest mt-1">
                  {coolieSuccessOtp}
                </div>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>• Porter Badge No: <strong>#NDLS-149 (Ramesh Yadav)</strong></div>
                <div>• Meeting Point: <strong>Platform 16, Coach {coolieCoach}</strong></div>
                <div>• Total Fixed Tariff: <strong>₹{150 * coolieBags} ({coolieBags} Luggage Bags)</strong></div>
              </div>
              <button
                onClick={() => setCoolieSuccessOtp(null)}
                className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookCoolie} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Station</label>
                  <select
                    value={coolieStation}
                    onChange={(e) => setCoolieStation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none font-bold"
                  >
                    <option value="NDLS">New Delhi (NDLS)</option>
                    <option value="CSMT">Mumbai CSMT</option>
                    <option value="HWH">Howrah (HWH)</option>
                    <option value="BSB">Varanasi (BSB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">Train Number</label>
                  <input
                    type="text"
                    value={coolieTrainNo}
                    onChange={(e) => setCoolieTrainNo(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none font-bold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Coach / Seat Number
                  </label>
                  <input
                    type="text"
                    value={coolieCoach}
                    onChange={(e) => setCoolieCoach(e.target.value)}
                    placeholder="e.g. C4 or B3 / 12"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-semibold mb-1">
                    Number of Luggage Bags (₹150/bag tariff)
                  </label>
                  <select
                    value={coolieBags}
                    onChange={(e) => setCoolieBags(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none font-bold"
                  >
                    <option value={1}>1 Bag (₹150)</option>
                    <option value={2}>2 Bags (₹300)</option>
                    <option value={3}>3 Bags (₹450)</option>
                    <option value={4}>4 Bags (₹600)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-900 dark:text-blue-200">
                ✓ Northern Railway Standard Tariff Protection Guarantee • Official IRCTC Licensed Sahayak.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Pre-Book Sahayak Porter (Pay ₹{150 * coolieBags} at Destination)
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: RAIL-DINE E-CATERING */}
      {activeTab === 'meals' && (
        <div className="space-y-6">
          {mealSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>
                Order Placed! Warm restaurant food will be delivered to your coach seat at the next scheduled halt.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CATERING_MENU.map((item) => {
              const qty = mealCart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-500">{item.brand}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </h4>

                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <span className={item.veg ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                        {item.veg ? '● 100% Veg' : '▲ Non-Veg'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-0.5 text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{item.rating}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-mono text-base font-black text-slate-900 dark:text-white">
                      ₹{item.price}
                    </span>

                    <div className="flex items-center space-x-2">
                      {qty > 0 && (
                        <button
                          onClick={() =>
                            setMealCart({ ...mealCart, [item.id]: Math.max(0, qty - 1) })
                          }
                          className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                      )}
                      {qty > 0 && <span className="font-bold text-xs">{qty}</span>}
                      <button
                        onClick={() =>
                          setMealCart({ ...mealCart, [item.id]: qty + 1 })
                        }
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                      >
                        {qty > 0 ? '+' : 'Add +'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Checkout Bar */}
          {mealTotal > 0 && (
            <div className="glass-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 border border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/30">
              <div>
                <span className="text-xs text-slate-500">Cart Total ({Object.values(mealCart).reduce((a, b) => a + b, 0)} items):</span>
                <div className="text-xl font-black text-slate-900 dark:text-white">
                  ₹{mealTotal}
                </div>
              </div>

              <button
                onClick={handleOrderMeals}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Confirm Meal Delivery to Seat (Pay on Delivery / UPI)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
