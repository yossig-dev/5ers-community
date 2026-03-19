"use client";

import Link from "next/link";
import { UserPlus, Share2, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import type { TraderProfile } from "@/lib/types/trader-profile";
import { cn } from "@/lib/utils";

/** Country flag image from ISO 3166-1 alpha-2 code (flagcdn.com) */
function CountryFlag({ code }: { code: string }) {
  if (!code || code.length !== 2) return null;
  const iso = code.toLowerCase();
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt=""
      className="h-5 w-7 object-cover rounded-sm inline-block"
      width={28}
      height={20}
    />
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  IL: "Israel", US: "United States", GB: "United Kingdom", DE: "Germany", FR: "France",
  CA: "Canada", AU: "Australia", IN: "India", BR: "Brazil", JP: "Japan", CN: "China",
  ES: "Spain", IT: "Italy", NL: "Netherlands", PL: "Poland", RU: "Russia", KR: "South Korea",
};

export interface ProfileHeaderProps {
  profile: Pick<
    TraderProfile,
    "nickname" | "avatar" | "createdAt" | "countryCode" | "clan" | "badges"
  >;
  onFollow?: () => void;
  onShare?: () => void;
  isFollowing?: boolean;
  className?: string;
}

export function ProfileHeader({
  profile,
  onFollow,
  onShare,
  isFollowing,
  className,
}: ProfileHeaderProps) {
  const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const memberSince = `Member since ${joinDate}`;
  const countryName = profile.countryCode ? (COUNTRY_NAMES[profile.countryCode.toUpperCase()] ?? profile.countryCode) : null;

  return (
    <header
      className={cn(
        "rounded-xl border border-slate-700/60 bg-slate-800 overflow-visible",
        className
      )}
    >
      <div className="h-14 aria-hidden relative z-0" />
      <div className="relative px-5 sm:px-6 pb-5 pt-0 z-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 -mt-9">
          <Avatar className="w-20 h-20 rounded-xl border-2 border-slate-700 bg-slate-800 shadow-lg flex-shrink-0">
            <AvatarFallback className="text-base rounded-xl bg-slate-700 text-slate-200 font-semibold">
              {profile.avatar || profile.nickname.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h1 className="text-lg font-semibold text-slate-100 truncate tracking-tight">
                {profile.nickname}
              </h1>
              {profile.countryCode && (
                <Tooltip content={countryName ?? profile.countryCode}>
                  <span
                    className="flex items-center cursor-default"
                    title={countryName ?? profile.countryCode}
                  >
                    <CountryFlag code={profile.countryCode} />
                  </span>
                </Tooltip>
              )}
            </div>
            <p className="text-sm text-slate-500 mb-2">{memberSince}</p>
            {profile.clan && (
              <Link
                href="/?tab=clan"
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 mb-2 inline-flex transition-colors"
              >
                {profile.clan.icon && <span className="text-sm">{profile.clan.icon}</span>}
                <span>Clan: {profile.clan.name}</span>
              </Link>
            )}
            {profile.badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {[...profile.badges]
                  .sort((a, b) => {
                    const aFirst = /10k\s*payout/i.test(a.name) ? 0 : 1;
                    const bFirst = /10k\s*payout/i.test(b.name) ? 0 : 1;
                    return aFirst - bFirst;
                  })
                  .map((b) => (
                  <Tooltip key={b.id} content={b.name}>
                    <span>
                      <Badge
                        variant="secondary"
                        className="text-sm font-medium bg-slate-700/80 text-slate-300 border border-slate-600 cursor-default px-2 py-0.5"
                      >
                        {b.icon} {b.name}
                      </Badge>
                    </span>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <Button
              size="sm"
              className={cn(
                "text-white text-base font-medium",
                isFollowing
                  ? "bg-slate-600 hover:bg-slate-500 border border-slate-500 hover:bg-slate-500 hover:border-slate-400"
                  : "bg-success hover:bg-success/90 hover:brightness-110"
              )}
              onClick={onFollow}
            >
              {isFollowing ? (
                <Check className="w-3.5 h-3.5 mr-1.5" />
              ) : (
                <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 border-slate-600 text-slate-400 hover:text-slate-100 hover:border-slate-500 hover:bg-slate-700/50"
              onClick={onShare}
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
