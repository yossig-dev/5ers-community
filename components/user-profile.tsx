"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  TrendingUp,
  Award,
  Calendar,
  DollarSign,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LevelBadge, XPProgressBar } from "@/components/ui/level-badge";
import { Tooltip } from "@/components/ui/tooltip";
import { ShareAchievement } from "@/components/ui/share-achievement";
import { TierStars } from "@/components/ui/tier-stars";
import { MOCK_USERS, MOCK_POSTS, TRADING_LEVELS, WEARABLE_BADGE_IDS, MOCK_CLANS } from "@/lib/constants";
import { formatNumber, formatPercentage, formatDate, abbreviateNumber } from "@/lib/utils";

// Using the first user as the profile user
const profileUser = MOCK_USERS[0];
const userPosts = MOCK_POSTS.filter((post) => post.user.id === profileUser.id);

export function UserProfile({ 
  onViewAchievements,
  wornBadges,
  onToggleBadge
}: { 
  onViewAchievements?: () => void;
  wornBadges: Set<string>;
  onToggleBadge: (badgeId: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="glass-card border-slate-800 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-success/20 via-emerald-500/20 to-success/20" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
            <Avatar className="w-32 h-32 bg-gradient-to-br from-success to-emerald-600 border-4 border-slate-900 shadow-xl">
              <AvatarFallback className="text-5xl">
                {profileUser.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 mt-16 sm:mt-20">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-2xl font-bold text-slate-100">
                  {profileUser.username}
                </h3>
                {profileUser.verified && (
                  <CheckCircle2 className="w-6 h-6 text-success fill-success" />
                )}
                {profileUser.badges
                  .filter((badge) => WEARABLE_BADGE_IDS.includes(badge.id) && wornBadges.has(badge.id))
                  .map((badge) => {
                    // Find the tier info from unlockedBadges
                    const unlockedBadge = profileUser.unlockedBadges?.find(ub => ub.badge.id === badge.id);
                    const currentTier = unlockedBadge?.currentTier;
                    
                    // Get the dynamic name based on tier
                    let displayName = badge.name;
                    if (badge.isTiered && currentTier && badge.tierRequirements) {
                      const tierReq = badge.tierRequirements.find(t => t.tier === currentTier);
                      if (tierReq) {
                        displayName = `${tierReq.requirement} ${badge.name}`;
                      }
                    }

                    return (
                      <Tooltip key={badge.id} content={displayName}>
                        <div className="flex flex-col items-center cursor-help">
                          <span className={`text-xl ${badge.color}`}>
                            {badge.icon}
                          </span>
                          {badge.isTiered && currentTier && badge.tierRequirements && (
                            <span className="text-[10px] font-semibold text-slate-300 -mt-1">
                              {abbreviateNumber(badge.tierRequirements.find(t => t.tier === currentTier)?.value || 0)}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    );
                  })}
                <LevelBadge level={profileUser.level} className="text-xl" />
              </div>
              {profileUser.clanId && (
                <p className="text-sm text-slate-400 mb-2">
                  {MOCK_CLANS.find(clan => clan.id === profileUser.clanId)?.name || ""}
                </p>
              )}
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-slate-400">Posts</span>
                  <p className="font-semibold text-slate-100">{userPosts.length}</p>
                </div>
                <div>
                  <span className="text-slate-400">Followers</span>
                  <p className="font-semibold text-slate-100">2,456</p>
                </div>
                <div>
                  <span className="text-slate-400">Following</span>
                  <p className="font-semibold text-slate-100">328</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" className="border-slate-700" asChild>
                <Link href="/profile/T5-7842-KJ">
                  View how others see your profile
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* XP Progress Card - Only visible to own profile */}
      <Card className="glass-card border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{profileUser.level.icon}</div>
              <div>
                <h3 className={`text-xl font-bold ${profileUser.level.color}`}>
                  {profileUser.level.title}
                </h3>
                <p className="text-sm text-slate-400">
                  {profileUser.xp.toLocaleString()} Total XP
                </p>
              </div>
            </div>
          </div>
          <XPProgressBar
            xp={profileUser.xp}
            level={profileUser.level}
            nextLevel={
              TRADING_LEVELS.find(
                (l) => l.minXP > profileUser.level.minXP
              )
            }
          />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          label="Total Gain"
          value="+47.8%"
          subtext="This month"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-success" />}
          label="Total Profit"
          value="$47.8k"
          subtext="All time"
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-blue-400" />}
          label="Win Rate"
          value="73.2%"
          subtext="Last 30 days"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-yellow-400" />}
          label="Ranking"
          value="#1"
          subtext="Top trader"
        />
      </div>

      {/* Achievements */}
      <Card className="glass-card border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-success" />
              Your Achievements
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAchievements}
              className="border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(profileUser.unlockedBadges || []).slice(0, 8).map((userBadge, index) => (
              <motion.div
                key={userBadge.badge.id}
                id={userBadge.badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover rounded-lg p-4 text-center relative group"
              >
                <div className="absolute top-2 right-2">
                  <ShareAchievement
                    achievementName={userBadge.badge.name}
                    achievementIcon={userBadge.badge.icon}
                    achievementDescription={
                      userBadge.badge.isTiered && userBadge.currentTier && userBadge.badge.tierRequirements
                        ? userBadge.badge.tierRequirements.find(t => t.tier === userBadge.currentTier)?.requirement || userBadge.badge.description
                        : userBadge.badge.description
                    }
                    currentTier={userBadge.currentTier}
                    maxTiers={userBadge.badge.maxTiers}
                    showOnHover={true}
                  />
                </div>
                <div className="text-4xl mb-2">{userBadge.badge.icon}</div>
                <p className="text-sm font-semibold text-slate-100 mb-1">
                  {userBadge.badge.name}
                </p>
                {userBadge.badge.isTiered && userBadge.currentTier && (
                  <div className="flex justify-center mb-1">
                    <TierStars
                      currentTier={userBadge.currentTier}
                      maxTiers={userBadge.badge.maxTiers || 5}
                      size="sm"
                    />
                  </div>
                )}
                <p className="text-xs text-slate-500" suppressHydrationWarning>
                  {formatDate(userBadge.unlockedAt)}
                </p>
              </motion.div>
            ))}
            {/* Locked Achievements - only show if less than 8 badges */}
            {(profileUser.unlockedBadges?.length || 0) < 8 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min((profileUser.unlockedBadges?.length || 0), 8) * 0.1 }}
                className="glass-card rounded-lg p-4 text-center opacity-30"
              >
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-sm font-semibold text-slate-500">
                  Mystery Badge
                </p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtext,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <Card className="glass-card border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-slate-800/50">{icon}</div>
        </div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-100 mb-1">{value}</p>
        <p className="text-xs text-slate-500">{subtext}</p>
      </CardContent>
    </Card>
  );
}

