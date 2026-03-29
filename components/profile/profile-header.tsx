"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { UserPlus, Share2, Check, Percent, Award } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { getStrategyDescription } from "@/lib/strategy-descriptions";
import type { PreferredStrategy, TopTradedAsset, TraderProfile } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

function findViewerAsset(
  viewerAssets: TopTradedAsset[] | undefined,
  symbol: string
): TopTradedAsset | undefined {
  return viewerAssets?.find((a) => a.symbol === symbol);
}

function topAssetsByWinRate(assets: TopTradedAsset[], n: number): TopTradedAsset[] {
  return [...assets].sort((a, b) => b.winRatePercent - a.winRatePercent).slice(0, n);
}

function topAssetsByTradeQuality(assets: TopTradedAsset[], n: number): TopTradedAsset[] {
  const ranked = assets.filter((a) => a.tradeQualityScore != null);
  return [...ranked].sort((a, b) => (b.tradeQualityScore ?? 0) - (a.tradeQualityScore ?? 0)).slice(0, n);
}

/** Country flag image from ISO 3166-1 alpha-2 code (flagcdn.com) */
function CountryFlag({ code }: { code: string }) {
  if (!code || code.length !== 2) return null;
  const iso = code.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt=""
      className="h-5 w-7 object-cover rounded-sm inline-block"
      width={28}
      height={20}
    />
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  IL: "Israel", US: "United States", GB: "United Kingdom", DE: "Germany", FR: "France",
  CA: "Canada", AU: "Australia", IN: "India", BR: "Brazil", JP: "Japan", CN: "China",
  ES: "Spain", IT: "Italy", NL: "Netherlands", PL: "Poland", RU: "Russia", KR: "South Korea",
};

/** Performance metrics shown in the header strip (moved from profile snapshot) */
export type ProfileHeaderPerformance = {
  preferredStrategy: PreferredStrategy;
  totalTrades?: number;
  strategySharePercent?: number;
  /** Placement vs all traders, e.g. 60 → "Top 60% win rate" */
  winRateTopPercent?: number;
  /** Placement vs all traders, e.g. 18 → "Top 18% trade quality" */
  tradeQualityTopPercent?: number;
};

export interface ProfileHeaderProps {
  profile: Pick<
    TraderProfile,
    "nickname" | "avatar" | "createdAt" | "countryCode" | "clan" | "badges"
  >;
  /** When set, renders a professional stats strip below identity */
  performance?: ProfileHeaderPerformance;
  /** Used for top win-rate / trade-quality rows and hover compare */
  topTradedAssets?: TopTradedAsset[];
  viewerTopTradedAssets?: TopTradedAsset[];
  viewerDisplayName?: string;
  onFollow?: () => void;
  onShare?: () => void;
  isFollowing?: boolean;
  className?: string;
}

function StatIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/50 border border-slate-600/60 text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}

const compareTooltipClass =
  "whitespace-normal max-w-[280px] text-left font-normal leading-snug px-3 py-2.5";

function WinRateCompareBody({
  asset,
  profileName,
  viewerName,
  viewerAsset,
}: {
  asset: TopTradedAsset;
  profileName: string;
  viewerName: string;
  viewerAsset?: TopTradedAsset;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-slate-100 font-semibold text-xs">
        {asset.icon && <span className="mr-1">{asset.icon}</span>}
        {asset.label}
        <span className="text-slate-500 font-normal"> · {asset.assetType}</span>
      </p>
      <div className="space-y-1 text-[11px] border-t border-slate-600/80 pt-1.5">
        <div>
          <span className="text-slate-500">{profileName}</span>
          <span className="text-slate-200 tabular-nums ml-1">
            {asset.winRatePercent.toFixed(1)}% win · {asset.tradeCount.toLocaleString()} trades
          </span>
        </div>
        {viewerAsset ? (
          <div>
            <span className="text-slate-500">{viewerName}</span>
            <span className="text-slate-200 tabular-nums ml-1">
              {viewerAsset.winRatePercent.toFixed(1)}% win · {viewerAsset.tradeCount.toLocaleString()} trades
            </span>
          </div>
        ) : (
          <p className="text-slate-500 italic">No data for {viewerName} on this symbol.</p>
        )}
      </div>
    </div>
  );
}

function TradeQualityCompareBody({
  asset,
  profileName,
  viewerName,
  viewerAsset,
}: {
  asset: TopTradedAsset;
  profileName: string;
  viewerName: string;
  viewerAsset?: TopTradedAsset;
}) {
  const pq = asset.tradeQualityScore;
  const vq = viewerAsset?.tradeQualityScore;
  return (
    <div className="space-y-1.5">
      <p className="text-slate-100 font-semibold text-xs">
        {asset.icon && <span className="mr-1">{asset.icon}</span>}
        {asset.label}
        <span className="text-slate-500 font-normal"> · {asset.assetType}</span>
      </p>
      <div className="space-y-1 text-[11px] border-t border-slate-600/80 pt-1.5">
        <div>
          <span className="text-slate-500">{profileName}</span>
          <span className="text-slate-200 tabular-nums ml-1">
            Trade quality {pq != null ? Math.round(pq) : "—"}
            {" · "}
            {asset.winRatePercent.toFixed(1)}% win · {asset.tradeCount.toLocaleString()} trades
          </span>
        </div>
        {viewerAsset && vq != null ? (
          <div>
            <span className="text-slate-500">{viewerName}</span>
            <span className="text-slate-200 tabular-nums ml-1">
              Trade quality {Math.round(vq)}
              {" · "}
              {viewerAsset.winRatePercent.toFixed(1)}% win · {viewerAsset.tradeCount.toLocaleString()} trades
            </span>
          </div>
        ) : (
          <p className="text-slate-500 italic">No trade quality data for {viewerName} on this symbol.</p>
        )}
      </div>
    </div>
  );
}

export function ProfileHeader({
  profile,
  performance,
  topTradedAssets = [],
  viewerTopTradedAssets,
  viewerDisplayName = "You",
  onFollow,
  onShare,
  isFollowing,
  className,
}: ProfileHeaderProps) {
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const memberSince = `Member since ${joinDate}`;
  const countryName = profile.countryCode ? (COUNTRY_NAMES[profile.countryCode.toUpperCase()] ?? profile.countryCode) : null;
  const strategyHint = performance ? getStrategyDescription(performance.preferredStrategy) : undefined;
  const topWinAssets = topAssetsByWinRate(topTradedAssets, 3);
  const topQualityAssets = topAssetsByTradeQuality(topTradedAssets, 3);

  return (
    <header
      className={cn(
        "rounded-xl border border-slate-700/60 bg-slate-800 overflow-visible",
        className
      )}
    >
      <div className="h-14 aria-hidden relative z-0" />
      <div className={cn("relative px-5 sm:px-6 pt-0 z-10", !performance && "pb-5")}>
        <div className={cn("flex flex-col sm:flex-row gap-4 sm:gap-5 -mt-9", !performance && "pb-5")}>
          <Avatar className="w-20 h-20 rounded-xl border-2 border-slate-700 bg-slate-800 shadow-lg flex-shrink-0">
            <AvatarFallback className="text-base rounded-xl bg-slate-700 text-slate-200 font-semibold">
              {profile.avatar || profile.nickname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h1 className="text-lg font-semibold text-slate-100 truncate tracking-tight">
                {profile.nickname}
              </h1>
              {profile.countryCode && (
                <Tooltip content={countryName ?? profile.countryCode}>
                  <span
                    className="flex items-center cursor-default"
                    title={countryName ?? profile.countryCode}
                  >
                    <CountryFlag code={profile.countryCode} />
                  </span>
                </Tooltip>
              )}
            </div>
            <p className="text-sm text-slate-500 mb-2">{memberSince}</p>
            {profile.clan && (
              <Link
                href="/?tab=clan"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-2 inline-flex transition-colors"
              >
                {profile.clan.icon && <span className="text-sm">{profile.clan.icon}</span>}
                <span>Clan: {profile.clan.name}</span>
              </Link>
            )}
            {profile.badges.length > 0 && (
              <div className={cn("flex flex-wrap gap-1.5", performance && "mb-1 sm:mb-2")}>
                {[...profile.badges]
                  .sort((a, b) => {
                    const aFirst = /10k\s*payout/i.test(a.name) ? 0 : 1;
                    const bFirst = /10k\s*payout/i.test(b.name) ? 0 : 1;
                    return aFirst - bFirst;
                  })
                  .map((b) => (
                  <Tooltip key={b.id} content={b.name}>
                    <span>
                      <Badge
                        variant="secondary"
                        className="text-sm font-medium bg-slate-700/80 text-slate-300 border border-slate-600 cursor-default px-2 py-0.5"
                      >
                        {b.icon} {b.name}
                      </Badge>
                    </span>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <Button
              size="sm"
              className={cn(
                "text-white text-base font-medium",
                isFollowing
                  ? "bg-slate-600 hover:bg-slate-500 border border-slate-500 hover:bg-slate-500 hover:border-slate-400"
                  : "bg-success hover:bg-success/90 hover:brightness-110"
              )}
              onClick={onFollow}
            >
              {isFollowing ? (
                <Check className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 border-slate-600 text-slate-400 hover:text-slate-100 hover:border-slate-500 hover:bg-slate-700/50"
              onClick={onShare}
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {performance && (
          <div className="mt-9 -mx-5 sm:-mx-6 border-t border-slate-700/60 bg-gradient-to-b from-slate-900/55 via-slate-900/35 to-transparent px-5 sm:px-6 pt-7 pb-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-0 xl:divide-x xl:divide-slate-700/50">
              <div className="xl:pr-6 min-w-0">
                <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                      Preferred strategy
                    </p>
                    <span className="inline-flex rounded-md border border-slate-600 bg-slate-800/90 px-2.5 py-1 text-base font-semibold text-slate-100">
                      {performance.preferredStrategy}
                    </span>
                    {(performance.strategySharePercent != null ||
                      (performance.totalTrades != null && performance.totalTrades > 0)) && (
                      <p className="mt-2 text-xs text-slate-500">
                        {performance.strategySharePercent != null && (
                          <span>{performance.strategySharePercent}% of traders</span>
                        )}
                        {performance.strategySharePercent != null &&
                          performance.totalTrades != null &&
                          performance.totalTrades > 0 &&
                          " · "}
                        {performance.totalTrades != null && performance.totalTrades > 0 && (
                          <span>{performance.totalTrades.toLocaleString()} trades</span>
                        )}
                      </p>
                    )}
                    {strategyHint && (
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">{strategyHint}</p>
                    )}
                </div>
              </div>

              {(performance.winRateTopPercent != null || topWinAssets.length > 0) && (
                <div className="xl:px-6 min-w-0">
                  <div className="flex items-start gap-3">
                    <StatIcon>
                      <Percent className="h-4 w-4" aria-hidden />
                    </StatIcon>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                        Win rate vs traders
                      </p>
                      {performance.winRateTopPercent != null && (
                        <p className="text-2xl font-semibold tabular-nums text-slate-100 tracking-tight">
                          Top {performance.winRateTopPercent}%
                          <span className="text-lg text-slate-400 font-medium"> win rate</span>
                        </p>
                      )}
                      {topWinAssets.length > 0 && (
                        <div className={cn("space-y-1.5", performance.winRateTopPercent != null && "mt-3")}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                            Highest win rate assets
                          </p>
                          <ul className="space-y-1">
                            {topWinAssets.map((asset) => (
                              <li key={asset.symbol} className="w-full">
                                <Tooltip
                                  content={
                                    <WinRateCompareBody
                                      asset={asset}
                                      profileName={profile.nickname}
                                      viewerName={viewerDisplayName}
                                      viewerAsset={findViewerAsset(viewerTopTradedAssets, asset.symbol)}
                                    />
                                  }
                                  contentClassName={compareTooltipClass}
                                  className="block w-full"
                                >
                                  <div className="rounded-md border border-slate-700/60 bg-slate-800/40 px-2.5 py-1.5 flex items-center justify-between gap-2 cursor-default hover:border-slate-600/70 transition-colors">
                                    <span className="text-sm text-slate-200 truncate min-w-0">
                                      {asset.icon && <span className="mr-1">{asset.icon}</span>}
                                      {asset.label}
                                    </span>
                                    <span className="text-sm tabular-nums text-emerald-400/90 shrink-0">
                                      {asset.winRatePercent.toFixed(1)}%
                                    </span>
                                  </div>
                                </Tooltip>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[10px] text-slate-600 pt-0.5">Hover a row to compare with {viewerDisplayName}.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {(performance.tradeQualityTopPercent != null || topQualityAssets.length > 0) && (
                <div className="xl:px-6 min-w-0">
                  <div className="flex items-start gap-3">
                    <StatIcon>
                      <Award className="h-4 w-4" aria-hidden />
                    </StatIcon>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                        Trade quality vs traders
                      </p>
                      {performance.tradeQualityTopPercent != null && (
                        <p className="text-2xl font-semibold tabular-nums text-white tracking-tight">
                          Top {performance.tradeQualityTopPercent}%
                          <span className="text-lg text-slate-400 font-medium"> trade quality</span>
                        </p>
                      )}
                      {topQualityAssets.length > 0 && (
                        <div className={cn("space-y-1.5", performance.tradeQualityTopPercent != null && "mt-3")}>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                            Highest trade quality assets
                          </p>
                          <ul className="space-y-1">
                            {topQualityAssets.map((asset) => (
                              <li key={`q-${asset.symbol}`} className="w-full">
                                <Tooltip
                                  content={
                                    <TradeQualityCompareBody
                                      asset={asset}
                                      profileName={profile.nickname}
                                      viewerName={viewerDisplayName}
                                      viewerAsset={findViewerAsset(viewerTopTradedAssets, asset.symbol)}
                                    />
                                  }
                                  contentClassName={compareTooltipClass}
                                  className="block w-full"
                                >
                                  <div className="rounded-md border border-slate-700/60 bg-slate-800/40 px-2.5 py-1.5 flex items-center justify-between gap-2 cursor-default hover:border-slate-600/70 transition-colors">
                                    <span className="text-sm text-slate-200 truncate min-w-0">
                                      {asset.icon && <span className="mr-1">{asset.icon}</span>}
                                      {asset.label}
                                    </span>
                                    <span className="text-sm tabular-nums text-violet-300/90 shrink-0">
                                      {asset.tradeQualityScore != null ? Math.round(asset.tradeQualityScore) : "—"}
                                    </span>
                                  </div>
                                </Tooltip>
                              </li>
                            ))}
                          </ul>
                          <p className="text-[10px] text-slate-600 pt-0.5">Hover a row to compare with {viewerDisplayName}.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
