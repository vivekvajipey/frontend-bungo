import axios from 'axios';
import { MiniKit, Tokens, PayCommandInput, MiniAppPaymentSuccessPayload } from '@worldcoin/minikit-js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface User {
  id: string;
  wldd_id: string;
  stats: {
    total_games: number;
    total_wins: number;
    total_earnings: number;
  };
}

export interface Session {
  id: string;
  start_time: string;
  end_time: string;
  entry_fee: number;
  total_pot: number;
  status: string;
  winning_attempts: string[];
  user: {
    id: string;
  };
}

export interface Attempt {
  id: string;
  session_id: string;
  user_id: string;
  messages: Message[];
  is_winner: boolean;
  messages_remaining: number;
  score?: number;
  total_pot?: number;
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

  // User endpoints
  async createUser(wlddId: string): Promise<User> {
    console.log('Creating user with WLDD ID:', wlddId);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/create`, 
        { wldd_id: wlddId },
        { headers: this.getAuthHeaders() }
      );
      console.log('User created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
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

  async createAttempt(userId: string): Promise<Attempt> {
    const response = await axios.post(`${API_BASE_URL}/attempts/create`, null, {
      params: { user_id: userId },
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async sendMessage(attemptId: string, content: string): Promise<Message> {
    const response = await axios.post(`${API_BASE_URL}/attempts/${attemptId}/message`, 
      { content },
      { headers: this.getAuthHeaders() }
    );
    return response.data;
  }

  async forceScore(attemptId: string): Promise<{score: number}> {
    const response = await axios.post(`${API_BASE_URL}/attempts/${attemptId}/force-score`, null, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async initiatePayment(): Promise<PaymentInitResponse> {
    const response = await axios.post(`${API_BASE_URL}/payments/initiate`, null, {
      headers: this.getAuthHeaders()
    });
    return response.data;
  }

  async confirmPayment(reference: string, payload: MiniAppPaymentSuccessPayload): Promise<boolean> {
    const response = await axios.post(`${API_BASE_URL}/payments/confirm`, 
      { reference, payload },
      { headers: this.getAuthHeaders() }
    );
    return response.data.success;
  }

  async processPayment(): Promise<boolean> {
    if (!MiniKit.isInstalled()) {
      console.log('Payment failed: World App not installed');
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
          symbol: Tokens.WLD,
          token_amount: amount
        }],
        description: "Bungo game attempt entry fee"
      };

      console.log('Requesting payment through World App...');
      const payRes = await MiniKit.commandsAsync.pay(paymentPayload);
      console.log('Payment response:', payRes);

      if (payRes.finalPayload.status === "success") {
        console.log('Payment successful, confirming with backend...');
        return await this.confirmPayment(reference, payRes.finalPayload);
      }
      return false;
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService(); 