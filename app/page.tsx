'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { VerifyBlock } from '@/src/components/VerifyBlock';
import { MiniKit } from '@worldcoin/minikit-js';

export default function Home() {
  const [isWorldApp, setIsWorldApp] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsWorldApp(apiService.isInWorldApp());
  }, []);

  const handleEnter = () => {
    if (!MiniKit.isInstalled()) {
      // Show download prompt
      return;
    }
    setShowVerification(true);
  };

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
        
        {!showVerification ? (
          <div className="text-center">
            <button 
              onClick={handleEnter}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Enter Game
            </button>
          </div>
        ) : (
          <VerifyBlock 
            onVerificationSuccess={handleVerificationSuccess}
            show={showVerification}
          />
        )}

        {!isWorldApp && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-2">
              To play Bungo, you&apos;ll need World App
            </p>
            <button 
              onClick={() => window.open('https://worldcoin.org/download')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Download World App
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
