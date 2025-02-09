'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { Session } from '@/src/services/api';
// import { AxiosError } from 'axios';
import { Terminal, Loader, Power } from 'lucide-react';
// import { Tomorrow } from 'next/font/google';

// const tomorrow = Tomorrow({ 
//   subsets: ['latin'],
//   weight: ['400', '700'],
// });

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

export default function GamePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  // const [error, setError] = useState('');
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

  // const createAttempt = async () => {
  //   if (!session) {
  //     console.log('No session available');
  //     return;
  //   }
    
  //   try {
  //     setError('');
  //     console.log('Starting attempt creation with entry fee:', session.entry_fee);

  //     const paymentReference = await apiService.processPayment();
  //     console.log('Got payment reference:', paymentReference);
      
  //     const newAttempt = await apiService.createAttempt(paymentReference);
  //     console.log('New attempt created:', newAttempt);
      
  //     router.push(`/game/conversation/${newAttempt.id}`);
  //   } catch (err: unknown) {
  //     console.error('Error creating attempt:', err);
  //     const error = err as AxiosError<{detail: string}>;
  //     setError(error.response?.data?.detail || 'Failed to create attempt');
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <Loader className="animate-spin" size={24} />
        <span className="ml-2">INITIALIZING SESSION...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <Terminal size={24} />
        <span className="ml-2">NO ACTIVE SESSION. REBOOTING...</span>
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
              <span className="text-xl font-mono text-red-400">GAME_TERMINAL_v1.0</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-mono">
                <span className="text-red-400">POT: </span>
                <span className="text-green-500">${session.total_pot} USDC</span>
              </div>
              <Power 
                onClick={() => router.push('/')} 
                className="text-red-500 hover:text-red-400 cursor-pointer" 
                size={20} 
              />
            </div>
          </div>

          {/* Content coming in next step... */}
        </div>
      </div>
    </>
  );
}