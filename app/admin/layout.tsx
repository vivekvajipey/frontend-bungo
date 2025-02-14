'use client';

import AdminNav from '@/src/components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
