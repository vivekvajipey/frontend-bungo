'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';
import { Trophy, CreditCard, History, Terminal } from 'lucide-react';

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
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-black text-red-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-black border border-red-800 rounded-lg overflow-hidden">
            {/* Header - same as before */}
            <div className="border-b border-red-800 bg-black/50 p-4 flex items-center justify-between">
              {/* ... existing header code ... */}
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
              {/* Game Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 border border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="text-red-500" size={20} />
                    <span className="font-mono text-red-400">CURRENT_POT</span>
                  </div>
                  <div className="text-2xl font-mono text-green-500">
                    ${session.total_pot} USDC
                  </div>
                </div>

                <div className="bg-black/30 border border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="text-red-500" size={20} />
                    <span className="font-mono text-red-400">ENTRY_FEE</span>
                  </div>
                  <div className="text-2xl font-mono text-green-500">
                    ${session.entry_fee} USDC
                  </div>
                </div>

                <div className="bg-black/30 border border-red-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <History className="text-red-500" size={20} />
                    <span className="font-mono text-red-400">TIME_REMAINING</span>
                  </div>
                  <div className="text-2xl font-mono text-red-500">
                    {/* You can add time calculation here if needed */}
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* Create Attempt Button */}
              <div className="flex justify-center">
                <button
                  onClick={createAttempt}
                  className="bg-red-950/50 hover:bg-red-900/50 text-red-400 px-8 py-4 rounded-lg 
                    border border-red-800 transition-colors duration-200 flex items-center space-x-3
                    font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-black"
                >
                  <Terminal size={20} />
                  <span>INITIALIZE_NEW_ATTEMPT</span>
                </button>
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-4 p-4 border border-red-800 rounded-lg bg-black/30">
                  <p className="text-red-500 font-mono">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}