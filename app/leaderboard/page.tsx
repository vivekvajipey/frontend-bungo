'use client';

import { Tomorrow } from 'next/font/google';
import { motion } from 'framer-motion';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function LeaderboardPage() {
  return (
    <main className={`min-h-screen bg-black text-red-600 pb-20 ${tomorrow.className}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm text-center"
        >
          <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
          <div className="py-8">
            <span className="material-icons-outlined text-6xl text-red-800 mb-4">construction</span>
            <p className="text-xl text-red-400">Coming Soon</p>
            <p className="text-sm text-red-800 mt-2">
              The leaderboard is under construction. Check back later to see who&apos;s teaching Bungo the most!
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
