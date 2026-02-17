import { Star } from "lucide-react";

type TierStarsProps = {
  currentTier: number;
  maxTiers: number;
  size?: "sm" | "md" | "lg";
};

export function TierStars({ currentTier, maxTiers, size = "md" }: TierStarsProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxTiers }).map((_, index) => {
        const tierNumber = index + 1;
        const isUnlocked = tierNumber <= currentTier;

        return (
          <Star
            key={tierNumber}
            className={`${sizeClasses[size]} ${
              isUnlocked
                ? "fill-yellow-400 text-yellow-400"
                : "fill-slate-700 text-slate-700"
            } transition-colors`}
          />
        );
      })}
    </div>
  );
}
