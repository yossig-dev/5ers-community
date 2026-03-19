"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy, GraduationCap } from "lucide-react";
import { CommunityFeed } from "@/components/community-feed";
import { ClanLeaderboard } from "@/components/clan-leaderboard";
import { ClanPage } from "@/components/clan-page";
import { UserProfile } from "@/components/user-profile";
import { AchievementsPage } from "@/components/achievements-page";
import { MyPrograms } from "@/components/my-programs";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { Button } from "@/components/ui/button";

const VALID_TABS = ["feed", "leaderboard", "profile", "achievements", "programs", "contests", "academy", "clan"] as const;
type TabType = (typeof VALID_TABS)[number];

function getTabFromSearchParams(searchParams: ReturnType<typeof useSearchParams>): TabType {
  const tab = searchParams?.get("tab");
  if (tab && VALID_TABS.includes(tab as TabType)) return tab as TabType;
  return "feed";
}

function HomePageFallback() {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[300px]">
      <p className="text-slate-500 text-sm">Loading…</p>
    </div>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = getTabFromSearchParams(searchParams);
  const [wornBadges, setWornBadges] = useState<Set<string>>(
    new Set(["funded", "totalTrades"])
  );

  const setActiveTab = useCallback(
    (tab: TabType) => {
      router.push(`/?tab=${tab}`);
    },
    [router]
  );

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:flex items-center justify-end px-8 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Button className="bg-success hover:bg-success/90 text-slate-950 font-semibold">
            + New Order
          </Button>
          <NotificationsDropdown
            onNavigate={(page, targetId) => {
              setActiveTab(page as TabType);
              if (targetId) {
                setTimeout(() => {
                  const element = document.getElementById(targetId);
                  if (element) {
                    const viewportHeight = window.innerHeight;
                    const dropdownHeight = 600;
                    const elementHeight = element.getBoundingClientRect().height;
                    const spaceNeeded = elementHeight + dropdownHeight + 100;
                    if (spaceNeeded > viewportHeight * 0.8) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.scrollBy({ top: -100, behavior: "smooth" });
                    } else {
                      element.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                    element.classList.add("highlight-flash");
                    setTimeout(() => element.classList.remove("highlight-flash"), 2000);
                  }
                }, 100);
              }
            }}
          />
          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
              <span className="text-sm font-bold text-slate-950">T</span>
            </div>
            <span className="text-sm font-medium text-slate-300">TradeKing</span>
          </button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8 max-w-4xl flex-1"
      >
        {activeTab === "programs" && <MyPrograms />}
        {activeTab === "feed" && <CommunityFeed wornBadges={wornBadges} />}
        {activeTab === "clan" && <ClanPage />}
        {activeTab === "contests" && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-300 mb-2">Contests Coming Soon</h2>
              <p className="text-slate-500">Stay tuned for exciting trading competitions!</p>
            </div>
          </div>
        )}
        {activeTab === "leaderboard" && <ClanLeaderboard />}
        {activeTab === "academy" && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <GraduationCap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-300 mb-2">Academy Coming Soon</h2>
              <p className="text-slate-500">Educational content and courses will be available here!</p>
            </div>
          </div>
        )}
        {activeTab === "profile" && (
          <UserProfile
            onViewAchievements={() => setActiveTab("achievements")}
            wornBadges={wornBadges}
            onToggleBadge={(badgeId) => {
              setWornBadges((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(badgeId)) newSet.delete(badgeId);
                else newSet.add(badgeId);
                return newSet;
              });
            }}
          />
        )}
        {activeTab === "achievements" && (
          <AchievementsPage
            onBack={() => setActiveTab("profile")}
            wornBadges={wornBadges}
            onToggleBadge={(badgeId) => {
              setWornBadges((prev) => {
                const newSet = new Set(prev);
                if (newSet.has(badgeId)) newSet.delete(badgeId);
                else newSet.add(badgeId);
                return newSet;
              });
            }}
          />
        )}
      </motion.div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomeContent />
    </Suspense>
  );
}
