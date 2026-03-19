"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react";
import type { TopTradedAsset } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

export interface TopTradedAssetsSectionProps {
  assets: TopTradedAsset[];
  className?: string;
}

type ViewMode = "table" | "cards";
type SortKey = "tradeCount" | "winRatePercent" | "label" | "assetType";
type SortDir = "asc" | "desc";

function WinRateCell({ value }: { value: number }) {
  const isPositive = value > 50;
  return (
    <span
      className={cn(
        "tabular-nums font-medium text-base",
        isPositive ? "text-success" : "text-slate-500"
      )}
    >
      {value.toFixed(1)}%
    </span>
  );
}

export function TopTradedAssetsSection({
  assets,
  className,
}: TopTradedAssetsSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [sortKey, setSortKey] = useState<SortKey>("tradeCount");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const a = [...assets];
    a.sort((x, y) => {
      let diff = 0;
      if (sortKey === "tradeCount") diff = x.tradeCount - y.tradeCount;
      else if (sortKey === "winRatePercent") diff = x.winRatePercent - y.winRatePercent;
      else if (sortKey === "label") diff = (x.label || x.symbol).localeCompare(y.label || y.symbol);
      else if (sortKey === "assetType") diff = x.assetType.localeCompare(y.assetType);
      return sortDir === "asc" ? diff : -diff;
    });
    return a;
  }, [assets, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "label" || key === "assetType" ? "asc" : "desc");
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5" />
    );
  };

  const sectionTitleClass = "text-sm font-semibold uppercase tracking-wider text-slate-500";

  if (assets.length === 0) {
    return (
      <section
        className={cn(
          "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5",
          className
        )}
      >
        <h3 className={cn(sectionTitleClass, "mb-4")}>
          Top Traded Assets
        </h3>
        <p className="text-slate-500 text-base">No trade data yet.</p>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-slate-700/60 bg-slate-900/80 overflow-hidden",
        className
      )}
    >
      <div className="py-4 px-5 border-b border-slate-700/50 flex flex-wrap items-center justify-between gap-2">
        <h3 className={sectionTitleClass}>
          Top Traded Assets
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "table"
                ? "bg-slate-700 text-slate-200"
                : "text-slate-500 hover:text-slate-300"
            )}
            title="Table view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("cards")}
            className={cn(
              "p-2 rounded-md transition-colors",
              viewMode === "cards"
                ? "bg-slate-700 text-slate-200"
                : "text-slate-500 hover:text-slate-300"
            )}
            title="Card view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-700/50">
                <th className="py-3 px-5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("label")}
                    className="flex items-center gap-1 hover:text-slate-400"
                  >
                    Asset
                    <SortIcon columnKey="label" />
                  </button>
                </th>
                <th className="py-3 px-5 font-medium">
                  <button
                    type="button"
                    onClick={() => toggleSort("assetType")}
                    className="flex items-center gap-1 hover:text-slate-400"
                  >
                    Type
                    <SortIcon columnKey="assetType" />
                  </button>
                </th>
                <th className="py-3 px-5 font-medium text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort("tradeCount")}
                    className="flex items-center justify-end gap-1 w-full hover:text-slate-400"
                  >
                    Trades
                    <SortIcon columnKey="tradeCount" />
                  </button>
                </th>
                <th className="py-3 px-5 font-medium text-right">
                  <button
                    type="button"
                    onClick={() => toggleSort("winRatePercent")}
                    className="flex items-center justify-end gap-1 w-full hover:text-slate-400"
                  >
                    Win Rate
                    <SortIcon columnKey="winRatePercent" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((asset) => (
                <tr
                  key={asset.symbol}
                  className="border-b border-slate-700/50 hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-5">
                    <span className="font-medium text-slate-200 text-base">
                      {asset.icon && <span className="mr-1.5">{asset.icon}</span>}
                      {asset.label}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-slate-500 text-base">{asset.assetType}</td>
                  <td className="py-3 px-5 text-right tabular-nums text-slate-300 text-base">
                    {asset.tradeCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <WinRateCell value={asset.winRatePercent} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((asset) => (
            <div
              key={asset.symbol}
              className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {asset.icon && <span className="text-base">{asset.icon}</span>}
                <span className="font-medium text-slate-200 text-base">{asset.label}</span>
              </div>
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">{asset.assetType}</p>
              <div className="flex justify-between text-sm text-slate-400">
                <span className="tabular-nums">{asset.tradeCount.toLocaleString()} trades</span>
                <WinRateCell value={asset.winRatePercent} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
