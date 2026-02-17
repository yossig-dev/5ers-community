"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  TrendingUp,
  Award,
  Calendar,
  DollarSign,
  Target,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LevelBadge, XPProgressBar } from "@/components/ui/level-badge";
import { Tooltip } from "@/components/ui/tooltip";
import { ShareAchievement } from "@/components/ui/share-achievement";
import { TierStars } from "@/components/ui/tier-stars";
import { MOCK_USERS, MOCK_POSTS, TRADING_LEVELS, MOCK_TRADE_HISTORY, MOCK_TRADING_ACCOUNTS } from "@/lib/constants";
import { formatNumber, formatPercentage, getRelativeTime, formatDate } from "@/lib/utils";
import type { TradeHistory, TradingAccount } from "@/lib/constants";

// Using the first user as the profile user
const profileUser = MOCK_USERS[0];
const userPosts = MOCK_POSTS.filter((post) => post.user.id === profileUser.id);

export function UserProfile({ onViewAchievements }: { onViewAchievements?: () => void }) {
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount>(
    MOCK_TRADING_ACCOUNTS[0]
  );

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
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-2xl font-bold text-slate-100">
                  {profileUser.username}
                </h3>
                {profileUser.verified && (
                  <CheckCircle2 className="w-6 h-6 text-success fill-success" />
                )}
                {profileUser.badges.map((badge) => (
                  <Tooltip key={badge.id} content={badge.name}>
                    <span className={`text-xl ${badge.color} cursor-help`}>
                      {badge.icon}
                    </span>
                  </Tooltip>
                ))}
                <LevelBadge level={profileUser.level} className="text-xl" />
              </div>
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
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-700">
                Edit Profile
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

      {/* Trading History */}
      <Card className="glass-card border-slate-800">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-success" />
              Trading History
            </CardTitle>
            <AccountSelector
              selectedAccount={selectedAccount}
              onSelectAccount={setSelectedAccount}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
            <table className="w-full">
              <thead className="border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                <tr className="text-slate-400 text-xs">
                  <th className="px-4 py-3 text-left font-medium">Symbol</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Volume</th>
                  <th className="px-4 py-3 text-right font-medium">Price In</th>
                  <th className="px-4 py-3 text-right font-medium">Price Out</th>
                  <th className="px-4 py-3 text-right font-medium">Profit</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TRADE_HISTORY.filter(
                  (trade) => trade.accountId === selectedAccount.id
                ).map((trade, index) => (
                  <motion.tr
                    key={trade.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Symbol */}
                    <td className="px-4 py-3">
                      <span className="font-semibold text-slate-100">
                        {trade.symbol}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-400" suppressHydrationWarning>
                        {getRelativeTime(trade.time)}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={`${
                          trade.type === "buy"
                            ? "text-success border-success/30 bg-success/10"
                            : "text-red-400 border-red-400/30 bg-red-400/10"
                        } text-xs uppercase`}
                      >
                        {trade.type}
                      </Badge>
                    </td>

                    {/* Volume */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm text-slate-300">
                        {trade.volume.toFixed(2)}
                      </span>
                    </td>

                    {/* Price In */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm text-slate-300">
                        ${trade.priceIn.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>

                    {/* Price Out */}
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm text-slate-300">
                        ${trade.priceOut.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>

                    {/* Profit */}
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`text-sm font-semibold ${
                          trade.profit >= 0 ? "text-success" : "text-red-500"
                        }`}
                      >
                        {trade.profit >= 0 ? "+" : ""}
                        {formatNumber(trade.profit)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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

function AccountSelector({
  selectedAccount,
  onSelectAccount,
}: {
  selectedAccount: TradingAccount;
  onSelectAccount: (account: TradingAccount) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card-hover border border-slate-700 hover:border-slate-600 transition-all"
      >
        <div className="text-left">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-100">
              {selectedAccount.programType} {selectedAccount.accountSize}
            </p>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                selectedAccount.accountStatus === "active"
                  ? "bg-success/20 text-success"
                  : selectedAccount.accountStatus === "daily pause"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-red-500/20 text-red-500"
              }`}
            >
              {selectedAccount.accountStatus}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {selectedAccount.accountNumber} • {selectedAccount.status}
          </p>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 top-full mt-2 w-64 glass-card border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {MOCK_TRADING_ACCOUNTS.map((account) => (
              <button
                key={account.id}
                onClick={() => {
                  onSelectAccount(account);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-800/50 transition-colors border-b border-slate-800/50 last:border-0 ${
                  selectedAccount.id === account.id 
                    ? "bg-slate-800/50 border-l-2 border-l-success" 
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-100">
                    {account.programType} {account.accountSize}
                  </p>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase ${
                      account.accountStatus === "active"
                        ? "bg-success/20 text-success"
                        : account.accountStatus === "daily pause"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {account.accountStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-1">
                  {account.accountNumber}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {account.status}
                  </span>
                  <span className="text-xs font-semibold text-success">
                    {formatNumber(account.balance)}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
