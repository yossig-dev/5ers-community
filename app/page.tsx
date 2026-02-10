"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home as HomeIcon, TrendingUp, Users, Settings, Bell, Package, Trophy, GraduationCap } from "lucide-react";
import { CommunityFeed } from "@/components/community-feed";
import { Leaderboard } from "@/components/leaderboard";
import { UserProfile } from "@/components/user-profile";
import { AchievementsPage } from "@/components/achievements-page";
import { MyPrograms } from "@/components/my-programs";
import { Button } from "@/components/ui/button";

type TabType = "feed" | "leaderboard" | "profile" | "achievements" | "programs" | "contests" | "academy";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("feed");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* My Plans Section */}
          {sidebarOpen && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
              My Plans
            </div>
          )}
          <div className="space-y-1">
            <NavButton
              icon={<Package className="h-5 w-5" />}
              label="My Programs"
              active={activeTab === "programs"}
              onClick={() => setActiveTab("programs")}
              collapsed={!sidebarOpen}
            />
          </div>

          {/* Community Section */}
          {sidebarOpen && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-6">
              Community
            </div>
          )}
          <div className="space-y-1">
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
              icon={<TrendingUp className="h-5 w-5" />}
              label="Leaderboard"
              active={activeTab === "leaderboard"}
              onClick={() => setActiveTab("leaderboard")}
              collapsed={!sidebarOpen}
            />
          </div>

          {/* Academy Section */}
          {sidebarOpen && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-6">
              Academy
            </div>
          )}
          <div className="space-y-1">
            <NavButton
              icon={<GraduationCap className="h-5 w-5" />}
              label="Academy"
              active={activeTab === "academy"}
              onClick={() => setActiveTab("academy")}
              collapsed={!sidebarOpen}
            />
          </div>

          {/* Profile at bottom */}
          <div className="pt-6 mt-auto">
            <NavButton
              icon={<Users className="h-5 w-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              collapsed={!sidebarOpen}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <NavButton
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            badge={3}
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
            {/* My Plans */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-4">
              My Plans
            </div>
            <NavButton
              icon={<Package className="h-5 w-5" />}
              label="My Programs"
              active={activeTab === "programs"}
              onClick={() => {
                setActiveTab("programs");
                setMobileSidebarOpen(false);
              }}
            />

            {/* Community */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-4">
              Community
            </div>
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
              icon={<TrendingUp className="h-5 w-5" />}
              label="Leaderboard"
              active={activeTab === "leaderboard"}
              onClick={() => {
                setActiveTab("leaderboard");
                setMobileSidebarOpen(false);
              }}
            />

            {/* Academy */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-4">
              Academy
            </div>
            <NavButton
              icon={<GraduationCap className="h-5 w-5" />}
              label="Academy"
              active={activeTab === "academy"}
              onClick={() => {
                setActiveTab("academy");
                setMobileSidebarOpen(false);
              }}
            />

            {/* Profile */}
            <div className="border-t border-slate-800 mt-4 pt-4">
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
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="container mx-auto px-4 py-8 max-w-4xl"
        >
          {activeTab === "programs" && <MyPrograms />}
          {activeTab === "feed" && <CommunityFeed />}
          {activeTab === "contests" && (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-300 mb-2">Contests Coming Soon</h2>
                <p className="text-slate-500">Stay tuned for exciting trading competitions!</p>
              </div>
            </div>
          )}
          {activeTab === "leaderboard" && <Leaderboard />}
          {activeTab === "academy" && (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <GraduationCap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-300 mb-2">Academy Coming Soon</h2>
                <p className="text-slate-500">Educational content and courses will be available here!</p>
              </div>
            </div>
          )}
          {activeTab === "profile" && <UserProfile onViewAchievements={() => setActiveTab("achievements")} />}
          {activeTab === "achievements" && <AchievementsPage onBack={() => setActiveTab("profile")} />}
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
