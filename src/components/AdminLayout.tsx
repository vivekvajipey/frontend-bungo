'use client';

import { useEffect, useState } from 'react';
import AdminNav from './AdminNav';

// Check if user is admin based on verify response
const checkAdminStatus = async () => {
  if (typeof window === 'undefined') return false;
  const credentialsStr = localStorage.getItem('worldid_credentials');
  if (!credentialsStr) return false;
  
  try {
    const credentials = JSON.parse(credentialsStr);
    const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...credentials,
        action: "enter",
      }),
    });

    const data = await verifyResponse.json();
    return data.is_admin || false;
  } catch (e) {
    console.error('Error checking admin status:', e);
    return false;
  }
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAdminNav, setShowAdminNav] = useState(false);

  useEffect(() => {
    checkAdminStatus().then(setShowAdminNav);
  }, []);

  return (
    <div>
      {showAdminNav && <AdminNav />}
      {children}
    </div>
  );
}
