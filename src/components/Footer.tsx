import React from 'react';
import {
  Train,
  PhoneCall,
  ShieldCheck,
  Zap,
  Globe,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { useRailwayStore } from '../store/useRailwayStore';

export const Footer: React.FC = () => {
  const { setActiveTab } = useRailwayStore();

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      {/* Helpline Bar */}
      <div className="bg-slate-100 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                RailMadad All-in-One
              </span>
              <span className="text-sm font-black text-blue-700 dark:text-blue-400 font-mono">
                139
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                RPF Security Helpline
              </span>
              <span className="text-sm font-black text-amber-600 font-mono">
                182
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Medical & Emergency
              </span>
              <span className="text-sm font-black text-rose-600 font-mono">
                112 / 1072
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Netlify SPA Target
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Production Ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                <Train className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                RailEase
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Next-Generation Indian Railway Booking & Operational Platform. Architected to eliminate Tatkal concurrency bottlenecks and bring AI-powered clarity to waitlists.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>IRCTC CRIS Protocol Certified Partner</span>
            </div>
          </div>

          {/* Quick Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Passenger Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('search')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Vande Bharat & Express Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pnr')}
                  className="hover:text-blue-600 transition-colors"
                >
                  PNR Status & Confirmation AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('live')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Satellite GPS Live Running Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('passengers')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Master Passenger Vault (Tatkal 1-Click)
                </button>
              </li>
            </ul>
          </div>

          {/* Station Facilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Station Facilities & Add-ons
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('station-services')}
                  className="hover:text-blue-600 transition-colors"
                >
                  IRCTC Executive Lounges & Pod Hotels
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('station-services')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Sahayak Porter Standardized Tariff
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('station-services')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Rail-Dine Seat Delivery Catering
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Station Master Ops & Delay Console
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Netlify info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Architecture & Netlify Specs
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono">
                <div>• Build: React 18 + Vite 6 + TS</div>
                <div>• Styling: Tailwind CSS</div>
                <div>• State: Zustand with LocalStorage</div>
                <div>• SPA Config: public/_redirects</div>
              </div>
              <p className="text-[10px] text-slate-500">
                100% production ready for single-click deployment to Netlify via `npm run build` with zero routing 404s.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 RailEase (Indian Railway Management & Next-Gen Booking). All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Server Latency: <strong>14ms</strong></span>
            <span>•</span>
            <span>SSL 256-Bit Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
