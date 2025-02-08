import axios from 'axios';
import { MiniKit, Tokens, PayCommandInput, MiniAppPaymentSuccessPayload, tokenToDecimals } from '@worldcoin/minikit-js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface User {
  wldd_id: string;
  stats: {
    total_games: number;
    total_earnings: number;
    average_score: number;
    total_messages: number;
    best_score: number;
    completed_sessions: number;
  };
}

interface AttemptSummary {
  id: string;
  score?: number;
  earnings?: number;
}

export interface Session {
  id: string;
  start_time: string;
  end_time: string;
  entry_fee: number;
  total_pot: number;
  status: string;
  attempts: AttemptSummary[];
  winning_conversation?: Message[];
}

export interface Attempt {
  id: string;
  session_id: string;
  wldd_id: string;
  messages: Message[];
  messages_remaining: number;
  score?: number;
  earnings?: number;
  total_pot: number;
}

export interface Message {
  content: string;
  ai_response: string;
}

interface PaymentInitResponse {
  reference: string;
  recipient: string;
  amount: string;
}

class ApiService {
  private getAuthHeaders() {
    const credentials = localStorage.getItem('worldid_credentials');
    if (!credentials) return {};
    return {
      'X-WorldID-Credentials': credentials
    };
  }

  isInWorldApp(): boolean {
    return MiniKit.isInstalled();
  }

  async getCurrentSession(): Promise<Session | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sessions/current`, {
        headers: this.getAuthHeaders()
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createAttempt(paymentReference: string): Promise<Attempt> {
    const response = await axios.post(
      `${API_BASE_URL}/attempts/create`,
      { payment_reference: paymentReference },
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }

  async sendMessage(attemptId: string, content: string): Promise<Message> {
    const response = await axios.post(
      `${API_BASE_URL}/attempts/${attemptId}/message`,
      { content },
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }

  async forceScore(attemptId: string): Promise<{score: number}> {
    const response = await axios.post(
      `${API_BASE_URL}/attempts/${attemptId}/force-score`,
      null,
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }

  async initiatePayment(): Promise<PaymentInitResponse> {
    const response = await axios.post(
      `${API_BASE_URL}/payments/initiate`,
      null,
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }

  async confirmPayment(reference: string, payload: MiniAppPaymentSuccessPayload): Promise<boolean> {
    const response = await axios.post(
      `${API_BASE_URL}/payments/confirm`,
      { reference, payload },
      { headers: this.getAuthHeaders() }
    );
    return response.data.success;
  }

  async processPayment(): Promise<string> {  // Now returns payment reference
    if (!MiniKit.isInstalled()) {
      throw new Error('World App not installed');
    }

    try {
      console.log('Initiating payment...');
      const { reference, recipient, amount } = await this.initiatePayment();
      console.log('Payment details:', { reference, recipient, amount });

      const paymentPayload: PayCommandInput = {
        reference,
        to: recipient,
        tokens: [{
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(parseFloat(amount), Tokens.USDCE).toString()
        }],
        description: "Bungo game attempt entry fee"
      };

      console.log('Payment payload:', paymentPayload);
      const payRes = await MiniKit.commandsAsync.pay(paymentPayload);
      console.log('Payment response:', payRes);

      if (payRes.finalPayload.status === "success") {
        console.log('Payment successful, confirming with backend...');
        const success = await this.confirmPayment(reference, payRes.finalPayload);
        if (success) {
          return reference;  // Return reference for createAttempt
        }
      }
      throw new Error('Payment failed');
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  async getUserStats(wlddId: string): Promise<User['stats']> {
    const response = await axios.get(
      `${API_BASE_URL}/users/${wlddId}/stats`,
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }
}

export const apiService = new ApiService(); 