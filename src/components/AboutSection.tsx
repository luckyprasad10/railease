import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  Train,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  Star,
  Coffee,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Flame,
  Award,
  Send,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRailwayStore } from '../store/useRailwayStore';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useRailwayStore();
  const [blessingSent, setBlessingSent] = useState(false);
  const [heartsCount, setHeartsCount] = useState(108);

  const handleSendLove = () => {
    setHeartsCount((prev) => prev + 1);
    setBlessingSent(true);

    // Trigger sweet heart confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#fb7185', '#fda4af'],
    });

    setTimeout(() => setBlessingSent(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fade-in">
      {/* Dedication Banner & Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-indigo-500/10 dark:from-rose-950/40 dark:via-purple-950/20 dark:to-slate-900 border border-rose-200/60 dark:border-rose-900/40 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-gradient-to-br from-rose-400/20 to-pink-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-500/15 to-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/80 text-rose-600 dark:text-rose-300 text-xs font-bold tracking-wide shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Special Dedication • Made for Tannu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Every Journey Deserves to be{' '}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 dark:from-rose-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Pure Joy & Peace.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              RailEase was designed and handcrafted with endless devotion for <strong>Tannu</strong>. Born out of the belief that traveling across India—whether returning home for holidays or discovering new horizons—should be as effortless, comforting, and reliable as warm sunshine.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={handleSendLove}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{blessingSent ? 'Heart Sent with Love! ✨' : 'Send Love to Tannu ❤️'}</span>
                <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs font-mono">
                  {heartsCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('search')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
              >
                <Train className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Explore Trains</span>
              </button>
            </div>
          </div>

          {/* Dedication Card */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 border border-rose-200/80 dark:border-rose-900/60 shadow-lg text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
                <Heart className="w-8 h-8 fill-white animate-pulse" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Dear Tannu,
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed italic">
                  &ldquo;May every ticket you book bring adventures, every seat you sit on bring comfort, and every train track take you closer to the dreams you cherish.&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-rose-100 dark:border-rose-950/60 flex items-center justify-center space-x-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted with all my heart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The RailEase Story & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Compass className="w-4 h-4" />
            <span>The Story of RailEase</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Why Indian Railway Booking Needed a Complete Re-imagination
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every day, millions of travelers across India encounter high-stress challenges: agonizing 10:00 AM Tatkal concurrency crashes, mysterious waitlists with zero transparency, missing platform numbers, and clunky legacy interfaces that leave people anxious right before travel.
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>RailEase</strong> was born to solve these real-world pain points once and for all. It brings state-of-the-art web performance, unvarnished real-time data feeds, predictive confirmation metrics, and a warm, humane touch to Indian railway travel.
          </p>

          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">15s</div>
              <div className="text-[11px] font-semibold text-slate-500">Tatkal Checkout</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">99.8%</div>
              <div className="text-[11px] font-semibold text-slate-500">Live Uptime</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">0ms</div>
              <div className="text-[11px] font-semibold text-slate-500">Ad Clutter</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xl font-black text-rose-500 font-mono">100%</div>
              <div className="text-[11px] font-semibold text-slate-500">Made for Tannu</div>
            </div>
          </div>
        </div>

        {/* Creator Note Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-rose-400">
              <Star className="w-6 h-6 fill-rose-400" />
            </div>

            <h3 className="text-lg font-black tracking-tight">
              Architected with Love & Precision
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;Software is at its best when it solves real human stress. Building this project for Tannu meant every single detail had to be smooth, joyful, and utterly dependable.&rdquo;
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-1">
            <div className="text-sm font-bold text-white">Lucky Prasad</div>
            <div className="text-[11px] text-slate-400">Creator & Lead Architect • RailEase</div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of RailEase */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Core Innovations Built Into RailEase
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineered with modern resilient web technologies to empower every Indian railway traveler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5 fill-amber-500/30" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              15-Second Tatkal Turbo
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pre-saved Master Passenger profiles with FastPay auto-authorization to book guaranteed berths in seconds before quotas exhaust.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Satellite Live GPS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Direct telemetry from RailRadar and ISRO satellite feeds for real-time train running status, delay minutes, and confirmed platform assignments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Predictive PNR Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              CRIS historical confirmation percentage algorithm calculating exact confirmation probabilities for RAC and Waitlist tickets.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Station Dignity & Services
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Transparent Sahayak porter tariffs, IRCTC Executive Lounge pre-booking, and seat-delivery catering across major Indian junctions.
            </p>
          </div>
        </div>
      </div>

      {/* Technology & Architecture Section */}
      <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Tech Stack & Engineering Quality
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Modern frontend architecture running on Netlify and Render with 100% SPA routing reliability.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Production Live</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 font-medium block text-[10px]">FRAMEWORK</span>
            <span className="font-bold text-slate-900 dark:text-white">React 18 + Vite 6</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 font-medium block text-[10px]">LANGUAGE</span>
            <span className="font-bold text-slate-900 dark:text-white">TypeScript Strict</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 font-medium block text-[10px]">STATE ENGINE</span>
            <span className="font-bold text-slate-900 dark:text-white">Zustand + LocalStorage</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 font-medium block text-[10px]">STYLING & ICONS</span>
            <span className="font-bold text-slate-900 dark:text-white">Tailwind CSS + Lucide</span>
          </div>
        </div>
      </div>

      {/* Warm Footer Farewell */}
      <div className="text-center space-y-3 py-4">
        <div className="inline-flex items-center space-x-2 text-rose-500 text-sm font-semibold">
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>Made with endless love and appreciation for Tannu</span>
          <Heart className="w-4 h-4 fill-rose-500" />
        </div>
        <p className="text-xs text-slate-400">
          RailEase • Connecting destinations, bringing people together.
        </p>
      </div>
    </div>
  );
};
