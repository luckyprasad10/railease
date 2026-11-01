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
  Star,
  Coffee,
  ArrowRight,
  Sparkles,
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
  const [foodMegaMenuOpen, setFoodMegaMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const foodMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const foodHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (foodMenuRef.current && !foodMenuRef.current.contains(target)) {
        setFoodMegaMenuOpen(false);
      }
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Safe hover handlers for rich mega-menu
  const handleFoodMouseEnter = () => {
    if (foodHoverTimeoutRef.current) clearTimeout(foodHoverTimeoutRef.current);
    setFoodMegaMenuOpen(true);
  };

  const handleFoodMouseLeave = () => {
    foodHoverTimeoutRef.current = setTimeout(() => {
      setFoodMegaMenuOpen(false);
    }, 200);
  };

  // Primary clean text links
  const primaryTabs: { id: ActiveTab; label: string; isLive?: boolean }[] = [
    { id: 'search', label: 'Book Trains' },
    { id: 'pnr', label: 'PNR Status' },
    { id: 'live', label: 'Live Tracker', isLive: true },
  ];

  const isMoreActive = ['passengers', 'admin'].includes(activeTab);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4 sm:gap-6">
          {/* 1. Left: Refined Brand Logo (Proportionally Balanced & Vertically Centered) */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-2.5 cursor-pointer select-none group flex-shrink-0"
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

          {/* 2. Center: Decluttered Main Navigation Links (Clean text, smooth underline, breathing room) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            {/* Primary Nav Links: Book Trains, PNR Status, Live Tracker */}
            {primaryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFoodMegaMenuOpen(false);
                    setMoreDropdownOpen(false);
                  }}
                  className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}

            {/* Rich "Services & Food" Link with Visual Mega-Menu */}
            <div
              className="relative"
              ref={foodMenuRef}
              onMouseEnter={handleFoodMouseEnter}
              onMouseLeave={handleFoodMouseLeave}
            >
              <button
                onClick={() => {
                  setFoodMegaMenuOpen(!foodMegaMenuOpen);
                  setMoreDropdownOpen(false);
                }}
                className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'station-services' || foodMegaMenuOpen
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Services & Food</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    foodMegaMenuOpen ? 'rotate-180' : ''
                  }`}
                />
                {activeTab === 'station-services' && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </button>

              {/* Rich Food Mega-Menu Dropdown */}
              {foodMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[550px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl p-5 z-50 animate-fade-in">
                  {/* Mega-menu Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <UtensilsCrossed className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Rail-Dine Seat Delivery & Catering
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          Fresh hot meals from IRCTC partner restaurants directly to your berth
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Seat Delivery</span>
                    </span>
                  </div>

                  {/* Food Thumbnails Grid (Rich Images) */}
                  <div className="grid grid-cols-3 gap-3 py-3.5">
                    {/* Item 1: Hyderabadi Dum Biryani */}
                    <div
                      onClick={() => {
                        setActiveTab('station-services');
                        setFoodMegaMenuOpen(false);
                      }}
                      className="group cursor-pointer rounded-2xl p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-700/60 text-center"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-xs">
                        <img
                          src="/images/food/biryani.jpg"
                          alt="Hyderabadi Dum Biryani"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white flex items-center space-x-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>4.8</span>
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Dum Biryani
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        Haldiram's • Veg/Chicken
                      </div>
                      <div className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        from ₹189
                      </div>
                    </div>

                    {/* Item 2: Royal Deluxe Thali */}
                    <div
                      onClick={() => {
                        setActiveTab('station-services');
                        setFoodMegaMenuOpen(false);
                      }}
                      className="group cursor-pointer rounded-2xl p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-700/60 text-center"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-xs">
                        <img
                          src="/images/food/thali.jpg"
                          alt="Royal Deluxe Indian Thali"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white flex items-center space-x-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>4.9</span>
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Royal Thali
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        Paneer, Dal & Naan
                      </div>
                      <div className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        from ₹229
                      </div>
                    </div>

                    {/* Item 3: Samosas & Masala Chai */}
                    <div
                      onClick={() => {
                        setActiveTab('station-services');
                        setFoodMegaMenuOpen(false);
                      }}
                      className="group cursor-pointer rounded-2xl p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/60 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-700/60 text-center"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-xs">
                        <img
                          src="/images/food/snacks.jpg"
                          alt="Hot Samosa and Masala Cutting Chai"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[9px] font-bold text-white flex items-center space-x-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>4.7</span>
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        Chai & Snacks
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        Crispy Samosa Combo
                      </div>
                      <div className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
                        from ₹79
                      </div>
                    </div>
                  </div>

                  {/* Mega-menu Footer & Station Amenities Strip */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      <span className="flex items-center space-x-1">
                        <Coffee className="w-3.5 h-3.5 text-blue-500" />
                        <span>Executive Lounges & Pods</span>
                      </span>
                      <span>•</span>
                      <span>Sahayak Porter Booking</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('station-services');
                        setFoodMegaMenuOpen(false);
                      }}
                      className="inline-flex items-center space-x-1 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 text-xs"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct "About" Link with Subtle "Made for Tannu" Floating Badge */}
            <button
              onClick={() => {
                setActiveTab('about');
                setFoodMegaMenuOpen(false);
                setMoreDropdownOpen(false);
              }}
              className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'about'
                  ? 'text-rose-600 dark:text-rose-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
              }`}
            >
              <span>About</span>
              {/* Subtle Floating Dedication Badge that preserves layout */}
              <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500/10 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300 border border-rose-300/40 dark:border-rose-800/60 leading-none">
                <span>Made for Tannu</span>
                <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
              </span>
              {activeTab === 'about' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-rose-500 rounded-full animate-fade-in" />
              )}
            </button>

            {/* Secondary "More" Menu for Admin & Passenger Vault */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                onClick={() => {
                  setMoreDropdownOpen(!moreDropdownOpen);
                  setFoodMegaMenuOpen(false);
                }}
                className={`relative py-1 text-sm font-semibold transition-colors flex items-center space-x-1 ${
                  isMoreActive
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
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
                <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-fade-in space-y-1">
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

          {/* 3. Right: Prioritized Clean Actions (FastPay Plain Text, Sleek Ticket Icon, Single Highlighted Tatkal Button) */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            {/* FastPay Wallet: Clean Text Next to Wallet Icon */}
            <div
              className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-400 select-none"
              title="FastPay Auto-Auth Balance"
            >
              <Wallet className="w-4 h-4 text-emerald-500" />
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>

            {/* My Bookings: Sleek Minimal Ticket Icon Button with Counter Badge */}
            <button
              onClick={() => {
                setActiveTab('my-bookings');
                setFoodMegaMenuOpen(false);
                setMoreDropdownOpen(false);
              }}
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

            {/* Tatkal Turbo: The Single Highlighted Primary Accent Button */}
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
