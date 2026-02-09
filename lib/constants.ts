export type Badge = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type TradingLevel = {
  id: string;
  name: string;
  title: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: string;
};

export type User = {
  id: string;
  username: string;
  avatar: string;
  badges: Badge[];
  verified: boolean;
  xp: number;
  level: TradingLevel;
};

export type TradingAccount = {
  id: string;
  name: string;
  balance: number;
  accountNumber: string;
  type: string;
};

export type TradeHistory = {
  id: string;
  accountId: string;
  symbol: string;
  time: Date;
  type: "buy" | "sell";
  volume: number;
  priceIn: number;
  priceOut: number;
  profit: number;
};

export type ChartData = {
  label: string;
  value: number;
  color?: string;
};

export type Post = {
  id: string;
  user: User;
  content: string;
  image?: string;
  chart?: {
    type: "line" | "bar";
    title: string;
    data: ChartData[];
  };
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

// Trading Levels System
export const TRADING_LEVELS: TradingLevel[] = [
  {
    id: "bronze",
    name: "Bronze",
    title: "Bronze Trader",
    minXP: 0,
    maxXP: 999,
    color: "text-amber-700",
    icon: "🥉",
  },
  {
    id: "silver",
    name: "Silver",
    title: "Silver Trader",
    minXP: 1000,
    maxXP: 2999,
    color: "text-slate-400",
    icon: "🥈",
  },
  {
    id: "gold",
    name: "Gold",
    title: "Gold Trader",
    minXP: 3000,
    maxXP: 5999,
    color: "text-yellow-500",
    icon: "🥇",
  },
  {
    id: "platinum",
    name: "Platinum",
    title: "Platinum Trader",
    minXP: 6000,
    maxXP: 9999,
    color: "text-cyan-400",
    icon: "💠",
  },
  {
    id: "diamond",
    name: "Diamond",
    title: "Diamond Trader",
    minXP: 10000,
    maxXP: 14999,
    color: "text-blue-400",
    icon: "💎",
  },
  {
    id: "master",
    name: "Master",
    title: "Master Trader",
    minXP: 15000,
    maxXP: 999999,
    color: "text-purple-500",
    icon: "👑",
  },
];

export function getLevelByXP(xp: number): TradingLevel {
  for (let i = TRADING_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= TRADING_LEVELS[i].minXP) {
      return TRADING_LEVELS[i];
    }
  }
  return TRADING_LEVELS[0];
}

export function getXPProgress(xp: number, level: TradingLevel): number {
  const xpInLevel = xp - level.minXP;
  const xpNeeded = level.maxXP - level.minXP;
  return (xpInLevel / xpNeeded) * 100;
}

// Mock Badges
export const BADGES: Record<string, Badge> = {
  funded: {
    id: "funded",
    name: "Funded Trader",
    icon: "💲",
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
  contest1st: {
    id: "contest1st",
    name: "Contest 1st Place",
    icon: "🏆",
    color: "text-yellow-500",
  },
};

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "TradeKing",
    avatar: "👑",
    badges: [BADGES.contest1st, BADGES.funded, BADGES.club100k],
    verified: true,
    xp: 8000,
    level: getLevelByXP(8000),
  },
  {
    id: "2",
    username: "GoldRush_88",
    avatar: "⚡",
    badges: [BADGES.goldExpert, BADGES.funded],
    verified: true,
    xp: 12300,
    level: getLevelByXP(12300),
  },
  {
    id: "3",
    username: "ProTrader_X",
    avatar: "🎯",
    badges: [BADGES.topTrader],
    verified: false,
    xp: 4200,
    level: getLevelByXP(4200),
  },
  {
    id: "4",
    username: "ForexNinja",
    avatar: "🥷",
    badges: [BADGES.funded, BADGES.earlySupporter],
    verified: true,
    xp: 8700,
    level: getLevelByXP(8700),
  },
  {
    id: "5",
    username: "ChartMaster",
    avatar: "📈",
    badges: [BADGES.funded],
    verified: false,
    xp: 2100,
    level: getLevelByXP(2100),
  },
  {
    id: "6",
    username: "SwingTrader_99",
    avatar: "🔥",
    badges: [BADGES.contest1st, BADGES.topTrader, BADGES.club100k],
    verified: true,
    xp: 14800,
    level: getLevelByXP(14800),
  },
  {
    id: "7",
    username: "DayTradeQueen",
    avatar: "👸",
    badges: [BADGES.funded, BADGES.goldExpert],
    verified: true,
    xp: 11200,
    level: getLevelByXP(11200),
  },
  {
    id: "8",
    username: "AlgoWizard",
    avatar: "🧙",
    badges: [BADGES.earlySupporter],
    verified: false,
    xp: 650,
    level: getLevelByXP(650),
  },
];

// Mock Posts
export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    user: MOCK_USERS[0],
    content:
      "Just closed a massive Gold trade! +$8,450 in 45 minutes. The key was waiting for the London open breakout. Patience pays! 🚀📈",
    chart: {
      type: "line",
      title: "XAU/USD - 1H Chart",
      data: [
        { label: "09:00", value: 2048 },
        { label: "10:00", value: 2051 },
        { label: "11:00", value: 2049 },
        { label: "12:00", value: 2053 },
        { label: "13:00", value: 2058 },
        { label: "14:00", value: 2062 },
        { label: "15:00", value: 2065 },
      ],
    },
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
    chart: {
      type: "bar",
      title: "Weekly P&L by Day",
      data: [
        { label: "Mon", value: 2340, color: "text-success" },
        { label: "Tue", value: -450, color: "text-red-500" },
        { label: "Wed", value: 3200, color: "text-success" },
        { label: "Thu", value: 1890, color: "text-success" },
        { label: "Fri", value: 5360, color: "text-success" },
      ],
    },
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

// Mock Trading Accounts
export const MOCK_TRADING_ACCOUNTS: TradingAccount[] = [
  {
    id: "acc1",
    name: "Main Account",
    balance: 125680.50,
    accountNumber: "#100345",
    type: "Funded - $100k",
  },
  {
    id: "acc2",
    name: "Challenge Account",
    balance: 58240.75,
    accountNumber: "#100892",
    type: "Evaluation - $50k",
  },
  {
    id: "acc3",
    name: "Swing Trading",
    balance: 203450.20,
    accountNumber: "#101247",
    type: "Funded - $200k",
  },
];

// Mock Trading History
export const MOCK_TRADE_HISTORY: TradeHistory[] = [
  {
    id: "1",
    accountId: "acc1",
    symbol: "XAU/USD",
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: "buy",
    volume: 2.5,
    priceIn: 2048.50,
    priceOut: 2065.20,
    profit: 4175,
  },
  {
    id: "2",
    accountId: "acc1",
    symbol: "EUR/USD",
    time: new Date(Date.now() - 5 * 60 * 60 * 1000),
    type: "sell",
    volume: 5.0,
    priceIn: 1.0945,
    priceOut: 1.0920,
    profit: 1250,
  },
  {
    id: "3",
    accountId: "acc1",
    symbol: "NAS100",
    time: new Date(Date.now() - 8 * 60 * 60 * 1000),
    type: "buy",
    volume: 1.0,
    priceIn: 16240.0,
    priceOut: 16385.0,
    profit: 1450,
  },
  {
    id: "4",
    accountId: "acc2",
    symbol: "XAU/USD",
    time: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "buy",
    volume: 1.5,
    priceIn: 2052.00,
    priceOut: 2045.80,
    profit: -930,
  },
  {
    id: "5",
    accountId: "acc2",
    symbol: "GBP/USD",
    time: new Date(Date.now() - 36 * 60 * 60 * 1000),
    type: "sell",
    volume: 3.0,
    priceIn: 1.2650,
    priceOut: 1.2615,
    profit: 1050,
  },
  {
    id: "6",
    accountId: "acc2",
    symbol: "BTC/USD",
    time: new Date(Date.now() - 48 * 60 * 60 * 1000),
    type: "buy",
    volume: 0.5,
    priceIn: 42800.0,
    priceOut: 44200.0,
    profit: 700,
  },
  {
    id: "7",
    accountId: "acc3",
    symbol: "US30",
    time: new Date(Date.now() - 60 * 60 * 60 * 1000),
    type: "sell",
    volume: 2.0,
    priceIn: 38450.0,
    priceOut: 38320.0,
    profit: 2600,
  },
  {
    id: "8",
    accountId: "acc3",
    symbol: "EUR/JPY",
    time: new Date(Date.now() - 72 * 60 * 60 * 1000),
    type: "buy",
    volume: 4.0,
    priceIn: 162.30,
    priceOut: 162.95,
    profit: 2600,
  },
];
