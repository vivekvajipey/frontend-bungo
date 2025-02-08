import axios from 'axios';

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

class ApiService {
  // User endpoints
  async createUser(wlddId: string): Promise<User> {
    console.log('Creating user with WLDD ID:', wlddId);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/create`, {
        wldd_id: wlddId
      });
      console.log('User created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getCurrentSession(): Promise<Session | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/sessions/current`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async createAttempt(userId: string, wlddId: string): Promise<Attempt> {
    try {
      const response = await axios.post(`${API_BASE_URL}/attempts/create`, null, {
        params: { 
          user_id: userId,
          wldd_id: wlddId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating attempt:', error);
      throw error;
    }
  }

  async sendMessage(attemptId: string, content: string): Promise<Message> {
    const response = await axios.post(`${API_BASE_URL}/attempts/${attemptId}/message`, {
      content
    });
    return response.data;
  }

  async forceScore(attemptId: string): Promise<{score: number}> {
    const response = await axios.post(`${API_BASE_URL}/attempts/${attemptId}/force-score`);
    return response.data;
  }
}

export const apiService = new ApiService(); 