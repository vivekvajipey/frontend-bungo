'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';

export default function WlddSignIn() {
  const [wlddId, setWlddId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const session = await apiService.getCurrentSession();
      if (!session) {
        setError('No active game session available. Please try again later.');
        return;
      }

      const user = await apiService.createUser(wlddId);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/game');
    } catch (err: unknown) {
      const error = err as AxiosError<{detail: string}>;
      setError(error.response?.data?.detail || 'Failed to create user');
    }
  };

  const handleWlddIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 5) {
      setWlddId('WLDD-');
      return;
    }
    
    if (value.startsWith('WLDD-')) {
      if (value.length <= 13) {
        setWlddId(value);
      }
    } else {
      setWlddId('WLDD-' + value.slice(-8));
    }
  };

  return (
    <motion.div
      key="signin"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md px-4"
    >
      <div className="bg-black/50 p-8 rounded-lg border border-red-800 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="wlddId" className="block text-base font-medium text-red-400">
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
            <p className="text-red-500 text-base">{error}</p>
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
    </motion.div>
  );
} 