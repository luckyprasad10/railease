import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { TrainList } from './components/TrainList';
import { PNRTracker } from './components/PNRTracker';
import { LiveTrainStatus } from './components/LiveTrainStatus';
import { MasterPassengerList } from './components/MasterPassengerList';
import { StationServices } from './components/StationServices';
import { AdminPortal } from './components/AdminPortal';
import { MyBookings } from './components/MyBookings';
import { BookingModal } from './components/BookingModal';
import { TicketViewModal } from './components/TicketViewModal';
import { Footer } from './components/Footer';
import { useRailwayStore } from './store/useRailwayStore';

export function App() {
  const {
    activeTab,
    darkMode,
    confirmedTicket,
    setConfirmedTicket,
  } = useRailwayStore();

  // Initialize theme class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeTab === 'search' && (
          <>
            <HeroSearch />
            <TrainList />
          </>
        )}

        {activeTab === 'pnr' && <PNRTracker />}

        {activeTab === 'live' && <LiveTrainStatus />}

        {activeTab === 'passengers' && <MasterPassengerList />}

        {activeTab === 'station-services' && <StationServices />}

        {activeTab === 'admin' && <AdminPortal />}

        {activeTab === 'my-bookings' && <MyBookings />}
      </main>

      {/* Active Modals */}
      <BookingModal />

      {/* Confirmed E-Ticket Slip Modal */}
      {confirmedTicket && (
        <TicketViewModal
          ticket={confirmedTicket}
          onClose={() => setConfirmedTicket(null)}
        />
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
