# 🚇 Metro Smart Scheduler — AI-Powered Train Induction & Scheduling System

> An intelligent dashboard for Kochi Metro Rail Limited (KMRL) that automates train induction decisions, optimizes scheduling using real-time demand data, and provides operational insights through an AI-driven analytics layer.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](./LICENSE)

---

## 📌 Overview

KMRL Smart Scheduler is a full-featured operational dashboard designed to solve the **train induction problem** in urban metro systems. Metro operations teams manually decide how many trains to deploy and at what intervals — a process that's reactive, inefficient, and dependent on operator intuition.

This system replaces that guesswork with:
- **AI-generated induction recommendations** based on demand signals
- **Live schedule visualization** across all active routes
- **Demand analytics** with time-of-day and route-level breakdowns
- **Operational KPI tracking** in a centralized control-room-style UI

Built specifically for the Kochi Metro Rail (KMRL) network with real station data and route configurations.

---

## 🖥️ Live Demo

**[→ View Live Dashboard]()**

---

## ✨ Features

### 🤖 AI Train Induction Engine
- Analyzes passenger demand patterns to recommend the optimal number of active trains
- Considers peak/off-peak hours, route-specific load factors, and headway constraints
- Visual confidence indicators for each AI-generated recommendation

### 📅 Smart Schedule Management
- Real-time schedule view for all active metro routes
- Departure/arrival timeline across stations
- Train status tracking (active, delayed, maintenance)
- Manual override capability with audit trail

### 📊 Demand Analytics Dashboard
- Hourly and daily ridership trend charts
- Station-level demand heatmap
- Route utilization percentages
- Comparison against historical baselines

### 🗺️ Route & Station Configuration
- Full KMRL network — all stations and lines
- Route editor for schedule adjustments
- Station metadata (interchange, capacity, accessibility)

### 🔔 Operational Alerts
- System-generated alerts for schedule deviations
- Low-demand / high-demand trigger notifications
- Maintenance window integration

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Charts** | Recharts |
| **State** | React Query + Context API |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |
| **Linting** | ESLint + TypeScript ESLint |

---

## 📁 Project Structure

```
metro-schedule-smart/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── dashboard/        # KPI cards, summary panels
│   │   ├── schedule/         # Schedule table + timeline views
│   │   ├── analytics/        # Charts and demand graphs
│   │   ├── induction/        # AI recommendation UI
│   │   └── ui/               # shadcn/ui base components
│   ├── pages/
│   │   ├── Dashboard.tsx     # Main operational view
│   │   ├── Schedule.tsx      # Schedule management
│   │   ├── Analytics.tsx     # Demand analytics
│   │   └── Settings.tsx      # System configuration
│   ├── lib/
│   │   ├── data/             # KMRL station + route data
│   │   ├── utils.ts          # Helper functions
│   │   └── types.ts          # TypeScript interfaces
│   ├── hooks/                # Custom React hooks
│   └── main.tsx
├── components.json           # shadcn/ui config
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/NITHISH-2006/metro-schedule-smart.git

# Navigate into the project
cd metro-schedule-smart

# Install dependencies
npm install
# or if using bun
bun install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📸 Screenshots

| Dashboard | Schedule View | Analytics |
|---|---|---|
| *(Add screenshot)* | *(Add screenshot)* | *(Add screenshot)* |

> **Tip:** Take screenshots using your browser's full-page capture and drop them into a `/docs/screenshots/` folder, then reference them above.

---

## 🧠 System Design

```
┌─────────────────────────────────────────────┐
│              KMRL Smart Scheduler            │
├──────────────┬──────────────┬───────────────┤
│  AI Induction│   Schedule   │   Analytics   │
│    Engine    │   Manager    │   Dashboard   │
├──────────────┴──────────────┴───────────────┤
│           Core Data Layer                    │
│   Station Data · Route Config · Schedules   │
└─────────────────────────────────────────────┘
```

The AI induction engine uses a **rule-based demand model** that maps time slots and station load factors to optimal fleet deployment counts. Future versions can plug in an ML model trained on historical KMRL ridership data (available via KMRL open data portal).

---

## 🗺️ KMRL Network Coverage

The dashboard covers the full Kochi Metro network:
- **Blue Line** — Aluva to Thrippunithura (26 stations, 25.6 km)
- **Purple Line** *(planned)* — JLN Stadium to Infopark

Station data includes interchange markers, accessibility flags, and peak load estimates based on publicly available ridership reports.

---

## 📈 Roadmap

- [ ] Real-time GTFS feed integration
- [ ] ML-based demand forecasting model (replace rule engine)
- [ ] Passenger count API integration via station sensors
- [ ] Multi-operator support (extend beyond KMRL)
- [ ] Mobile-responsive control view for field operators
- [ ] Alert notification via SMS / email

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git commit -m "feat: add your feature description"

# Push and open a PR
git push origin feature/your-feature-name
```

---

## 👤 Author

**Nithish Chandrasekaran**
- GitHub: [@NITHISH-2006](https://github.com/NITHISH-2006)
- LinkedIn: [nithish-chandrasekaran](https://linkedin.com/in/nithish-chandrasekaran/)

---

## 📄 License

[MIT](./LICENSE) — feel free to use, modify, and distribute.

---

<p align="center">Built with ❤️ for smarter urban transit operations</p>
