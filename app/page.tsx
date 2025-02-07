'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService } from '@/src/services/api';

export default function Home() {
  const [wlddId, setWlddId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = await apiService.createUser(wlddId);
      // Store user info in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/game');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create user');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Bungo</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="wlddId" className="block text-sm font-medium text-gray-700">
              WLDD ID
            </label>
            <input
              type="text"
              id="wlddId"
              value={wlddId}
              onChange={(e) => setWlddId(e.target.value)}
              placeholder="WLDD-XXXXXXXX"
              pattern="WLDD-[0-9A-Z]{8}"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Enter Game
          </button>
        </form>
      </div>
    </main>
  );
}
