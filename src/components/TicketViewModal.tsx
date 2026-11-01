import React from 'react';
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Train,
  ArrowRight,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { Booking } from '../types/railway';
import { useRailwayStore } from '../store/useRailwayStore';

interface TicketViewModalProps {
  ticket: Booking;
  onClose: () => void;
}

export const TicketViewModal: React.FC<TicketViewModalProps> = ({ ticket, onClose }) => {
  const { cancelBooking } = useRailwayStore();
  const [copied, setCopied] = React.useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);

  const handleCopyPnr = () => {
    navigator.clipboard.writeText(ticket.pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCancelTicket = () => {
    cancelBooking(ticket.pnr);
    setShowCancelConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 print:shadow-none print:border-none">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                Electronic Reservation Slip (ERS)
              </div>
              <div className="text-base font-black">Indian Railways - RailEase</div>
            </div>
          </div>

          <div className="flex items-center space-x-2 print:hidden">
            <button
              onClick={handlePrint}
              title="Print or Save PDF"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ERS Ticket Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Status Badge & PNR Bar */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                10-Digit PNR Number
              </span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="font-mono text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-400 tracking-wider">
                  {ticket.pnr}
                </span>
                <button
                  onClick={handleCopyPnr}
                  className="p-1 rounded text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 print:hidden"
                  title="Copy PNR"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                Reservation Status
              </span>
              <div className="mt-0.5">
                {ticket.status === 'CONFIRMED' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>CONFIRMED (CNF)</span>
                  </span>
                )}
                {ticket.status === 'RAC' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    <span>RAC (RESERVATION AGAINST CANC)</span>
                  </span>
                )}
                {ticket.status === 'CANCELLED' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                    <span>TICKET CANCELLED</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Journey details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Train:</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {ticket.trainName} (#{ticket.trainNumber})
              </div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Class & Quota:</span>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                Class: {ticket.coachClass} | Quota: {ticket.quota}
              </div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Departure & Boarding:</span>
              <div className="font-bold text-slate-900 dark:text-white">
                {ticket.fromStationName} ({ticket.fromStation})
              </div>
              <div className="text-slate-500 text-[11px]">Date: {ticket.journeyDate}</div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Destination:</span>
              <div className="font-bold text-slate-900 dark:text-white">
                {ticket.toStationName} ({ticket.toStation})
              </div>
              <div className="text-slate-500 text-[11px]">Chart Status: {ticket.chartStatus}</div>
            </div>
          </div>

          {/* Passenger Table */}
          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Passenger Reservation Details:
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Passenger Name</th>
                    <th className="p-2.5">Age / Sex</th>
                    <th className="p-2.5">Coach</th>
                    <th className="p-2.5">Berth / Seat</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {ticket.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-2.5 font-bold">{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-slate-900 dark:text-white">
                        {p.name}
                      </td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-400">
                        {p.age} / {p.gender}
                      </td>
                      <td className="p-2.5 font-mono font-bold text-blue-700 dark:text-blue-400">
                        {p.coach}
                      </td>
                      <td className="p-2.5 font-mono font-bold text-slate-900 dark:text-white">
                        {p.berthNumber} ({p.berthType.split(' ')[0]})
                      </td>
                      <td className="p-2.5">
                        <span className="font-mono font-bold text-[11px] text-emerald-600 dark:text-emerald-400">
                          {p.statusDetails}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add-ons & Fare Breakdown */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 mb-1">
              Fare & Protection Breakdown:
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Base Ticket Fare ({ticket.passengers.length} Pax):</span>
                <span className="font-mono">₹{ticket.baseFare}</span>
              </div>
              {ticket.addons.freeCancellation && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Free Cancellation Protection:</span>
                  <span className="font-mono">Included</span>
                </div>
              )}
              {ticket.addons.travelInsurance && (
                <div className="flex justify-between text-blue-600 dark:text-blue-400">
                  <span>Travel Insurance (₹10 Lakh Accidental Cover):</span>
                  <span className="font-mono">Included</span>
                </div>
              )}
              {ticket.addons.loungeAccess && (
                <div className="flex justify-between">
                  <span>Executive Station Lounge Pass:</span>
                  <span className="font-mono">Confirmed</span>
                </div>
              )}
              {ticket.addons.coolieBooking && (
                <div className="flex justify-between">
                  <span>Station Sahayak / Coolie ({ticket.addons.coolieBags} Bags):</span>
                  <span className="font-mono">Pre-booked</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1.5 border-t border-slate-200 dark:border-slate-700">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-sm text-blue-700 dark:text-blue-400">
                  ₹{ticket.totalFare} via {ticket.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Refund Breakdown if Cancelled */}
          {ticket.refundStatus && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-xs">
              <div className="font-bold text-rose-900 dark:text-rose-200 mb-1 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Refund Credited: ₹{ticket.refundStatus.amount}</span>
              </div>
              <div className="text-[11px] text-rose-800 dark:text-rose-300">
                Reference ID: <span className="font-mono font-bold">{ticket.refundStatus.refId}</span> • Method: {ticket.refundStatus.method}
              </div>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center space-x-2">
            {ticket.status !== 'CANCELLED' && (
              <>
                {!showCancelConfirm ? (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="px-3 py-2 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    Cancel Ticket
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 p-1 bg-rose-50 dark:bg-rose-950 rounded-xl border border-rose-300">
                    <span className="text-[11px] text-rose-700 dark:text-rose-300 font-bold px-2">
                      Confirm cancellation?
                    </span>
                    <button
                      onClick={handleCancelTicket}
                      className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700"
                    >
                      Yes, Cancel & Refund
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="px-2 py-1 text-slate-500 text-xs font-semibold"
                    >
                      Abort
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download E-Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-500/20"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
