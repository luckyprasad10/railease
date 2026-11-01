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
  ArrowRight,
  ShieldCheck,
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

  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
    } catch {
      return dateStr;
    }
  };

  const trendingRoutes = [
    { from: 'NDLS', to: 'BSB', label: 'NDLS ➔ Varanasi', tag: 'Vande Bharat' },
    { from: 'NDLS', to: 'CSMT', label: 'NDLS ➔ Mumbai', tag: 'Tejas Rajdhani' },
    { from: 'MAS', to: 'SBC', label: 'Chennai ➔ Bengaluru', tag: 'Vande Bharat' },
    { from: 'NDLS', to: 'HWH', label: 'NDLS ➔ Howrah', tag: 'Rajdhani' },
    { from: 'NDLS', to: 'RNC', label: 'NDLS ➔ Ranchi', tag: 'Purushottam' },
  ];

  const handleSearchClick = () => {
    // Smooth scroll down to train list
    window.scrollTo({
      top: 520,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative pt-8 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-100 via-transparent to-transparent dark:from-slate-900/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 text-xs font-bold mb-4 border border-blue-200/80 dark:border-blue-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Indian Railway Next-Gen High-Speed Booking Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Book Train Tickets with{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-orange-500 bg-clip-text text-transparent">
              Zero Latency.
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Side-by-side seat availability across all classes, 15-second Tatkal express checkout, smart coach seat visualizer, and satellite GPS running status.
          </p>
        </div>

        {/* Master Floating Search Card */}
        <div className="floating-search-card p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative z-30">
          {/* Tatkal Rush Alert Banner */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs">
            <div className="flex items-center space-x-3 text-amber-950 dark:text-amber-200 font-medium">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shrink-0 font-bold">
                <Zap className="w-4 h-4 fill-slate-950" />
              </div>
              <div>
                <span className="font-bold block text-sm text-slate-900 dark:text-white">
                  Tatkal Express Turbo Mode Active
                </span>
                <span className="text-slate-600 dark:text-slate-400">
                  Pre-saved Master Passenger details enable 15-second checkout without typing errors during peak 10:00 AM rush.
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs font-bold text-amber-900 dark:text-amber-300 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-amber-200 dark:border-amber-800 shadow-2xs">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              <span>Next Tatkal Window: <strong>{tatkalCountdown}</strong></span>
            </div>
          </div>

          {/* Form Fields: Grid Layout with Clean Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Cell 1: FROM STATION */}
            <div className="relative md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>From Station</span>
              </label>

              <div
                onClick={() => {
                  setShowFromDropdown(true);
                  setShowToDropdown(false);
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 cursor-pointer transition-all shadow-2xs group"
              >
                <div className="overflow-hidden">
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                    {fromStationObj.code}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                    {fromStationObj.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {fromStationObj.city}, {fromStationObj.state}
                  </div>
                </div>
              </div>

              {/* Autocomplete Dropdown */}
              {showFromDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-elevation p-3 max-h-72 overflow-y-auto">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Type city, station name, or code..."
                      value={fromQuery}
                      onChange={(e) => setFromQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none font-medium"
                      autoFocus
                    />
                    {fromQuery && (
                      <button
                        onClick={() => setFromQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-blue-700 dark:text-blue-400">{station.code}</span>
                            <span className="text-slate-900 dark:text-white font-medium">{station.name}</span>
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

            {/* Swap Button (Prominent & Accessible) */}
            <div className="flex justify-center md:col-span-1">
              <button
                onClick={swapStations}
                type="button"
                aria-label="Swap Origin and Destination"
                className="w-11 h-11 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/50 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 shadow-soft transition-all hover:rotate-180 flex items-center justify-center"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Cell 2: TO STATION */}
            <div className="relative md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>To Station</span>
              </label>

              <div
                onClick={() => {
                  setShowToDropdown(true);
                  setShowFromDropdown(false);
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 hover:border-orange-600 dark:hover:border-orange-500 cursor-pointer transition-all shadow-2xs group"
              >
                <div className="overflow-hidden">
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-orange-600 transition-colors">
                    {toStationObj.code}
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                    {toStationObj.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {toStationObj.city}, {toStationObj.state}
                  </div>
                </div>
              </div>

              {/* Autocomplete Dropdown */}
              {showToDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-elevation p-3 max-h-72 overflow-y-auto">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Type city, station name, or code..."
                      value={toQuery}
                      onChange={(e) => setToQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none font-medium"
                      autoFocus
                    />
                    {toQuery && (
                      <button
                        onClick={() => setToQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
                        className={`p-2.5 rounded-xl text-xs cursor-pointer flex items-center justify-between hover:bg-orange-50 dark:hover:bg-orange-950/60 transition-colors ${
                          station.code === toStation ? 'bg-orange-100/70 dark:bg-orange-900/50 font-bold' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-orange-700 dark:text-orange-400">{station.code}</span>
                            <span className="text-slate-900 dark:text-white font-medium">{station.name}</span>
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

            {/* Cell 3: DEPARTURE DATE */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Departure Date</span>
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={journeyDate}
                  min={getTodayDate()}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white input-focus shadow-2xs"
                />
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1 pl-1">
                  Selected: {formatDisplayDate(journeyDate)}
                </div>
              </div>
            </div>

            {/* Cell 4: SEARCH BUTTON (High-Contrast Vibrant Accent) */}
            <div className="md:col-span-2 pt-2 md:pt-4">
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-full h-14 btn-primary-orange rounded-2xl flex items-center justify-center space-x-2 text-sm font-black uppercase tracking-wider shadow-lg"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>Search Trains</span>
              </button>
            </div>
          </div>

          {/* Quick Date Shortcuts, Quota & Class Filters */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Quick Date Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-bold">Quick Dates:</span>
              <button
                type="button"
                onClick={() => setJourneyDate(getTodayDate())}
                className={`px-3.5 py-1.5 rounded-xl border font-bold transition-all ${
                  journeyDate === getTodayDate()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setJourneyDate(getTomorrowDate())}
                className={`px-3.5 py-1.5 rounded-xl border font-bold transition-all ${
                  journeyDate === getTomorrowDate()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => setJourneyDate(getDayAfterTomorrow())}
                className={`px-3.5 py-1.5 rounded-xl border font-bold transition-all ${
                  journeyDate === getDayAfterTomorrow()
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                In 2 Days
              </button>
            </div>

            {/* Quota & Class Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-500 dark:text-slate-400 font-bold">Quota:</span>
                <select
                  value={quota}
                  onChange={(e) => setQuota(e.target.value as QuotaType)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white input-focus"
                >
                  <option value="GN">General (GN)</option>
                  <option value="TQ">Tatkal (TQ)</option>
                  <option value="PT">Premium Tatkal (PT)</option>
                  <option value="LD">Ladies (LD)</option>
                  <option value="SS">Senior Citizen (SS)</option>
                  <option value="DP">Divyangjan (DP)</option>
                </select>
              </div>

              {/* Class Tabs */}
              <div className="flex items-center space-x-1 overflow-x-auto py-1">
                <span className="text-slate-500 dark:text-slate-400 font-bold mr-1">Class:</span>
                {(['ALL', '1A', '2A', '3A', '3E', 'SL', 'CC', 'EC'] as (CoachClass | 'ALL')[]).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      selectedClass === cls
                        ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Route Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
            <span>Popular Express Routes:</span>
          </span>
          {trendingRoutes.map((route, i) => (
            <button
              key={i}
              onClick={() => {
                setFromStation(route.from);
                setToStation(route.to);
              }}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-500 text-slate-700 dark:text-slate-200 hover:text-orange-600 transition-all shadow-2xs font-bold flex items-center space-x-1.5"
            >
              <span>{route.label}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">({route.tag})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
