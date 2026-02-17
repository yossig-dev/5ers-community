"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ShareAchievementProps = {
  achievementName: string;
  achievementIcon: string;
  achievementDescription: string;
};

export function ShareAchievement({
  achievementName,
  achievementIcon,
  achievementDescription,
}: ShareAchievementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = 600; // Approximate height of the dropdown
      const dropdownWidth = 288; // w-72 = 288px
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Find the parent card element for better positioning
      let cardRect = rect;
      const parentCard = buttonRef.current.closest('.glass-card-hover, .glass-card');
      if (parentCard) {
        cardRect = parentCard.getBoundingClientRect();
      }
      
      // Check if we should show above or below
      const shouldShowAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      setShowAbove(shouldShowAbove);
      
      // Position to the right of the card, slightly overlapping
      let leftPos = cardRect.right + window.scrollX - dropdownWidth + 20;
      
      // Ensure dropdown doesn't go off the left edge
      if (leftPos < 16) {
        leftPos = 16; // 16px padding from left edge
      }
      
      // Ensure dropdown doesn't go off the right edge
      if (leftPos + dropdownWidth > window.innerWidth - 16) {
        leftPos = window.innerWidth - dropdownWidth - 16;
      }
      
      let topPos: number;
      
      if (shouldShowAbove) {
        // Position above, aligned with top of card
        topPos = cardRect.top + window.scrollY - dropdownHeight + 40;
        // Ensure it doesn't go above the viewport
        if (topPos < window.scrollY + 16) {
          topPos = window.scrollY + 16; // 16px padding from top
        }
      } else {
        // Position below, aligned with top of card
        topPos = cardRect.top + window.scrollY - 40;
        // Ensure it doesn't go below the viewport
        const maxTop = window.scrollY + window.innerHeight - dropdownHeight - 16;
        if (topPos > maxTop) {
          topPos = maxTop;
        }
      }
      
      setPosition({
        top: topPos,
        left: leftPos,
      });
    }
  }, [isOpen]);

  const shareText = `🎉 I just unlocked the "${achievementName}" achievement on The 5ers! ${achievementIcon}\n\n${achievementDescription}`;
  
  const shareUrl = "https://the5ers.com"; // Replace with actual URL

  const handleShare = (platform: string) => {
    let url = "";
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "whatsapp":
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
      setIsOpen(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
    setIsOpen(false);
  };

  return (
    <>
      <div ref={buttonRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-[10000]"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="fixed w-72 z-[10001]"
                style={{
                  top: `${position.top}px`,
                  left: `${position.left}px`,
                }}
              >
                <Card className="glass-card border-slate-700 shadow-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-semibold text-slate-100">
                        Share Achievement
                      </p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      }
                      label="Share on Twitter"
                      onClick={() => handleShare("twitter")}
                      color="hover:bg-slate-800"
                    />
                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      }
                      label="Share on Facebook"
                      onClick={() => handleShare("facebook")}
                      color="hover:bg-slate-800"
                    />
                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      }
                      label="Share on LinkedIn"
                      onClick={() => handleShare("linkedin")}
                      color="hover:bg-slate-800"
                    />
                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                      }
                      label="Share on WhatsApp"
                      onClick={() => handleShare("whatsapp")}
                      color="hover:bg-slate-800"
                    />
                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.326c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      }
                      label="Share on Telegram"
                      onClick={() => handleShare("telegram")}
                      color="hover:bg-slate-800"
                    />

                    <div className="border-t border-slate-800 my-2"></div>

                    <SocialButton
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      }
                      label="Copy to Clipboard"
                      onClick={copyToClipboard}
                      color="hover:bg-slate-800"
                    />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function SocialButton({
  icon,
  label,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-slate-100 ${color} transition-colors`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  );
}
