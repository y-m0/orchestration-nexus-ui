import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { mockAuth } from './mockAuth'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Token storage constants
const TOKEN_KEY = 'mock-auth-token'
const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        const user = await mockAuth.getCurrentUser(token)
        setUser(user)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      localStorage.removeItem(TOKEN_KEY)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshToken = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        const user = await mockAuth.getCurrentUser(token)
        setUser(user)
      }
    } catch (err) {
      console.error('Token refresh failed:', err)
      localStorage.removeItem(TOKEN_KEY)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    
    // Set up token refresh interval
    const interval = setInterval(refreshToken, REFRESH_INTERVAL)
    
    return () => clearInterval(interval)
  }, [checkAuth, refreshToken])

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await mockAuth.login(email, password)
      localStorage.setItem(TOKEN_KEY, response.token)
      setUser(response.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      console.error('Login failed:', errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await mockAuth.logout()
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      setUser(null)
    }
  }, [])

  const value = React.useMemo(() => ({
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    refreshToken,
  }), [user, loading, error, login, logout, refreshToken])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 