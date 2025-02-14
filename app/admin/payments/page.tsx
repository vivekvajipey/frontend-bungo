'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/src/services/api';
import { MiniKit, PayCommandInput, Tokens } from '@worldcoin/minikit-js';

interface UnpaidAttempt {
  attempt_id: string;
  session_id: string;
  wldd_id: string;
  wallet_address: string;
  earnings_raw: number;
  created_at: string;
}

export default function AdminPayments() {
  const [attempts, setAttempts] = useState<UnpaidAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadAttempts();
  }, []);

  const loadAttempts = async () => {
    try {
      const unpaidAttempts = await apiService.getUnpaidAttempts();
      setAttempts(unpaidAttempts);
    } catch (error) {
      console.error('Failed to load unpaid attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (attempt: UnpaidAttempt) => {
    setProcessing(prev => ({ ...prev, [attempt.attempt_id]: true }));
    try {
      // Generate payment reference
      const reference = `admin_payment_${attempt.attempt_id}`;
      
      const paymentPayload: PayCommandInput = {
        reference,
        to: attempt.wallet_address,
        tokens: [{
          symbol: Tokens.USDCE,
          token_amount: (attempt.earnings_raw / 1_000_000).toString()
        }],
        description: "Bungo game winnings payout"
      };

      console.log('Payment payload:', paymentPayload);
      const payRes = await MiniKit.commandsAsync.pay(paymentPayload);

      // Only mark as paid if payment succeeded
      if (payRes.finalPayload.status !== 'error') {
        await apiService.confirmAdminPayment(reference, payRes.finalPayload);
        await apiService.markAttemptPaid(attempt.attempt_id);
        // Remove from list
        setAttempts(prev => prev.filter(a => a.attempt_id !== attempt.attempt_id));
      } else {
        console.error('Payment failed:', payRes.finalPayload);
      }
    } catch (error) {
      console.error('Failed to process payment:', error);
    } finally {
      setProcessing(prev => ({ ...prev, [attempt.attempt_id]: false }));
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Payment Dashboard</h1>
      
      <div className="space-y-4">
        {attempts.length === 0 ? (
          <p>No unpaid attempts found.</p>
        ) : (
          attempts.map((attempt) => (
            <div 
              key={attempt.attempt_id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p><strong>User ID:</strong> {attempt.wldd_id}</p>
                <p><strong>Wallet:</strong> {attempt.wallet_address}</p>
                <p><strong>Amount:</strong> {(attempt.earnings_raw / 1_000_000).toFixed(6)} WLDD (raw: {attempt.earnings_raw})</p>
                <p><strong>Created:</strong> {new Date(attempt.created_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handlePay(attempt)}
                disabled={processing[attempt.attempt_id]}
                className={`px-4 py-2 rounded ${
                  processing[attempt.attempt_id]
                    ? 'bg-gray-400'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {processing[attempt.attempt_id] ? 'Processing...' : 'Pay'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
