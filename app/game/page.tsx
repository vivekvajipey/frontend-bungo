'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session, AttemptResponse } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';
import { InstructionsModal } from '@/src/components/InstructionsModal';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

const INSTRUCTIONS_SHOWN_KEY = 'bungo_instructions_shown';

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [attempts, setAttempts] = useState<AttemptResponse[]>([]);
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
    if (instructionsShown) {
      setShowInstructions(false);
    }

    Promise.all([
      apiService.getCurrentSession(),
      apiService.getSessionAttempts()
    ])
      .then(([sessionData, attemptsData]) => {
        setSession(sessionData);
        setAttempts(attemptsData);
      })
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
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
    <main className={`min-h-screen bg-black text-red-600 py-8 ${tomorrow.className}`}>
      <InstructionsModal 
        isOpen={showInstructions} 
        onClose={handleCloseInstructions} 
      />
      
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Active Session</h1>
          <p className="mb-2">Entry Fee: ${session?.entry_fee} USDC</p>
          <p className="mb-4">Total Pot: ${session?.total_pot} USDC</p>
          
          {/* Show all attempts */}
          {attempts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-red-400">Your Attempts</h2>
              <div className="space-y-2">
                {attempts.map(attempt => (
                  <div 
                    key={attempt.id} 
                    onClick={() => router.push(`/game/conversation/${attempt.id}`)}
                    className="p-3 border border-red-800 rounded bg-black/30 cursor-pointer hover:bg-black/50"
                  >
                    <p className="text-red-500">Score: {attempt.score?.toFixed(1) ?? 'Not scored'}</p>
                    <p className="text-red-400">Pot Size: ${attempt.total_pot} USDC</p>
                    <p className="text-red-400">Earnings: Pending</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Attempt button */}
          <button
            onClick={createAttempt}
            className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
              shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-colors duration-200"
          >
            Start New Attempt (${session?.entry_fee} USDC)
          </button>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}