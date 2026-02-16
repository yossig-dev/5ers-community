"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, TrendingUp, Crown, MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_CLANS, MOCK_USERS, MOCK_LEADERBOARD } from "@/lib/constants";
import type { Clan } from "@/lib/constants";
import { formatNumber, formatPercentage } from "@/lib/utils";

export function ClanPage() {
  // Check if current user has a clan (using TradeKing as example)
  const currentUser = MOCK_USERS[0];
  const userClan = currentUser.clanId 
    ? MOCK_CLANS.find(c => c.id === currentUser.clanId)
    : null;

  return userClan ? (
    <ClanView clan={userClan} />
  ) : (
    <ClanSearchView />
  );
}

// View for users without a clan
function ClanSearchView() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClans = MOCK_CLANS.filter(clan =>
    clan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-100">Join a Clan</h2>
        <p className="text-slate-400 mt-1">
          Find a clan and start competing together
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search clans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-500"
        />
      </div>

      {/* Clans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClans.map((clan, index) => (
          <ClanCard key={clan.id} clan={clan} delay={index * 0.05} />
        ))}
      </div>

      {filteredClans.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No clans found matching your search</p>
        </div>
      )}
    </div>
  );
}

function ClanCard({ clan, delay }: { clan: Clan; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="glass-card border-slate-800 hover:border-slate-700 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`text-4xl ${clan.color}`}>{clan.icon}</div>
              <div>
                <h3 className={`text-lg font-bold ${clan.color}`}>
                  {clan.name}
                </h3>
                <p className="text-xs text-slate-400">{clan.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Members</p>
              <p className="text-sm font-semibold text-slate-100">
                {clan.memberCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Gain</p>
              <p className="text-sm font-semibold text-success">
                {formatPercentage(clan.totalGain)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Profit</p>
              <p className="text-sm font-semibold text-success">
                {formatNumber(clan.totalProfit)}
              </p>
            </div>
          </div>

          <Button className="w-full bg-success hover:bg-success/90 text-slate-950 font-semibold">
            Join Clan
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// View for users who are in a clan
function ClanView({ clan }: { clan: Clan }) {
  const [chatMessage, setChatMessage] = useState("");

  // Mock clan members from leaderboard
  const clanMembers = MOCK_LEADERBOARD.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Clan Header */}
      <Card className="glass-card border-slate-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`text-5xl ${clan.color}`}>{clan.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className={`text-2xl font-bold ${clan.color}`}>
                    {clan.name}
                  </h2>
                  <Crown className={`w-5 h-5 ${clan.color}`} />
                </div>
                <p className="text-sm text-slate-400">{clan.description}</p>
              </div>
            </div>
            <Button variant="outline" className="border-slate-700 text-slate-300">
              Leave Clan
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
            <div>
              <p className="text-xs text-slate-500 mb-1">Members</p>
              <p className="text-xl font-bold text-slate-100 flex items-center gap-1">
                <Users className="w-4 h-4" />
                {clan.memberCount}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Gain</p>
              <p className="text-xl font-bold text-success">
                {formatPercentage(clan.totalGain)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Profit Factor</p>
              <p className="text-xl font-bold text-slate-100">
                {clan.profitFactor.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Profit</p>
              <p className="text-xl font-bold text-success">
                {formatNumber(clan.totalProfit)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clan Leaderboard */}
        <Card className="glass-card border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Clan Members Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clanMembers.map((member, index) => (
                <motion.div
                  key={member.user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-semibold w-6">
                      #{member.rank}
                    </span>
                    <Avatar className="w-8 h-8 bg-gradient-to-br from-success to-emerald-600">
                      <AvatarFallback>{member.user.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-slate-100">
                      {member.user.username}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-success">
                      {formatPercentage(member.gain)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatNumber(member.totalProfit)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clan Chat */}
        <Card className="glass-card border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-success" />
              Clan Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[400px]">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto mb-4 custom-scrollbar">
              <ChatMessage
                username="TradeKing"
                avatar="👑"
                message="Great trading session today! Let's keep pushing for #1!"
                time="2m ago"
              />
              <ChatMessage
                username="GoldRush_88"
                avatar="⚡"
                message="Just closed a huge Gold position. +$8.5k 🚀"
                time="5m ago"
              />
              <ChatMessage
                username="ProTrader_X"
                avatar="🎯"
                message="Anyone trading EUR/USD today? Looking for some insights"
                time="12m ago"
              />
              <ChatMessage
                username="ForexNinja"
                avatar="🥷"
                message="We're doing amazing this month! Keep it up team!"
                time="18m ago"
              />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Send a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-slate-900/50 border-slate-800 text-slate-100"
              />
              <Button className="bg-success hover:bg-success/90 text-slate-950">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChatMessage({
  username,
  avatar,
  message,
  time,
}: {
  username: string;
  avatar: string;
  message: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8 bg-gradient-to-br from-success to-emerald-600 flex-shrink-0">
        <AvatarFallback className="text-sm">{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-slate-200 text-sm">
            {username}
          </span>
          <span className="text-xs text-slate-500">{time}</span>
        </div>
        <p className="text-sm text-slate-300 break-words">{message}</p>
      </div>
    </div>
  );
}
