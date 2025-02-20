'use client';

import { Tomorrow } from 'next/font/google';
import { motion } from 'framer-motion';
import { translations } from '@/src/translations';
import { useEffect, useState } from 'react';
import { apiService } from '@/src/services/api';
import { Trophy } from 'lucide-react';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface LeaderboardEntry {
  name: string;
  score: number;
}

export default function LeaderboardPage() {
  const [language, setLanguage] = useState('en');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [paidLeaderboard, setPaidLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showPaidLeaderboard, setShowPaidLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const fetchLeaderboards = async () => {
      try {
        const sessionId = localStorage.getItem('current_session_id');
        if (!sessionId) {
          setError(translations[language].leaderboard.noSession);
          return;
        }
        const [freeData, paidData] = await Promise.all([
          apiService.getSessionLeaderboard(sessionId, 'free'),
          apiService.getSessionLeaderboard(sessionId, 'paid')
        ]);
        setLeaderboard(freeData);
        setPaidLeaderboard(paidData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(translations[language].leaderboard.error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboards();
  }, [language]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        {translations[language].leaderboard.loading}
      </div>
    );
  }

  const currentLeaderboard = showPaidLeaderboard ? paidLeaderboard : leaderboard;

  return (
    <main className={`min-h-screen bg-black text-red-600 pb-20 ${tomorrow.className}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-center flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              {translations[language].leaderboard.title}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPaidLeaderboard(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !showPaidLeaderboard ? 'bg-red-600 text-black' : 'bg-red-950/30'
                }`}
              >
                {translations[language].leaderboard.free}
              </button>
              <button
                onClick={() => setShowPaidLeaderboard(true)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showPaidLeaderboard ? 'bg-red-600 text-black' : 'bg-red-950/30'
                }`}
              >
                {translations[language].leaderboard.paid}
              </button>
            </div>
          </div>

          {error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : currentLeaderboard.length === 0 ? (
            <p className="text-center text-red-400">
              {showPaidLeaderboard
                ? translations[language].leaderboard.noPaidAttempts
                : translations[language].leaderboard.noEntries}
            </p>
          ) : (
            <div className="space-y-4">
              {currentLeaderboard.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    index === 0 ? 'border-yellow-500 bg-yellow-500/10' :
                    index === 1 ? 'border-gray-400 bg-gray-400/10' :
                    index === 2 ? 'border-amber-700 bg-amber-700/10' :
                    'border-red-800/50 bg-red-950/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold min-w-[2ch] text-center">
                      {index + 1}
                    </span>
                    <span className="font-medium">{entry.name}</span>
                  </div>
                  <span className="text-xl font-bold">
                    {entry.score.toFixed(1)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
