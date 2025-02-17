'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { AttemptResponse } from '@/src/services/api';
import { Tomorrow } from 'next/font/google';
import { motion } from 'framer-motion';

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function AttemptsPage() {
  const router = useRouter();
  const [attempts, setAttempts] = useState<AttemptResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const credentials = localStorage.getItem('worldid_credentials');
    if (!credentials) {
      router.push('/');
      return;
    }

    apiService.getSessionAttempts()
      .then(setAttempts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [router]);

  const createNewAttempt = () => {
    router.push('/game');
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
        Loading...
      </div>
    );
  }

  return (
    <main className={`min-h-screen bg-black text-red-600 pb-20 ${tomorrow.className}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm"
        >
          <h1 className="text-3xl font-bold mb-6">Your Attempts</h1>
          
          {attempts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-xl text-red-400 mb-6">No attempts yet. Ready to challenge Bungo?</p>
              <button
                onClick={createNewAttempt}
                className="group relative py-4 px-8 bg-red-950/30 border border-red-800/50 text-red-500 rounded-lg
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
            </div>
          ) : (
            <div className="space-y-4">
              {attempts.map((attempt, index) => (
                <motion.div
                  key={attempt.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => router.push(`/game/conversation/${attempt.id}`)}
                  className="group p-4 border border-red-800 rounded-lg bg-black/30 cursor-pointer 
                    hover:bg-black/50 transition-all duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        Attempt #{attempts.length - index}
                      </h3>
                      <p className="text-red-400">
                        Score: {attempt.score?.toFixed(1) ?? 'In Progress'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-800">Pot: ${attempt.total_pot}</p>
                      <p className="text-sm text-red-800">
                        {attempt.earnings ? `Won: $${attempt.earnings}` : 'Pending'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="material-icons-outlined text-red-600">arrow_forward</span>
                  </div>
                </motion.div>
              ))}

              <div className="mt-8 text-center">
                <button
                  onClick={createNewAttempt}
                  className="inline-flex items-center justify-center py-2 px-4 border border-red-800 rounded-md
                    text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
                    transition-colors duration-200"
                >
                  <span className="material-icons-outlined mr-2">add</span>
                  New Attempt
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
