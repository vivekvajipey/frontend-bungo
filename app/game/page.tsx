'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, Session, Attempt, User } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Tomorrow } from 'next/font/google';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function GamePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isScoring, setIsScoring] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/');
      return;
    }

    const loadedUser = JSON.parse(userStr);
    setUser(loadedUser);

    // Check for active session
    apiService.getCurrentSession()
      .then(setSession)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const createAttempt = async () => {
    if (!user || !session) return;
    
    try {
      const newAttempt = await apiService.createAttempt(user.id, user.wldd_id);
      setAttempt(newAttempt);
    } catch (err: unknown) {
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to create attempt');
    }
  };

  const sendMessage = async () => {
    if (!attempt || !message.trim()) return;

    try {
      const response = await apiService.sendMessage(attempt.id, message);
      setAttempt(prev => prev ? {
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
    if (!attempt) return;
    
    try {
      setIsScoring(true);
      const result = await apiService.forceScore(attempt.id);
      setAttempt(prev => prev ? {
        ...prev,
        score: result.score,
        is_winner: result.score > 7.0
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
          <p className="mb-4">Pot: {attempt?.total_pot ?? session.total_pot} WLDD</p>
          
          {!attempt ? (
            <button
              onClick={createAttempt}
              className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
                shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                transition-colors duration-200"
            >
              Start Attempt
            </button>
          ) : (
            <div className="space-y-4">
              <div className="border border-red-800 rounded-lg p-4 bg-black/30">
                <h2 className="font-semibold mb-2 text-red-400">Your Conversation</h2>
                <div className="space-y-2 mb-4">
                  {attempt.messages.map((msg, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-medium text-red-500">You: {msg.content}</p>
                      <p className="text-red-400">AI: {msg.ai_response}</p>
                    </div>
                  ))}
                </div>
                
                {attempt.messages_remaining > 0 ? (
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
                ) : attempt.score === undefined ? (
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
                      Final Score: {attempt.score.toFixed(1)}/10
                    </p>
                    <p className="text-red-400">
                      {attempt.is_winner ? 
                        '🎉 Congratulations! You won!' : 
                        'Thanks for playing! Better luck next time.'}
                    </p>
                  </div>
                )}
                
                <p className="mt-2 text-sm text-red-400">
                  Messages remaining: {attempt.messages_remaining}
                </p>
              </div>
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