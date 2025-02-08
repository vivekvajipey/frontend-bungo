'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, Session, Attempt, User } from '@/src/services/api';

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
      const newAttempt = await apiService.createAttempt(user.id);
      setAttempt(newAttempt);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create attempt');
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
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to send message');
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
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to score attempt');
    } finally {
      setIsScoring(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      Loading...
    </div>;
  }

  if (!session) {
    return <div className="flex items-center justify-center min-h-screen">
      No active session available. Please try again later.
    </div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 text-gray-900">
          <h1 className="text-2xl font-bold mb-4">Active Session</h1>
          <p className="mb-4">Pot: {session.total_pot} WLDD</p>
          
          {!attempt ? (
            <button
              onClick={createAttempt}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Attempt
            </button>
          ) : (
            <div className="space-y-4">
              <div className="border rounded p-4">
                <h2 className="font-semibold mb-2">Your Conversation</h2>
                <div className="space-y-2 mb-4">
                  {attempt.messages.map((msg, i) => (
                    <div key={i} className="space-y-1">
                      <p className="font-medium">You: {msg.content}</p>
                      <p className="text-gray-600">AI: {msg.ai_response}</p>
                    </div>
                  ))}
                </div>
                
                {attempt.messages_remaining > 0 ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 border rounded px-2 py-1"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Send
                    </button>
                  </div>
                ) : attempt.score === undefined ? (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">No messages remaining. Ready for scoring!</p>
                    <button
                      onClick={handleScore}
                      disabled={isScoring}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      {isScoring ? 'Scoring...' : 'Score Attempt'}
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-lg font-semibold">
                      Final Score: {attempt.score.toFixed(1)}/10
                    </p>
                    <p className="text-gray-600">
                      {attempt.is_winner ? 
                        '🎉 Congratulations! You won!' : 
                        'Thanks for playing! Better luck next time.'}
                    </p>
                  </div>
                )}
                
                <p className="mt-2 text-sm text-gray-600">
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