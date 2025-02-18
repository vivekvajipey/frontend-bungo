'use client';

import { Tomorrow } from 'next/font/google';
import { motion } from 'framer-motion';
import { translations } from '@/src/translations';
import { useEffect, useState } from 'react';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function LeaderboardPage() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <main className={`min-h-screen bg-black text-red-600 pb-20 ${tomorrow.className}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm text-center"
        >
          <h1 className="text-3xl font-bold mb-6">{translations[language].leaderboard.title}</h1>
          <div className="py-8">
            <span className="material-icons-outlined text-6xl text-red-800 mb-4">construction</span>
            <p className="text-xl text-red-400">{translations[language].leaderboard.comingSoon}</p>
            <p className="text-sm text-red-800 mt-2">
              {translations[language].leaderboard.underConstruction}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
