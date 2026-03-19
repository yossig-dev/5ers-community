import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prop Firm Community Dashboard",
  description: "A modern community platform for proprietary traders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-950">
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center bg-slate-950">
                <p className="text-slate-500 text-sm">Loading…</p>
              </div>
            }
          >
            <AppShell>{children}</AppShell>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
