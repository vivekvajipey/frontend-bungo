'use client';

import { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { useRouter } from 'next/router';

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
        name: localStorage.getItem('user_name') || 'Anonymous User',
        language: localStorage.getItem('language') || 'english'
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
  const router = useRouter();

  useEffect(() => {
    const verifyAdmin = async () => {
      const credentials = localStorage.getItem('worldid_credentials');
      if (!credentials) {
        router.push('/');
        return;
      }

      const parsedCredentials = JSON.parse(credentials);
      const storedLanguage = localStorage.getItem('language') || 'english';

      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedCredentials,
          action: "enter",
          name: localStorage.getItem('user_name') || 'Anonymous User',
          language: storedLanguage
        }),
      });

      const data = await verifyResponse.json();
      setShowAdminNav(data.is_admin || false);
    };
    verifyAdmin();
  }, []);

  return (
    <div>
      {showAdminNav && <AdminNav />}
      {children}
    </div>
  );
}
