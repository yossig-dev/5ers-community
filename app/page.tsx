"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, TrendingUp, Users, Settings, Bell } from "lucide-react";
import { CommunityFeed } from "@/components/community-feed";
import { Leaderboard } from "@/components/leaderboard";
import { ChatSidebar } from "@/components/chat-sidebar";
import { UserProfile } from "@/components/user-profile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TabType = "feed" | "leaderboard" | "profile";

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
                PropFirm
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
            icon={<Home className="h-5 w-5" />}
            label="Feed"
            active={activeTab === "feed"}
            onClick={() => setActiveTab("feed")}
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
            icon={<Users className="h-5 w-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            collapsed={!sidebarOpen}
          />
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
            PropFirm
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
              icon={<Home className="h-5 w-5" />}
              label="Feed"
              active={activeTab === "feed"}
              onClick={() => {
                setActiveTab("feed");
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
              icon={<Users className="h-5 w-5" />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => {
                setActiveTab("profile");
                setMobileSidebarOpen(false);
              }}
            />
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
          {activeTab === "feed" && <CommunityFeed />}
          {activeTab === "leaderboard" && <Leaderboard />}
          {activeTab === "profile" && <UserProfile />}
        </motion.div>
      </main>

      {/* Chat Sidebar */}
      <ChatSidebar />
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
