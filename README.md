# Prop Firm Demo Environment

A modern, high-performance dashboard for showcasing community features and user interaction ideas for a proprietary trading firm.

## Features

- **Community Feed**: Central "Wall" where traders post updates, trade ideas, and screenshots with Like, Comment, and Share functionality
- **Trader Leaderboard**: Top performers table with Rank, Username, Gain %, and Profit Factor
- **Live Chat Sidebar**: Real-time community chat with channel switching (#General, #Gold-Traders, #Help)
- **User Profiles**: Community view of traders showing badges (Funded Trader, 100k Club) and recent activity

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (Dark mode with fintech palette)
- **Shadcn UI** components
- **Lucide React** icons
- **Framer Motion** for smooth transitions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Before deploying

**Verification runs automatically when you push** (Git pre-push hook). It runs `npm run build:verify`, which cleans `.next`, does a full production build, and starts the server briefly to catch runtime errors (e.g. `Cannot find module './611.js'` or `vendor-chunks/next.js`). If the hook fails, fix the errors and push again.

To run manually: `npm run build:verify`. If you see module-not-found in production: `rm -rf .next` (Windows: `rmdir /s /q .next`), then `npm run build`. CI runs `build:verify` on push to `main`/`master` and on PRs.

## Design Aesthetic

- **Theme**: Dark mode by default
- **Colors**: Deep charcoals, slate grays, and Success Green (#10b981) for profit metrics
- **Feel**: Professional, data-heavy but clean, with glassmorphism effects

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with sidebar
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── community-feed.tsx
│   ├── leaderboard.tsx
│   ├── chat-sidebar.tsx
│   └── user-profile.tsx
├── lib/                   # Utility functions
│   ├── utils.ts
│   └── constants.ts      # Mock data
└── public/               # Static assets
```
