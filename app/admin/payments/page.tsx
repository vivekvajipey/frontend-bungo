'use client';

import { useEffect, useState } from 'react';
import { apiService } from '@/src/services/api';
import { MiniKit, PayCommandInput, Tokens, tokenToDecimals } from '@worldcoin/minikit-js';

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
    if (!MiniKit.isInstalled()) {
      console.error('World App not installed');
      return;
    }

    setProcessing(prev => ({ ...prev, [attempt.attempt_id]: true }));
    try {
      console.log('Processing payment for attempt:', attempt.attempt_id);
      
      // Generate a simple random reference
      const reference = Math.random().toString(36).substring(2, 15);
      const amount = (attempt.earnings_raw / 1_000_000).toString();
      
      console.log('Payment details:', { 
        reference,
        to: attempt.wallet_address,
        toUpperCase: attempt.wallet_address.toUpperCase(),
        amount 
      });
      
      const paymentPayload: PayCommandInput = {
        reference,
        to: attempt.wallet_address,
        tokens: [{
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(parseFloat(amount), Tokens.USDCE).toString()
        }],
        description: "Bungo game winnings payout"
      };

      console.log('Payment payload:', paymentPayload);
      const payRes = await MiniKit.commandsAsync.pay(paymentPayload);
      console.log('Payment response:', payRes);

      if (payRes.finalPayload.status === "success") {
        console.log('Payment successful, confirming with backend...');
        await apiService.confirmAdminPayment(reference, payRes.finalPayload);
        await apiService.markAttemptPaid(attempt.attempt_id);
        
        // Remove from list
        setAttempts(prev => prev.filter(a => a.attempt_id !== attempt.attempt_id));
        console.log('Payment completed and marked as paid');
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
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading payments...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
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
