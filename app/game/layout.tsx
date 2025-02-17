'use client';

import BottomNav from "@/src/components/BottomNav";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
      <BottomNav />
    </div>
  );
}
