'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { apiService, AttemptResponse } from '@/src/services/api';
import { translations } from '@/src/translations';

const glowingBorder = {
  boxShadow: '0 0 10px rgba(239, 68, 68, 0.5), inset 0 0 5px rgba(239, 68, 68, 0.2)',
};

const AttemptCard = ({ attempt, index, language }: { attempt: AttemptResponse; index: number; language: string }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => router.push(`/game/conversation/${attempt.id}`)}
      className="relative cursor-pointer group"
    >
      <div 
        className="bg-black border border-red-500 rounded-lg p-6 mb-4 transform transition-all duration-300 hover:scale-105 hover:border-red-400"
        style={glowingBorder}
      >
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-glitch" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-2">
            <div className="text-red-500 font-mono text-sm">
              ID: {attempt.id.slice(0, 8)}...
            </div>
            <div className="text-red-400 font-mono text-sm animate-pulse">
              {translations[language].attempts.messagesLeft}: {attempt.messages_remaining}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-red-500 font-bold">
              {translations[language].attempts.score}: <span className={attempt.score ? 'text-green-500' : 'text-yellow-500'}>
                {attempt.score?.toFixed(1) ?? translations[language].attempts.inProgress}
              </span>
            </div>
            <div className="text-red-500 font-mono">
              {attempt.earnings 
                ? `${translations[language].attempts.won}: $${attempt.earnings}` 
                : `${translations[language].attempts.pot}: $${attempt.total_pot}`}
            </div>
          </div>

          {/* Cyberpunk decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
            <div className="absolute top-0 right-0 w-8 h-1 bg-red-500 transform rotate-45" />
            <div className="absolute top-0 right-0 w-1 h-8 bg-red-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function AttemptsPage() {
  const [attempts, setAttempts] = useState<AttemptResponse[]>([]);
  const [language, setLanguage] = useState('en');
  const router = useRouter();

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const fetchAttempts = async () => {
      try {
        const response = await apiService.getSessionAttempts();
        setAttempts(response);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      }
    };

    fetchAttempts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            {translations[language].attempts.title}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/game')}
            className="px-6 py-2 bg-red-500 text-white rounded-md font-medium transition-colors hover:bg-red-600"
            style={glowingBorder}
          >
            {translations[language].attempts.newAttempt}
          </motion.button>
        </div>

        {attempts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-red-500 mb-4 text-6xl">🎮</div>
            <p className="text-red-400 text-lg mb-4">{translations[language].attempts.noAttempts}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/game')}
              className="px-8 py-3 bg-red-500 text-white rounded-md font-medium transition-colors hover:bg-red-600"
              style={glowingBorder}
            >
              {translations[language].attempts.startFirst}
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt, index) => (
              <AttemptCard key={attempt.id} attempt={attempt} index={index} language={language} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
