/**
 * Public Trader Profile — data contract for the "identity card" view.
 * All data is passed via this interface; no owner customization.
 */

/** Worn badge on profile (subset of badge data for display) */
export type ProfileBadge = {
  id: string;
  name: string;
  icon: string;
};

/** Clan affiliation for header */
export type ProfileClan = {
  id: string;
  name: string;
  icon?: string;
};

/** Five skills for the spider/radar chart (0–100 each) */
export type TraderSkills = {
  consistency: number;
  discipline: number;
  timing: number;
  sizing: number;
  riskManagement: number;
};

/** Single post in Trade Talk feed */
export type TradeTalkPost = {
  id: string;
  snippet: string;
  timestamp: string; // ISO date
  likesCount: number;
  commentsCount: number;
  /** Optional link to full post (e.g. /trade-talk/123) */
  url?: string;
  /** Optional mini series for a small sparkline (e.g. daily P&L or engagement) */
  sparkline?: number[];
};

export type TopTradedAsset = {
  symbol: string;
  label: string;
  icon?: string; // emoji or icon key
  assetType: string; // e.g. "Forex", "Metals", "Indices"
  tradeCount: number;
  sharePercent: number;
  winRatePercent: number;
  /** Notional volume in USD for volume-based charts (optional until backend provides it) */
  volumeUsd?: number;
  /** Per-asset trade quality 0–100; optional until backend provides it */
  tradeQualityScore?: number;
};

export type PerformanceAverages = {
  winRatePercent: number;
  profitFactor: number;
  avgHoldHours: number;
  totalTrades: number;
  consistencyScore: number; // 0–100
  /**
   * Win rate placement vs all traders: 60 means "Top 60%" (in the upper 60% by win rate).
   */
  winRateTopPercent?: number;
  /**
   * Trade quality placement vs all traders: e.g. 25 means "Top 25%".
   */
  tradeQualityTopPercent?: number;
  /** Community average win rate (for comparison) */
  communityAvgWinRatePercent?: number;
  /** Community average trade quality 0–100 (for comparison) */
  communityAvgQualityScore?: number;
};

export type ActivitySeries = {
  label: string;
  period: string; // e.g. "Last 6M"
  values: number[];
  valueLabels: string[]; // e.g. ["Jan","Feb",...]
};

export type AchievementCredential = {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string; // ISO date
  tier?: number;
  maxTiers?: number;
};

export type CertificateCredential = {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  url?: string;
};

export type CommunityActivity = {
  postsCount: number;
  likesReceived: number;
  commentsCount: number;
  sharesCount: number;
  followersCount: number;
  followingCount: number;
};

/** Viewer's stats for "Hover to Compare" — optional; when present, comparison is shown on hover */
export type ViewerComparisonStats = {
  qualityScore?: number;
  winRatePercent?: number;
  profitFactor?: number;
  totalTrades?: number;
  consistencyScore?: number;
  /** Viewer's skills for spider chart overlay */
  skills?: TraderSkills;
  /** Viewer's display name for chart legend (e.g. "You" or username) */
  viewerNickname?: string;
  /** Same shape as profile topTradedAssets — used in asset pie hover compare */
  viewerTopTradedAssets?: TopTradedAsset[];
};

export type PreferredStrategy =
  | "Scalper"
  | "Swing Trader"
  | "Day Trader"
  | "Position Trader"
  | string;

export interface TraderProfile {
  /** Header & identification */
  traderId: string;
  nickname: string;
  avatar: string;
  createdAt: string; // ISO date
  countryCode?: string; // e.g. "US", "IL" for flag
  tier2Verified: boolean; // Trade Talk verified
  clan?: ProfileClan;
  badges: ProfileBadge[]; // top badges they wear

  /** Trader ID & performance snapshot */
  preferredStrategy: PreferredStrategy;
  /** Share of users who use this strategy (0–100); optional */
  strategySharePercent?: number;
  qualityScore: number; // 0–100 prominent metric
  skills: TraderSkills; // for spider chart

  /** Performance dashboard */
  topTradedAssets: TopTradedAsset[];
  averages: PerformanceAverages;
  activityChart?: ActivitySeries;

  /** Credentials — only unlocked achievements shown */
  achievements: AchievementCredential[];
  certificates: CertificateCredential[];

  /** Community */
  community: CommunityActivity;

  /** Trade Talk — recent posts */
  tradeTalkPosts: TradeTalkPost[];

  /** Optional: current viewer's stats for compare-on-hover */
  viewerStats?: ViewerComparisonStats;
}
