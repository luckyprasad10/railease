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

  // Primary clean text links (decluttered, no button boxes, pure typography)
  const primaryTabs: { id: ActiveTab; label: string; isLive?: boolean }[] = [
    { id: 'search', label: 'Book Trains' },
    { id: 'pnr', label: 'PNR Status' },
    { id: 'live', label: 'Live Tracker', isLive: true },
  ];

  // Secondary tabs grouped into "More"
  const isMoreActive = ['station-services', 'about', 'passengers', 'admin'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Refined Proportional Brand Logo (Vertically Centered) */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-all">
              <Train className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  Rail<span className="text-blue-600 dark:text-blue-400">Ease</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-[9px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-0.5 hidden sm:block">
                Indian Railways Portal
              </span>
            </div>
          </div>

          {/* Center: Decluttered Clean Navigation Links (Plain Text with Underline / Hover) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {primaryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                  {/* Subtle active underline indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Consolidated "More" Dropdown (Includes Services & Food, About, Passenger Vault, Ops Console) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1 ${
                  isMoreActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
                {isMoreActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fade-in space-y-1">
                  {/* Services & Food */}
                  <button
                    onClick={() => {
                      setActiveTab('station-services');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === 'station-services'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                    <div className="text-left">
                      <div>Services & Food</div>
                      <div className="text-[10px] text-slate-500 font-normal">Lounges, pods & e-catering</div>
                    </div>
                  </button>

                  {/* About RailEase (Dedicated for Tannu) */}
                  <button
                    onClick={() => {
                      setActiveTab('about');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      activeTab === 'about'
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                    <div className="text-left">
                      <div className="flex items-center space-x-1.5">
                        <span>About RailEase</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 font-extrabold">
                          Made for Tannu ❤️
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal">Our vision & dedication</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                  {/* Master Passenger Vault */}
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

                  {/* Operations Console */}
                  <button
                    onClick={() => {
                      setActiveTab('admin');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
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

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800"></div>

                  {/* Helpline */}
                  <div className="px-3 py-1.5 text-[11px] text-slate-500 flex items-center space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>RailMadad Helpline: <strong>139</strong></span>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Cluster: Cleanly Prioritized (Tatkal Turbo = Single Highlight Button) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* FastPay Wallet Balance: Clean Plain Text Next to Wallet Icon */}
            <div
              className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 select-none"
              title="FastPay Auto-Auth Balance"
            >
              <Wallet className="w-4 h-4 text-emerald-500" />
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>

            {/* My Bookings: Simple Minimal Ticket Icon Button with Counter Badge */}
            <button
              onClick={() => setActiveTab('my-bookings')}
              aria-label="My Bookings"
              title={`My Bookings (${bookings.length})`}
              className={`relative p-2 rounded-xl transition-colors ${
                activeTab === 'my-bookings'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Ticket className="w-4.5 h-4.5" />
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[17px] h-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                  {bookings.length}
                </span>
              )}
            </button>

            {/* Tatkal Turbo: The Single Highlighted Accent Button */}
            <button
              onClick={toggleTatkalAutoAuth}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                tatkalAutoAuth
                  ? 'bg-amber-500 text-white shadow-amber-500/30 ring-2 ring-amber-400/40 hover:bg-amber-600'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/20'
              }`}
              title="15-Second Express Checkout Mode"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white" />
              <span>Tatkal Turbo</span>
              {tatkalAutoAuth && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
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
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-1.5 shadow-xl animate-fade-in">
          {primaryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <span>{tab.label}</span>
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
              setActiveTab('station-services');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'station-services'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
            <span>Services & Food</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('passengers');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
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
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'admin'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>Operations Console</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'about'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              <span>About RailEase</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white">
              Made for Tannu ❤️
            </span>
          </button>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs px-2 text-slate-500">
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
