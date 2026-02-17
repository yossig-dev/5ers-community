"use client";

import { motion } from "framer-motion";
import { Award, Lock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareAchievement } from "@/components/ui/share-achievement";
import { TierStars } from "@/components/ui/tier-stars";
import { Tooltip } from "@/components/ui/tooltip";
import { ALL_ACHIEVEMENTS, MOCK_USERS, WEARABLE_BADGE_IDS } from "@/lib/constants";
import { USER_ACHIEVEMENT_PROGRESS } from "@/lib/achievement-progress";
import { formatDate } from "@/lib/utils";
import type { Badge as AchievementBadge } from "@/lib/constants";

export function AchievementsPage({ 
  onBack,
  wornBadges,
  onToggleBadge
}: { 
  onBack: () => void;
  wornBadges: Set<string>;
  onToggleBadge: (badgeId: string) => void;
}) {
  // Get the current user's achievements (TradeKing)
  const currentUser = MOCK_USERS[0];
  const userAchievements = currentUser.badges.map((b) => b.id);
  
  // Create a map of badge ID to unlock date
  const unlockDates = new Map(
    (currentUser.unlockedBadges || []).map((ub) => [ub.badge.id, ub.unlockedAt])
  );

  // Group achievements by category
  const categories = Array.from(
    new Set(ALL_ACHIEVEMENTS.map((a) => a.category))
  );

  const achievementsByCategory = categories.map((category) => ({
    name: category,
    achievements: ALL_ACHIEVEMENTS.filter((a) => a.category === category),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <Award className="w-8 h-8 text-success" />
            All Achievements
          </h2>
          <p className="text-slate-400 mt-1">
            Track your progress and unlock badges
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Achievements by Category */}
      {achievementsByCategory.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            {category.name}
            <Badge variant="outline" className="text-slate-400">
              {category.achievements.filter((a) => userAchievements.includes(a.id)).length} / {category.achievements.length}
            </Badge>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
            {category.achievements.map((achievement, index) => {
              const progress = USER_ACHIEVEMENT_PROGRESS[achievement.id];
              const unlockDate = unlockDates.get(achievement.id);
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={userAchievements.includes(achievement.id)}
                  progress={progress}
                  unlockDate={unlockDate}
                  delay={index * 0.05}
                  wornBadges={wornBadges}
                  onToggleBadge={onToggleBadge}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AchievementCard({
  achievement,
  unlocked,
  progress,
  unlockDate,
  delay,
  wornBadges,
  onToggleBadge,
}: {
  achievement: AchievementBadge;
  unlocked: boolean;
  progress?: { current: number; required: number; currentTier?: number };
  unlockDate?: Date;
  delay: number;
  wornBadges: Set<string>;
  onToggleBadge: (badgeId: string) => void;
}) {
  const currentTier = progress?.currentTier || 0;
  const nextTier = currentTier + 1;
  
  // For tiered achievements, get current and next tier requirements
  const currentTierRequirement = achievement.isTiered && achievement.tierRequirements
    ? achievement.tierRequirements.find(t => t.tier === currentTier)
    : null;
  
  const nextTierRequirement = achievement.isTiered && achievement.tierRequirements
    ? achievement.tierRequirements.find(t => t.tier === nextTier)
    : null;
  
  const progressPercent = progress
    ? (progress.current / progress.required) * 100
    : 0;
  
  return (
    <motion.div
      id={achievement.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="h-full"
    >
      <Card
        className={`glass-card transition-all h-full ${
          unlocked 
            ? "border-success/40 bg-slate-800/30 hover:border-success/60" 
            : "border-slate-800 hover:border-slate-700 opacity-60"
        }`}
      >
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon and Checkbox */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div
                className={`text-5xl ${
                  unlocked ? "filter-none" : "grayscale opacity-40"
                }`}
              >
                {achievement.icon}
              </div>
              {unlocked && WEARABLE_BADGE_IDS.includes(achievement.id) && (
                <Tooltip content="Wear this Badge in the community">
                  <input
                    type="checkbox"
                    checked={wornBadges.has(achievement.id)}
                    onChange={() => onToggleBadge(achievement.id)}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-success focus:ring-success focus:ring-offset-0 focus:ring-2 cursor-pointer mt-1"
                  />
                </Tooltip>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`text-lg font-semibold ${
                        unlocked ? "text-slate-100" : "text-slate-500"
                      }`}
                    >
                      {achievement.name}
                    </h4>
                    {achievement.isTiered && unlocked && currentTier > 0 && (
                      <TierStars
                        currentTier={currentTier}
                        maxTiers={achievement.maxTiers || 5}
                        size="sm"
                      />
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${
                    unlocked ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {unlocked && (
                    <ShareAchievement
                      achievementName={achievement.name}
                      achievementIcon={achievement.icon}
                      achievementDescription={achievement.description}
                      currentTier={currentTier}
                      maxTiers={achievement.maxTiers}
                    />
                  )}
                  {!unlocked && (
                    <Lock className="w-6 h-6 text-slate-600" />
                  )}
                </div>
              </div>

              {/* Requirement / Progress */}
              <div className="space-y-2">
                {/* Only show unlock date for unlocked achievements */}
                {unlocked && unlockDate && (
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <span className="text-xs text-slate-500" suppressHydrationWarning>
                      {formatDate(unlockDate)}
                    </span>
                  </div>
                )}

                {/* Progress Bar for In-Progress Achievements */}
                {!unlocked && progress && progress.current > 0 && !achievement.isTiered && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        {progress.current} / {progress.required}
                      </span>
                      <span className="text-slate-400 font-semibold">
                        {progressPercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, delay: delay + 0.2 }}
                        className="bg-gradient-to-r from-success to-emerald-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                )}
                
                {/* Progress for tiered achievements working on next tier */}
                {achievement.isTiered && unlocked && nextTierRequirement && progress && progress.current < nextTierRequirement.value && (
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Next: {nextTierRequirement.requirement}
                      </span>
                      <span className="text-slate-400 font-semibold">
                        {progress.current.toLocaleString()} / {nextTierRequirement.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress.current / nextTierRequirement.value) * 100}%` }}
                        transition={{ duration: 0.5, delay: delay + 0.2 }}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
