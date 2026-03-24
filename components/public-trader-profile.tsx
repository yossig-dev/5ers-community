"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ProfileHeader, AchievementsSection, TradeTalkFeed } from "@/components/profile";
import { ShareProfile } from "@/components/ui/share-profile";
import type { TraderProfile } from "@/lib/types/trader-profile";

const SkillsSpiderChart = dynamic(
  () => import("@/components/profile").then((mod) => mod.SkillsSpiderChart),
  { ssr: false, loading: () => <SkillsChartPlaceholder /> }
);

const TopTradedAssetsPieChart = dynamic(
  () => import("@/components/profile").then((mod) => mod.TopTradedAssetsPieChart),
  { ssr: false, loading: () => <PieChartPlaceholder /> }
);

function SkillsChartPlaceholder() {
  return (
    <div className="min-h-[220px] w-full flex items-center justify-center">
      <p className="text-slate-500 text-sm">Loading skills chart…</p>
    </div>
  );
}

function PieChartPlaceholder() {
  return (
    <div className="min-h-[280px] w-full flex items-center justify-center">
      <p className="text-slate-500 text-sm">Loading asset distribution…</p>
    </div>
  );
}

/**
 * Main public profile page layout.
 * Header includes identity + performance stats; skills + top-assets pie share one row;
 * achievements and Trade Talk are full-width sections below.
 */
export function PublicTraderProfile({ profile }: { profile: TraderProfile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16 px-4 sm:px-6">
      <ProfileHeader
        profile={{
          nickname: profile.nickname,
          avatar: profile.avatar,
          createdAt: profile.createdAt,
          countryCode: profile.countryCode,
          clan: profile.clan,
          badges: profile.badges,
        }}
        performance={{
          preferredStrategy: profile.preferredStrategy,
          qualityScore: profile.qualityScore,
          overallWinRatePercent: profile.averages.winRatePercent,
          totalTrades: profile.averages.totalTrades,
          strategySharePercent: profile.strategySharePercent,
          communityAvgWinRatePercent: profile.averages.communityAvgWinRatePercent,
          communityAvgQualityScore: profile.averages.communityAvgQualityScore,
        }}
        onFollow={() => setIsFollowing((v) => !v)}
        onShare={() => setShareOpen(true)}
        isFollowing={isFollowing}
      />

      <ShareProfile
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        profileName={profile.nickname}
        profileUrl=""
      />

      <section className="rounded-xl border border-slate-700/60 bg-slate-900/80 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[300px]">
          <div className="p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-700/50 flex flex-col justify-start min-h-[300px]">
            <TopTradedAssetsPieChart
              assets={profile.topTradedAssets}
              profileName={profile.nickname}
              viewerAssets={profile.viewerStats?.viewerTopTradedAssets}
              viewerName={profile.viewerStats?.viewerNickname ?? "You"}
              height={260}
              embedded
            />
          </div>
          <div className="p-5 lg:p-6 flex flex-col justify-start min-h-[300px]">
            <SkillsSpiderChart
              skills={profile.skills}
              traderName={profile.nickname}
              viewerSkills={profile.viewerStats?.skills}
              viewerName={profile.viewerStats?.viewerNickname ?? "You"}
              height={280}
              embedded
            />
          </div>
        </div>
      </section>

      <div className="space-y-5">
        <AchievementsSection achievements={profile.achievements} layout="wide" />
        <TradeTalkFeed
          posts={profile.tradeTalkPosts}
          maxVisible={8}
          postLinkBase="/trade-talk"
          layout="wide"
        />
      </div>
    </div>
  );
}
