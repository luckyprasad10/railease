import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Calendar,
  Utensils,
  Wifi,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { Train, CoachClass, SeatAvailability } from '../types/railway';
import { useRailwayStore } from '../store/useRailwayStore';

interface TrainCardProps {
  train: Train;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train }) => {
  const {
    openBookingModal,
    setActiveTab,
    setSearchedTrainNum,
    selectedClass,
    quota,
    tatkalAutoAuth,
  } = useRailwayStore();

  const [expandedStops, setExpandedStops] = useState(false);
  const [activeSelectedClass, setActiveSelectedClass] = useState<CoachClass>(
    train.classes[0]?.classCode || '3A'
  );

  const selectedClassData =
    train.classes.find((c) => c.classCode === activeSelectedClass) || train.classes[0];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getTypeStyle = (type: Train['type']) => {
    switch (type) {
      case 'Vande Bharat':
        return 'bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 text-white border-blue-400 shadow-blue-500/20';
      case 'Rajdhani Express':
        return 'bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 text-white border-rose-400 shadow-rose-500/20';
      case 'Shatabdi Express':
        return 'bg-gradient-to-r from-teal-700 via-emerald-600 to-cyan-600 text-white border-teal-400 shadow-teal-500/20';
      default:
        return 'bg-gradient-to-r from-slate-700 to-slate-800 text-white border-slate-600';
    }
  };

  const getStatusBadge = (status: SeatAvailability['status'], count: number, prob: number) => {
    if (status === 'AVAILABLE') {
      return (
        <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>AVL {count}</span>
        </div>
      );
    }
    if (status === 'RAC') {
      return (
        <div className="flex items-center space-x-1 text-amber-600 dark:text-amber-400 font-bold">
          <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          <span>RAC {count}</span>
          <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300">
            ({prob}% CNF)
          </span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 text-rose-600 dark:text-rose-400 font-bold">
        <span className="h-2 w-2 rounded-full bg-rose-500"></span>
        <span>WL {count}</span>
        <span className="text-[10px] font-medium text-rose-700 dark:text-rose-300">
          ({prob}% Chance)
        </span>
      </div>
    );
  };

  const handleLiveTracking = () => {
    setSearchedTrainNum(train.number);
    setActiveTab('live');
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 transition-all hover:border-blue-500/80 dark:hover:border-blue-500 shadow-md hover:shadow-xl">
      {/* Top Banner with Train Name, Number, Badges */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/60">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${getTypeStyle(train.type)}`}>
            {train.type}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {train.name}
              </h3>
              <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-200/80 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                #{train.number}
              </span>
            </div>
            <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{train.punctualityScore}% On-Time Record</span>
              </span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <span>Runs On:</span>
                <span className="flex space-x-1 font-mono text-[10px]">
                  {daysOfWeek.map((day) => {
                    const runs = train.runsOn.includes(day);
                    return (
                      <span
                        key={day}
                        className={`w-4 h-4 flex items-center justify-center rounded-xs transition-colors ${
                          runs
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-40'
                        }`}
                      >
                        {day[0]}
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tracking & Amenities */}
        <div className="flex items-center space-x-2">
          {train.pantryAvailable && (
            <span
              title="Onboard Catering Available"
              className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs flex items-center space-x-1 font-medium"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pantry</span>
            </span>
          )}
          {train.freeWifi && (
            <span
              title="RailWire High-speed Wi-Fi"
              className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs flex items-center space-x-1 font-medium"
            >
              <Wifi className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Free Wi-Fi</span>
            </span>
          )}
          <button
            onClick={handleLiveTracking}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Live GPS</span>
          </button>
        </div>
      </div>

      {/* Schedule Bar: Departure -> Duration -> Arrival */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Departure */}
          <div className="md:col-span-3">
            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {train.departureTime}
            </div>
            <div className="text-sm font-bold text-blue-700 dark:text-blue-400 mt-0.5">
              {train.fromStation}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Platform {train.stops[0]?.platformPredicted || 1} (Scheduled)
            </div>
          </div>

          {/* Duration Graphic */}
          <div className="md:col-span-6 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">
              {train.duration}
            </span>
            <div className="w-full flex items-center justify-center my-1.5">
              <div className="h-0.5 w-1/3 bg-slate-300 dark:bg-slate-700"></div>
              <div className="mx-2 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                {train.stops.length} Halts
              </div>
              <div className="h-0.5 w-1/3 bg-slate-300 dark:bg-slate-700"></div>
            </div>
            <button
              onClick={() => setExpandedStops(!expandedStops)}
              className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center space-x-1"
            >
              <span>{expandedStops ? 'Hide Route Details' : 'View Halts & Platform Predictions'}</span>
              {expandedStops ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Arrival */}
          <div className="md:col-span-3 text-right">
            <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {train.arrivalTime}
            </div>
            <div className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-0.5">
              {train.toStation}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Platform {train.stops[train.stops.length - 1]?.platformPredicted || 1} (Predicted)
            </div>
          </div>
        </div>

        {/* Collapsible Stops & Schedule */}
        {expandedStops && (
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5">
              Route & Platform Confidence Breakdown:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {train.stops.map((stop) => (
                <div
                  key={stop.stationCode}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900 dark:text-white">{stop.stationCode}</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      Plat. {stop.platformPredicted}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {stop.stationName}
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 font-mono">
                    Arr: {stop.arrivalTime} | Dep: {stop.departureTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Class Availability Matrix Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            Seat Availability ({quota === 'TQ' ? 'Tatkal Quota' : 'General Quota'}):
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {train.classes.map((cls) => {
              const isSelected = activeSelectedClass === cls.classCode;
              const fare = quota === 'TQ' ? cls.tatkalFare : cls.fare;

              return (
                <div
                  key={cls.classCode}
                  onClick={() => setActiveSelectedClass(cls.classCode)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/90 dark:bg-blue-950/70 shadow-md ring-2 ring-blue-500/50'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between font-black text-slate-900 dark:text-white mb-1">
                    <span className="text-sm">{cls.classCode}</span>
                    <span className="font-mono text-sm text-blue-700 dark:text-blue-400">₹{fare}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1.5 truncate">
                    {cls.className}
                  </div>
                  {getStatusBadge(cls.status, cls.count, cls.confirmationProbability)}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              100% Free Cancellation Protection Available • Instant UPI Refund
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Quick Tatkal FastPay Button */}
            {tatkalAutoAuth && (
              <button
                onClick={() => openBookingModal(train, activeSelectedClass)}
                className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all hover:scale-102"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>15s Express Tatkal</span>
              </button>
            )}

            {/* Standard Book Now Button */}
            <button
              onClick={() => openBookingModal(train, activeSelectedClass)}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-102"
            >
              <span>Book {activeSelectedClass} (₹{quota === 'TQ' ? selectedClassData.tatkalFare : selectedClassData.fare})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
