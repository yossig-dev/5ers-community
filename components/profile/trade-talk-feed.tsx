"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Search, X } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { TradeTalkPost } from "@/lib/types/trader-profile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TradeTalkFeedProps {
  posts: TradeTalkPost[];
  /** Max posts to show in feed before "Show all" (0 = show all in feed, no button) */
  maxVisible?: number;
  /** Base path for post links, e.g. /trade-talk (post.id appended) */
  postLinkBase?: string;
  /** Wide: taller scroll area, full-width feel */
  layout?: "default" | "wide";
  className?: string;
}

function PostSparkline({ postId, values }: { postId: string; values: number[] }) {
  const data = values.map((v, i) => ({ i, v }));
  const gradId = `spark-${postId}`;
  return (
    <div className="w-full sm:w-[168px] h-[76px] shrink-0 rounded-lg border border-slate-700/50 bg-slate-800/40 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis dataKey="i" hide />
          <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
          <Area
            type="monotone"
            dataKey="v"
            stroke="rgb(16 185 129)"
            fill={`url(#${gradId})`}
            strokeWidth={1.5}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function PostRow({
  post,
  postLinkBase,
}: {
  post: TradeTalkPost;
  postLinkBase: string;
}) {
  const href = post.url ?? `${postLinkBase}/${post.id}`;
  const hasSpark = post.sparkline && post.sparkline.length > 1;
  return (
    <Link
      href={href}
      className="block py-4 px-5 hover:bg-slate-800/30 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-inset"
      aria-label={`Open post: ${post.snippet.slice(0, 80)}${post.snippet.length > 80 ? "…" : ""}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-slate-200 text-base leading-relaxed mb-3 group-hover:text-slate-100">
            {post.snippet}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
            <span>{formatRelativeTime(post.timestamp)}</span>
            <span className="flex items-center gap-1" title="Likes">
              <Heart className="w-3 h-3" />
              {post.likesCount}
            </span>
            <span className="flex items-center gap-1" title="Comments">
              <MessageCircle className="w-3 h-3" />
              {post.commentsCount}
            </span>
          </div>
        </div>
        {hasSpark && (
          <div className="sm:self-center pointer-events-none" aria-hidden>
            <PostSparkline postId={post.id} values={post.sparkline!} />
          </div>
        )}
      </div>
    </Link>
  );
}

export function TradeTalkFeed({
  posts,
  maxVisible = 5,
  postLinkBase = "/trade-talk",
  layout = "default",
  className,
}: TradeTalkFeedProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const visible = maxVisible > 0 ? posts.slice(0, maxVisible) : posts;
  const showAllButton = maxVisible > 0 && posts.length > 0;

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.snippet.toLowerCase().includes(q)
    );
  }, [posts, searchQuery]);

  const sectionTitleClass = "text-sm font-semibold uppercase tracking-wider text-slate-500";
  const isWide = layout === "wide";

  if (posts.length === 0) {
    return (
      <section
        className={cn(
          "rounded-xl border border-slate-700/60 bg-slate-900/80 p-5",
          className
        )}
      >
        <h3 className={cn(sectionTitleClass, "mb-4")}>
          Trade Talk
        </h3>
        <p className="text-slate-500 text-base">No posts yet.</p>
      </section>
    );
  }

  return (
    <>
      <section
        className={cn(
          "rounded-xl border border-slate-700/60 bg-slate-900/80 overflow-hidden flex flex-col",
          isWide && "min-h-[320px] lg:min-h-[400px]",
          className
        )}
      >
        <div className="py-4 px-5 border-b border-slate-700/50 flex items-center justify-between gap-2">
          <h3 className={sectionTitleClass}>
            Trade Talk
          </h3>
          {showAllButton && (
            <Button
              variant="ghost"
              size="sm"
              className="text-success hover:text-success/90 text-sm font-medium"
              onClick={() => setModalOpen(true)}
            >
              Show all
            </Button>
          )}
        </div>
        <div
          className={cn(
            "overflow-y-auto divide-y divide-slate-700/50",
            isWide ? "max-h-[min(560px,70vh)]" : "max-h-[380px]"
          )}
        >
          {visible.map((post) => (
            <PostRow key={post.id} post={post} postLinkBase={postLinkBase} />
          ))}
        </div>
      </section>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/60 rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-4 px-5 border-b border-slate-700/50 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-100 tracking-tight">Trade Talk</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-slate-100"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder:text-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0">
              {filteredPosts.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-base">
                  No posts match your search.
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostRow key={post.id} post={post} postLinkBase={postLinkBase} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
