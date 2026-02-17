"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_NOTIFICATIONS } from "@/lib/notifications";
import type { Notification } from "@/lib/notifications";

export function NotificationsDropdown({ onNavigate }: { onNavigate: (page: string, targetId?: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.targetPage) {
      onNavigate(notification.targetPage, notification.targetId);
      setIsOpen(false);
    }
  };

  const clearAll = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getRelativeTime = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-96 max-h-[600px] z-50"
            >
              <Card className="glass-card border-slate-700 shadow-2xl">
                <CardHeader className="border-b border-slate-800">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-success" />
                      Notifications
                      {unreadCount > 0 && (
                        <Badge className="bg-red-500 text-white border-0">
                          {unreadCount}
                        </Badge>
                      )}
                    </CardTitle>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-xs text-slate-400 hover:text-slate-200"
                      >
                        Mark all read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400">No notifications yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`w-full text-left p-4 hover:bg-slate-800/30 transition-colors ${
                            !notification.read ? "bg-slate-800/20" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="text-2xl flex-shrink-0">
                              {notification.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <p className="text-sm font-semibold text-slate-100">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-success rounded-full flex-shrink-0 mt-1"></span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mb-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500" suppressHydrationWarning>
                                {getRelativeTime(notification.timestamp)}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
