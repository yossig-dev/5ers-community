export type Badge = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type User = {
  id: string;
  username: string;
  avatar: string;
  badges: Badge[];
  verified: boolean;
};

export type Post = {
  id: string;
  user: User;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  user: User;
  gainPercent: number;
  profitFactor: number;
  totalProfit: number;
};

export type ChatMessage = {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  channel: string;
};

export type Channel = {
  id: string;
  name: string;
  icon: string;
  unread?: number;
};

// Mock Badges
export const BADGES: Record<string, Badge> = {
  funded: {
    id: "funded",
    name: "Funded Trader",
    icon: "🏆",
    color: "text-yellow-400",
  },
  club100k: {
    id: "club100k",
    name: "100k Club",
    icon: "💎",
    color: "text-blue-400",
  },
  topTrader: {
    id: "topTrader",
    name: "Top Trader",
    icon: "⭐",
    color: "text-purple-400",
  },
  goldExpert: {
    id: "goldExpert",
    name: "Gold Expert",
    icon: "🥇",
    color: "text-amber-400",
  },
  earlySupporter: {
    id: "earlySupporter",
    name: "Early Supporter",
    icon: "🚀",
    color: "text-green-400",
  },
};

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "TradeKing",
    avatar: "👑",
    badges: [BADGES.funded, BADGES.club100k],
    verified: true,
  },
  {
    id: "2",
    username: "GoldRush_88",
    avatar: "⚡",
    badges: [BADGES.goldExpert, BADGES.funded],
    verified: true,
  },
  {
    id: "3",
    username: "ProTrader_X",
    avatar: "🎯",
    badges: [BADGES.topTrader],
    verified: false,
  },
  {
    id: "4",
    username: "ForexNinja",
    avatar: "🥷",
    badges: [BADGES.funded, BADGES.earlySupporter],
    verified: true,
  },
  {
    id: "5",
    username: "ChartMaster",
    avatar: "📈",
    badges: [BADGES.funded],
    verified: false,
  },
  {
    id: "6",
    username: "SwingTrader_99",
    avatar: "🔥",
    badges: [BADGES.topTrader, BADGES.club100k],
    verified: true,
  },
  {
    id: "7",
    username: "DayTradeQueen",
    avatar: "👸",
    badges: [BADGES.funded, BADGES.goldExpert],
    verified: true,
  },
  {
    id: "8",
    username: "AlgoWizard",
    avatar: "🧙",
    badges: [BADGES.earlySupporter],
    verified: false,
  },
];

// Mock Posts
export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    user: MOCK_USERS[0],
    content:
      "Just closed a massive Gold trade! +$8,450 in 45 minutes. The key was waiting for the London open breakout. Patience pays! 🚀📈",
    timestamp: new Date(Date.now() - 15 * 60000),
    likes: 234,
    comments: 45,
    shares: 12,
  },
  {
    id: "2",
    user: MOCK_USERS[1],
    content:
      "My XAU/USD setup for today: Long @ 2050, TP @ 2065, SL @ 2045. Risk:Reward is 3:1. Let's see how this plays out! 💰",
    timestamp: new Date(Date.now() - 120 * 60000),
    likes: 156,
    comments: 28,
    shares: 8,
  },
  {
    id: "3",
    user: MOCK_USERS[3],
    content:
      "Passed my evaluation! 🎉 After 3 attempts, finally got funded with a $100k account. The journey was tough but worth it. Tips for beginners: stick to your plan and manage risk religiously.",
    timestamp: new Date(Date.now() - 180 * 60000),
    likes: 512,
    comments: 89,
    shares: 34,
  },
  {
    id: "4",
    user: MOCK_USERS[2],
    content:
      "EUR/USD consolidating nicely. Looking for a breakout above 1.0950 for a long position. Anyone else watching this pair?",
    timestamp: new Date(Date.now() - 240 * 60000),
    likes: 87,
    comments: 19,
    shares: 5,
  },
  {
    id: "5",
    user: MOCK_USERS[6],
    content:
      "Weekly recap: +$12,340 (+15.4%). My best trades were on Gold and NAS100. Key lesson: trading less = making more. Quality over quantity every time. 📊✨",
    timestamp: new Date(Date.now() - 300 * 60000),
    likes: 423,
    comments: 67,
    shares: 28,
  },
];

// Mock Leaderboard
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    user: MOCK_USERS[0],
    gainPercent: 47.8,
    profitFactor: 3.2,
    totalProfit: 47800,
  },
  {
    rank: 2,
    user: MOCK_USERS[6],
    gainPercent: 42.3,
    profitFactor: 2.9,
    totalProfit: 42300,
  },
  {
    rank: 3,
    user: MOCK_USERS[5],
    gainPercent: 38.9,
    profitFactor: 2.7,
    totalProfit: 38900,
  },
  {
    rank: 4,
    user: MOCK_USERS[1],
    gainPercent: 35.2,
    profitFactor: 2.5,
    totalProfit: 35200,
  },
  {
    rank: 5,
    user: MOCK_USERS[3],
    gainPercent: 31.7,
    profitFactor: 2.3,
    totalProfit: 31700,
  },
  {
    rank: 6,
    user: MOCK_USERS[4],
    gainPercent: 28.4,
    profitFactor: 2.1,
    totalProfit: 28400,
  },
  {
    rank: 7,
    user: MOCK_USERS[2],
    gainPercent: 25.6,
    profitFactor: 2.0,
    totalProfit: 25600,
  },
  {
    rank: 8,
    user: MOCK_USERS[7],
    gainPercent: 22.1,
    profitFactor: 1.9,
    totalProfit: 22100,
  },
];

// Mock Chat Messages
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    user: MOCK_USERS[1],
    content: "Anyone trading Gold right now? Looks bullish!",
    timestamp: new Date(Date.now() - 5 * 60000),
    channel: "gold-traders",
  },
  {
    id: "2",
    user: MOCK_USERS[0],
    content: "Yeah, I'm long from 2050. Target is 2065.",
    timestamp: new Date(Date.now() - 4 * 60000),
    channel: "gold-traders",
  },
  {
    id: "3",
    user: MOCK_USERS[3],
    content: "Good morning traders! Let's make it a profitable day! 🚀",
    timestamp: new Date(Date.now() - 10 * 60000),
    channel: "general",
  },
  {
    id: "4",
    user: MOCK_USERS[4],
    content: "Can someone explain what profit factor means?",
    timestamp: new Date(Date.now() - 15 * 60000),
    channel: "help",
  },
  {
    id: "5",
    user: MOCK_USERS[6],
    content: "Profit factor = Gross profit / Gross loss. Above 2 is good!",
    timestamp: new Date(Date.now() - 14 * 60000),
    channel: "help",
  },
];

// Mock Channels
export const MOCK_CHANNELS: Channel[] = [
  {
    id: "general",
    name: "General",
    icon: "💬",
    unread: 3,
  },
  {
    id: "gold-traders",
    name: "Gold Traders",
    icon: "🥇",
    unread: 7,
  },
  {
    id: "help",
    name: "Help",
    icon: "❓",
  },
  {
    id: "announcements",
    name: "Announcements",
    icon: "📢",
  },
  {
    id: "strategies",
    name: "Strategies",
    icon: "📊",
    unread: 2,
  },
];
