"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, X } from "lucide-react";
import type { AchievementCredential } from "@/lib/types/trader-profile";
import { BADGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Resolve description/requirement from system BADGES when achievement.id matches */
function getSystemAchievementText(achievement: AchievementCredential): { description: string; requirement: string } {
  const system = achievement.id ? BADGES[achievement.id as keyof typeof BADGES] : null;
  return {
    description: system?.description ?? achievement.description ?? "No description.",
    requirement: system?.requirement ?? achievement.description ?? "No requirement details.",
  };
}

function formatEarnedDate(earnedAt: string): string {
  try {
    const d = new Date(earnedAt);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return earnedAt;
  }
}

/** Visual tier indicator: filled dots for current tier, outline for remaining (e.g. tier 2 of 5) */
function TierDots({ tier, maxTiers }: { tier: number; maxTiers: number }) {
  return (
    <div className="flex items-center justify-center gap-1 mt-1.5" aria-label={`Tier ${tier} of ${maxTiers}`}>
      {Array.from({ length: maxTiers }, (_, i) => (
        <span
          key={i}
          className={cn(
            "rounded-full transition-colors",
            i < tier
              ? "h-2 w-2 bg-amber-500"
              : "h-2 w-2 border border-slate-500 bg-slate-800/60"
          )}
        />
      ))}
    </div>
  );
}

export interface AchievementsSectionProps {
  achievements: AchievementCredential[];
  /** Wide layout: full-width grid with more columns and taller area */
  layout?: "default" | "wide";
  className?: string;
}

export function AchievementsSection({
  achievements,
  layout = "default",
  className,
}: AchievementsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (achievements.length === 0) return null;

  const isWide = layout === "wide";
  const preview = isWide ? achievements.slice(0, 10) : achievements.slice(0, 6);

  const sectionTitleClass = "text-sm font-semibold uppercase tracking-wider text-slate-500";

  return (
    <section
      className={cn(
        "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 sm:p-6",
        isWide && "min-h-[380px] lg:min-h-[420px]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={sectionTitleClass}>
          Achievements
        </h3>
        {achievements.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-200 text-sm font-medium"
            onClick={() => setModalOpen(true)}
          >
            Browse all ({achievements.length})
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Button>
        )}
      </div>
      <div
        className={cn(
          "grid overflow-visible",
          isWide ? "gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "gap-3 grid-cols-2"
        )}
      >
        {preview.map((a) => (
          <div
            key={a.id}
            className={cn(
              "min-w-0 overflow-visible",
              isWide ? "min-h-[176px]" : "h-[132px]"
            )}
          >
            <AchievementCard achievement={a} compact={!isWide} />
          </div>
        ))}
      </div>
      {modalOpen && (
        <AchievementsModal
          achievements={achievements}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}

function AchievementCard({
  achievement,
  compact = false,
}: {
  achievement: AchievementCredential;
  compact?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { description: tooltipDescription } = getSystemAchievementText(achievement);

  useEffect(() => () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  }, []);

  const handleEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setShowTooltip(true);
  };
  const handleLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setShowTooltip(false), 150);
  };

  const card = (
    <div
      className={cn(
        "rounded-lg border border-slate-700/50 bg-slate-800/50 text-center hover:border-slate-600/50 transition-colors cursor-default w-full h-full flex flex-col items-center justify-center",
        compact ? "p-3" : "p-4 sm:p-5 min-h-[176px]"
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span
        className={cn("block mb-2 flex-shrink-0 leading-none", compact ? "text-lg" : "text-2xl sm:text-3xl")}
        aria-hidden
      >
        {achievement.icon}
      </span>
      <p
        className={cn(
          "font-medium text-slate-200 w-full px-0.5",
          compact ? "text-base truncate" : "text-sm sm:text-base leading-snug line-clamp-2"
        )}
      >
        {achievement.name}
      </p>
      {achievement.earnedAt && (
        <p className={cn("text-slate-500 flex-shrink-0", compact ? "text-sm mt-0.5" : "text-xs sm:text-sm mt-1.5")}>
          Earned {formatEarnedDate(achievement.earnedAt)}
        </p>
      )}
      {achievement.tier != null && achievement.maxTiers != null && achievement.maxTiers > 1 && (
        <TierDots tier={achievement.tier} maxTiers={achievement.maxTiers} />
      )}
    </div>
  );

  return (
    <div className="relative block w-full h-full">
      {card}
      {showTooltip && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-3 text-sm text-slate-200 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-[9999] pointer-events-none whitespace-normal max-w-[340px] w-max text-left"
        >
          <p className="text-slate-200 text-base">{tooltipDescription}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-slate-800" />
        </div>
      )}
    </div>
  );
}

function AchievementsModal({
  achievements,
  onClose,
}: {
  achievements: AchievementCredential[];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-700/60 rounded-xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between py-4 px-5 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-100 tracking-tight">Achievements</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-500 hover:text-slate-100"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-y-auto p-5 grid grid-cols-2 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4 text-center hover:border-slate-600/50 transition-colors h-[140px] flex flex-col items-center justify-center"
            >
              <span className="text-lg block mb-1.5 flex-shrink-0" aria-hidden>
                {a.icon}
              </span>
              <p className="text-base font-medium text-slate-200 truncate w-full">{a.name}</p>
              {a.description && (
                <p className="text-sm text-slate-500 mt-1 line-clamp-2 w-full">{a.description}</p>
              )}
              {a.earnedAt && (
                <p className="text-sm text-slate-500 mt-0.5 flex-shrink-0">Earned {formatEarnedDate(a.earnedAt)}</p>
              )}
              {a.tier != null && a.maxTiers != null && a.maxTiers > 1 && (
                <TierDots tier={a.tier} maxTiers={a.maxTiers} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
