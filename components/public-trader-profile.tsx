"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  ProfileHeader,
  TraderIdPerformanceSnapshot,
  TopTradedAssetsSection,
  AchievementsSection,
  TradeTalkFeed,
} from "@/components/profile";
import { ShareProfile } from "@/components/ui/share-profile";
import type { TraderProfile } from "@/lib/types/trader-profile";

/** Recharts can cause Webpack runtime errors with Next.js; load only on client */
const SkillsSpiderChart = dynamic(
  () => import("@/components/profile").then((mod) => mod.SkillsSpiderChart),
  { ssr: false, loading: () => <SkillsChartPlaceholder /> }
);

function SkillsChartPlaceholder() {
  return (
    <div className="min-h-[220px] w-full flex items-center justify-center">
      <p className="text-slate-500 text-sm">Loading skills chart…</p>
    </div>
  );
}

/**
 * Main public profile page layout.
 * Structure (top to bottom):
 * 1. Header & Identity (avatar, username, join date, flag, clan, badges, Follow / Message / Share)
 * 2. Trader ID & Performance Snapshot (Trader ID, Preferred Strategy, Quality Score)
 * 3. Skills Spider Chart (5 skills; hover overlays viewer comparison)
 * 4. Top Traded Assets (table: Asset, Type, Trades, Win Rate)
 * 5. Achievements (grid of unlocked only)
 * 6. Trade Talk feed (scrollable posts with snippet, time, likes/comments)
 */
export function PublicTraderProfile({ profile }: { profile: TraderProfile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16 px-4 sm:px-6">
      {/* 1. Header & Identity */}
      <ProfileHeader
        profile={{
          nickname: profile.nickname,
          avatar: profile.avatar,
          createdAt: profile.createdAt,
          countryCode: profile.countryCode,
          clan: profile.clan,
          badges: profile.badges,
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

      {/* 2. Performance Snapshot + Skills Spider Chart (one row) */}
      <section className="rounded-xl border border-slate-700/60 bg-slate-900/80 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[280px]">
          <div className="p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-slate-700/50 flex flex-col justify-start">
            <TraderIdPerformanceSnapshot
              preferredStrategy={profile.preferredStrategy}
              qualityScore={profile.qualityScore}
              overallAvgWinRatePercent={profile.averages.winRatePercent}
              totalTrades={profile.averages.totalTrades}
              strategySharePercent={profile.strategySharePercent}
              communityAvgWinRatePercent={profile.averages.communityAvgWinRatePercent}
              communityAvgQualityScore={profile.averages.communityAvgQualityScore}
              embedded
            />
          </div>
          <div className="p-5 lg:p-6 flex flex-col justify-start">
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

      {/* 4. Top Traded Assets */}
      <TopTradedAssetsSection assets={profile.topTradedAssets} />

      {/* 5. Achievements (bottom-left) | 6. Trade Talk (bottom-right or full width) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AchievementsSection achievements={profile.achievements} />
        <TradeTalkFeed
          posts={profile.tradeTalkPosts}
          maxVisible={5}
          postLinkBase="/trade-talk"
        />
      </div>
    </div>
  );
}
