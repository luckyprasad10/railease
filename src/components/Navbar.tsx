import React, { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  Heart,
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation tabs (clean, single-line, whitespace-nowrap)
  const navTabs: { id: ActiveTab; label: string; isLive?: boolean; hasHeart?: boolean }[] = [
    { id: 'search', label: 'Book Trains' },
    { id: 'pnr', label: 'PNR Status' },
    { id: 'live', label: 'Live Tracker', isLive: true },
    { id: 'station-services', label: 'Station Services' },
    { id: 'about', label: 'About', hasHeart: true },
  ];

  const isMoreActive = ['passengers', 'admin'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo: Clean, compact, perfectly proportioned */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Train className="w-4.5 h-4.5" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  Rail<span className="text-blue-600 dark:text-blue-400">Ease</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-0.5 hidden sm:block">
                Indian Railways Portal
              </span>
            </div>
          </div>

          {/* Navigation Links: Single-line, never wraps, clean typography */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                  {tab.hasHeart && (
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  )}
                </button>
              );
            })}

            {/* Dropdown for Secondary Tools */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 ${
                  isMoreActive
                    ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in space-y-1">
                  <button
                    onClick={() => {
                      setActiveTab('passengers');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      activeTab === 'passengers'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-4 h-4 text-blue-600" />
                    <div className="text-left">
                      <div>Master Passenger Vault</div>
                      <div className="text-[10px] text-slate-500 font-normal">Pre-saved Tatkal travelers</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      activeTab === 'admin'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    <div className="text-left">
                      <div>Operations Console</div>
                      <div className="text-[10px] text-slate-500 font-normal">Delays, platforms & quotas</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                  <div className="px-3 py-1.5 text-[11px] text-slate-500 flex items-center space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>RailMadad Helpline: <strong>139</strong></span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Cluster: Balanced, uniform height, zero clutter */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 flex-shrink-0">
            {/* FastPay Balance Pill */}
            <div
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs select-none shadow-xs"
              title="FastPay Balance"
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>

            {/* My Bookings Pill */}
            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-xs ${
                activeTab === 'my-bookings'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Bookings</span>
              {bookings.length > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black leading-none ${
                    activeTab === 'my-bookings'
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {bookings.length}
                </span>
              )}
            </button>

            {/* Tatkal Turbo: Single High-Contrast Accent Button */}
            <button
              onClick={toggleTatkalAutoAuth}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tatkalAutoAuth
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
              }`}
              title="15-Second Express Checkout Mode"
            >
              <Zap className={`w-3.5 h-3.5 ${tatkalAutoAuth ? 'fill-white text-white' : 'text-amber-500'}`} />
              <span className="hidden sm:inline">Tatkal Turbo</span>
              {tatkalAutoAuth && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Navigation Menu"
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-1 shadow-xl animate-fade-in">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{tab.label}</span>
                  {tab.hasHeart && <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
                </div>
                {tab.isLive && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                    LIVE
                  </span>
                )}
              </button>
            );
          })}

          <button
            onClick={() => {
              setActiveTab('passengers');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'passengers'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-blue-600" />
            <span>Master Passenger Vault</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('admin');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>Operations Console</span>
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs px-2 text-slate-500">
            <span className="flex items-center space-x-1.5">
              <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              <span>FastPay: <strong className="text-slate-900 dark:text-white">₹{walletBalance}</strong></span>
            </span>
            <span className="flex items-center space-x-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
              <span>Helpline 139</span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
