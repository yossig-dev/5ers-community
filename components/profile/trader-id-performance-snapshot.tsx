"use client";

import { TrendingUp, Percent, Award } from "lucide-react";
import { STRATEGY_DESCRIPTIONS } from "@/lib/strategy-descriptions";
import type { PreferredStrategy } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

export interface TraderIdPerformanceSnapshotProps {
  preferredStrategy: PreferredStrategy;
  qualityScore: number;
  /** Overall average win rate (e.g. from profile.averages.winRatePercent) */
  overallAvgWinRatePercent?: number;
  /** Total trades (e.g. profile.averages.totalTrades) — shown in strategy section if provided */
  totalTrades?: number;
  /** Share of traders who use this strategy (0–100) — e.g. 24 for "24% of traders" */
  strategySharePercent?: number;
  /** Community average win rate — shown under overall average win rate */
  communityAvgWinRatePercent?: number;
  /** Community average trade quality (0–100) — shown under avg trade quality */
  communityAvgQualityScore?: number;
  /** When true, no outer section border/bg (for embedding in a shared row card) */
  embedded?: boolean;
  className?: string;
}

export function TraderIdPerformanceSnapshot({
  preferredStrategy,
  qualityScore,
  overallAvgWinRatePercent,
  totalTrades,
  strategySharePercent,
  communityAvgWinRatePercent,
  communityAvgQualityScore,
  embedded = false,
  className,
}: TraderIdPerformanceSnapshotProps) {
  const rounded = Math.round(qualityScore);
  const strategyDescription = STRATEGY_DESCRIPTIONS[preferredStrategy];

  const labelClass = "text-sm font-medium text-slate-500";
  const valueClass = "text-base font-semibold tabular-nums text-slate-100";
  const iconClass = "h-4 w-4 text-slate-500 shrink-0";

  const content = (
    <div className={cn("flex flex-col", embedded && "h-full justify-start")}>
      {embedded && (
        <div className="mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Performance
          </h3>
        </div>
      )}
      {/* Single unboxed block: strategy, win rate, quality with dividers and icons */}
      <dl className={cn("divide-y divide-slate-700/60", embedded && "pt-1")}>
        {/* Preferred strategy */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-3 first:pt-0">
          <div className="min-w-0">
            <dt className={cn("flex items-center gap-2", labelClass)}>
              <TrendingUp className={iconClass} aria-hidden />
              Preferred strategy
            </dt>
            {(strategySharePercent != null || (totalTrades != null && totalTrades > 0)) && (
              <dd className="mt-1 text-sm text-slate-500">
                {strategySharePercent != null && <span>{strategySharePercent}% of traders</span>}
                {strategySharePercent != null && totalTrades != null && totalTrades > 0 && " · "}
                {totalTrades != null && totalTrades > 0 && (
                  <span>{totalTrades.toLocaleString()} trades</span>
                )}
              </dd>
            )}
            {strategyDescription && (
              <dd className="mt-1 text-sm text-slate-500">{strategyDescription}</dd>
            )}
          </div>
          <dd className="sm:shrink-0 sm:pl-4 sm:text-right">
            <span className="inline-block rounded-md border border-slate-600 bg-slate-800/80 px-2.5 py-1 text-base font-semibold text-slate-100">
              {preferredStrategy}
            </span>
          </dd>
        </div>

        {/* Overall average win rate */}
        {overallAvgWinRatePercent != null && (
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-3">
            <div className="min-w-0">
              <dt className={cn("flex items-center gap-2", labelClass)}>
                <Percent className={iconClass} aria-hidden />
                Overall average win rate
              </dt>
              {communityAvgWinRatePercent != null && (
                <dd className="mt-1 text-sm text-slate-500">
                  Community average: {communityAvgWinRatePercent.toFixed(1)}%
                </dd>
              )}
            </div>
            <dd className={cn("mt-0 sm:shrink-0 sm:pl-4 sm:text-right", valueClass)}>
              {overallAvgWinRatePercent.toFixed(1)}%
            </dd>
          </div>
        )}

        {/* Average trade quality */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-3 last:pb-0">
          <div className="min-w-0">
            <dt className={cn("flex items-center gap-2", labelClass)}>
              <Award className={iconClass} aria-hidden />
              Average trade quality
            </dt>
            {communityAvgQualityScore != null && (
              <dd className="mt-1 text-sm text-slate-500">
                Community average: {Math.round(communityAvgQualityScore)}
              </dd>
            )}
          </div>
          <dd className={cn("mt-0 sm:shrink-0 sm:pl-4 sm:text-right", valueClass, "text-white")}>
            {rounded}
          </dd>
        </div>
      </dl>
    </div>
  );

  if (embedded) {
    return <div className={cn("flex flex-col", className)}>{content}</div>;
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5",
        className
      )}
    >
      {content}
    </section>
  );
}
