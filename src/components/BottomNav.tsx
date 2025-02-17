'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-red-800 backdrop-blur-sm"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex justify-around items-center h-16 px-4">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center w-20 py-2 text-sm ${
            pathname === '/' ? 'text-red-600' : 'text-red-800'
          } hover:text-red-600 transition-colors`}
        >
          <span className="material-icons-outlined mb-1">monetization_on</span>
          <span>Session</span>
        </Link>
        <Link 
          href="/attempts" 
          className={`flex flex-col items-center justify-center w-20 py-2 text-sm ${
            pathname === '/attempts' ? 'text-red-600' : 'text-red-800'
          } hover:text-red-600 transition-colors`}
        >
          <span className="material-icons-outlined mb-1">history</span>
          <span>Attempts</span>
        </Link>
        <Link 
          href="/leaderboard" 
          className={`flex flex-col items-center justify-center w-20 py-2 text-sm ${
            pathname === '/leaderboard' ? 'text-red-600' : 'text-red-800'
          } hover:text-red-600 transition-colors`}
        >
          <span className="material-icons-outlined mb-1">leaderboard</span>
          <span>Leaders</span>
        </Link>
      </div>
    </motion.nav>
  );
}
