// Mock achievement progress data for the current user
// For tiered achievements, shows progress toward the NEXT tier
export const USER_ACHIEVEMENT_PROGRESS: Record<string, { current: number; required: number; currentTier?: number }> = {
  // ===== UNLOCKED NON-TIERED =====
  passEvaluation: { current: 1, required: 1 },
  funded: { current: 1, required: 1 },
  firstPayout: { current: 1, required: 1 },
  contest2nd: { current: 1, required: 1 },
  contest3rd: { current: 1, required: 1 },
  contestParticipant: { current: 1, required: 1 },
  
  // ===== TIERED ACHIEVEMENTS (with current tier progress) =====
  // Tier 3 complete, working on Tier 4
  accountDollarProfit: { current: 15000, required: 50000, currentTier: 3 }, // $15k/$50k for Tier 4
  
  // Tier 2 complete, working on Tier 3
  totalTrades: { current: 350, required: 500, currentTier: 2 }, // 350/500 for Tier 3
  dailyConsistency: { current: 22, required: 30, currentTier: 2 }, // 22/30 days for Tier 3
  
  // Tier 1 complete, working on Tier 2
  longPositions: { current: 60, required: 100, currentTier: 1 }, // 60/100 for Tier 2
  singleTradePercentProfit: { current: 8, required: 10, currentTier: 1 }, // 8%/10% for Tier 2
  
  // ===== IN-PROGRESS (No tier unlocked yet) =====
  shortPositions: { current: 15, required: 25 }, // 60% toward Tier 1
  assetSpecialist: { current: 32, required: 50 }, // 64% toward Tier 1
  highQualityTrade: { current: 75, required: 80 }, // 94% toward Tier 1
  averageQuality: { current: 5, required: 7 }, // 71% toward Tier 1
  singleTradeDollarProfit: { current: 380, required: 500 }, // 76% toward Tier 1
  accountPercentProfit: { current: 7, required: 10 }, // 70% toward Tier 1
  
  // ===== NO PROGRESS YET =====
  contest1st: { current: 0, required: 1 },
};
