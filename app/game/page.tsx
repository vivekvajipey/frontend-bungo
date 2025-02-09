'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const credentials = localStorage.getItem('worldid_credentials');
    if (!credentials) {
      router.push('/');
      return;
    }

    apiService.getCurrentSession()
      .then(setSession)
      .catch(() => router.push('/'))
      .finally(() => setLoading(false));
  }, [router]);

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
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-4 text-red-400">Active Session</h1>
          <p className="mb-2">Entry Fee: ${session?.entry_fee} USDC</p>
          <p className="mb-4">Total Pot: ${session?.total_pot} USDC</p>
          
          {/* Show all attempts */}
          {session?.attempts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 text-red-400">Your Attempts</h2>
              <div className="space-y-2">
                {session.attempts.map(attempt => (
                  <div key={attempt.id} className="p-3 border border-red-800 rounded bg-black/30">
                    <p className="text-red-500">Score: {attempt.score?.toFixed(1) ?? 'Not scored'}</p>
                    {attempt.earnings && (
                      <p className="text-red-400">Earnings: ${attempt.earnings} USDC</p>
                    )}
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
            Start New Attempt (${session.entry_fee} USDC)
          </button>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}