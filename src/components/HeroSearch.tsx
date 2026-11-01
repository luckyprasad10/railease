import React, { useState, useEffect } from 'react';
import {
  ArrowRightLeft,
  Calendar,
  Search,
  Zap,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  X,
  Compass,
} from 'lucide-react';
import { useRailwayStore } from '../store/useRailwayStore';
import { POPULAR_STATIONS } from '../data/mockData';
import { CoachClass, QuotaType } from '../types/railway';

export const HeroSearch: React.FC = () => {
  const {
    fromStation,
    toStation,
    journeyDate,
    quota,
    selectedClass,
    setFromStation,
    setToStation,
    setJourneyDate,
    setQuota,
    setSelectedClass,
    swapStations,
    tatkalAutoAuth,
    toggleTatkalAutoAuth,
  } = useRailwayStore();

  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Live Tatkal Countdown Timer to 10:00 AM
  const [tatkalCountdown, setTatkalCountdown] = useState('');

  useEffect(() => {
    const calculateTatkalTime = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(10, 0, 0, 0);

      // If already past 10 AM, target 10 AM tomorrow
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }

      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTatkalCountdown(`${hours}h ${mins}m ${secs}s`);
    };

    calculateTatkalTime();
    const interval = setInterval(calculateTatkalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fromStationObj = POPULAR_STATIONS.find((s) => s.code === fromStation) || POPULAR_STATIONS[0];
  const toStationObj = POPULAR_STATIONS.find((s) => s.code === toStation) || POPULAR_STATIONS[8]; // BSB

  const filteredFromStations = POPULAR_STATIONS.filter(
    (s) =>
      s.code.toLowerCase().includes(fromQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(fromQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredToStations = POPULAR_STATIONS.filter(
    (s) =>
      s.code.toLowerCase().includes(toQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(toQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(toQuery.toLowerCase())
  );

  // Quick Date Helpers
  const getTodayDate = () => new Date().toISOString().split('T')[0];
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const getDayAfterTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const trendingRoutes = [
    { from: 'NDLS', to: 'BSB', label: 'NDLS ➔ Varanasi (Vande Bharat)', type: 'Vande Bharat' },
    { from: 'NDLS', to: 'CSMT', label: 'NDLS ➔ Mumbai (Tejas Rajdhani)', type: 'Rajdhani' },
    { from: 'MAS', to: 'SBC', label: 'Chennai ➔ Bengaluru (Vande Bharat)', type: 'Vande Bharat' },
    { from: 'NDLS', to: 'HWH', label: 'NDLS ➔ Howrah (Rajdhani)', type: 'Rajdhani' },
    { from: 'NDLS', to: 'RNC', label: 'NDLS ➔ Ranchi (Purushottam SF)', type: 'Superfast' },
  ];

  return (
    <div className="relative pt-6 pb-8">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/70 via-transparent to-transparent dark:from-blue-950/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-semibold mb-3 border border-blue-200 dark:border-blue-800 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Next-Generation IRCTC High-Concurrency Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Indian Railway Booking,{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
              Elevated & Real-Time.
            </span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            15-second Tatkal Quick Checkout, real-time seat availability across all classes, coach layout preview, and ISRO satellite GPS train status.
          </p>
        </div>

        {/* Main Search Glass Card */}
        <div className="glass-card rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/90 dark:border-slate-800 relative z-30">
          {/* Tatkal Countdown & Rush Alert Banner */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs">
            <div className="flex items-center space-x-2.5 text-amber-900 dark:text-amber-200 font-medium">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
              <span>
                <strong>Tatkal 10:00 AM (AC) & 11:00 AM (Non-AC)</strong>: Pre-saved Master List enables 15-second checkout without typing.
              </span>
            </div>
            <div className="flex items-center space-x-2 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-3 py-1.5 rounded-xl shadow-2xs">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Next Tatkal Window: <strong>{tatkalCountdown}</strong></span>
            </div>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* From Station */}
            <div className="relative lg:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                From Station
              </label>
              <div
                onClick={() => {
                  setShowFromDropdown(true);
                  setShowToDropdown(false);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 hover:border-blue-500 cursor-pointer transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-black text-sm text-slate-900 dark:text-white mr-1.5">
                      {fromStationObj.code}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      - {fromStationObj.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Autocomplete Dropdown */}
              {showFromDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2.5 max-h-64 overflow-y-auto">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Search station, city, or station code..."
                      value={fromQuery}
                      onChange={(e) => setFromQuery(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none font-medium"
                      autoFocus
                    />
                    {fromQuery && (
                      <button
                        onClick={() => setFromQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {filteredFromStations.map((station) => (
                      <div
                        key={station.code}
                        onClick={() => {
                          setFromStation(station.code);
                          setShowFromDropdown(false);
                          setFromQuery('');
                        }}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between hover:bg-blue-50 dark:hover:bg-blue-950/60 transition-colors ${
                          station.code === fromStation ? 'bg-blue-100/70 dark:bg-blue-900/50 font-bold' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-black text-blue-700 dark:text-blue-400">{station.code}</span>
                            <span className="text-slate-800 dark:text-slate-200">{station.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {station.city}, {station.state} • {station.platforms} Platforms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center lg:col-span-1">
              <button
                onClick={swapStations}
                type="button"
                aria-label="Swap Stations"
                className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all hover:rotate-180 shadow-xs"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To Station */}
            <div className="relative lg:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                To Station
              </label>
              <div
                onClick={() => {
                  setShowToDropdown(true);
                  setShowFromDropdown(false);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 hover:border-blue-500 cursor-pointer transition-colors shadow-2xs"
              >
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="font-black text-sm text-slate-900 dark:text-white mr-1.5">
                      {toStationObj.code}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      - {toStationObj.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Autocomplete Dropdown */}
              {showToDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2.5 max-h-64 overflow-y-auto">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Search station, city, or station code..."
                      value={toQuery}
                      onChange={(e) => setToQuery(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none font-medium"
                      autoFocus
                    />
                    {toQuery && (
                      <button
                        onClick={() => setToQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {filteredToStations.map((station) => (
                      <div
                        key={station.code}
                        onClick={() => {
                          setToStation(station.code);
                          setShowToDropdown(false);
                          setToQuery('');
                        }}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between hover:bg-amber-50 dark:hover:bg-amber-950/60 transition-colors ${
                          station.code === toStation ? 'bg-amber-100/70 dark:bg-amber-900/50 font-bold' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-black text-amber-700 dark:text-amber-400">{station.code}</span>
                            <span className="text-slate-800 dark:text-slate-200">{station.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {station.city}, {station.state} • {station.platforms} Platforms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Journey Date */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                Journey Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={journeyDate}
                  min={getTodayDate()}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Quota Selector */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
                Quota
              </label>
              <select
                value={quota}
                onChange={(e) => setQuota(e.target.value as QuotaType)}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 shadow-2xs"
              >
                <option value="GN">General (GN)</option>
                <option value="TQ">Tatkal (TQ)</option>
                <option value="PT">Premium Tatkal (PT)</option>
                <option value="LD">Ladies (LD)</option>
                <option value="SS">Senior Citizen (SS)</option>
                <option value="DP">Divyangjan (DP)</option>
              </select>
            </div>
          </div>

          {/* Quick Date Shortcuts & Class Filters */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Date Pills */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Quick Dates:</span>
              <button
                type="button"
                onClick={() => setJourneyDate(getTodayDate())}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                  journeyDate === getTodayDate()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setJourneyDate(getTomorrowDate())}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                  journeyDate === getTomorrowDate()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setJourneyDate(getDayAfterTomorrow())}
                className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                  journeyDate === getDayAfterTomorrow()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                In 2 Days
              </button>
            </div>

            {/* Class Filter Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
              <span className="text-slate-500 dark:text-slate-400 font-bold mr-1">Class:</span>
              {(['ALL', '1A', '2A', '3A', '3E', 'SL', 'CC', 'EC'] as (CoachClass | 'ALL')[]).map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    selectedClass === cls
                      ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trending High-Speed Routes Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>High-Demand Sectors:</span>
          </span>
          {trendingRoutes.map((route, i) => (
            <button
              key={i}
              onClick={() => {
                setFromStation(route.from);
                setToStation(route.to);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors shadow-2xs font-semibold"
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
