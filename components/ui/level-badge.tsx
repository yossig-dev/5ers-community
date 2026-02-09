import { cn } from "@/lib/utils";
import type { TradingLevel } from "@/lib/constants";
import { Tooltip } from "./tooltip";

interface LevelBadgeProps {
  level: TradingLevel;
  className?: string;
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  return (
    <Tooltip content={level.title}>
      <span className={cn(`text-base ${level.color} cursor-help`, className)}>
        {level.icon}
      </span>
    </Tooltip>
  );
}

interface XPProgressBarProps {
  xp: number;
  level: TradingLevel;
  nextLevel?: TradingLevel;
  className?: string;
}

export function XPProgressBar({ xp, level, nextLevel, className }: XPProgressBarProps) {
  const xpInLevel = xp - level.minXP;
  const xpNeeded = level.maxXP - level.minXP;
  const progress = Math.min((xpInLevel / xpNeeded) * 100, 100);
  const xpToNext = nextLevel ? nextLevel.minXP - xp : 0;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Level Progress</span>
        <span className={`font-semibold ${level.color}`}>
          {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
        </span>
      </div>
      <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 bg-purple-500"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
      {nextLevel && xpToNext > 0 && (
        <p className="text-xs text-slate-500">
          {xpToNext.toLocaleString()} XP to {nextLevel.title}
        </p>
      )}
      {!nextLevel && (
        <p className="text-xs text-purple-400 font-semibold">
          🎉 Max Level Achieved!
        </p>
      )}
    </div>
  );
}
