'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';
import { InstructionsModal } from '@/src/components/InstructionsModal';
import { InfoModal } from '@/src/components/InfoModal';
import { motion } from 'framer-motion';
import { translations } from '@/src/translations';
import { Info } from 'lucide-react';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

const INSTRUCTIONS_SHOWN_KEY = 'bungo_instructions_shown';

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [language, setLanguage] = useState('en');
  const [hasFreeAttempt, setHasFreeAttempt] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const credentials = localStorage.getItem('worldid_credentials');
    if (!credentials) {
      router.push('/');
      return;
    }

    // Check if instructions have been shown before
    const instructionsShown = localStorage.getItem(INSTRUCTIONS_SHOWN_KEY);
    if (instructionsShown === 'true') {
      setShowInstructions(false);
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Check for free attempt
    const checkFreeAttempt = async () => {
      try {
        const hasFree = await apiService.hasFreeAttempt();
        setHasFreeAttempt(hasFree);
      } catch (error) {
        console.error('Failed to check free attempt:', error);
      }
    };
    checkFreeAttempt();

    const fetchSession = async () => {
      try {
        const sessionData = await apiService.getCurrentSession();
        setSession(sessionData);
        // Save session ID for leaderboard
        if (sessionData) {
          localStorage.setItem('current_session_id', sessionData.id);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
    const interval = setInterval(fetchSession, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [router]);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem(INSTRUCTIONS_SHOWN_KEY, 'true');
  };

  const createAttempt = async () => {
    if (!session) {
      console.log('No session available');
      return;
    }
    
    try {
      setError('');
      console.log('Starting attempt creation with entry fee:', session.entry_fee);

      const paymentReference = await apiService.processPayment();
      console.log('Got payment reference:', paymentReference);
      
      const newAttempt = await apiService.createAttempt(paymentReference);
      console.log('New attempt created:', newAttempt);
      
      router.push(`/game/conversation/${newAttempt.id}`);
    } catch (err: unknown) {
      console.error('Error creating attempt:', err);
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to create attempt');
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        {translations[language].game.loading}
      </div>
    );
  }

  if (!session) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        {translations[language].game.noSession}
      </div>
    );
  }

  return (
    <>
      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={handleCloseInstructions}
        language={language}
      />
      
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        language={language}
      />
      
      <main className={`min-h-screen bg-black text-red-600 pb-20 ${tomorrow.className}`}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl mx-auto px-4 py-8 text-center"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm relative"
          >
            {/* Info Button */}
            <button
              onClick={() => setShowInfo(true)}
              className="absolute top-4 right-4 p-2 text-red-500/70 hover:text-red-500
                transition-all duration-200 rounded-full hover:bg-red-500/10"
            >
              <Info size={20} />
            </button>

            <h1 className="text-3xl mb-4">{translations[language].game.currentSession}</h1>
            <div className="mb-2">
              <span className="text-sm text-red-800">{translations[language].game.totalPot}:</span>
              <p className="text-5xl font-bold">${session.total_pot.toFixed(2)}</p>
            </div>
            <p className="text-sm text-red-800 mb-8">
              {translations[language].game.entryFee}: ${session.entry_fee} USDC
            </p>
            
            {/* Challenge Text */}
            <div className="relative mb-8 py-4">
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
                animate-[shimmer_2s_infinite]" />
              <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-red-500/50 to-transparent" />
              <div className="absolute bottom-0 right-0 w-32 h-0.5 bg-gradient-to-l from-red-500/50 to-transparent" />
              <h2 className="relative text-2xl font-bold text-red-500 tracking-wide">
                {translations[language].game.challenge}
              </h2>
            </div>
            
            <button
              onClick={createAttempt}
              className="group relative w-full py-4 px-6 bg-red-950/30 border border-red-800/50 text-red-500 rounded-lg
                overflow-hidden transition-all duration-300 font-bold tracking-wider text-lg hover:bg-red-900/30"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
                translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              
              {/* Border glow effect */}
              <div className="absolute inset-0 border border-red-800/50 rounded-lg opacity-0
                group-hover:opacity-100 transition-opacity duration-300
                animate-pulse" />
              
              <span className="relative z-10">
                {hasFreeAttempt ? translations[language].game.challengeButtonFree : translations[language].game.challengeButton}
              </span>
            </button>

            {error && (
              <p className="text-red-500 mt-4">{error}</p>
            )}
            
            <p className="mt-6 text-sm text-red-800">
              {translations[language].game.sessionEnds}: {new Date(session.end_time).toLocaleTimeString()}
            </p>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}