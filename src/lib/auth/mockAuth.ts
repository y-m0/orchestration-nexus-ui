// Simple mock authentication system
export interface MockUser {
  id: string;
  email: string;
  name: string;
}

export interface MockSession {
  user: MockUser;
  access_token: string;
  expires_at: number;
}

class MockAuth {
  private static readonly STORAGE_KEY = 'mock_auth_session';
  private static readonly MOCK_USER: MockUser = {
    id: '1',
    email: 'demo@orchestration-nexus.com',
    name: 'Demo User'
  };

  static async login(email: string, password: string): Promise<MockSession> {
    // Simple mock validation - any email/password works
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const session: MockSession = {
      user: this.MOCK_USER,
      access_token: 'mock_token_' + Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };

    // Store session in localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
    
    return session;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getSession(): MockSession | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const session: MockSession = JSON.parse(stored);
      
      // Check if session is expired
      if (Date.now() > session.expires_at) {
        this.logout();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }
}

export default MockAuth;