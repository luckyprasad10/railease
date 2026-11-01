import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Download,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useRailwayStore } from '../store/useRailwayStore';
import { Booking } from '../types/railway';
import { TicketViewModal } from './TicketViewModal';

export const MyBookings: React.FC = () => {
  const {
    bookings,
    cancelBooking,
    setActiveTab,
    setSearchedTrainNum,
    setSearchedPnr,
  } = useRailwayStore();

  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'RAC' | 'WAITLISTED' | 'CANCELLED'>('ALL');
  const [viewingTicket, setViewingTicket] = useState<Booking | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'ALL') return true;
    return b.status === filter;
  });

  const handleTrackLive = (trainNumber: string) => {
    setSearchedTrainNum(trainNumber);
    setActiveTab('live');
  };

  const handleTrackPnr = (pnr: string) => {
    setSearchedPnr(pnr);
    setActiveTab('pnr');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-semibold mb-2 border border-blue-300 dark:border-blue-800">
          <Ticket className="w-3.5 h-3.5" />
          <span>Ticket Wallet & Travel History</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
          My Reserved Tickets & E-Slips
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Access official Electronic Reservation Slips (ERS), view coach berth charts, track live train positions, or initiate 100% instant refunds.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          {(['ALL', 'CONFIRMED', 'RAC', 'WAITLISTED', 'CANCELLED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === tab
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab === 'ALL' ? `All (${bookings.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.pnr}
              className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all space-y-4"
            >
              {/* Header: PNR, Date, Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                      PNR Number
                    </span>
                    <span className="font-mono text-lg font-black text-blue-700 dark:text-blue-400">
                      {booking.pnr}
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block leading-none">
                      Journey Date
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {booking.journeyDate}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {booking.status === 'CONFIRMED' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>CONFIRMED (CNF)</span>
                    </span>
                  )}
                  {booking.status === 'RAC' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>RAC (Reservation Against Canc)</span>
                    </span>
                  )}
                  {booking.status === 'WAITLISTED' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      <span>WAITLISTED</span>
                    </span>
                  )}
                  {booking.status === 'CANCELLED' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>CANCELLED</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Train and Route Details */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                <div className="sm:col-span-5">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {booking.trainName} (#{booking.trainNumber})
                  </h4>
                  <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Class: <strong>{booking.coachClass}</strong> • Quota: <strong>{booking.quota}</strong> • {booking.passengers.length} Passenger(s)
                  </div>
                </div>

                <div className="sm:col-span-4 flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                  <span className="font-bold">{booking.fromStation}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="font-bold">{booking.toStation}</span>
                </div>

                <div className="sm:col-span-3 text-right">
                  <div className="text-slate-500">Total Paid:</div>
                  <div className="font-mono text-base font-black text-slate-900 dark:text-white">
                    ₹{booking.totalFare}
                  </div>
                </div>
              </div>

              {/* Passengers and Berths Pill Row */}
              <div className="flex flex-wrap gap-2 text-xs">
                {booking.passengers.map((p, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center space-x-2"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white">{p.name}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                      {p.coach !== 'WL' ? `${p.coach}-${p.berthNumber}` : 'WL'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instant Refund Card if Cancelled */}
              {booking.refundStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      100% Instant Refund Credited: <strong>₹{booking.refundStatus.amount}</strong> (Ref: {booking.refundStatus.refId})
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTrackPnr(booking.pnr)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                  >
                    PNR Progress Tracker
                  </button>
                  <button
                    onClick={() => handleTrackLive(booking.trainNumber)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 transition-colors"
                  >
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>Track Live GPS</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  {booking.status !== 'CANCELLED' && (
                    <button
                      onClick={() => cancelBooking(booking.pnr)}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 text-xs font-semibold transition-colors"
                    >
                      Cancel & Refund
                    </button>
                  )}
                  <button
                    onClick={() => setViewingTicket(booking)}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    View ERS Ticket
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <Ticket className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              No bookings under '{filter}' status
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select 'All' or book a new journey from the Search tab.
            </p>
          </div>
        )}
      </div>

      {/* Ticket View Modal */}
      {viewingTicket && (
        <TicketViewModal
          ticket={viewingTicket}
          onClose={() => setViewingTicket(null)}
        />
      )}
    </div>
  );
};
