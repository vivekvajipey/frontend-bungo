'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <div className="container mx-auto flex gap-4">
        <Link 
          href="/game" 
          className={`px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/game' ? 'bg-gray-700' : ''}`}
        >
          Game
        </Link>
        <Link 
          href="/admin/payments" 
          className={`px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/admin/payments' ? 'bg-gray-700' : ''}`}
        >
          Payments
        </Link>
        <Link 
          href="/admin/attempts" 
          className={`px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/admin/attempts' ? 'bg-gray-700' : ''}`}
        >
          Attempts
        </Link>
      </div>
    </nav>
  );
}
