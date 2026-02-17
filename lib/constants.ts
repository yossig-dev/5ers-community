export type BadgeTier = {
  tier: number;
  requirement: string;
  value: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  requirement: string;
  isTiered?: boolean;
  maxTiers?: number;
  tierRequirements?: BadgeTier[];
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

export type Clan = {
  id: string;
  name: string;
  icon: string;
  color: string;
  memberCount: number;
  totalProfit: number;
  totalGain: number;
  profitFactor: number;
  description: string;
  requirement?: {
    type: "badge" | "xp";
    value: string | number; // badge ID or XP amount
    label: string; // Display text like "Funded Trader" or "Level 50"
  };
};

export type UserBadge = {
  badge: Badge;
  unlockedAt: Date;
  currentTier?: number; // For tiered achievements
};

export type User = {
  id: string;
  username: string;
  avatar: string;
  badges: Badge[];
  unlockedBadges?: UserBadge[]; // Badges with unlock dates
  verified: boolean;
  xp: number;
  level: TradingLevel;
  clanId?: string;
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
  // ===== MILESTONES (Non-Tiered) =====
  passEvaluation: {
    id: "passEvaluation",
    name: "Evaluation Passed",
    description: "Successfully pass your evaluation",
    icon: "✅",
    color: "text-green-400",
    category: "Milestones",
    requirement: "Pass an evaluation",
  },
  funded: {
    id: "funded",
    name: "Funded Trader",
    description: "Get funded for the first time",
    icon: "💲",
    color: "text-yellow-400",
    category: "Milestones",
    requirement: "Get funded",
  },
  firstPayout: {
    id: "firstPayout",
    name: "First Payout",
    description: "Receive your first payout",
    icon: "💸",
    color: "text-emerald-400",
    category: "Milestones",
    requirement: "Get a payout",
  },
  hugePayout: {
    id: "hugePayout",
    name: "Huge Withdrawal",
    description: "Make a withdrawal of $15,000",
    icon: "💵",
    color: "text-amber-500",
    category: "Milestones",
    requirement: "Make large withdrawals",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "$5,000 payout", value: 5000 },
      { tier: 2, requirement: "$10,000 payout", value: 10000 },
      { tier: 3, requirement: "$15,000 payout", value: 15000 },
      { tier: 4, requirement: "$30,000 payout", value: 30000 },
      { tier: 5, requirement: "$50,000 payout", value: 50000 },
    ],
  },

  // ===== CONTESTS (Non-Tiered) =====
  contestParticipant: {
    id: "contestParticipant",
    name: "Contest Participant",
    description: "Participate in a trading contest",
    icon: "🎯",
    color: "text-blue-400",
    category: "Contests",
    requirement: "Participate in a contest",
  },
  contest3rd: {
    id: "contest3rd",
    name: "Contest 3rd Place",
    description: "Finish 3rd in a trading contest",
    icon: "🥉",
    color: "text-orange-400",
    category: "Contests",
    requirement: "Get 3rd place",
  },
  contest2nd: {
    id: "contest2nd",
    name: "Contest 2nd Place",
    description: "Finish 2nd in a trading contest",
    icon: "🥈",
    color: "text-slate-400",
    category: "Contests",
    requirement: "Get 2nd place",
  },
  contest1st: {
    id: "contest1st",
    name: "Contest 1st Place",
    description: "Win 1st place in a trading contest",
    icon: "🏆",
    color: "text-yellow-500",
    category: "Contests",
    requirement: "Get 1st place",
  },

  // ===== TRADING EXPERIENCE (Tiered) =====
  totalTrades: {
    id: "totalTrades",
    name: "Experienced Trader",
    description: "Make 200 trades",
    icon: "📊",
    color: "text-blue-500",
    category: "Trading Experience",
    requirement: "Complete trades",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "50 trades", value: 50 },
      { tier: 2, requirement: "200 trades", value: 200 },
      { tier: 3, requirement: "500 trades", value: 500 },
      { tier: 4, requirement: "1,000 trades", value: 1000 },
      { tier: 5, requirement: "2,500 trades", value: 2500 },
    ],
  },
  shortPositions: {
    id: "shortPositions",
    name: "Short Seller",
    description: "Complete 25 trades from a short position",
    icon: "📉",
    color: "text-red-500",
    category: "Trading Experience",
    requirement: "Complete sell trades",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "25 short positions", value: 25 },
      { tier: 2, requirement: "100 short positions", value: 100 },
      { tier: 3, requirement: "250 short positions", value: 250 },
      { tier: 4, requirement: "500 short positions", value: 500 },
      { tier: 5, requirement: "1,000 short positions", value: 1000 },
    ],
  },
  longPositions: {
    id: "longPositions",
    name: "Long Trader",
    description: "Complete 25 trades from a long position",
    icon: "📈",
    color: "text-green-500",
    category: "Trading Experience",
    requirement: "Complete buy trades",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "25 long positions", value: 25 },
      { tier: 2, requirement: "100 long positions", value: 100 },
      { tier: 3, requirement: "250 long positions", value: 250 },
      { tier: 4, requirement: "500 long positions", value: 500 },
      { tier: 5, requirement: "1,000 long positions", value: 1000 },
    ],
  },
  assetSpecialist: {
    id: "assetSpecialist",
    name: "Asset Specialist",
    description: "Trade the same asset 50 times",
    icon: "🎯",
    color: "text-purple-500",
    category: "Trading Experience",
    requirement: "Trade same asset repeatedly",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "50 trades on same asset", value: 50 },
      { tier: 2, requirement: "100 trades on same asset", value: 100 },
      { tier: 3, requirement: "250 trades on same asset", value: 250 },
      { tier: 4, requirement: "500 trades on same asset", value: 500 },
      { tier: 5, requirement: "1,000 trades on same asset", value: 1000 },
    ],
  },

  // ===== TRADE QUALITY - CONSISTENCY (Tiered) =====
  dailyConsistency: {
    id: "dailyConsistency",
    name: "Consistent Trader",
    description: "Trade 14 days in a row",
    icon: "🔥",
    color: "text-orange-500",
    category: "Trade Quality",
    requirement: "Trade consecutive days",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "7 days in a row", value: 7 },
      { tier: 2, requirement: "14 days in a row", value: 14 },
      { tier: 3, requirement: "30 days in a row", value: 30 },
      { tier: 4, requirement: "60 days in a row", value: 60 },
      { tier: 5, requirement: "90 days in a row", value: 90 },
    ],
  },

  // ===== TRADE QUALITY - DISCIPLINE (Tiered) =====
  highQualityTrade: {
    id: "highQualityTrade",
    name: "Quality Trade",
    description: "Execute trades with high quality scores",
    icon: "💎",
    color: "text-cyan-500",
    category: "Trade Quality",
    requirement: "High quality score",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "Quality score: 80", value: 80 },
      { tier: 2, requirement: "Quality score: 85", value: 85 },
      { tier: 3, requirement: "Quality score: 90", value: 90 },
      { tier: 4, requirement: "Quality score: 95", value: 95 },
      { tier: 5, requirement: "Quality score: 98", value: 98 },
    ],
  },
  averageQuality: {
    id: "averageQuality",
    name: "Disciplined Trader",
    description: "Maintain high average quality over time",
    icon: "🛡️",
    color: "text-indigo-500",
    category: "Trade Quality",
    requirement: "Maintain quality average",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "Avg 70 for 7 days", value: 7 },
      { tier: 2, requirement: "Avg 75 for 14 days", value: 14 },
      { tier: 3, requirement: "Avg 80 for 30 days", value: 30 },
      { tier: 4, requirement: "Avg 85 for 60 days", value: 60 },
      { tier: 5, requirement: "Avg 90 for 90 days", value: 90 },
    ],
  },

  // ===== SUCCESSFUL TRADING (Tiered) =====
  singleTradePercentProfit: {
    id: "singleTradePercentProfit",
    name: "Growth Master",
    description: "Achieve a 15% profit on a single trade",
    icon: "📊",
    color: "text-teal-500",
    category: "Successful Trading",
    requirement: "Single trade profit %",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "5% profit on trade", value: 5 },
      { tier: 2, requirement: "10% profit on trade", value: 10 },
      { tier: 3, requirement: "15% profit on trade", value: 15 },
      { tier: 4, requirement: "20% profit on trade", value: 20 },
      { tier: 5, requirement: "25% profit on trade", value: 25 },
    ],
  },
  singleTradeDollarProfit: {
    id: "singleTradeDollarProfit",
    name: "Big Win",
    description: "Earn $5,000 in profits in a single day",
    icon: "💵",
    color: "text-green-600",
    category: "Successful Trading",
    requirement: "Single day profit $",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "$500 profit on trade", value: 500 },
      { tier: 2, requirement: "$1,000 profit on trade", value: 1000 },
      { tier: 3, requirement: "$2,500 profit on trade", value: 2500 },
      { tier: 4, requirement: "$5,000 profit on trade", value: 5000 },
      { tier: 5, requirement: "$10,000 profit on trade", value: 10000 },
    ],
  },
  accountPercentProfit: {
    id: "accountPercentProfit",
    name: "Good Day",
    description: "Reach a daily profit of 20% on your account",
    icon: "📈",
    color: "text-emerald-600",
    category: "Successful Trading",
    requirement: "Daily profit 20%",
  },
  miraculousRecovery: {
    id: "miraculousRecovery",
    name: "Miraculous Recovery",
    description: "Turn a big loss day to a successful one",
    icon: "🔄",
    color: "text-purple-500",
    category: "Successful Trading",
    requirement: "Recover from loss",
  },
  accountDollarProfit: {
    id: "accountDollarProfit",
    name: "Profit Builder",
    description: "Build total account profit",
    icon: "💰",
    color: "text-yellow-600",
    category: "Successful Trading",
    requirement: "Account profit $",
    isTiered: true,
    maxTiers: 5,
    tierRequirements: [
      { tier: 1, requirement: "$1,000 account profit", value: 1000 },
      { tier: 2, requirement: "$5,000 account profit", value: 5000 },
      { tier: 3, requirement: "$10,000 account profit", value: 10000 },
      { tier: 4, requirement: "$50,000 account profit", value: 50000 },
      { tier: 5, requirement: "$100,000 account profit", value: 100000 },
    ],
  },
};

export const ALL_ACHIEVEMENTS = Object.values(BADGES);

// Wearable badges that can be displayed in the community
export const WEARABLE_BADGE_IDS = [
  "funded",          // Funded Trader
  "contest1st",      // Contest 1st Place
  "totalTrades",     // Experienced Trader
  "accountDollarProfit", // Profit Builder
  "hugePayout",      // Huge Payout
];

// Mock Clans
export const MOCK_CLANS: Clan[] = [
  {
    id: "clan1",
    name: "Gold Rush Traders",
    icon: "🏆",
    color: "text-yellow-500",
    memberCount: 24,
    totalProfit: 1245680,
    totalGain: 42.8,
    profitFactor: 2.45,
    description: "Elite gold traders dominating the markets",
  },
  {
    id: "clan2",
    name: "Forex Legends",
    icon: "💎",
    color: "text-blue-500",
    memberCount: 18,
    totalProfit: 982450,
    totalGain: 38.5,
    profitFactor: 2.28,
    description: "Masters of currency trading",
    requirement: {
      type: "badge",
      value: "funded",
      label: "Funded Trader",
    },
  },
  {
    id: "clan3",
    name: "Crypto Wolves",
    icon: "🐺",
    color: "text-purple-500",
    memberCount: 31,
    totalProfit: 875320,
    totalGain: 35.2,
    profitFactor: 2.15,
    description: "Cryptocurrency trading specialists",
    requirement: {
      type: "xp",
      value: 10000,
      label: "Diamond Trader",
    },
  },
  {
    id: "clan4",
    name: "Day Trade Kings",
    icon: "👑",
    color: "text-amber-500",
    memberCount: 15,
    totalProfit: 756890,
    totalGain: 31.8,
    profitFactor: 2.05,
    description: "Fast-paced day trading experts",
  },
  {
    id: "clan5",
    name: "Swing Masters",
    icon: "⚡",
    color: "text-cyan-500",
    memberCount: 22,
    totalProfit: 654720,
    totalGain: 28.4,
    profitFactor: 1.95,
    description: "Strategic swing trading pros",
    requirement: {
      type: "badge",
      value: "club100k",
      label: "100k Club",
    },
  },
  {
    id: "clan6",
    name: "Profit Hunters",
    icon: "🎯",
    color: "text-green-500",
    memberCount: 19,
    totalProfit: 589340,
    totalGain: 25.6,
    profitFactor: 1.88,
    description: "Precision traders hunting profits",
  },
  {
    id: "clan7",
    name: "Market Sharks",
    icon: "🦈",
    color: "text-indigo-500",
    memberCount: 27,
    totalProfit: 512680,
    totalGain: 22.3,
    profitFactor: 1.75,
    description: "Aggressive market players",
  },
  {
    id: "clan8",
    name: "Bull Brigade",
    icon: "🐂",
    color: "text-red-500",
    memberCount: 16,
    totalProfit: 445920,
    totalGain: 19.8,
    profitFactor: 1.68,
    description: "Bullish market enthusiasts",
    requirement: {
      type: "xp",
      value: 6000,
      label: "Platinum Trader",
    },
  },
];

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "TradeKing",
    avatar: "👑",
    badges: [BADGES.contest2nd, BADGES.contest3rd, BADGES.contestParticipant, BADGES.funded, BADGES.firstPayout, BADGES.passEvaluation, BADGES.accountDollarProfit, BADGES.totalTrades, BADGES.dailyConsistency, BADGES.hugePayout],
    unlockedBadges: [
      {
        badge: BADGES.accountDollarProfit,
        unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        currentTier: 3, // $10,000 account profit
      },
      {
        badge: BADGES.totalTrades,
        unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        currentTier: 2, // 200 trades
      },
      {
        badge: BADGES.dailyConsistency,
        unlockedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        currentTier: 2, // 14 days in a row
      },
      {
        badge: BADGES.funded,
        unlockedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      },
      {
        badge: BADGES.contest2nd,
        unlockedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      },
      {
        badge: BADGES.contest3rd,
        unlockedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
      },
      {
        badge: BADGES.firstPayout,
        unlockedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      },
      {
        badge: BADGES.hugePayout,
        unlockedAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000), // 27 days ago
        currentTier: 3, // $15,000 payout
      },
      {
        badge: BADGES.contestParticipant,
        unlockedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000), // 50 days ago
      },
      {
        badge: BADGES.passEvaluation,
        unlockedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      },
    ],
    verified: true,
    xp: 8000,
    level: getLevelByXP(8000),
    clanId: "clan1",
  },
  {
    id: "2",
    username: "GoldRush_88",
    avatar: "⚡",
    badges: [BADGES.assetSpecialist, BADGES.funded],
    verified: true,
    xp: 12300,
    level: getLevelByXP(12300),
  },
  {
    id: "3",
    username: "ProTrader_X",
    avatar: "🎯",
    badges: [BADGES.highQualityTrade],
    verified: false,
    xp: 4200,
    level: getLevelByXP(4200),
  },
  {
    id: "4",
    username: "ForexNinja",
    avatar: "🥷",
    badges: [BADGES.funded, BADGES.longPositions],
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
    badges: [BADGES.contest1st, BADGES.singleTradeDollarProfit, BADGES.accountPercentProfit],
    verified: true,
    xp: 14800,
    level: getLevelByXP(14800),
  },
  {
    id: "7",
    username: "DayTradeQueen",
    avatar: "👸",
    badges: [BADGES.funded, BADGES.dailyConsistency],
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
