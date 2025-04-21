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

// Mock token storage
const TOKEN_KEY = 'mock-auth-token'
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export const mockAuth = {
  async login(email: string, password: string) {
    await delay(1000) // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user
    
    // Generate mock token with expiry
    const token = {
      value: 'mock-jwt-token',
      expiry: Date.now() + TOKEN_EXPIRY
    }
    
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
    
    return {
      token: token.value,
      user: userWithoutPassword
    }
  },

  async logout() {
    await delay(500)
    localStorage.removeItem(TOKEN_KEY)
    return true
  },

  async getCurrentUser(token: string) {
    await delay(500)
    
    const storedToken = localStorage.getItem(TOKEN_KEY)
    if (!storedToken) {
      throw new Error('No token found')
    }

    const { value, expiry } = JSON.parse(storedToken)
    
    if (token !== value) {
      throw new Error('Invalid token')
    }

    if (Date.now() > expiry) {
      localStorage.removeItem(TOKEN_KEY)
      throw new Error('Token expired')
    }

    // Return the admin user for now
    const { password: _, ...userWithoutPassword } = mockUsers[0]
    return userWithoutPassword
  }
} 