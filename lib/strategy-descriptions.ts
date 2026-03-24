import type { PreferredStrategy } from "@/lib/types/trader-profile";

export const STRATEGY_DESCRIPTIONS: Record<string, string> = {
  Scalper: "Short-term trades, quick in and out with tight risk.",
  "Day Trader": "Opens and closes positions within the same day.",
  "Swing Trader": "Holds positions across several days to capture moves.",
  "Position Trader": "Longer-term holds based on broader trends.",
};

export function getStrategyDescription(strategy: PreferredStrategy): string | undefined {
  return STRATEGY_DESCRIPTIONS[strategy];
}
