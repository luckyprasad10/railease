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
  Sparkles,
  HelpCircle,
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

  // Primary clean horizontal tabs (single-line, no clutter)
  const primaryTabs: { id: ActiveTab; label: string; icon: React.ReactNode; isLive?: boolean }[] = [
    { id: 'search', label: 'Book Trains', icon: <Search className="w-4 h-4" /> },
    { id: 'pnr', label: 'PNR Status', icon: <Ticket className="w-4 h-4" /> },
    { id: 'live', label: 'Live Tracker', icon: <Activity className="w-4 h-4" />, isLive: true },
    { id: 'station-services', label: 'Services & Food', icon: <UtensilsCrossed className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Left: Clean Brand Logo */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
              <Train className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Rail<span className="text-blue-600 dark:text-blue-400">Ease</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase hidden sm:block">
                Indian Railways Portal
              </span>
            </div>
          </div>

          {/* Center: Streamlined Modern Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
            {primaryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </button>
              );
            })}

            {/* More Menu Dropdown for Master List & Ops Console */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'passengers' || activeTab === 'admin'
                    ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fade-in">
                  <button
                    onClick={() => {
                      setActiveTab('passengers');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === 'passengers'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
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
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors mt-1 ${
                      activeTab === 'admin'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    <div className="text-left">
                      <div>Operations Console</div>
                      <div className="text-[10px] text-slate-500 font-normal">Delays, platforms & quotas</div>
                    </div>
                  </button>

                  <div className="my-1.5 border-t border-slate-100 dark:border-slate-800"></div>

                  <div className="px-3 py-2 text-[11px] text-slate-500 flex items-center space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>RailMadad Helpline: <strong>139</strong></span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Cluster: Bookings, Wallet, Tatkal Toggle, Dark Mode */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* My Bookings Button */}
            <button
              onClick={() => setActiveTab('my-bookings')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'my-bookings'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
              {bookings.length > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === 'my-bookings' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                }`}>
                  {bookings.length}
                </span>
              )}
            </button>

            {/* FastPay Wallet Pill */}
            <div className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">FastPay:</span>
              <span className="font-mono font-black text-slate-900 dark:text-white">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Tatkal Turbo Toggle Pill */}
            <button
              onClick={toggleTatkalAutoAuth}
              className={`hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                tatkalAutoAuth
                  ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
              title="15-Second Express Checkout Mode"
            >
              <Zap className={`w-3.5 h-3.5 ${tatkalAutoAuth ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
              <span>Tatkal Turbo</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-1.5 shadow-xl">
          {primaryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {tab.icon}
                  <span>{tab.label}</span>
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
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'passengers'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
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
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'admin'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>Operations Console</span>
          </button>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs px-2 text-slate-500">
            <span>FastPay Balance: <strong className="text-slate-900 dark:text-white">₹{walletBalance}</strong></span>
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
