'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Attempt } from '@/src/services/api';
import { AxiosError } from 'axios';
import { Terminal, Send, Loader, Power } from 'lucide-react';

const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #000000;
  }
  ::-webkit-scrollbar-thumb {
    background: #7f1d1d;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #991b1b;
  }
`;

interface PageProps {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ConversationPage({ params, searchParams }: PageProps) {
  const router = useRouter();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isScoring, setIsScoring] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [attempt?.messages]);

  useEffect(() => {
    const loadAttempt = async () => {
      const credentials = localStorage.getItem('worldid_credentials');
      if (!credentials) {
        router.push('/');
        return;
      }

      try {
        const { attemptId } = await params;
        const attemptData = await apiService.getAttempt(attemptId);
        setAttempt(attemptData);
      } catch (_) {
        router.push('/game');
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [router, params]);

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
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <Loader className="animate-spin" size={24} />
        <span className="ml-2">INITIALIZING...</span>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <Terminal size={24} />
        <span className="ml-2">ATTEMPT NOT FOUND. REDIRECTING...</span>
      </div>
    );
  }

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-black border border-red-800 rounded-lg overflow-hidden relative">
          {/* Header */}
          <div className="border-b border-red-800 bg-black/50 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="text-red-500" size={24} />
              <span className="text-xl font-mono text-red-400">NEURAL_LINK_v2.4</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-mono">
                <span className="text-red-400">STATUS: </span>
                <span className="text-green-500">ACTIVE</span>
              </div>
              <Power 
                onClick={() => router.push('/game')} 
                className="text-red-500 hover:text-red-400 cursor-pointer" 
                size={20} 
              />
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto bg-black/90 p-4 space-y-4">
            {attempt.messages.map((msg, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-start justify-end space-x-2">
                  <div className="bg-red-950/30 p-3 rounded-lg border border-red-800/50 max-w-[80%]">
                    <div className="text-sm text-red-400">{msg.content}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-black/50 p-3 rounded-lg border border-red-900/50 max-w-[80%]">
                    <div className="text-sm text-red-500 font-mono">{msg.ai_response}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-red-800 bg-black/50 p-4">
            {attempt.messages_remaining > 0 ? (
              <div className="flex space-x-2">
                <div className="flex-1 relative">
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
                    placeholder="Enter command..."
                    className="w-full bg-black/70 text-red-400 placeholder-red-900 border border-red-800 
                      rounded-lg py-2 px-4 focus:outline-none focus:border-red-500 font-mono"
                  />
                  <div className="absolute right-2 top-2 text-xs text-red-700">
                    {attempt.messages_remaining} queries remaining
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  className="bg-red-950/50 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-lg 
                    border border-red-800 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Send size={16} />
                  <span>SEND</span>
                </button>
              </div>
            ) : attempt.score === undefined ? (
              <div className="flex justify-center">
                <button
                  onClick={handleScore}
                  disabled={isScoring}
                  className="bg-red-950/50 hover:bg-red-900/50 text-red-400 px-6 py-3 rounded-lg 
                    border border-red-800 transition-colors duration-200 flex items-center space-x-2
                    disabled:opacity-50"
                >
                  {isScoring ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      <span>PROCESSING</span>
                    </>
                  ) : (
                    <>
                      <Terminal size={16} />
                      <span>INITIATE SCORING PROTOCOL</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center px-4">
                <div className="text-lg font-mono">
                  <span className="text-red-400">FINAL_SCORE: </span>
                  <span className="text-red-500">{attempt.score.toFixed(1)}/10</span>
                </div>
                {attempt.earnings && (
                  <div className="text-lg font-mono">
                    <span className="text-red-400">EARNINGS: </span>
                    <span className="text-red-500">{attempt.earnings} USDC</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 border-t border-red-800">
              <p className="text-red-500 font-mono">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}