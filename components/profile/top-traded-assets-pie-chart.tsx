"use client";

import { useMemo } from "react";
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
  tradeCount: number;
  winRatePercent: number;
  assetType: string;
};

function findViewerAsset(
  viewerAssets: TopTradedAsset[] | undefined,
  symbol: string
): TopTradedAsset | undefined {
  return viewerAssets?.find((a) => a.symbol === symbol);
}

function CustomTooltip({
  active,
  payload,
  profileName,
  viewerName,
  viewerAssets,
}: {
  active?: boolean;
  payload?: Array<{ payload: PieDatum }>;
  profileName: string;
  viewerName: string;
  viewerAssets?: TopTradedAsset[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as PieDatum;
  const v = findViewerAsset(viewerAssets, d.symbol);

  return (
    <div className="rounded-lg border border-slate-600 bg-slate-900/95 px-3 py-2.5 shadow-xl text-left max-w-[260px] backdrop-blur-sm">
      <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
        {d.icon && <span aria-hidden>{d.icon}</span>}
        {d.label}
        <span className="text-slate-500 font-normal text-xs">· {d.assetType}</span>
      </p>
      <p className="text-xs text-slate-500 mt-1">Share of profile volume: {d.value}%</p>
      <div className="mt-2 pt-2 border-t border-slate-700/80 space-y-1.5 text-xs">
        <div>
          <span className="text-slate-500">{profileName}</span>
          <span className="text-slate-300 ml-1.5 tabular-nums">
            {d.tradeCount.toLocaleString()} trades · {d.winRatePercent.toFixed(1)}% win rate
          </span>
        </div>
        {v ? (
          <div>
            <span className="text-slate-500">{viewerName}</span>
            <span className="text-slate-300 ml-1.5 tabular-nums">
              {v.tradeCount.toLocaleString()} trades · {v.winRatePercent.toFixed(1)}% win rate
            </span>
            <span className="block text-slate-500 mt-0.5">
              {v.sharePercent}% of your volume on this symbol
            </span>
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
  const data: PieDatum[] = useMemo(
    () =>
      assets.map((a) => ({
        symbol: a.symbol,
        label: a.label,
        icon: a.icon,
        value: a.sharePercent,
        tradeCount: a.tradeCount,
        winRatePercent: a.winRatePercent,
        assetType: a.assetType,
      })),
    [assets]
  );

  const sectionTitleClass = "text-sm font-semibold uppercase tracking-wider text-slate-500";

  if (data.length === 0) {
    return (
      <div className={cn(embedded ? "" : "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5", className)}>
        <h3 className={cn(sectionTitleClass, "mb-2")}>Top traded assets</h3>
        <p className="text-slate-500 text-sm">No trade distribution data.</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2">
        <h3 className={sectionTitleClass}>Top traded assets</h3>
        <p className="text-xs text-slate-500 mt-1">Hover a slice for win rate, trades, and comparison.</p>
      </div>
      <div className="w-full flex-1 min-h-0" style={{ minHeight: height }}>
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
            <span className="tabular-nums">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
