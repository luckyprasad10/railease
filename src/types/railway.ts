export type CoachClass = '1A' | '2A' | '3A' | '3E' | 'SL' | 'CC' | 'EC' | '2S';

export type QuotaType = 'GN' | 'TQ' | 'PT' | 'LD' | 'SS' | 'DP';

export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  junction: boolean;
  platforms: number;
}

export interface SeatAvailability {
  classCode: CoachClass;
  className: string;
  status: 'AVAILABLE' | 'RAC' | 'WAITLIST';
  count: number;
  fare: number;
  tatkalFare: number;
  confirmationProbability: number; // 0 - 100%
  updatedMinsAgo: number;
}

export interface TrainStop {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltMinutes: number;
  distanceKm: number;
  day: number;
  platformPredicted: number;
  platformConfirmed: boolean;
}

export interface Train {
  number: string;
  name: string;
  type: 'Vande Bharat' | 'Rajdhani Express' | 'Shatabdi Express' | 'Superfast Express' | 'Tejas Express';
  fromStation: string; // Station code
  toStation: string;   // Station code
  departureTime: string;
  arrivalTime: string;
  duration: string;
  runsOn: string[]; // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  punctualityScore: number; // e.g. 96 (%)
  pantryAvailable: boolean;
  cleanMyCoach: boolean;
  freeWifi: boolean;
  classes: SeatAvailability[];
  stops: TrainStop[];
}

export type BerthPreference = 'NO_PREF' | 'LOWER' | 'MIDDLE' | 'UPPER' | 'SIDE_LOWER' | 'SIDE_UPPER';
export type FoodPreference = 'VEG' | 'NON_VEG' | 'JAIN' | 'NONE';

export interface MasterPassenger {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  berthPreference: BerthPreference;
  foodPreference: FoodPreference;
  seniorCitizen: boolean;
  idCardNumber?: string;
}

export interface AllocatedPassenger extends MasterPassenger {
  coach: string;
  berthNumber: number;
  berthType: string;
  status: 'CONFIRMED' | 'RAC' | 'WL';
  statusDetails: string;
}

export interface RefundStatus {
  amount: number;
  initiatedAt: string;
  status: 'PENDING' | 'PROCESSED' | 'CREDITED';
  refId: string;
  method: string;
  expectedBy: string;
}

export interface AddonServices {
  travelInsurance: boolean;
  freeCancellation: boolean;
  coolieBooking: boolean;
  coolieBags: number;
  loungeAccess: boolean;
  mealPreOrder: boolean;
  selectedMeal?: string;
}

export interface Booking {
  pnr: string;
  trainNumber: string;
  trainName: string;
  fromStation: string;
  fromStationName: string;
  toStation: string;
  toStationName: string;
  journeyDate: string;
  coachClass: CoachClass;
  quota: QuotaType;
  passengers: AllocatedPassenger[];
  baseFare: number;
  addonsFare: number;
  totalFare: number;
  status: 'CONFIRMED' | 'RAC' | 'WAITLISTED' | 'CANCELLED';
  chartStatus: 'PREPARED' | 'NOT_PREPARED';
  paymentMethod: 'UPI' | 'NET_BANKING' | 'CARD' | 'RAILEASE_FASTPAY';
  bookedAt: string;
  addons: AddonServices;
  refundStatus?: RefundStatus;
}

export interface LiveStationHalt {
  stationCode: string;
  stationName: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  actualArrival: string;
  actualDeparture: string;
  delayArrivalMinutes: number;
  delayDepartureMinutes: number;
  platform: number;
  platformConfirmed: boolean;
  status: 'PASSED' | 'CURRENT' | 'UPCOMING';
  distanceKm: number;
}

export interface LiveTrainStatusData {
  trainNumber: string;
  trainName: string;
  currentStationCode: string;
  currentStationName: string;
  nextStationCode: string;
  nextStationName: string;
  speedKmH: number;
  delayMinutes: number;
  statusText: string;
  lastUpdated: string;
  halts: LiveStationHalt[];
}

export interface AdminBroadcast {
  id: string;
  trainNumber: string;
  title: string;
  message: string;
  type: 'DELAY' | 'PLATFORM_CHANGE' | 'ROUTE_DIVERSION' | 'CANCELLATION';
  timestamp: string;
  sentCount: number;
}
