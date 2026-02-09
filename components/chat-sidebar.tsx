"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ChevronRight, Hash, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { MOCK_CHANNELS, MOCK_CHAT_MESSAGES } from "@/lib/constants";
import { getRelativeTime } from "@/lib/utils";

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeChannel, setActiveChannel] = useState("general");
  const [message, setMessage] = useState("");

  const filteredMessages = MOCK_CHAT_MESSAGES.filter(
    (msg) => msg.channel === activeChannel
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-success text-slate-950 p-4 rounded-full shadow-lg hover:bg-success/90 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Hash className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative top-16 lg:top-0 right-0 w-full sm:w-80 h-[calc(100vh-4rem)] lg:h-screen border-l border-slate-800 bg-slate-900/95 lg:bg-slate-900/50 backdrop-blur-xl flex flex-col z-40"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-success" />
                  Live Chat
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Channel List */}
              <div className="space-y-1">
                {MOCK_CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-sm ${
                      activeChannel === channel.id
                        ? "bg-success/10 text-success border border-success/20"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{channel.icon}</span>
                      <span className="font-medium">{channel.name}</span>
                    </span>
                    {channel.unread && (
                      <Badge
                        variant="secondary"
                        className="bg-success text-slate-950 text-xs"
                      >
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <AnimatePresence>
                {filteredMessages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ChatMessage message={msg} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm">
                  <Hash className="w-12 h-12 mb-2 opacity-50" />
                  <p>No messages yet</p>
                  <p className="text-xs mt-1">Be the first to say something!</p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message.trim()) {
                    // Handle message send
                    setMessage("");
                  }
                }}
                className="flex gap-2"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message #${
                    MOCK_CHANNELS.find((c) => c.id === activeChannel)?.name
                  }...`}
                  className="flex-1 bg-slate-800/50 border-slate-700 focus:border-success"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-success hover:bg-success/90 text-slate-950"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

function ChatMessage({ message }: { message: any }) {
  return (
    <div className="flex gap-3 group">
      <Avatar className="w-8 h-8 bg-gradient-to-br from-success to-emerald-600 border border-success/20 flex-shrink-0">
        <AvatarFallback className="text-sm">
          {message.user.avatar}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <p className="font-semibold text-slate-200 text-sm">
            {message.user.username}
          </p>
          <LevelBadge level={message.user.level} showIcon={false} className="text-[10px] px-1.5 py-0" />
          <span className="text-xs text-slate-500">
            {getRelativeTime(message.timestamp)}
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
}
