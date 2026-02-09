// Mock achievement progress data for the current user
export const USER_ACHIEVEMENT_PROGRESS: Record<string, { current: number; required: number }> = {
  // Unlocked achievements (100% complete)
  funded: { current: 1, required: 1 },
  club100k: { current: 1, required: 1 },
  contest1st: { current: 1, required: 1 },
  
  // In-progress achievements
  goldExpert: { current: 35, required: 50 }, // 70%
  winStreak: { current: 7, required: 10 }, // 70%
  nightOwl: { current: 12, required: 20 }, // 60%
  riskManager: { current: 18, required: 30 }, // 60%
  socialButterfly: { current: 67, required: 100 }, // 67%
  mentor: { current: 6, required: 10 }, // 60%
  profitMachine: { current: 22, required: 30 }, // 73% (monthly profit percentage)
  forexKing: { current: 78, required: 100 }, // 78%
  cryptoWhale: { current: 15, required: 50 }, // 30%
  indicesGuru: { current: 28, required: 50 }, // 56%
  marathon: { current: 45, required: 90 }, // 50%
  
  // No progress yet
  topTrader: { current: 0, required: 1 },
  earlySupporter: { current: 0, required: 1 },
};
