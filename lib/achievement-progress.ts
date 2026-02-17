// Mock achievement progress data for the current user
// For tiered achievements, shows progress toward the NEXT tier
export const USER_ACHIEVEMENT_PROGRESS: Record<string, { current: number; required: number; currentTier?: number }> = {
  // Unlocked achievements (100% complete)
  funded: { current: 1, required: 1 },
  club100k: { current: 1, required: 1 },
  contest1st: { current: 1, required: 1 },
  
  // Tiered achievements (with current tier progress)
  profitableTrader: { current: 10000, required: 10000, currentTier: 3 }, // Tier 3 unlocked, working on Tier 4
  goldExpert: { current: 25, required: 25, currentTier: 2 }, // Tier 2 unlocked, working on Tier 3
  profitMachine: { current: 22, required: 30, currentTier: 2 }, // Tier 2 unlocked, 73% toward Tier 3
  
  // In-progress achievements
  winStreak: { current: 7, required: 10 }, // 70%
  nightOwl: { current: 12, required: 20 }, // 60%
  riskManager: { current: 18, required: 30 }, // 60%
  socialButterfly: { current: 67, required: 100 }, // 67%
  mentor: { current: 6, required: 10 }, // 60%
  forexKing: { current: 78, required: 100 }, // 78%
  cryptoWhale: { current: 15, required: 50 }, // 30%
  indicesGuru: { current: 28, required: 50 }, // 56%
  marathon: { current: 45, required: 90 }, // 50%
  
  // No progress yet
  topTrader: { current: 0, required: 1 },
  earlySupporter: { current: 0, required: 1 },
};
