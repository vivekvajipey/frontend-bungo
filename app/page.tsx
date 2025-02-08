'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { VerifyBlock } from '@/src/components/VerifyBlock';

export default function Home() {
  const [isWorldApp, setIsWorldApp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsWorldApp(apiService.isInWorldApp());
  }, []);

  const handleVerificationSuccess = async () => {
    try {
      const session = await apiService.getCurrentSession();
      if (!session) {
        throw new Error('No active game session available');
      }
      router.push('/game');
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Bungo</h1>
        
        {isWorldApp ? (
          <VerifyBlock onVerificationSuccess={handleVerificationSuccess} />
        ) : (
          <p className="text-center text-gray-600">
            Please open this app in World App to play
          </p>
        )}
      </div>
    </main>
  );
}
