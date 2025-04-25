
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
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      setLoading(false);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setError(error.message);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Remove the Supabase auth and implement the mockAuth for testing
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use mockAuth for login during development
      const { token, user } = await import('@/lib/mockAuth').then(module => 
        module.mockAuth.login(email, password)
      );
      
      // Store token in localStorage for auth persistence
      localStorage.setItem('auth_token', token);
      
      // Set the authenticated state
      setUser(user as unknown as User);
      setIsAuthenticated(true);
      
      return Promise.resolve();
    } catch (error: any) {
      setError(error.message);
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
      setError(null);
      
      // Use mockAuth for logout during development
      await import('@/lib/mockAuth').then(module => module.mockAuth.logout());
      
      // Clear token from localStorage
      localStorage.removeItem('auth_token');
      
      // Reset the authenticated state
      setUser(null);
      setIsAuthenticated(false);
      
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
      
      // In a real app, this would call Supabase auth.signUp
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
