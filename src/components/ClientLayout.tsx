'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const credentials = localStorage.getItem('worldid_credentials');
    setIsVerified(!!credentials);
  }, []);

  // Only show bottom nav if user is verified and not on the intro page
  const showBottomNav = isVerified && pathname !== '/';

  return (
    <>
      {children}
      {showBottomNav && <BottomNav />}
    </>
  );
}
