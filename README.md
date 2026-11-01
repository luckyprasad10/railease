# RailEase | Next-Gen Indian Railway Management & Booking Platform

**RailEase** is a high-performance, resilient Indian Railway Management web application engineered to eliminate legacy booking friction, Tatkal concurrency delays, ambiguous waitlists, and fragmented station services.

---

## 🌟 Key Features

1. **Tatkal Turbo Mode (15-Second Express Checkout)**:
   - Pre-saved Master Passenger List vault with 1-click import.
   - FastPay wallet auto-authorization bypassing OTP/3D-Secure payment latency.
2. **Clean Search & Side-by-Side Class Matrix**:
   - Compares seat availability across all classes (`1A`, `2A`, `3A`, `3E`, `SL`, `CC`, `EC`) with green (AVL), amber (RAC), and red (WL) badges.
   - Quotas: General (GN), Tatkal (TQ), Premium Tatkal (PT), Ladies (LD), Senior Citizen (SS), Divyangjan (DP).
3. **Ambiguous Waitlist & PNR Intelligence**:
   - 4-stage booking progression pipeline (Booking Confirmed -> Quota Assigned -> Charting -> Coach & Berth).
   - Historical AI waitlist confirmation probability estimator.
   - 100% instant refund status tracker with UPI reference ID.
4. **Live Train Status & Platform Predictor**:
   - Real-time GPS telemetry with speedometer (km/h) and delay tracking.
   - Platform prediction with confidence badges (95%+ accuracy).
   - Clean My Coach on-board housekeeping request generator.
5. **Station Services & Amenities**:
   - Fixed-tariff Sahayak (Coolie) porter pre-booking with OTP verification.
   - IRCTC Executive Lounge and AC Pod Hotel booking.
   - Rail-Dine e-catering hot meal delivery to berth.
6. **Station Master & Admin Ops Console**:
   - Live train delay simulator and platform track changer.
   - Dynamic coach quota inventory injector (release Emergency Quota seats).
   - Passenger SMS / Push notification dispatcher.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 18 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS + Custom Railway Theme
- **State Management**: Zustand with persistent storage
- **Icons & Visuals**: Lucide React + Canvas Confetti
- **Netlify Ready**: Configured with `public/_redirects` (`/* /index.html 200`) for Single-Page Application routing.

---

## 🚀 Getting Started

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Compile TypeScript and bundle Vite
npm run build
```

### Netlify Deployment
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- The `_redirects` file is automatically placed in `dist/` ensuring client-side routes never trigger 404s.
