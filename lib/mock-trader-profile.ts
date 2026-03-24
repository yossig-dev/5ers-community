import type { TraderProfile } from "@/lib/types/trader-profile";

/** Example TraderProfile for development and demo. */
export const MOCK_TRADER_PROFILE: TraderProfile = {
  traderId: "T5-7842-KJ",
  nickname: "AlphaScalper",
  avatar: "AS",
  createdAt: "2024-06-15T00:00:00.000Z",
  countryCode: "IL",
  tier2Verified: true,
  clan: { id: "c1", name: "Elite Scalpers", icon: "⚡" },
  badges: [
    { id: "b1", name: "Funded Trader", icon: "💲" },
    { id: "b2", name: "10K Payout", icon: "💵" },
    { id: "b3", name: "Win Streak", icon: "🔥" },
  ],

  preferredStrategy: "Scalper",
  strategySharePercent: 24,
  qualityScore: 88,
  skills: {
    consistency: 82,
    discipline: 90,
    timing: 85,
    sizing: 78,
    riskManagement: 88,
  },

  topTradedAssets: [
    { symbol: "XAUUSD", label: "XAUUSD", icon: "🥇", assetType: "Metals", tradeCount: 890, sharePercent: 24, winRatePercent: 62 },
    { symbol: "EURUSD", label: "EURUSD", icon: "💱", assetType: "Forex", tradeCount: 1240, sharePercent: 32, winRatePercent: 68 },
    { symbol: "BTCUSD", label: "BTCUSD", icon: "₿", assetType: "Crypto", tradeCount: 456, sharePercent: 12, winRatePercent: 54 },
    { symbol: "GBPUSD", label: "GBPUSD", icon: "💱", assetType: "Forex", tradeCount: 380, sharePercent: 10, winRatePercent: 71 },
    { symbol: "NAS100", label: "NAS100", icon: "📈", assetType: "Indices", tradeCount: 290, sharePercent: 8, winRatePercent: 48 },
  ],

  averages: {
    winRatePercent: 68.4,
    profitFactor: 1.82,
    avgHoldHours: 4.2,
    totalTrades: 3847,
    consistencyScore: 72,
    communityAvgWinRatePercent: 58.2,
    communityAvgQualityScore: 62,
  },
  activityChart: {
    label: "Monthly Trades",
    period: "Last 6M",
    valueLabels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    values: [520, 610, 580, 720, 650, 690],
  },

  achievements: [
    { id: "firstPayout", name: "First Payout", description: "Receive your first payout", icon: "💸", earnedAt: "2024-08-01" },
    { id: "hugePayout", name: "Huge Withdrawal", description: "Make a withdrawal of $10,000", icon: "💵", earnedAt: "2024-09-15", tier: 2, maxTiers: 5 },
    { id: "dailyConsistency", name: "Consistent Trader", description: "Trade 14 days in a row", icon: "🔥", earnedAt: "2024-10-02", tier: 2, maxTiers: 5 },
    { id: "contest2nd", name: "Contest 2nd Place", description: "Finish 2nd in a trading contest", icon: "🥈", earnedAt: "2024-11-20" },
  ],
  certificates: [
    { id: "c1", name: "Pro Trader Certification", issuer: "The5ers", issuedAt: "2024-07-01" },
  ],

  community: {
    postsCount: 124,
    likesReceived: 892,
    commentsCount: 340,
    sharesCount: 45,
    followersCount: 2456,
    followingCount: 328,
  },

  tradeTalkPosts: [
    {
      id: "p1",
      snippet: "Gold holding key support at 2620 – watching for a bounce into NY session. Risk managed with tight SL.",
      timestamp: "2025-03-17T14:30:00.000Z",
      likesCount: 24,
      commentsCount: 8,
      sparkline: [12, 18, 15, 22, 28, 24, 31, 35, 32, 38],
    },
    {
      id: "p2",
      snippet: "EURUSD scalping the London range. 3 trades, 2 wins. Discipline paid off today.",
      timestamp: "2025-03-16T11:00:00.000Z",
      likesCount: 12,
      commentsCount: 3,
      sparkline: [8, 6, 9, 11, 10, 14, 12, 15],
    },
    {
      id: "p3",
      snippet: "Shared my monthly recap: 68% win rate, 1.82 PF. Consistency over home runs.",
      timestamp: "2025-03-15T09:00:00.000Z",
      likesCount: 56,
      commentsCount: 14,
      sparkline: [42, 45, 48, 52, 55, 58, 62, 65, 68, 70, 72],
    },
  ],

  viewerStats: {
    viewerNickname: "TradeKing",
    qualityScore: 65,
    winRatePercent: 62.1,
    profitFactor: 1.45,
    totalTrades: 1200,
    consistencyScore: 58,
    skills: {
      consistency: 70,
      discipline: 65,
      timing: 72,
      sizing: 60,
      riskManagement: 68,
    },
    viewerTopTradedAssets: [
      { symbol: "XAUUSD", label: "XAUUSD", icon: "🥇", assetType: "Metals", tradeCount: 180, sharePercent: 15, winRatePercent: 58 },
      { symbol: "EURUSD", label: "EURUSD", icon: "💱", assetType: "Forex", tradeCount: 420, sharePercent: 35, winRatePercent: 64 },
      { symbol: "BTCUSD", label: "BTCUSD", icon: "₿", assetType: "Crypto", tradeCount: 96, sharePercent: 8, winRatePercent: 51 },
      { symbol: "GBPUSD", label: "GBPUSD", icon: "💱", assetType: "Forex", tradeCount: 240, sharePercent: 20, winRatePercent: 59 },
      { symbol: "NAS100", label: "NAS100", icon: "📈", assetType: "Indices", tradeCount: 264, sharePercent: 22, winRatePercent: 55 },
    ],
  },
};
