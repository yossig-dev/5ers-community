"use client";

import { useState, useMemo } from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { TraderSkills } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

export interface SkillsSpiderChartProps {
  /** Profile owner's skills (0–100 each) */
  skills: TraderSkills;
  /** Profile owner's display name for legend */
  traderName: string;
  /** Viewer's skills for hover overlay comparison; when present, hover shows comparison */
  viewerSkills?: TraderSkills;
  /** Viewer's display name for legend (e.g. "You" or username) */
  viewerName?: string;
  /** Chart height in px (default 280); use smaller e.g. 220 when inline with Trader ID row */
  height?: number;
  /** When true, no outer section border/padding (for embedding in a shared row card) */
  embedded?: boolean;
  className?: string;
}

const SKILL_KEYS: (keyof TraderSkills)[] = [
  "consistency",
  "discipline",
  "timing",
  "sizing",
  "riskManagement",
];

const SKILL_LABELS: Record<keyof TraderSkills, string> = {
  consistency: "Consistency",
  discipline: "Discipline",
  timing: "Timing",
  sizing: "Sizing",
  riskManagement: "Risk Mgmt",
};

function toChartData(skills: TraderSkills, viewerSkills?: TraderSkills) {
  return SKILL_KEYS.map((key) => ({
    subject: SKILL_LABELS[key],
    key,
    profile: skills[key],
    ...(viewerSkills && { viewer: viewerSkills[key] }),
  }));
}

/**
 * Spider/Radar chart for 5 skills.
 * On hover over the chart, overlays the viewer's spider data (viewerSkills) with a distinct
 * semi-transparent color for at-a-glance comparison.
 */
export function SkillsSpiderChart({
  skills,
  traderName,
  viewerSkills,
  viewerName = "You",
  height = 280,
  embedded = false,
  className,
}: SkillsSpiderChartProps) {
  const [isHovering, setIsHovering] = useState(false);
  const showComparison = Boolean(viewerSkills && isHovering);
  const data = useMemo(
    () => toChartData(skills, viewerSkills),
    [skills, viewerSkills]
  );

  const content = (
    <>
      <div className="mb-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Skills
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
            {traderName}
          </span>
          {viewerSkills && showComparison && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
              {viewerName}
            </span>
          )}
        </div>
      </div>
      <div className="w-full pt-3" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsRadarChart data={data} cx="50%" cy="55%" outerRadius="92%">
            <PolarGrid stroke="rgb(51 65 85)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "rgb(148 163 184)", fontSize: 11 }}
              tickLine={{ stroke: "rgb(71 85 105)" }}
            />
            <Radar
              name={traderName}
              dataKey="profile"
              stroke="rgb(16 185 129)"
              fill="rgb(16 185 129)"
              fillOpacity={showComparison ? 0.35 : 0.6}
              strokeWidth={2}
            />
            {viewerSkills && isHovering && (
              <Radar
                name={viewerName}
                dataKey="viewer"
                stroke="none"
                strokeWidth={0}
                strokeOpacity={0}
                fill="rgb(59 130 246)"
                fillOpacity={0.5}
                dot={false}
                activeDot={false}
                isAnimationActive
                animationDuration={400}
                animationEasing="ease-out"
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(30 41 59)",
                border: "1px solid rgb(51 65 85)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "rgb(203 213 225)" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length || !label) return null;
                const profileVal = payload.find((p) => p.dataKey === "profile")?.value;
                const viewerVal = payload.find((p) => p.dataKey === "viewer")?.value;
                return (
                  <div className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 shadow-xl text-sm">
                    <p className="text-slate-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-success font-medium tabular-nums">{traderName}: {Number(profileVal)}</p>
                    {viewerSkills && viewerVal != null && (
                      <p className="text-blue-400 font-medium tabular-nums">{viewerName}: {Number(viewerVal)}</p>
                    )}
                  </div>
                );
              }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        className={cn("flex flex-col", className)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {content}
      </div>
    );
  }

  return (
    <section
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/60 p-6",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {content}
    </section>
  );
}
