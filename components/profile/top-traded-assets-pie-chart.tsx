"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TopTradedAsset } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

const SLICE_COLORS = [
  "rgb(16 185 129)",
  "rgb(59 130 246)",
  "rgb(168 85 247)",
  "rgb(245 158 11)",
  "rgb(236 72 153)",
  "rgb(34 211 238)",
  "rgb(148 163 184)",
];

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export type TopTradedAssetsPieMode = "trades" | "volume";

export interface TopTradedAssetsPieChartProps {
  assets: TopTradedAsset[];
  profileName: string;
  viewerAssets?: TopTradedAsset[];
  viewerName?: string;
  height?: number;
  embedded?: boolean;
  className?: string;
}

type PieDatum = {
  symbol: string;
  label: string;
  icon?: string;
  value: number;
  sharePercent: number;
  tradeCount: number;
  winRatePercent: number;
  volumeUsd: number;
  assetType: string;
};

function findViewerAsset(
  viewerAssets: TopTradedAsset[] | undefined,
  symbol: string
): TopTradedAsset | undefined {
  return viewerAssets?.find((a) => a.symbol === symbol);
}

function sumTradeCount(list: TopTradedAsset[]) {
  return list.reduce((s, a) => s + a.tradeCount, 0);
}

function sumVolumeUsd(list: TopTradedAsset[]) {
  return list.reduce((s, a) => s + (a.volumeUsd ?? 0), 0);
}

function buildPieData(assets: TopTradedAsset[], mode: TopTradedAssetsPieMode): PieDatum[] {
  if (mode === "trades") {
    const total = sumTradeCount(assets);
    if (total <= 0) return [];
    return assets.map((a) => ({
      symbol: a.symbol,
      label: a.label,
      icon: a.icon,
      value: a.tradeCount,
      sharePercent: (a.tradeCount / total) * 100,
      tradeCount: a.tradeCount,
      winRatePercent: a.winRatePercent,
      volumeUsd: a.volumeUsd ?? 0,
      assetType: a.assetType,
    }));
  }
  const withVol = assets.filter((a) => (a.volumeUsd ?? 0) > 0);
  const totalVol = sumVolumeUsd(withVol);
  if (totalVol <= 0) return [];
  return withVol.map((a) => {
    const vol = a.volumeUsd ?? 0;
    return {
      symbol: a.symbol,
      label: a.label,
      icon: a.icon,
      value: vol,
      sharePercent: (vol / totalVol) * 100,
      tradeCount: a.tradeCount,
      winRatePercent: a.winRatePercent,
      volumeUsd: vol,
      assetType: a.assetType,
    };
  });
}

function viewerPortfolioSharePercent(
  viewerAssets: TopTradedAsset[] | undefined,
  symbol: string,
  mode: TopTradedAssetsPieMode
): number | null {
  if (!viewerAssets?.length) return null;
  const v = findViewerAsset(viewerAssets, symbol);
  if (!v) return null;
  if (mode === "trades") {
    const t = sumTradeCount(viewerAssets);
    if (t <= 0) return null;
    return (v.tradeCount / t) * 100;
  }
  const vol = sumVolumeUsd(viewerAssets);
  if (vol <= 0) return null;
  return ((v.volumeUsd ?? 0) / vol) * 100;
}

function CustomTooltip({
  active,
  payload,
  profileName,
  viewerName,
  viewerAssets,
  mode,
}: {
  active?: boolean;
  payload?: Array<{ payload: PieDatum }>;
  profileName: string;
  viewerName: string;
  viewerAssets?: TopTradedAsset[];
  mode: TopTradedAssetsPieMode;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as PieDatum;
  const v = findViewerAsset(viewerAssets, d.symbol);
  const viewerShare = viewerPortfolioSharePercent(viewerAssets, d.symbol, mode);

  const shareLabel =
    mode === "trades" ? "Share of profile trades" : "Share of profile volume";

  return (
    <div className="rounded-lg border border-slate-600 bg-slate-900/95 px-3 py-2.5 shadow-xl text-left max-w-[280px] backdrop-blur-sm">
      <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
        {d.icon && <span aria-hidden>{d.icon}</span>}
        {d.label}
        <span className="text-slate-500 font-normal text-xs">· {d.assetType}</span>
      </p>
      <p className="text-xs text-slate-500 mt-1">
        {shareLabel}: {d.sharePercent.toFixed(1)}%
      </p>
      {mode === "volume" && d.volumeUsd > 0 && (
        <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
          Notional: {usdFormatter.format(d.volumeUsd)}
        </p>
      )}
      <div className="mt-2 pt-2 border-t border-slate-700/80 space-y-1.5 text-xs">
        <div>
          <span className="text-slate-500">{profileName}</span>
          <span className="text-slate-300 ml-1.5 tabular-nums">
            {d.tradeCount.toLocaleString()} trades · {d.winRatePercent.toFixed(1)}% win
            {mode === "volume" && d.volumeUsd > 0 && (
              <span className="text-slate-400"> · {usdFormatter.format(d.volumeUsd)}</span>
            )}
          </span>
        </div>
        {v ? (
          <div>
            <span className="text-slate-500">{viewerName}</span>
            <span className="text-slate-300 ml-1.5 tabular-nums">
              {v.tradeCount.toLocaleString()} trades · {v.winRatePercent.toFixed(1)}% win
              {mode === "volume" && (v.volumeUsd ?? 0) > 0 && (
                <span className="text-slate-400"> · {usdFormatter.format(v.volumeUsd ?? 0)}</span>
              )}
            </span>
            {viewerShare != null && (
              <span className="block text-slate-500 mt-0.5">
                {viewerShare.toFixed(1)}% of your {mode === "trades" ? "trades" : "volume"} on this symbol
              </span>
            )}
          </div>
        ) : (
          <p className="text-slate-600 italic">No matching data for {viewerName} on this symbol.</p>
        )}
      </div>
    </div>
  );
}

export function TopTradedAssetsPieChart({
  assets,
  profileName,
  viewerAssets,
  viewerName = "You",
  height = 280,
  embedded = false,
  className,
}: TopTradedAssetsPieChartProps) {
  const [mode, setMode] = useState<TopTradedAssetsPieMode>("trades");

  const volumeAvailable = useMemo(() => sumVolumeUsd(assets) > 0, [assets]);

  const data: PieDatum[] = useMemo(() => {
    if (mode === "volume" && !volumeAvailable) return buildPieData(assets, "trades");
    return buildPieData(assets, mode);
  }, [assets, mode, volumeAvailable]);

  const effectiveMode: TopTradedAssetsPieMode =
    mode === "volume" && !volumeAvailable ? "trades" : mode;

  const sectionTitleClass = "text-sm font-semibold uppercase tracking-wider text-slate-500";

  if (assets.length === 0) {
    return (
      <div className={cn(embedded ? "" : "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5", className)}>
        <h3 className={cn(sectionTitleClass, "mb-2")}>Top traded assets</h3>
        <p className="text-slate-500 text-sm">No trade distribution data.</p>
      </div>
    );
  }

  const toggleBtn =
    "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className={cn("flex flex-col relative", className)}>
      <div className="mb-3 w-full space-y-2">
        <h3 className={sectionTitleClass}>Top traded assets</h3>
        <div
          className="flex w-full max-w-full rounded-lg border border-slate-500/70 bg-slate-800 p-1 shadow-sm"
          role="group"
          aria-label="Pie chart: trades or volume"
        >
          <button
            type="button"
            className={cn(
              toggleBtn,
              effectiveMode === "trades"
                ? "bg-emerald-600/90 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/80"
            )}
            onClick={() => setMode("trades")}
            aria-pressed={effectiveMode === "trades"}
          >
            Trades
          </button>
          <button
            type="button"
            className={cn(
              toggleBtn,
              effectiveMode === "volume"
                ? "bg-emerald-600/90 text-white shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-slate-700/80"
            )}
            onClick={() => setMode("volume")}
            disabled={!volumeAvailable}
            title={!volumeAvailable ? "Volume data not available" : undefined}
            aria-pressed={effectiveMode === "volume"}
          >
            Volume ($)
          </button>
        </div>
        <p className="text-xs text-slate-500">
          {effectiveMode === "trades"
            ? "By number of trades. Hover a slice for win rate and comparison."
            : "By notional volume (USD). Hover a slice for details and comparison."}
        </p>
      </div>
      {data.length === 0 ? (
        <p className="text-slate-500 text-sm py-8 text-center">No data for this view.</p>
      ) : (
        <>
          <div className="w-full" style={{ minHeight: height, height }}>
            <ResponsiveContainer width="100%" height={height}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius="48%"
                  outerRadius="78%"
                  paddingAngle={2}
                  stroke="rgb(15 23 42)"
                  strokeWidth={2}
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={(props) => (
                    <CustomTooltip
                      active={props.active}
                      payload={props.payload as Array<{ payload: PieDatum }> | undefined}
                      profileName={profileName}
                      viewerName={viewerName}
                      viewerAssets={viewerAssets}
                      mode={effectiveMode}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-1 justify-center text-[11px] text-slate-500">
            {data.map((d, i) => (
              <li key={d.symbol} className="flex items-center gap-1">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: SLICE_COLORS[i % SLICE_COLORS.length] }}
                  aria-hidden
                />
                <span className="text-slate-400">{d.label}</span>
                <span className="tabular-nums">{d.sharePercent.toFixed(1)}%</span>
                {effectiveMode === "volume" && d.volumeUsd > 0 && (
                  <span className="text-slate-600 tabular-nums">({usdFormatter.format(d.volumeUsd)})</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
