"use client";

import { motion } from "framer-motion";
import { Award, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALL_ACHIEVEMENTS, MOCK_USERS } from "@/lib/constants";
import { USER_ACHIEVEMENT_PROGRESS } from "@/lib/achievement-progress";
import type { Badge as AchievementBadge } from "@/lib/constants";

export function AchievementsPage({ onBack }: { onBack: () => void }) {
  // Get the current user's achievements (TradeKing)
  const userAchievements = MOCK_USERS[0].badges.map((b) => b.id);

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
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className="border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
              <Award className="w-8 h-8 text-success" />
              All Achievements
            </h2>
            <p className="text-slate-400 mt-1">
              Track your progress and unlock badges
            </p>
          </div>
        </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.achievements.map((achievement, index) => {
              const progress = USER_ACHIEVEMENT_PROGRESS[achievement.id];
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={userAchievements.includes(achievement.id)}
                  progress={progress}
                  delay={index * 0.05}
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
  delay,
}: {
  achievement: AchievementBadge;
  unlocked: boolean;
  progress?: { current: number; required: number };
  delay: number;
}) {
  const progressPercent = progress
    ? (progress.current / progress.required) * 100
    : 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card
        className={`glass-card border-slate-800 transition-all hover:border-slate-700 ${
          unlocked ? "bg-slate-800/30" : "opacity-60"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`text-5xl ${
                unlocked ? "filter-none" : "grayscale opacity-40"
              }`}
            >
              {achievement.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4
                    className={`text-lg font-semibold mb-1 ${
                      unlocked ? achievement.color : "text-slate-500"
                    }`}
                  >
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-2">
                    {achievement.description}
                  </p>
                </div>
                {unlocked && (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                )}
                {!unlocked && (
                  <Lock className="w-6 h-6 text-slate-600 flex-shrink-0" />
                )}
              </div>

              {/* Requirement / Progress */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Badge
                    variant="outline"
                    className={`${
                      unlocked
                        ? "border-success/30 bg-success/10 text-success"
                        : "border-slate-700 bg-slate-800/50 text-slate-500"
                    }`}
                  >
                    {unlocked ? "Unlocked" : achievement.requirement}
                  </Badge>
                </div>

                {/* Progress Bar for In-Progress Achievements */}
                {!unlocked && progress && progress.current > 0 && (
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
