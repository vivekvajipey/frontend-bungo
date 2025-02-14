'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/src/services/api';
import type { AttemptResponse } from '@/src/services/api';

interface ExtendedAttempt extends AttemptResponse {
  created_at: string;
  earnings_raw: number;
}

export default function AdminAttempts() {
  const [attempts, setAttempts] = useState<ExtendedAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    try {
      const response = await apiService.getSessionAttempts();
      // Transform the response to include required fields
      const extendedAttempts: ExtendedAttempt[] = response.map(attempt => ({
        ...attempt,
        created_at: new Date().toISOString(), // TODO: Get actual creation time from backend
        earnings_raw: attempt.earnings ? attempt.earnings * 1_000_000 : 0
      }));
      setAttempts(extendedAttempts);
    } catch (error) {
      console.error('Failed to load attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading attempts...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Attempts</h1>
      <div className="grid gap-4">
        {attempts.map(attempt => (
          <div key={attempt.id} className="p-4 border rounded">
            <div>
              <p><strong>Attempt ID:</strong> {attempt.id}</p>
              <p><strong>User ID:</strong> {attempt.wldd_id}</p>
              <p><strong>Score:</strong> {attempt.score ?? 'Not scored'}</p>
              <p><strong>Messages:</strong> {attempt.messages.length} sent, {attempt.messages_remaining} remaining</p>
              <p><strong>Earnings:</strong> {attempt.earnings ? `${attempt.earnings} WLDD (raw: ${attempt.earnings_raw})` : 'None'}</p>
              <p><strong>Created:</strong> {new Date(attempt.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
