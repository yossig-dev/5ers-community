"use client";

import { motion } from "framer-motion";
import { Package, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROGRAMS, getProgramTypeColor, getProgramTypeLabel } from "@/lib/programs";
import type { Program, ProgramType } from "@/lib/programs";
import { formatNumber } from "@/lib/utils";

export function MyPrograms() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Package className="w-6 h-6 text-success" />}
          label="Total Programs"
          value={MOCK_PROGRAMS.length.toString()}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          label="Active Programs"
          value={MOCK_PROGRAMS.filter((p) => p.status === "active").length.toString()}
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-yellow-400" />}
          label="Total Balance"
          value={`$${Math.round(MOCK_PROGRAMS.reduce((sum, p) => sum + p.balance, 0)).toLocaleString()}`}
        />
      </div>

      {/* Programs List - Vertical Strips */}
      <div className="space-y-3">
        {MOCK_PROGRAMS.map((program, index) => (
          <ProgramCard key={program.id} program={program} delay={index * 0.05} />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="glass-card border-slate-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-slate-800/50">{icon}</div>
        </div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </CardContent>
    </Card>
  );
}

function ProgramCard({ program, delay }: { program: Program; delay: number }) {
  const typeColor = getProgramTypeColor(program.type);
  const typeLabel = getProgramTypeLabel(program.type);
  
  // Color classes based on type
  const borderColorClass = {
    yellow: "border-l-yellow-500",
    purple: "border-l-purple-500",
    red: "border-l-red-500",
    cyan: "border-l-cyan-500",
  }[typeColor];

  const bgColorClass = {
    yellow: "bg-yellow-500/10",
    purple: "bg-purple-500/10",
    red: "bg-red-500/10",
    cyan: "bg-cyan-500/10",
  }[typeColor];

  const textColorClass = {
    yellow: "text-yellow-500",
    purple: "text-purple-500",
    red: "text-red-500",
    cyan: "text-cyan-500",
  }[typeColor];

  // Check if expired
  const isExpired = program.expirationDate < new Date();
  const daysUntilExpiration = Math.ceil(
    (program.expirationDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className={`glass-card border-slate-800 border-l-4 ${borderColorClass} hover:border-slate-700 transition-all`}>
        <CardContent className="p-5">
          <div className="flex items-center gap-6">
            {/* Type Badge */}
            <Badge className={`${bgColorClass} ${textColorClass} border-0 px-3 py-1 flex-shrink-0`}>
              {typeLabel}
            </Badge>

            {/* Program Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-slate-100 truncate">
                {program.programName}
              </h3>
              <p className="text-xs text-slate-400">{program.accountNumber}</p>
            </div>

            {/* Size & Cost */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-500">Size - Cost</p>
              <p className="text-sm font-semibold text-slate-100">
                {program.size} - ${program.cost}
              </p>
            </div>

            {/* Balance */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-500">Balance</p>
              <p className="text-sm font-semibold text-success">
                {formatNumber(program.balance)}
              </p>
            </div>

            {/* Asset */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-500">Asset</p>
              <p className="text-sm font-semibold text-slate-100">{program.asset}</p>
            </div>

            {/* Status */}
            <div className="flex-shrink-0">
              <Badge
                variant="outline"
                className={`text-xs ${
                  program.status === "active"
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-slate-600 bg-slate-800/50 text-slate-400"
                }`}
              >
                {program.status}
              </Badge>
            </div>

            {/* Expiration */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Expiration</p>
                <p
                  className={`text-sm font-semibold ${
                    isExpired
                      ? "text-red-400"
                      : daysUntilExpiration <= 7
                      ? "text-yellow-500"
                      : "text-slate-300"
                  }`}
                >
                  {isExpired
                    ? "Expired"
                    : daysUntilExpiration === 0
                    ? "Today"
                    : daysUntilExpiration === 1
                    ? "Tomorrow"
                    : `${daysUntilExpiration} days`}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
