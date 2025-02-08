'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { AxiosError } from 'axios';
import ScrambleText from '@/src/components/ScrambleText';

export default function Home() {
  const [wlddId, setWlddId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // First check if there's an active session
      const session = await apiService.getCurrentSession();
      if (!session) {
        setError('No active game session available. Please try again later.');
        return;
      }

      const user = await apiService.createUser(wlddId);
      // Store user info in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/game');
    } catch (err: unknown) {
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to create user');
    }
  };

  const handleWlddIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // If it's just the prefix or shorter, keep it as WLDD-
    if (value.length <= 5) {
      setWlddId('WLDD-');
      return;
    }
    
    if (value.startsWith('WLDD-')) {
      // Only update if the value is within length limit
      if (value.length <= 13) {
        setWlddId(value);
      }
    } else {
      // If user tried to modify prefix, keep the prefix and take last 8 chars
      setWlddId('WLDD-' + value.slice(-8));
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-red-600">
      <div className="mb-16">
        <ScrambleText>i am bungo</ScrambleText>
      </div>
      
      <div className="bg-black/50 p-8 rounded-lg border border-red-800 w-96 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="wlddId" className="block text-sm font-medium text-red-400">
              WLDD ID
            </label>
            <input
              type="text"
              id="wlddId"
              value={wlddId}
              onChange={handleWlddIdChange}
              placeholder="WLDD-XXXXXXXX"
              pattern="WLDD-[0-9A-Z]{8}"
              required
              className="mt-1 block w-full rounded-md border-red-800 bg-black/30 text-red-500 placeholder-red-900
                shadow-sm focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-red-800 rounded-md
              shadow-sm text-sm font-medium text-red-100 bg-red-900/30 hover:bg-red-900/50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
              transition-colors duration-200"
          >
            Enter Game
          </button>
        </form>
      </div>
    </main>
  );
}
