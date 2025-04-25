
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession?.user);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession?.user);
      setLoading(false);
    }).catch((err) => {
      console.error('Error getting session:', err);
      setError(err.message);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, using mockAuth
      const mockAuthModule = await import('@/lib/mockAuth');
      const { token, user: mockUser } = await mockAuthModule.mockAuth.login(email, password);
      
      // Store token in localStorage for auth persistence
      localStorage.setItem('auth_token', token);
      
      // Set the authenticated state - use the mock user data
      setUser(mockUser as unknown as User);
      setIsAuthenticated(true);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}`,
      });
      
      return Promise.resolve();
    } catch (error: any) {
      setError(error.message);
      setIsAuthenticated(false);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Use mockAuth for logout during development
      const mockAuthModule = await import('@/lib/mockAuth');
      await mockAuthModule.mockAuth.logout();
      
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
      
      // Reset the authenticated state
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll just use the mock login
      await login(email, password);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      return Promise.resolve();
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message,
      });
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
