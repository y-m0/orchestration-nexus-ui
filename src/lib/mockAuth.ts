// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const,
    password: 'password123'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user' as const,
    password: 'password123'
  }
]

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAuth = {
  async login(email: string, password: string) {
    await delay(1000) // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user
    
    return {
      token: 'mock-jwt-token',
      user: userWithoutPassword
    }
  },

  async logout() {
    await delay(500)
    return true
  },

  async getCurrentUser(token: string) {
    await delay(500)
    
    if (token !== 'mock-jwt-token') {
      throw new Error('Invalid token')
    }

    // Return the admin user for now
    const { password: _, ...userWithoutPassword } = mockUsers[0]
    return userWithoutPassword
  }
} 