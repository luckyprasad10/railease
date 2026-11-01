import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Train,
  CoachClass,
  QuotaType,
  MasterPassenger,
  Booking,
  LiveTrainStatusData,
  AdminBroadcast,
  AllocatedPassenger,
} from '../types/railway';
import {
  INITIAL_TRAINS,
  INITIAL_MASTER_PASSENGERS,
  INITIAL_BOOKINGS,
  MOCK_LIVE_STATUS,
} from '../data/mockData';

export type ActiveTab = 'search' | 'pnr' | 'live' | 'passengers' | 'station-services' | 'admin' | 'my-bookings';

interface RailwayState {
  // Theme & Navigation
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Search Parameters
  fromStation: string;
  toStation: string;
  journeyDate: string;
  quota: QuotaType;
  selectedClass: CoachClass | 'ALL';
  setFromStation: (code: string) => void;
  setToStation: (code: string) => void;
  setJourneyDate: (date: string) => void;
  setQuota: (quota: QuotaType) => void;
  setSelectedClass: (coachClass: CoachClass | 'ALL') => void;
  swapStations: () => void;

  // Trains & Live Tracking
  trains: Train[];
  liveStatusMap: Record<string, LiveTrainStatusData>;
  updateTrainDelay: (trainNumber: string, delayMins: number, statusText: string) => void;
  updatePlatform: (trainNumber: string, stationCode: string, platform: number, confirmed: boolean) => void;
  updateSeatCount: (trainNumber: string, classCode: CoachClass, newCount: number, status: 'AVAILABLE' | 'RAC' | 'WAITLIST') => void;

  // Master Passenger List
  masterPassengers: MasterPassenger[];
  addMasterPassenger: (passenger: Omit<MasterPassenger, 'id'>) => void;
  updateMasterPassenger: (id: string, passenger: Partial<MasterPassenger>) => void;
  deleteMasterPassenger: (id: string) => void;

  // Booking Flow & Wallet
  bookings: Booking[];
  walletBalance: number;
  tatkalAutoAuth: boolean;
  toggleTatkalAutoAuth: () => void;
  topupWallet: (amount: number) => void;
  createBooking: (bookingData: Omit<Booking, 'pnr' | 'bookedAt'>) => Booking;
  cancelBooking: (pnr: string) => void;

  // Active Modals
  isBookingModalOpen: boolean;
  activeBookingTrain: Train | null;
  activeBookingClass: CoachClass | null;
  openBookingModal: (train: Train, coachClass: CoachClass) => void;
  closeBookingModal: () => void;

  confirmedTicket: Booking | null;
  setConfirmedTicket: (ticket: Booking | null) => void;

  // Admin Broadcasts
  broadcasts: AdminBroadcast[];
  dispatchBroadcast: (broadcast: Omit<AdminBroadcast, 'id' | 'timestamp' | 'sentCount'>) => void;

  // Active PNR or Train for quick navigation
  searchedPnr: string;
  setSearchedPnr: (pnr: string) => void;
  searchedTrainNum: string;
  setSearchedTrainNum: (trainNum: string) => void;
}

export const useRailwayStore = create<RailwayState>()(
  persist(
    (set, get) => ({
      // Theme & Navigation
      darkMode: false,
      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      activeTab: 'search',
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Default Search to NDLS -> BSB
      fromStation: 'NDLS',
      toStation: 'BSB',
      journeyDate: '2026-11-04',
      quota: 'GN',
      selectedClass: 'ALL',
      setFromStation: (code) => set({ fromStation: code }),
      setToStation: (code) => set({ toStation: code }),
      setJourneyDate: (date) => set({ journeyDate: date }),
      setQuota: (quota) => set({ quota }),
      setSelectedClass: (coachClass) => set({ selectedClass: coachClass }),
      swapStations: () =>
        set((state) => ({
          fromStation: state.toStation,
          toStation: state.fromStation,
        })),

      // Trains & Live Tracking
      trains: INITIAL_TRAINS,
      liveStatusMap: MOCK_LIVE_STATUS,

      updateTrainDelay: (trainNumber, delayMins, statusText) => {
        set((state) => {
          const updatedLive = { ...state.liveStatusMap };
          if (updatedLive[trainNumber]) {
            updatedLive[trainNumber] = {
              ...updatedLive[trainNumber],
              delayMinutes: delayMins,
              statusText: statusText || (delayMins === 0 ? 'Running On-Time' : `Delayed by ${delayMins} mins`),
              lastUpdated: 'Just now (Admin Dispatcher Update)',
            };
          }
          return { liveStatusMap: updatedLive };
        });
      },

      updatePlatform: (trainNumber, stationCode, platform, confirmed) => {
        set((state) => {
          const updatedTrains = state.trains.map((t) => {
            if (t.number === trainNumber) {
              return {
                ...t,
                stops: t.stops.map((s) =>
                  s.stationCode === stationCode
                    ? { ...s, platformPredicted: platform, platformConfirmed: confirmed }
                    : s
                ),
              };
            }
            return t;
          });

          const updatedLive = { ...state.liveStatusMap };
          if (updatedLive[trainNumber]) {
            updatedLive[trainNumber] = {
              ...updatedLive[trainNumber],
              halts: updatedLive[trainNumber].halts.map((h) =>
                h.stationCode === stationCode
                  ? { ...h, platform, platformConfirmed: confirmed }
                  : h
              ),
            };
          }

          return { trains: updatedTrains, liveStatusMap: updatedLive };
        });
      },

      updateSeatCount: (trainNumber, classCode, newCount, status) => {
        set((state) => ({
          trains: state.trains.map((t) => {
            if (t.number === trainNumber) {
              return {
                ...t,
                classes: t.classes.map((c) =>
                  c.classCode === classCode
                    ? { ...c, count: newCount, status, updatedMinsAgo: 0 }
                    : c
                ),
              };
            }
            return t;
          }),
        }));
      },

      // Master Passengers
      masterPassengers: INITIAL_MASTER_PASSENGERS,
      addMasterPassenger: (passenger) => {
        const newPassenger: MasterPassenger = {
          ...passenger,
          id: `mp-${Date.now()}`,
        };
        set((state) => ({
          masterPassengers: [...state.masterPassengers, newPassenger],
        }));
      },
      updateMasterPassenger: (id, updated) => {
        set((state) => ({
          masterPassengers: state.masterPassengers.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        }));
      },
      deleteMasterPassenger: (id) => {
        set((state) => ({
          masterPassengers: state.masterPassengers.filter((p) => p.id !== id),
        }));
      },

      // Bookings & Wallet
      bookings: INITIAL_BOOKINGS,
      walletBalance: 4250,
      tatkalAutoAuth: true,
      toggleTatkalAutoAuth: () =>
        set((state) => ({ tatkalAutoAuth: !state.tatkalAutoAuth })),
      topupWallet: (amount) =>
        set((state) => ({ walletBalance: state.walletBalance + amount })),

      createBooking: (bookingData) => {
        const pnr = `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        const bookedAt = new Date().toISOString();

        // Assign coaches & berths based on class
        const coachPrefix =
          bookingData.coachClass === '1A'
            ? 'H1'
            : bookingData.coachClass === '2A'
            ? 'A1'
            : bookingData.coachClass === '3A'
            ? 'B3'
            : bookingData.coachClass === '3E'
            ? 'M2'
            : bookingData.coachClass === 'CC'
            ? 'C3'
            : bookingData.coachClass === 'EC'
            ? 'E1'
            : 'S4';

        const allocatedPassengers: AllocatedPassenger[] = bookingData.passengers.map(
          (p, idx) => {
            const berthNo = Math.floor(1 + Math.random() * 64);
            const berthTypes = ['Lower Berth (LB)', 'Middle Berth (MB)', 'Upper Berth (UB)', 'Side Lower (SL)'];
            const assignedType =
              p.berthPreference === 'LOWER'
                ? 'Lower Berth (LB)'
                : p.berthPreference === 'UPPER'
                ? 'Upper Berth (UB)'
                : berthTypes[idx % berthTypes.length];

            return {
              ...p,
              coach: coachPrefix,
              berthNumber: berthNo,
              berthType: assignedType,
              status: 'CONFIRMED',
              statusDetails: `CNF / ${coachPrefix} / ${berthNo} [${assignedType.split(' ')[0]}]`,
            };
          }
        );

        const newBooking: Booking = {
          ...bookingData,
          pnr,
          bookedAt,
          status: 'CONFIRMED',
          chartStatus: 'PREPARED',
          passengers: allocatedPassengers,
        };

        // Deduct from wallet if FastPay
        if (bookingData.paymentMethod === 'RAILEASE_FASTPAY') {
          set((state) => ({
            walletBalance: Math.max(0, state.walletBalance - bookingData.totalFare),
          }));
        }

        set((state) => ({
          bookings: [newBooking, ...state.bookings],
          confirmedTicket: newBooking,
        }));

        return newBooking;
      },

      cancelBooking: (pnr) => {
        set((state) => {
          const booking = state.bookings.find((b) => b.pnr === pnr);
          if (!booking) return state;

          const refundAmt = booking.addons.freeCancellation
            ? booking.totalFare
            : Math.max(0, booking.totalFare - 180); // IRCTC standard deduction ₹180 if no free cancellation

          const updatedBookings: Booking[] = state.bookings.map((b) => {
            if (b.pnr === pnr) {
              return {
                ...b,
                status: 'CANCELLED' as const,
                passengers: b.passengers.map((p) => ({
                  ...p,
                  statusDetails: 'CANCELLED BY PASSENGER',
                })),
                refundStatus: {
                  amount: refundAmt,
                  initiatedAt: new Date().toISOString(),
                  status: 'CREDITED' as const,
                  refId: `UPI-REF-${Math.floor(10000000 + Math.random() * 90000000)}`,
                  method: 'Instant 100% RailEase Wallet / UPI Credit',
                  expectedBy: 'Instant Credit',
                },
              };
            }
            return b;
          });

          // Add refund to wallet balance
          return {
            bookings: updatedBookings,
            walletBalance: state.walletBalance + refundAmt,
          };
        });
      },

      // Modal Controls
      isBookingModalOpen: false,
      activeBookingTrain: null,
      activeBookingClass: null,
      openBookingModal: (train, coachClass) =>
        set({
          isBookingModalOpen: true,
          activeBookingTrain: train,
          activeBookingClass: coachClass,
        }),
      closeBookingModal: () =>
        set({
          isBookingModalOpen: false,
          activeBookingTrain: null,
          activeBookingClass: null,
        }),

      confirmedTicket: null,
      setConfirmedTicket: (ticket) => set({ confirmedTicket: ticket }),

      // Broadcasts
      broadcasts: [
        {
          id: 'bc-1',
          trainNumber: '12802',
          title: 'Fog Delay Advisory for Purushottam SF Express',
          message: 'Purushottam SF Express running late by 28 mins due to dense fog between Kanpur & Prayagraj.',
          type: 'DELAY',
          timestamp: '2026-11-01T04:30:00Z',
          sentCount: 1420,
        },
        {
          id: 'bc-2',
          trainNumber: '22436',
          title: 'Platform Confirmed for Vande Bharat Express',
          message: 'Train 22436 Vande Bharat will depart from Platform 16 at New Delhi station. Cleanliness inspection passed.',
          type: 'PLATFORM_CHANGE',
          timestamp: '2026-11-01T05:15:00Z',
          sentCount: 890,
        },
      ],
      dispatchBroadcast: (broadcast) => {
        const newBc: AdminBroadcast = {
          ...broadcast,
          id: `bc-${Date.now()}`,
          timestamp: new Date().toISOString(),
          sentCount: Math.floor(600 + Math.random() * 1200),
        };
        set((state) => ({
          broadcasts: [newBc, ...state.broadcasts],
        }));
      },

      searchedPnr: '',
      setSearchedPnr: (pnr) => set({ searchedPnr: pnr }),
      searchedTrainNum: '',
      setSearchedTrainNum: (trainNum) => set({ searchedTrainNum: trainNum }),
    }),
    {
      name: 'railease-storage',
      partialize: (state) => ({
        darkMode: state.darkMode,
        masterPassengers: state.masterPassengers,
        bookings: state.bookings,
        walletBalance: state.walletBalance,
        tatkalAutoAuth: state.tatkalAutoAuth,
      }),
    }
  )
);
