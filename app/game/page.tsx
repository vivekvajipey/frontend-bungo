'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';
import { InstructionsModal } from '@/src/components/InstructionsModal';
import { motion } from 'framer-motion';

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

    const fetchSession = async () => {
      try {
        const sessionData = await apiService.getCurrentSession();
        setSession(sessionData);
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
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        No active session available. Please try again later.
      </div>
    );
  }

  return (
    <>
      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={handleCloseInstructions} 
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
            className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm"
          >
            <h1 className="text-3xl mb-4">Current Session</h1>
            <p className="text-5xl font-bold mb-2">${session.total_pot.toFixed(2)}</p>
            <p className="text-sm text-red-800 mb-8">Entry Fee: ${session.entry_fee} USDC</p>
            
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
              
              <span className="relative z-10">Challenge Bungo</span>
            </button>

            {error && (
              <p className="text-red-500 mt-4">{error}</p>
            )}
            
            <p className="mt-6 text-sm text-red-800">
              Session ends: {new Date(session.end_time).toLocaleTimeString()}
            </p>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}