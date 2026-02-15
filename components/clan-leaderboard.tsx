"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_CLANS } from "@/lib/constants";
import type { Clan } from "@/lib/constants";
import { formatNumber, formatPercentage } from "@/lib/utils";

export function ClanLeaderboard() {
  // Sort clans by total profit
  const sortedClans = [...MOCK_CLANS].sort((a, b) => b.totalProfit - a.totalProfit);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Award className="w-6 h-6 text-success" />}
          label="Total Clans"
          value={MOCK_CLANS.length.toString()}
          trend="Active"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-success" />}
          label="Total Members"
          value={MOCK_CLANS.reduce((sum, clan) => sum + clan.memberCount, 0).toString()}
          trend="Trading"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-yellow-400" />}
          label="Combined Profits"
          value={`$${Math.round(MOCK_CLANS.reduce((sum, clan) => sum + clan.totalProfit, 0) / 1000)}k`}
          trend="This Month"
        />
      </div>

      {/* Clans Leaderboard Table */}
      <Card className="glass-card border-slate-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-800">
                <tr className="text-slate-400 text-sm">
                  <th className="px-6 py-4 text-left font-medium">Rank</th>
                  <th className="px-6 py-4 text-left font-medium">Clan</th>
                  <th className="px-6 py-4 text-center font-medium">Members</th>
                  <th className="px-6 py-4 text-right font-medium">Total Gain %</th>
                  <th className="px-6 py-4 text-right font-medium">
                    Profit Factor
                  </th>
                  <th className="px-6 py-4 text-right font-medium">
                    Total Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedClans.map((clan, index) => (
                  <ClanRow
                    key={clan.id}
                    clan={clan}
                    rank={index + 1}
                    delay={index * 0.05}
                  />
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
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 rounded-lg bg-slate-800/50">{icon}</div>
          <div className="flex-1">
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-slate-100">{value}</p>
              <span className="text-xs text-success">▲ {trend}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClanRow({ clan, rank, delay }: { clan: Clan; rank: number; delay: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
    >
      {/* Rank */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {rank <= 3 ? (
            <RankBadge rank={rank} />
          ) : (
            <span className="text-slate-400 font-semibold w-8 text-center">
              {rank}
            </span>
          )}
        </div>
      </td>

      {/* Clan */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`text-3xl ${clan.color}`}>{clan.icon}</div>
          <div>
            <p className={`font-bold text-base ${clan.color}`}>
              {clan.name}
            </p>
            <p className="text-xs text-slate-500">{clan.description}</p>
          </div>
        </div>
      </td>

      {/* Members */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 font-semibold">{clan.memberCount}</span>
        </div>
      </td>

      {/* Total Gain */}
      <td className="px-6 py-4 text-right">
        <span className="text-success font-semibold">
          {formatPercentage(clan.totalGain)}
        </span>
      </td>

      {/* Profit Factor */}
      <td className="px-6 py-4 text-right">
        <span className="text-slate-300 font-medium">
          {clan.profitFactor.toFixed(2)}
        </span>
      </td>

      {/* Total Profit */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <DollarSign className="w-4 h-4 text-success" />
          <span className="text-success font-bold">
            {formatNumber(clan.totalProfit)}
          </span>
        </div>
      </td>
    </motion.tr>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const colors = {
    1: "from-yellow-400 to-yellow-600",
    2: "from-slate-300 to-slate-500",
    3: "from-amber-600 to-amber-800",
  };

  const icons = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
  };

  return (
    <div
      className={`w-8 h-8 rounded-full bg-gradient-to-br ${
        colors[rank as keyof typeof colors]
      } flex items-center justify-center text-lg font-bold shadow-lg`}
    >
      {icons[rank as keyof typeof icons]}
    </div>
  );
}
