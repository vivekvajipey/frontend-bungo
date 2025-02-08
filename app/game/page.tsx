'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session, Attempt } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<Attempt | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isScoring, setIsScoring] = useState(false);

  useEffect(() => {
    const credentials = localStorage.getItem('worldid_credentials');
    if (!credentials) {
      router.push('/');
      return;
    }

    // Check for active session
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
      
      console.log('Creating attempt with payment reference...');
      const newAttempt = await apiService.createAttempt(paymentReference);
      console.log('New attempt created:', newAttempt);
      
      setCurrentAttempt(newAttempt);
    } catch (err: unknown) {
      console.error('Error creating attempt:', err);
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to create attempt');
    }
  };

  const sendMessage = async () => {
    if (!currentAttempt || !message.trim()) return;

    try {
      const response = await apiService.sendMessage(currentAttempt.id, message);
      setCurrentAttempt(prev => prev ? {
        ...prev,
        messages: [...prev.messages, response],
        messages_remaining: prev.messages_remaining - 1
      } : null);
      setMessage('');
    } catch (err: unknown) {
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to send message');
    }
  };

  const handleScore = async () => {
    if (!currentAttempt) return;
    
    try {
      setIsScoring(true);
      const result = await apiService.forceScore(currentAttempt.id);
      setCurrentAttempt(prev => prev ? {
        ...prev,
        score: result.score,
      } : null);
    } catch (err: unknown) {
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to score attempt');
    } finally {
      setIsScoring(false);
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

          {/* Always show Start Attempt button */}
          <button
            onClick={createAttempt}
            className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
              shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-colors duration-200"
          >
            Start New Attempt (${session.entry_fee} USDC)
          </button>

          {/* Current attempt interface */}
          {currentAttempt && (
            <div className="border border-red-800 rounded-lg p-4 mt-4 bg-black/30">
              <h2 className="font-semibold mb-2 text-red-400">Current Attempt</h2>
              <div className="space-y-2 mb-4">
                {currentAttempt.messages.map((msg, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-medium text-red-500">You: {msg.content}</p>
                    <p className="text-red-400">AI: {msg.ai_response}</p>
                  </div>
                ))}
              </div>
              
              {currentAttempt.messages_remaining > 0 ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 mt-1 block w-full rounded-md border-red-800 bg-black/30 text-red-500 
                      placeholder-red-900 shadow-sm focus:border-red-500 focus:ring-red-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="flex-shrink-0 flex justify-center items-center py-2 px-4 border border-red-800 
                      rounded-md shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                      transition-colors duration-200"
                  >
                    Send
                  </button>
                </div>
              ) : currentAttempt.score === undefined ? (
                <div className="mt-4">
                  <p className="text-red-400 mb-2">No messages remaining. Ready for scoring!</p>
                  <button
                    onClick={handleScore}
                    disabled={isScoring}
                    className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
                      shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                      transition-colors duration-200 disabled:opacity-50"
                  >
                    {isScoring ? 'Scoring...' : 'Score Attempt'}
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-lg font-semibold text-red-400">
                    Final Score: {currentAttempt.score.toFixed(1)}/10
                  </p>
                  {currentAttempt.earnings && (
                    <p className="text-red-400">
                      Earnings: ${currentAttempt.earnings} USDC
                    </p>
                  )}
                </div>
              )}
              
              <p className="mt-2 text-sm text-red-400">
                Messages remaining: {currentAttempt.messages_remaining}
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
} 