"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  CheckCircle2,
  Landmark,
  DollarSign,
  TrendingUp,
  Bitcoin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { Tooltip } from "@/components/ui/tooltip";
import { MiniChart } from "@/components/ui/mini-chart";
import { MOCK_POSTS, WEARABLE_BADGE_IDS, MOCK_CLANS } from "@/lib/constants";
import { getRelativeTime, abbreviateNumber } from "@/lib/utils";
import type { Post } from "@/lib/constants";

type TopicType = "all" | "materials" | "forex" | "stocks" | "crypto";

export function CommunityFeed({ wornBadges }: { wornBadges: Set<string> }) {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [activeTopic, setActiveTopic] = useState<TopicType>("all");

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Topic Tabs */}
      <div className="flex gap-2 flex-wrap">
        <FilterButton 
          label="All Topics" 
          active={activeTopic === "all"} 
          onClick={() => setActiveTopic("all")}
        />
        <FilterButton 
          label="Materials" 
          icon={<Landmark className="w-4 h-4" />}
          active={activeTopic === "materials"} 
          onClick={() => setActiveTopic("materials")}
        />
        <FilterButton 
          label="Forex" 
          icon={<DollarSign className="w-4 h-4" />}
          active={activeTopic === "forex"} 
          onClick={() => setActiveTopic("forex")}
        />
        <FilterButton 
          label="Stocks" 
          icon={<TrendingUp className="w-4 h-4" />}
          active={activeTopic === "stocks"} 
          onClick={() => setActiveTopic("stocks")}
        />
        <FilterButton 
          label="Crypto" 
          icon={<Bitcoin className="w-4 h-4" />}
          active={activeTopic === "crypto"} 
          onClick={() => setActiveTopic("crypto")}
        />
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts
          .filter((post) => activeTopic === "all" || post.topic === activeTopic)
          .map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PostCard post={post} onLike={() => handleLike(post.id)} wornBadges={wornBadges} />
            </motion.div>
          ))}
      </div>
    </div>
  );
}

function FilterButton({
  label,
  active = false,
  icon,
  onClick,
}: {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-success/10 text-success border border-success/20"
          : "glass-card-hover text-slate-400"
      } flex items-center gap-2`}
    >
      {icon}
      {label}
    </button>
  );
}

function PostCard({ post, onLike, wornBadges }: { post: Post; onLike: () => void; wornBadges: Set<string> }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="glass-card border-slate-800 overflow-visible">
      {/* Post Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3 flex-1">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-success to-emerald-600 border-2 border-success/20">
              <AvatarFallback className="text-2xl">
                {post.user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-slate-100">
                  {post.user.username}
                </h3>
                {post.user.verified && (
                  <CheckCircle2 className="w-4 h-4 text-success fill-success" />
                )}
                {post.user.badges
                  .filter((badge) => WEARABLE_BADGE_IDS.includes(badge.id) && wornBadges.has(badge.id))
                  .slice(0, 3)
                  .map((badge) => {
                    // Find the tier info from unlockedBadges
                    const unlockedBadge = post.user.unlockedBadges?.find(ub => ub.badge.id === badge.id);
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
                          <span className={`text-base ${badge.color}`}>
                            {badge.icon}
                          </span>
                          {badge.isTiered && currentTier && badge.tierRequirements && (
                            <span className="text-[8px] font-semibold text-slate-300 -mt-1">
                              {abbreviateNumber(badge.tierRequirements.find(t => t.tier === currentTier)?.value || 0)}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    );
                  })}
                <LevelBadge level={post.user.level} />
              </div>
              {post.user.clanId && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {MOCK_CLANS.find(clan => clan.id === post.user.clanId)?.name || ""}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1" suppressHydrationWarning>
                {getRelativeTime(post.timestamp)}
              </p>
            </div>
          </div>
          <Badge className="bg-slate-800/50 text-slate-300 border-slate-700 capitalize text-xs">
            {post.topic}
          </Badge>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-slate-300 leading-relaxed">{post.content}</p>
        </div>

        {/* Post Chart */}
        {post.chart && (
          <div className="mb-4">
            <MiniChart
              type={post.chart.type}
              title={post.chart.title}
              data={post.chart.data}
            />
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden border border-slate-800">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <span className="text-slate-600 text-sm">Trade Screenshot</span>
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center gap-6 py-3 border-y border-slate-800 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <ActionButton
            icon={<Heart className="w-5 h-5" />}
            label="Like"
            active={post.liked}
            onClick={onLike}
          />
          <ActionButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Comment"
            onClick={() => setShowComments(!showComments)}
          />
        </div>

        {/* Comments Section */}
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-slate-800"
          >
            <div className="space-y-3">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 bg-slate-700">
                  <AvatarFallback className="text-sm">🚀</AvatarFallback>
                </Avatar>
                <div className="flex-1 glass-card rounded-lg p-3">
                  <p className="text-sm text-slate-300 font-medium">
                    AlgoWizard
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Great trade! What was your entry signal?
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 bg-slate-700">
                  <AvatarFallback className="text-sm">📊</AvatarFallback>
                </Avatar>
                <div className="flex-1 glass-card rounded-lg p-3">
                  <p className="text-sm text-slate-300 font-medium">
                    ChartMaster
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Congrats! Mind sharing your strategy?
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

function ActionButton({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
        active
          ? "bg-success/10 text-success border border-success/20"
          : "glass-card-hover text-slate-400"
      }`}
    >
      <motion.span
        animate={active ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
