"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, DollarSign, Award, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { MOCK_LEADERBOARD } from "@/lib/constants";
import { formatNumber, formatPercentage } from "@/lib/utils";

export function Leaderboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Top Traders
          </h2>
          <p className="text-slate-400 mt-1">
            This month's best performing traders
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          label="Avg Gain"
          value="+32.8%"
          trend="+5.2%"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-success" />}
          label="Total Profit"
          value="$272k"
          trend="+12.4%"
        />
        <StatCard
          icon={<Award className="w-6 h-6 text-yellow-400" />}
          label="Active Traders"
          value="1,234"
          trend="+89"
        />
      </div>

      {/* Leaderboard Table */}
      <Card className="glass-card border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Rankings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800">
                <tr className="text-slate-400 text-sm">
                  <th className="px-6 py-4 text-left font-medium">Rank</th>
                  <th className="px-6 py-4 text-left font-medium">Trader</th>
                  <th className="px-6 py-4 text-right font-medium">Gain %</th>
                  <th className="px-6 py-4 text-right font-medium">
                    Profit Factor
                  </th>
                  <th className="px-6 py-4 text-right font-medium">
                    Total Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_LEADERBOARD.map((entry, index) => (
                  <motion.tr
                    key={entry.user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Rank */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank <= 3 ? (
                          <RankBadge rank={entry.rank} />
                        ) : (
                          <span className="text-slate-400 font-semibold w-8 text-center">
                            {entry.rank}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Trader */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-success to-emerald-600 border-2 border-success/20">
                          <AvatarFallback className="text-lg">
                            {entry.user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-100">
                            {entry.user.username}
                          </p>
                          <div className="flex gap-1 mt-1 items-center">
                            <LevelBadge level={entry.user.level} showIcon={true} />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Gain % */}
                    <td className="px-6 py-4 text-right">
                      <span className="profit-text text-lg font-bold">
                        {formatPercentage(entry.gainPercent)}
                      </span>
                    </td>

                    {/* Profit Factor */}
                    <td className="px-6 py-4 text-right">
                      <Badge
                        variant="outline"
                        className={`${
                          entry.profitFactor >= 3
                            ? "text-success border-success/30 bg-success/10"
                            : entry.profitFactor >= 2
                            ? "text-blue-400 border-blue-400/30 bg-blue-400/10"
                            : "text-slate-400 border-slate-400/30 bg-slate-400/10"
                        }`}
                      >
                        {entry.profitFactor.toFixed(1)}x
                      </Badge>
                    </td>

                    {/* Total Profit */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-slate-100 font-semibold">
                        {formatNumber(entry.totalProfit)}
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
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <Card className="glass-card border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-slate-800/50">{icon}</div>
          <span className="text-success text-sm font-semibold">{trend}</span>
        </div>
        <p className="text-slate-400 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-100 mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const colors = {
    1: "text-yellow-400",
    2: "text-slate-300",
    3: "text-amber-600",
  };

  const icons = {
    1: <Medal className="w-6 h-6" />,
    2: <Medal className="w-6 h-6" />,
    3: <Medal className="w-6 h-6" />,
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, delay: rank * 0.1 }}
      className={`${colors[rank as keyof typeof colors]} flex items-center`}
    >
      {icons[rank as keyof typeof icons]}
    </motion.div>
  );
}
