export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  requirement: string;
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
  programType: "Bootcamp" | "High Stakes" | "Hyper Growth";
  accountSize: string;
  currentStep: number;
  totalSteps: number;
  status: "Step 1" | "Step 2" | "Step 3" | "Funded";
  accountStatus: "active" | "daily pause" | "terminated";
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
    description: "Successfully passed the evaluation and received funding",
    icon: "💲",
    color: "text-yellow-400",
    category: "Milestones",
    requirement: "Pass any evaluation program",
  },
  club100k: {
    id: "club100k",
    name: "100k Club",
    description: "Reached $100,000 in account size",
    icon: "💎",
    color: "text-blue-400",
    category: "Milestones",
    requirement: "Reach $100k account size",
  },
  topTrader: {
    id: "topTrader",
    name: "Top Trader",
    description: "Ranked in the top 10 on the leaderboard",
    icon: "⭐",
    color: "text-purple-400",
    category: "Rankings",
    requirement: "Reach top 10 on leaderboard",
  },
  goldExpert: {
    id: "goldExpert",
    name: "Gold Expert",
    description: "Mastered trading Gold (XAU/USD)",
    icon: "🥇",
    color: "text-amber-400",
    category: "Trading",
    requirement: "50 profitable Gold trades",
  },
  earlySupporter: {
    id: "earlySupporter",
    name: "Early Supporter",
    description: "Joined the community in its early days",
    icon: "🚀",
    color: "text-green-400",
    category: "Community",
    requirement: "Join before launch",
  },
  contest1st: {
    id: "contest1st",
    name: "Contest 1st Place",
    description: "Won 1st place in a trading contest",
    icon: "🏆",
    color: "text-yellow-500",
    category: "Contests",
    requirement: "Win a trading contest",
  },
  winStreak: {
    id: "winStreak",
    name: "Win Streak",
    description: "10 consecutive profitable trades",
    icon: "🔥",
    color: "text-orange-500",
    category: "Trading",
    requirement: "10 wins in a row",
  },
  nightOwl: {
    id: "nightOwl",
    name: "Night Owl",
    description: "Trade successfully during Asian session",
    icon: "🦉",
    color: "text-indigo-400",
    category: "Trading",
    requirement: "20 profitable Asian session trades",
  },
  riskManager: {
    id: "riskManager",
    name: "Risk Manager",
    description: "Maintained strict risk management for 30 days",
    icon: "🛡️",
    color: "text-cyan-500",
    category: "Trading",
    requirement: "30 days with max 1% risk",
  },
  socialButterfly: {
    id: "socialButterfly",
    name: "Social Butterfly",
    description: "Active community member",
    icon: "🦋",
    color: "text-pink-400",
    category: "Community",
    requirement: "100 comments on posts",
  },
  mentor: {
    id: "mentor",
    name: "Mentor",
    description: "Helped other traders succeed",
    icon: "🎓",
    color: "text-blue-500",
    category: "Community",
    requirement: "10 helpful posts",
  },
  profitMachine: {
    id: "profitMachine",
    name: "Profit Machine",
    description: "Achieved 30% monthly return",
    icon: "💰",
    color: "text-green-500",
    category: "Trading",
    requirement: "30% monthly profit",
  },
  forexKing: {
    id: "forexKing",
    name: "Forex King",
    description: "Master of currency trading",
    icon: "👑",
    color: "text-purple-500",
    category: "Trading",
    requirement: "100 profitable forex trades",
  },
  cryptoWhale: {
    id: "cryptoWhale",
    name: "Crypto Whale",
    description: "Expert in cryptocurrency trading",
    icon: "🐋",
    color: "text-blue-600",
    category: "Trading",
    requirement: "50 profitable crypto trades",
  },
  indicesGuru: {
    id: "indicesGuru",
    name: "Indices Guru",
    description: "Mastered trading stock indices",
    icon: "📊",
    color: "text-teal-500",
    category: "Trading",
    requirement: "50 profitable indices trades",
  },
  marathon: {
    id: "marathon",
    name: "Marathon Trader",
    description: "Traded for 90 consecutive days",
    icon: "🏃",
    color: "text-red-500",
    category: "Milestones",
    requirement: "90 days active trading",
  },
};

export const ALL_ACHIEVEMENTS = Object.values(BADGES);

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
    name: "Bootcamp",
    balance: 108450.75,
    accountNumber: "#BC-100345",
    programType: "Bootcamp",
    accountSize: "$100k",
    currentStep: 3,
    totalSteps: 3,
    status: "Funded",
    accountStatus: "active",
  },
  {
    id: "acc2",
    name: "High Stakes",
    balance: 27840.20,
    accountNumber: "#HS-200892",
    programType: "High Stakes",
    accountSize: "$25k",
    currentStep: 2,
    totalSteps: 2,
    status: "Step 2",
    accountStatus: "daily pause",
  },
  {
    id: "acc3",
    name: "Hyper Growth",
    balance: 11650.50,
    accountNumber: "#HG-301247",
    programType: "Hyper Growth",
    accountSize: "$10k",
    currentStep: 1,
    totalSteps: 1,
    status: "Step 1",
    accountStatus: "terminated",
  },
  {
    id: "acc4",
    name: "Bootcamp",
    balance: 27120.30,
    accountNumber: "#BC-100567",
    programType: "Bootcamp",
    accountSize: "$25k",
    currentStep: 3,
    totalSteps: 3,
    status: "Funded",
    accountStatus: "active",
  },
];

// Helper function to generate mock trades
function generateMockTrades(): TradeHistory[] {
  const symbols = ["XAU/USD", "EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD", "NAS100", "US30", "GER40", "BTC/USD", "ETH/USD", "EUR/JPY", "GBP/JPY", "USD/CAD", "NZD/USD", "EUR/GBP"];
  const accounts = ["acc1", "acc2", "acc3", "acc4"];
  const trades: TradeHistory[] = [];
  let tradeId = 1;
  
  accounts.forEach((accountId, accIndex) => {
    // Generate 50-60 trades per account
    const numTrades = 50 + Math.floor(Math.random() * 11);
    
    for (let i = 0; i < numTrades; i++) {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const type: "buy" | "sell" = Math.random() > 0.5 ? "buy" : "sell";
      const volume = Math.random() * 4 + 0.5;
      const hoursAgo = i * 3 + Math.random() * 2;
      
      let priceIn: number, priceOut: number, profit: number;
      
      // Generate realistic prices based on symbol
      if (symbol === "XAU/USD") {
        priceIn = 2040 + Math.random() * 40;
        const change = (Math.random() - 0.45) * 30;
        priceOut = priceIn + change;
        profit = Math.round((type === "buy" ? change : -change) * volume * 100) / 100;
      } else if (symbol.includes("USD")) {
        priceIn = 1.05 + Math.random() * 0.3;
        const change = (Math.random() - 0.45) * 0.015;
        priceOut = priceIn + change;
        profit = Math.round((type === "buy" ? change : -change) * volume * 10000) / 100;
      } else if (symbol.includes("JPY")) {
        priceIn = 140 + Math.random() * 50;
        const change = (Math.random() - 0.45) * 2;
        priceOut = priceIn + change;
        profit = Math.round((type === "buy" ? change : -change) * volume * 100) / 100;
      } else if (symbol.includes("BTC") || symbol.includes("ETH")) {
        priceIn = symbol === "BTC/USD" ? 42000 + Math.random() * 4000 : 2200 + Math.random() * 400;
        const change = (Math.random() - 0.45) * (symbol === "BTC/USD" ? 2000 : 150);
        priceOut = priceIn + change;
        profit = Math.round((type === "buy" ? change : -change) * volume) / 100;
      } else {
        // Indices (NAS100, US30, GER40)
        priceIn = 16000 + Math.random() * 22000;
        const change = (Math.random() - 0.45) * 400;
        priceOut = priceIn + change;
        profit = Math.round((type === "buy" ? change : -change) * volume * 10) / 100;
      }
      
      trades.push({
        id: String(tradeId++),
        accountId,
        symbol,
        time: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
        type,
        volume: Math.round(volume * 100) / 100,
        priceIn: Math.round(priceIn * 100) / 100,
        priceOut: Math.round(priceOut * 100) / 100,
        profit: Math.round(profit * 100) / 100,
      });
    }
  });
  
  return trades;
}

// Mock Trading History
export const MOCK_TRADE_HISTORY: TradeHistory[] = generateMockTrades();
