
// Mock authentication module for testing purposes

interface MockUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface LoginResponse {
  token: string;
  user: MockUser;
}

export const mockAuth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // This is a mock implementation
    if (email === 'test@example.com' && password === 'password') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
      };
    }
    throw new Error('Invalid credentials');
  },

  logout: async (): Promise<void> => {
    // Mock logout implementation
    return Promise.resolve();
  },

  getCurrentUser: async (): Promise<MockUser> => {
    // Mock implementation to get the current user
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No token found');
    }
    
    // In a real implementation, this would validate the token
    return {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    };
  },
};
