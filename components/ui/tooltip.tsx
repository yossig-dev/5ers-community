import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  /** Optional class for the popup (e.g. whitespace-normal max-w-xs for long text) */
  contentClassName?: string;
}

export function Tooltip({ children, content, className, contentClassName }: TooltipProps) {
  return (
    <div className={cn("relative group", className ?? "inline-flex")}>
      {children}
      <div
        role="tooltip"
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium text-slate-100 bg-slate-800 border border-slate-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none z-[10050]",
          contentClassName || "whitespace-nowrap"
        )}
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-slate-800" />
      </div>
    </div>
  );
}
