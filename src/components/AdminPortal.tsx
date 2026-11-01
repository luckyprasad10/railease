import React, { useState } from 'react';
import {
  ShieldAlert,
  Send,
  Train,
  Clock,
  Layers,
  Radio,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { useRailwayStore } from '../store/useRailwayStore';
import { CoachClass } from '../types/railway';

export const AdminPortal: React.FC = () => {
  const {
    trains,
    updateTrainDelay,
    updatePlatform,
    updateSeatCount,
    broadcasts,
    dispatchBroadcast,
  } = useRailwayStore();

  const [activeAdminTab, setActiveAdminTab] = useState<'delays' | 'inventory' | 'dispatcher'>('delays');

  // Delay simulation state
  const [selectedTrainNum, setSelectedTrainNum] = useState(trains[0]?.number || '22436');
  const [simulatedDelay, setSimulatedDelay] = useState(15);
  const [simulatedStatusText, setSimulatedStatusText] = useState('Delayed by 15 mins due to signal regulation');
  const [delaySuccess, setDelaySuccess] = useState(false);

  // Platform simulation state
  const [platformStation, setPlatformStation] = useState('NDLS');
  const [platformNumber, setPlatformNumber] = useState(16);
  const [platformSuccess, setPlatformSuccess] = useState(false);

  // Seat Inventory release state
  const [inventoryTrainNum, setInventoryTrainNum] = useState(trains[0]?.number || '22436');
  const [inventoryClass, setInventoryClass] = useState<CoachClass>('3A');
  const [seatCountAdd, setSeatCountAdd] = useState(12);
  const [inventorySuccess, setInventorySuccess] = useState(false);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastType, setBroadcastType] = useState<'DELAY' | 'PLATFORM_CHANGE' | 'ROUTE_DIVERSION' | 'CANCELLATION'>('DELAY');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleApplyDelay = (e: React.FormEvent) => {
    e.preventDefault();
    updateTrainDelay(selectedTrainNum, simulatedDelay, simulatedStatusText);
    setDelaySuccess(true);
    setTimeout(() => setDelaySuccess(false), 3000);
  };

  const handleApplyPlatform = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatform(selectedTrainNum, platformStation, platformNumber, true);
    setPlatformSuccess(true);
    setTimeout(() => setPlatformSuccess(false), 3000);
  };

  const handleReleaseSeats = (e: React.FormEvent) => {
    e.preventDefault();
    const train = trains.find((t) => t.number === inventoryTrainNum);
    const existingClass = train?.classes.find((c) => c.classCode === inventoryClass);
    const currentCount = existingClass ? existingClass.count : 0;
    const newCount = currentCount + Number(seatCountAdd);

    updateSeatCount(inventoryTrainNum, inventoryClass, newCount, 'AVAILABLE');
    setInventorySuccess(true);
    setTimeout(() => setInventorySuccess(false), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMsg.trim()) return;

    dispatchBroadcast({
      trainNumber: selectedTrainNum,
      title: broadcastTitle.trim(),
      message: broadcastMsg.trim(),
      type: broadcastType,
    });

    setBroadcastTitle('');
    setBroadcastMsg('');
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-xs font-semibold mb-2 border border-purple-300 dark:border-purple-800">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Section Controller & Station Master Console</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Indian Railway Traffic Management & Operations
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Simulate real-time train delays, dynamically reassign platform numbers, inject Tatkal/Emergency quota inventory, and broadcast passenger alerts across the application.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveAdminTab('delays')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeAdminTab === 'delays'
                ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Delays & Platform Simulator</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeAdminTab === 'inventory'
                ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Quota & Seat Inventory</span>
          </button>
          <button
            onClick={() => setActiveAdminTab('dispatcher')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
              activeAdminTab === 'dispatcher'
                ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Delay & Emergency Dispatcher</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DELAY & PLATFORM SIMULATOR */}
      {activeAdminTab === 'delays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delay Simulator */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Real-Time Train Delay Dispatcher</span>
            </div>
            <p className="text-xs text-slate-500">
              Inject delay into running train telemetry. This immediately propagates to the Live GPS Tracker view.
            </p>

            {delaySuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Live delay updated! Check 'Live Running GPS' tab to view results.</span>
              </div>
            )}

            <form onSubmit={handleApplyDelay} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Select Train</label>
                <select
                  value={selectedTrainNum}
                  onChange={(e) => setSelectedTrainNum(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {trains.map((t) => (
                    <option key={t.number} value={t.number}>
                      #{t.number} - {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Delay in Minutes: ({simulatedDelay} Mins)
                </label>
                <input
                  type="range"
                  min={0}
                  max={180}
                  step={5}
                  value={simulatedDelay}
                  onChange={(e) => setSimulatedDelay(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Official Advisory Message
                </label>
                <input
                  type="text"
                  value={simulatedStatusText}
                  onChange={(e) => setSimulatedStatusText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-md shadow-amber-500/20"
              >
                Update Train Delay Status
              </button>
            </form>
          </div>

          {/* Platform Number Assignment */}
          <div className="glass-card rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Train className="w-5 h-5 text-blue-500" />
              <span>Platform Reassignment Station Controller</span>
            </div>
            <p className="text-xs text-slate-500">
              Reassign and confirm platform tracks. Passengers tracking the train will see this live.
            </p>

            {platformSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Platform reallocated & confirmed!</span>
              </div>
            )}

            <form onSubmit={handleApplyPlatform} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Station Code</label>
                <select
                  value={platformStation}
                  onChange={(e) => setPlatformStation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="NDLS">New Delhi (NDLS)</option>
                  <option value="CNB">Kanpur Central (CNB)</option>
                  <option value="PRYJ">Prayagraj Junction (PRYJ)</option>
                  <option value="BSB">Varanasi Junction (BSB)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">
                  Assign Platform Number
                </label>
                <select
                  value={platformNumber}
                  onChange={(e) => setPlatformNumber(parseInt(e.target.value, 10))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold font-mono"
                >
                  {Array.from({ length: 16 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      Platform {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-500/20"
              >
                Confirm & Broadcast Platform Change
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY & SEAT ALLOCATION */}
      {activeAdminTab === 'inventory' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Dynamic Coach Quota & Seat Release Manager
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Release Emergency Quota (EQ), VIP unutilized berths, or extra Tatkal coach capacity directly into real-time search availability.
              </p>
            </div>
          </div>

          {inventorySuccess && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {seatCountAdd} seats successfully injected into Class {inventoryClass} for #{inventoryTrainNum}!
              </span>
            </div>
          )}

          <form onSubmit={handleReleaseSeats} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Target Train</label>
                <select
                  value={inventoryTrainNum}
                  onChange={(e) => setInventoryTrainNum(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  {trains.map((t) => (
                    <option key={t.number} value={t.number}>
                      #{t.number} - {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Travel Class</label>
                <select
                  value={inventoryClass}
                  onChange={(e) => setInventoryClass(e.target.value as CoachClass)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="1A">AC First Class (1A)</option>
                  <option value="3E">AC 3 Economy (3E)</option>
                  <option value="CC">AC Chair Car (CC)</option>
                  <option value="EC">Executive Class (EC)</option>
                  <option value="SL">Sleeper Class (SL)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">
                Seats to Release into General/Tatkal Pool:
              </label>
              <input
                type="number"
                min={1}
                max={50}
                value={seatCountAdd}
                onChange={(e) => setSeatCountAdd(parseInt(e.target.value, 10))}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md shadow-purple-500/20"
            >
              Release {seatCountAdd} Seats Immediately to Public Search
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: BROADCAST DISPATCHER */}
      {activeAdminTab === 'dispatcher' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Dispatcher Form */}
          <div className="md:col-span-6 glass-card rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
              <span>Broadcast Passenger Notification</span>
            </div>

            {broadcastSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Notification successfully broadcasted to booked passengers!</span>
              </div>
            )}

            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Notice Type</label>
                <select
                  value={broadcastType}
                  onChange={(e) => setBroadcastType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold"
                >
                  <option value="DELAY">Train Delay Advisory</option>
                  <option value="PLATFORM_CHANGE">Platform Change Alert</option>
                  <option value="ROUTE_DIVERSION">Route Diversion Advisory</option>
                  <option value="CANCELLATION">Special Train Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Platform 16 Confirmed for Vande Bharat"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Message Content</label>
                <textarea
                  rows={3}
                  placeholder="Official SMS text delivered to passenger phones..."
                  value={broadcastMsg}
                  onChange={(e) => setBroadcastMsg(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md shadow-rose-500/20 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Multi-Channel SMS & Push Alert</span>
              </button>
            </form>
          </div>

          {/* Broadcast Logs */}
          <div className="md:col-span-6 glass-card rounded-3xl p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
              <Bell className="w-5 h-5 text-blue-500" />
              <span>Broadcast Dispatch History</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {broadcasts.map((bc) => (
                <div
                  key={bc.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {bc.title}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                      {bc.sentCount} Passengers
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                    {bc.message}
                  </p>
                  <div className="text-[10px] text-slate-500">
                    Dispatched for #{bc.trainNumber} • {new Date(bc.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
