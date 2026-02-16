export type NotificationType = "achievement" | "badge" | "clan";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  icon: string;
  timestamp: Date;
  read: boolean;
  targetPage?: "achievements" | "profile" | "clan";
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif1",
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "You unlocked the 'Contest 1st Place' achievement!",
    icon: "🏆",
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 min ago
    read: false,
    targetPage: "achievements",
  },
  {
    id: "notif2",
    type: "badge",
    title: "New Badge Earned!",
    message: "You earned the 'Funded Trader' badge for passing your evaluation!",
    icon: "💲",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    targetPage: "profile",
  },
  {
    id: "notif3",
    type: "clan",
    title: "Clan Joined Successfully!",
    message: "Welcome to Gold Rush Traders! Check out your clan chat.",
    icon: "🏆",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    targetPage: "clan",
  },
];
