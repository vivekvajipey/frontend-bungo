'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { VerifyBlock } from '@/src/components/VerifyBlock';
import { MiniKit } from '@worldcoin/minikit-js';

export default function Home() {
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  const handleEnter = () => {
    if (!MiniKit.isInstalled()) {
      window.open('https://worldcoin.org/download');
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationSuccess = async () => {
    try {
      const session = await apiService.getCurrentSession();
      if (session) {
        router.push('/game');
      }
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Bungo</h1>
        
        {!showVerification ? (
          <button 
            onClick={handleEnter}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            Enter Game
          </button>
        ) : (
          <VerifyBlock 
            onVerificationSuccess={handleVerificationSuccess}
            show={showVerification}
          />
        )}
      </div>
    </main>
  );
}
