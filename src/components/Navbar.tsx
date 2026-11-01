import React from 'react';
import {
  Train,
  Search,
  Activity,
  Ticket,
  Users,
  UtensilsCrossed,
  ShieldAlert,
  Wallet,
  Sun,
  Moon,
  Zap,
  PhoneCall,
  Menu,
  X,
  Radio,
} from 'lucide-react';
import { useRailwayStore, ActiveTab } from '../store/useRailwayStore';

export const Navbar: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    walletBalance,
    tatkalAutoAuth,
    toggleTatkalAutoAuth,
    bookings,
  } = useRailwayStore();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'search', label: 'Book Trains', icon: <Search className="w-4 h-4" /> },
    { id: 'pnr', label: 'PNR Status & AI', icon: <Ticket className="w-4 h-4" /> },
    { id: 'live', label: 'Live GPS Status', icon: <Activity className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'passengers', label: 'Master List', icon: <Users className="w-4 h-4" /> },
    { id: 'station-services', label: 'Services & Dine', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'my-bookings', label: 'My Bookings', icon: <Ticket className="w-4 h-4" />, badge: bookings.length },
    { id: 'admin', label: 'Operations Ops', icon: <ShieldAlert className="w-4 h-4" />, badge: 'Ops' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors shadow-2xs">
      {/* Top micro-bar for Emergency & Tatkal Speed mode with Indian Railway subtle ribbon */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white text-xs px-4 py-1 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-1.5 font-medium text-blue-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CRIS Protocol Network: <strong>14ms Latency (North Grid)</strong></span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:flex items-center space-x-1 text-slate-300">
            <PhoneCall className="w-3 h-3 text-amber-400" />
            <span>24x7 RailMadad Helpline: <strong>139</strong></span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Tatkal Auto-Debit Switch */}
          <button
            onClick={toggleTatkalAutoAuth}
            className={`flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all shadow-xs ${
              tatkalAutoAuth
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
            title="Pre-authorizes 1-click Tatkal checkout with 0 OTP latency"
          >
            <Zap className={`w-3 h-3 ${tatkalAutoAuth ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span>Tatkal Turbo Mode: {tatkalAutoAuth ? 'ENABLED (15s Checkout)' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Train className="w-5 h-5 transform -rotate-6 group-hover:rotate-0 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 dark:from-blue-400 dark:via-indigo-300 dark:to-amber-400 bg-clip-text text-transparent">
                  RailEase
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  v2.5 PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Next-Gen Indian Railway Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        item.badge === 'LIVE'
                          ? 'bg-emerald-500 text-white animate-pulse'
                          : item.badge === 'Ops'
                          ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Wallet, Dark Mode, Mobile menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* FastPay Wallet Balance */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold shadow-2xs">
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-none font-medium">
                  FastPay Wallet
                </span>
                <span className="text-emerald-700 dark:text-emerald-300 font-black">
                  ₹{walletBalance.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-blue-600 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
