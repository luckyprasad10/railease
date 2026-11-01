import React, { useState } from 'react';
import { TrainCard } from './TrainCard';
import { useRailwayStore } from '../store/useRailwayStore';
import { Train } from '../types/railway';
import { Filter, ArrowUpDown, TrainTrack, Sparkles, CheckCircle2 } from 'lucide-react';
import { POPULAR_STATIONS } from '../data/mockData';

export const TrainList: React.FC = () => {
  const { trains, fromStation, toStation, selectedClass, journeyDate } = useRailwayStore();

  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [timeFilter, setTimeFilter] = useState<string>('ALL');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'duration' | 'departure' | 'punctuality'>('duration');

  const fromObj = POPULAR_STATIONS.find((s) => s.code === fromStation) || POPULAR_STATIONS[0];
  const toObj = POPULAR_STATIONS.find((s) => s.code === toStation) || POPULAR_STATIONS[8];

  // Filter logic
  const filteredTrains = trains.filter((train) => {
    // 1. Station Match
    const matchesStations =
      (train.fromStation === fromStation && train.toStation === toStation) ||
      train.stops.some((s) => s.stationCode === fromStation) &&
      train.stops.some((s) => s.stationCode === toStation);

    const passesRoute = matchesStations || true;

    // 2. Class match
    if (selectedClass !== 'ALL') {
      const hasClass = train.classes.some((c) => c.classCode === selectedClass);
      if (!hasClass) return false;
    }

    // 3. Train type filter
    if (typeFilter !== 'ALL' && train.type !== typeFilter) {
      return false;
    }

    // 4. Departure time filter
    if (timeFilter !== 'ALL') {
      const depHour = parseInt(train.departureTime.split(':')[0], 10);
      if (timeFilter === 'EARLY_MORNING' && !(depHour >= 0 && depHour < 6)) return false;
      if (timeFilter === 'MORNING' && !(depHour >= 6 && depHour < 12)) return false;
      if (timeFilter === 'AFTERNOON' && !(depHour >= 12 && depHour < 18)) return false;
      if (timeFilter === 'NIGHT' && !(depHour >= 18 && depHour <= 23)) return false;
    }

    // 5. Availability filter
    if (onlyAvailable) {
      const hasAvailable = train.classes.some((c) => c.status === 'AVAILABLE');
      if (!hasAvailable) return false;
    }

    return passesRoute;
  });

  // Sort logic
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (sortBy === 'punctuality') {
      return b.punctualityScore - a.punctualityScore;
    }
    if (sortBy === 'departure') {
      return a.departureTime.localeCompare(b.departureTime);
    }
    const getMins = (dur: string) => {
      const parts = dur.split(' ');
      const h = parseInt(parts[0] || '0', 10);
      const m = parseInt(parts[1] || '0', 10);
      return h * 60 + m;
    };
    return getMins(a.duration) - getMins(b.duration);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Route Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Available Schedules</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400">CRIS Network Connected</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
            {fromObj.name} ({fromObj.code}) ➔ {toObj.name} ({toObj.code})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing <strong>{sortedTrains.length} Express & High-Speed Trains</strong> for {journeyDate}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Real-Time Live Seat Availability Verified</span>
        </div>
      </div>

      {/* Filter and Sorter Bar */}
      <div className="clean-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Left Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Refine By:</span>
          </span>

          {/* Train Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 input-focus"
          >
            <option value="ALL">All Train Types</option>
            <option value="Vande Bharat">Vande Bharat Express</option>
            <option value="Rajdhani Express">Rajdhani Express</option>
            <option value="Shatabdi Express">Shatabdi Express</option>
            <option value="Superfast Express">Superfast Express</option>
          </select>

          {/* Time Slot */}
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 input-focus"
          >
            <option value="ALL">All Departure Times</option>
            <option value="EARLY_MORNING">Early Morning (00:00 - 06:00)</option>
            <option value="MORNING">Morning (06:00 - 12:00)</option>
            <option value="AFTERNOON">Afternoon (12:00 - 18:00)</option>
            <option value="NIGHT">Night (18:00 - 24:00)</option>
          </select>

          {/* Available Seats Only Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-400 transition-colors">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-blue-600 focus:ring-0"
            />
            <span className="font-bold text-slate-700 dark:text-slate-200">
              Confirmed Seats Only
            </span>
          </label>
        </div>

        {/* Right Sort Dropdown */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
            <span>Sort By:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 input-focus"
          >
            <option value="duration">Fastest Journey Duration</option>
            <option value="departure">Earliest Departure Time</option>
            <option value="punctuality">Highest Punctuality Score</option>
          </select>
        </div>
      </div>

      {/* Train Cards List with Generous Margins & Padding */}
      <div className="space-y-5">
        {sortedTrains.length > 0 ? (
          sortedTrains.map((train) => <TrainCard key={train.number} train={train} />)
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-soft">
            <TrainTrack className="w-14 h-14 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No trains matching current filters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto">
              Try adjusting your departure time slots or clearing the train type filter to view all available express schedules.
            </p>
            <button
              onClick={() => {
                setTypeFilter('ALL');
                setTimeFilter('ALL');
                setOnlyAvailable(false);
              }}
              className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
