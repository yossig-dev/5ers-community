"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home as HomeIcon, TrendingUp, Users, Settings, Bell, Package, Trophy, GraduationCap, HelpCircle, Shield } from "lucide-react";
import { CommunityFeed } from "@/components/community-feed";
import { Leaderboard } from "@/components/leaderboard";
import { ClanLeaderboard } from "@/components/clan-leaderboard";
import { ClanPage } from "@/components/clan-page";
import { UserProfile } from "@/components/user-profile";
import { AchievementsPage } from "@/components/achievements-page";
import { MyPrograms } from "@/components/my-programs";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { Button } from "@/components/ui/button";

type TabType = "feed" | "leaderboard" | "profile" | "achievements" | "programs" | "contests" | "academy" | "clan";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("feed");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [wornBadges, setWornBadges] = useState<Set<string>>(new Set([
    "funded", "contest2nd", "totalTrades" // Default worn badges
  ]));

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Main Navigation Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } hidden lg:flex flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all duration-300`}
      >
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent"
              >
                The 5ers
              </motion.h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavButton
            icon={<Package className="h-5 w-5" />}
            label="My Programs"
            active={activeTab === "programs"}
            onClick={() => setActiveTab("programs")}
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<HomeIcon className="h-5 w-5" />}
            label="Trade Talk"
            active={activeTab === "feed"}
            onClick={() => setActiveTab("feed")}
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<Trophy className="h-5 w-5" />}
            label="Contests"
            active={activeTab === "contests"}
            onClick={() => setActiveTab("contests")}
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<Shield className="h-5 w-5" />}
            label="Clan"
            active={activeTab === "clan"}
            onClick={() => setActiveTab("clan")}
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<TrendingUp className="h-5 w-5" />}
            label="Leaderboard"
            active={activeTab === "leaderboard"}
            onClick={() => setActiveTab("leaderboard")}
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<GraduationCap className="h-5 w-5" />}
            label="Academy"
            active={activeTab === "academy"}
            onClick={() => setActiveTab("academy")}
            collapsed={!sidebarOpen}
          />
        </nav>

        {/* Social Media Links */}
        <div className="p-4 space-y-1">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-red-500 ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {sidebarOpen && (
              <span className="text-sm font-medium">YouTube</span>
            )}
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-indigo-500 ${!sidebarOpen ? 'justify-center' : ''}`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            {sidebarOpen && (
              <span className="text-sm font-medium">Discord</span>
            )}
          </a>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <NavButton
            icon={<HelpCircle className="h-5 w-5" />}
            label="Help"
            collapsed={!sidebarOpen}
          />
          <NavButton
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            collapsed={!sidebarOpen}
          />
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
            The 5ers
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          >
            {mobileSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-800 p-4 space-y-2"
          >
            <NavButton
              icon={<Package className="h-5 w-5" />}
              label="My Programs"
              active={activeTab === "programs"}
              onClick={() => {
                setActiveTab("programs");
                setMobileSidebarOpen(false);
              }}
            />
            <NavButton
              icon={<HomeIcon className="h-5 w-5" />}
              label="Trade Talk"
              active={activeTab === "feed"}
              onClick={() => {
                setActiveTab("feed");
                setMobileSidebarOpen(false);
              }}
            />
            <NavButton
              icon={<Trophy className="h-5 w-5" />}
              label="Contests"
              active={activeTab === "contests"}
              onClick={() => {
                setActiveTab("contests");
                setMobileSidebarOpen(false);
              }}
            />
            <NavButton
              icon={<Shield className="h-5 w-5" />}
              label="Clan"
              active={activeTab === "clan"}
              onClick={() => {
                setActiveTab("clan");
                setMobileSidebarOpen(false);
              }}
            />
            <NavButton
              icon={<TrendingUp className="h-5 w-5" />}
              label="Leaderboard"
              active={activeTab === "leaderboard"}
              onClick={() => {
                setActiveTab("leaderboard");
                setMobileSidebarOpen(false);
              }}
            />
            <NavButton
              icon={<GraduationCap className="h-5 w-5" />}
              label="Academy"
              active={activeTab === "academy"}
              onClick={() => {
                setActiveTab("academy");
                setMobileSidebarOpen(false);
              }}
            />
            
            {/* Profile button for mobile */}
            <div className="border-t border-slate-800 pt-4 mt-4">
              <NavButton
                icon={<Users className="h-5 w-5" />}
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => {
                  setActiveTab("profile");
                  setMobileSidebarOpen(false);
                }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 flex flex-col">
        {/* Top Bar - Desktop Only */}
        <div className="hidden lg:flex items-center justify-end px-8 py-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* New Order CTA */}
            <Button className="bg-success hover:bg-success/90 text-slate-950 font-semibold">
              + New Order
            </Button>

            {/* Notification Bell */}
            <NotificationsDropdown 
              onNavigate={(page, targetId) => {
                setActiveTab(page as TabType);
                if (targetId) {
                  // Wait for page to render, then scroll to the target element
                  setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                      const rect = element.getBoundingClientRect();
                      const viewportHeight = window.innerHeight;
                      const dropdownHeight = 600; // Approximate height of share dropdown
                      const elementHeight = rect.height;
                      const spaceNeeded = elementHeight + dropdownHeight + 100; // 100px buffer
                      
                      // Check if we have enough space below when centered
                      if (spaceNeeded > viewportHeight * 0.8) {
                        // Not enough space, scroll to top with padding
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Add extra scroll to account for header
                        window.scrollBy({ top: -100, behavior: 'smooth' });
                      } else {
                        // Enough space, center it
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      
                      // Add a highlight effect
                      element.classList.add('highlight-flash');
                      setTimeout(() => element.classList.remove('highlight-flash'), 2000);
                    }
                  }, 100);
                }
              }} 
            />

            {/* Profile Picture */}
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
                setWornBadges(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(badgeId)) {
                    newSet.delete(badgeId);
                  } else {
                    newSet.add(badgeId);
                  }
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
                setWornBadges(prev => {
                  const newSet = new Set(prev);
                  if (newSet.has(badgeId)) {
                    newSet.delete(badgeId);
                  } else {
                    newSet.add(badgeId);
                  }
                  return newSet;
                });
              }}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active = false,
  badge,
  onClick,
  collapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  collapsed?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active
          ? "bg-success/10 text-success border border-success/20"
          : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 text-left text-sm font-medium">{label}</span>
          {badge && (
            <span className="bg-success text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge && (
        <span className="absolute top-1 right-1 bg-success text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}
