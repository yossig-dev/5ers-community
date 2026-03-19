"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_TRADE_HISTORY, MOCK_TRADING_ACCOUNTS } from "@/lib/constants";
import { formatNumber, getRelativeTime } from "@/lib/utils";
import type { TradingAccount } from "@/lib/constants";

export function TradingHistory() {
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount>(
    MOCK_TRADING_ACCOUNTS[0]
  );

  return (
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
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-100">
                      {trade.symbol}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-400" suppressHydrationWarning>
                      {getRelativeTime(trade.time)}
                    </span>
                  </td>
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
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-slate-300">
                      {trade.volume.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-slate-300">
                      ${trade.priceIn.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-slate-300">
                      ${trade.priceOut.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
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
