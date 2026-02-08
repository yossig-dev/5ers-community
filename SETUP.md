# Prop Firm Demo - Setup Guide

## Prerequisites

You need to install Node.js (v18 or higher) before running this project:

1. Download Node.js from: https://nodejs.org/
2. Install it following the installer instructions
3. Verify installation by opening a new terminal and running:
   ```bash
   node --version
   npm --version
   ```

## Installation Steps

Once Node.js is installed, follow these steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with dark mode
│   ├── page.tsx            # Main dashboard with navigation
│   └── globals.css         # Global styles & glassmorphism
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── community-feed.tsx  # Community wall with posts
│   ├── leaderboard.tsx     # Top traders rankings
│   ├── chat-sidebar.tsx    # Live chat with channels
│   └── user-profile.tsx    # User profile & achievements
├── lib/
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # Mock data (users, posts, etc.)
└── public/                 # Static assets
```

## Features Implemented

### ✅ Community Feed
- Post creation interface
- Like, Comment, Share functionality
- User avatars with badges
- Verified user checkmarks
- Real-time engagement stats
- Expandable comments section
- Filter tabs (All, Following, Trending, Recent)

### ✅ Trader Leaderboard
- Top 8 performers ranking
- Medal icons for top 3 positions
- Stats: Rank, Gain %, Profit Factor, Total Profit
- Animated entry transitions
- Overview stats cards
- Color-coded profit factors

### ✅ Live Chat Sidebar
- Multiple channels (#General, #Gold-Traders, #Help, etc.)
- Unread message badges
- Real-time message display
- Message input with send button
- Responsive: Collapsible on mobile
- Channel switching with smooth transitions

### ✅ User Profiles
- Avatar with gradient background
- Badge showcase (Funded Trader, 100k Club, etc.)
- Stats: Posts, Followers, Following
- Performance metrics (Gain %, Total Profit, Win Rate, Ranking)
- Achievement badges grid
- Recent activity timeline

## Design Features

### 🎨 Dark Theme
- Deep charcoal background (`bg-slate-950`)
- Slate gray cards and borders
- Success Green (`#10b981`) for profit metrics
- Glassmorphism effects on cards

### ✨ Animations
- Framer Motion page transitions
- Smooth tab switching
- Hover effects on cards and buttons
- Animated rankings and stats
- Like button animation

### 📱 Responsive Design
- Mobile-first approach
- Collapsible navigation sidebar
- Floating chat toggle on mobile
- Responsive grid layouts
- Touch-friendly interactions

## Mock Data

All data is stored in `lib/constants.ts`:
- 8 mock users with badges
- 5 community posts
- 8 leaderboard entries
- 5 chat messages
- 5 chat channels

You can easily modify this data to populate the demo with different content.

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
success: {
  DEFAULT: "#10b981",  // Main success color
  light: "#34d399",
  dark: "#059669",
}
```

### Add More Mock Data
Edit `lib/constants.ts` to add more:
- Users
- Posts
- Leaderboard entries
- Chat messages
- Channels

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Port Already in Use
If port 3000 is in use, Next.js will automatically try the next available port.

### Styling Not Loading
Make sure you run `npm install` first to install Tailwind CSS and dependencies.

### TypeScript Errors
The project uses strict TypeScript. All types are defined in `lib/constants.ts`.

## Next Steps for Development

1. **Add Authentication**: Integrate with a backend API
2. **Real-time Updates**: Add WebSocket support for live chat
3. **Database Integration**: Connect to a database for persistent data
4. **Image Upload**: Add functionality to upload trade screenshots
5. **Notifications**: Implement real notification system
6. **Search**: Add search functionality for posts and users

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Support

For questions or issues, refer to the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
