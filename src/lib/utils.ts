import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions from projects-utils
export const retryAsync = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt)));
    }
  }
  
  throw lastError;
};

export const safeRun = async <T>(
  fn: () => Promise<T>,
  fallback: T,
  errorHandler?: (error: any) => void
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler) {
      errorHandler(error);
    }
    return fallback;
  }
};

export const sanitizeInput = (input: string): string => {
  // Basic sanitization
  return input
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .replace(/[^\w\s.,?!;:'"()[\]{}@#$%^&*=+-]/g, "") // Allow basic punctuation and alphanumeric
    .trim();
};

export const logToConsole = (
  message: string,
  level: 'info' | 'warn' | 'error' | 'debug' = 'info',
  metadata?: Record<string, any>
): void => {
  const timestamp = new Date().toISOString();
  const metadataStr = metadata ? JSON.stringify(metadata) : '';
  
  switch (level) {
    case 'info':
      console.log(`[${timestamp}] [INFO] ${message}`, metadata || '');
      break;
    case 'warn':
      console.warn(`[${timestamp}] [WARN] ${message}`, metadata || '');
      break;
    case 'error':
      console.error(`[${timestamp}] [ERROR] ${message}`, metadata || '');
      break;
    case 'debug':
      console.debug(`[${timestamp}] [DEBUG] ${message}`, metadata || '');
      break;
  }
  
  // Could also send logs to a centralized service or store in memory
};

export const formatDateTime = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'relative' = 'medium'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'relative') {
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    
    return d.toLocaleDateString();
  }
  
  switch (format) {
    case 'short':
      return d.toLocaleString(undefined, { 
        month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' 
      });
    case 'medium':
      return d.toLocaleString();
    case 'long':
      return d.toLocaleString(undefined, { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: '2-digit', second: '2-digit'
      });
    default:
      return d.toLocaleString();
  }
};
