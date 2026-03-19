"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Home as HomeIcon,
  TrendingUp,
  Users,
  Settings,
  Package,
  Trophy,
  GraduationCap,
  HelpCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_TABS = [
  { tab: "programs", label: "My Programs", icon: Package },
  { tab: "feed", label: "Trade Talk", icon: HomeIcon },
  { tab: "contests", label: "Contests", icon: Trophy },
  { tab: "clan", label: "Clan", icon: Shield },
  { tab: "leaderboard", label: "Leaderboard", icon: TrendingUp },
  { tab: "academy", label: "Academy", icon: GraduationCap },
] as const;

function SidebarNavLinks({ sidebarOpen }: { sidebarOpen: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const homeTab = pathname === "/" ? searchParams?.get("tab") ?? "feed" : null;

  return (
    <>
      {NAV_TABS.map(({ tab, label, icon: Icon }) => {
        const href = `/?tab=${tab}`;
        const isActive = pathname === "/" && homeTab === tab;
        return (
          <Link key={tab} href={href}>
            <NavButton
              icon={<Icon className="h-5 w-5" />}
              label={label}
              active={isActive}
              collapsed={!sidebarOpen}
            />
          </Link>
        );
      })}
    </>
  );
}

function SidebarNavFallback({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <>
      {NAV_TABS.map(({ tab, label, icon: Icon }) => (
        <Link key={tab} href={`/?tab=${tab}`}>
          <NavButton
            icon={<Icon className="h-5 w-5" />}
            label={label}
            active={false}
            collapsed={!sidebarOpen}
          />
        </Link>
      ))}
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Desktop Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } hidden lg:flex flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all duration-300`}
      >
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <Link href="/">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xl font-bold bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent"
                >
                  The 5ers
                </motion.h1>
              </Link>
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
          <Suspense fallback={<SidebarNavFallback sidebarOpen={sidebarOpen} />}>
            <SidebarNavLinks sidebarOpen={sidebarOpen} />
          </Suspense>
        </nav>

        <div className="p-4 space-y-1">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-red-500 ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            {sidebarOpen && <span className="text-sm font-medium">YouTube</span>}
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-indigo-500 ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            {sidebarOpen && <span className="text-sm font-medium">Discord</span>}
          </a>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <NavButton icon={<HelpCircle className="h-5 w-5" />} label="Help" collapsed={!sidebarOpen} />
          <NavButton icon={<Settings className="h-5 w-5" />} label="Settings" collapsed={!sidebarOpen} />
        </div>
      </aside>

      {/* Mobile header + drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-success to-emerald-400 bg-clip-text text-transparent">
            The 5ers
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
            {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-800 p-4 space-y-2"
          >
            {NAV_TABS.map(({ tab, label, icon: Icon }) => (
              <Link key={tab} href={`/?tab=${tab}`} onClick={() => setMobileSidebarOpen(false)}>
                <NavButton icon={<Icon className="h-5 w-5" />} label={label} />
              </Link>
            ))}
            <div className="border-t border-slate-800 pt-4 mt-4">
              <Link href="/?tab=profile" onClick={() => setMobileSidebarOpen(false)}>
                <NavButton icon={<Users className="h-5 w-5" />} label="Profile" />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 flex flex-col min-w-0">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              <p className="text-slate-500 text-sm">Loading…</p>
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}

function NavButton({
  icon,
  label,
  active = false,
  collapsed = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <span
      className={`block w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
        active ? "bg-success/10 text-success border border-success/20" : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span className="flex-1 text-left text-sm font-medium">{label}</span>}
    </span>
  );
}
