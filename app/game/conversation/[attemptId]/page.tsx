'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Attempt } from '@/src/services/api';
import { AxiosError } from 'axios';
import { MessageSquare, Send, Award, Brain, Sparkles } from 'lucide-react';
import { Tomorrow } from 'next/font/google';
import { TypewriterText } from '@/src/components/ui/TypewriterText';
import { translations } from '@/src/translations';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

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
  const [isSending, setIsSending] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAttempt = async () => {
      const credentials = localStorage.getItem('worldid_credentials');
      if (!credentials) {
        router.push('/');
        return;
      }

      // Load saved language preference
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      try {
        const { attemptId } = await params;
        const attemptData = await apiService.getAttempt(attemptId);
        
        // If this is a fresh attempt with no messages, add Bungo's opening message
        if (attemptData.messages.length === 0) {
          const userName = localStorage.getItem('user_name') || 'prisoner';
          const openingMessage = translations[savedLanguage || 'en'].conversation.openingMessage;
          const greeting = openingMessage.greeting.replace('%NAME%', userName);
          const message = openingMessage.message.replace('%NAME%', userName);
          
          attemptData.messages = [{
            content: "",
            ai_response: `${greeting} ${message}`
          }];
        }
        
        setAttempt(attemptData);
      } catch (error) {
        console.error('Error fetching attempt:', error);
        router.push('/game');
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [router, params]);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (attempt) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [attempt, attempt?.messages]);

  const sendMessage = async () => {
    if (!attempt || !message.trim() || isSending) return;
    console.log("searchParams", searchParams)
    try {
      setIsSending(true);
      const response = await apiService.sendMessage(attempt.id, message);
      setAttempt(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, response],
          messages_remaining: prev.messages_remaining - 1,
          score: undefined
        };
      });
      setMessage('');
    } catch (err: unknown) {
      const error = err as AxiosError<{ detail: string }>;
      setError(error.response?.data?.detail || 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleScore = async () => {
    if (!attempt) return;
    
    try {
      setIsScoring(true);
      console.log('Sending score request for attempt:', attempt.id);
      const result = await apiService.forceScore(attempt.id);
      console.log('Received score result:', result);
      setAttempt(prev => {
        console.log('Previous attempt state:', prev);
        const newState = prev ? {
          ...prev,
          score: result.score,
        } : null;
        console.log('New attempt state:', newState);
        return newState;
      });
    } catch (err: unknown) {
      console.error('Scoring error:', err);
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to score attempt');
    } finally {
      setIsScoring(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        {translations[language].conversation.loading}
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-black rounded-lg p-8 text-center">
          {translations[language].conversation.notFound}
        </div>
      </div>
    );
  }

  return (
    <main className={`min-h-screen bg-black text-red-500 flex items-center justify-center p-4 pb-20 ${tomorrow.className}`}>
      <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 animate-pulse" />
        
        {/* Header */}
        <div className="border-b border-red-900/50 p-4 bg-black/80 backdrop-blur-lg">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Brain className="w-6 h-6 text-red-500 animate-pulse" />
            <h1 className="text-lg font-bold text-red-400">{translations[language].conversation.title}</h1>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-red-400/80 animate-pulse">
            <MessageSquare className="w-4 h-4" />
            <span>{attempt.messages_remaining} {translations[language].conversation.messagesRemaining}</span>
          </div>
        </div>

        {/* Chat Container - adjusted height */}
        <div className="h-[calc(100vh-16rem)] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-black">
          {attempt.messages.map((msg, i) => (
            <div key={i} className="space-y-2">
              {/* User Message - only render if content exists */}
              {msg.content && (
                <div className="flex items-start justify-end space-x-2">
                  <div className="max-w-[80%] bg-red-950/30 p-3 rounded-lg rounded-tr-none border border-red-900/50 backdrop-blur-sm">
                    <p className="text-red-400">{msg.content}</p>
                  </div>
                </div>
              )}
              
              {/* AI Response */}
              <div className="flex items-start space-x-2">
                <div className="max-w-[80%] bg-black/50 p-3 rounded-lg rounded-tl-none border border-red-900/30">
                  <div className="flex items-center space-x-2 mb-1">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span className="text-xs text-red-600">Bungo</span>
                  </div>
                  <TypewriterText text={msg.ai_response} />
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {attempt.messages_remaining > 0 ? (
          <div className="p-3 border-t border-red-900/50 bg-black/80">
            <div className="flex space-x-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !isSending) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isSending}
                placeholder={isSending ? translations[language].conversation.inputPlaceholderSending : translations[language].conversation.inputPlaceholder}
                className="flex-1 bg-black/50 border border-red-900/50 rounded-lg px-4 py-1.5 text-red-400 
                  placeholder-red-600/70 focus:outline-none focus:border-red-500 transition-colors
                  min-h-[32px] max-h-[120px] resize-y leading-tight"
              />
              <button
                onClick={sendMessage}
                disabled={isSending}
                className="px-4 py-1.5 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 
                  hover:bg-red-900/30 transition-colors focus:outline-none focus:ring-2 
                  focus:ring-red-500/50 flex items-center space-x-2 disabled:opacity-50"
              >
                <span>{isSending ? translations[language].conversation.sendingButton : translations[language].conversation.sendButton}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : attempt.score === undefined ? (
          <div className="p-4 border-t border-red-900/50 bg-black/80">
            <button
              onClick={handleScore}
              disabled={isScoring}
              className="w-full py-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400
                hover:bg-red-900/30 transition-colors flex items-center justify-center space-x-2
                disabled:opacity-50"
            >
              <Award className="w-5 h-5" />
              <span>{isScoring ? translations[language].conversation.evaluatingButton : translations[language].conversation.evaluateButton}</span>
            </button>
          </div>
        ) : (
          <div className="p-4 border-t border-red-900/50 bg-black/80">
            <div className="text-center space-y-2">
              <div className="inline-block px-6 py-2 bg-red-900/20 border border-red-500/50 rounded-lg">
                <h3 className="text-xl font-bold text-red-400">{translations[language].conversation.finalEvaluation}</h3>
                <p className="text-2xl font-bold text-red-500 mt-1">{attempt.score.toFixed(1)}/10</p>
              </div>
              <p className="text-red-400">
                {translations[language].conversation.reward}: {attempt.earnings ? `$${attempt.earnings} WLD` : ''}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => router.push('/game')}
                className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
                  shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  transition-colors duration-200"
              >
                {translations[language].conversation.backToGame}
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}