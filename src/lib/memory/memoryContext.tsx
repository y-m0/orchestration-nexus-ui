
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MemoryItem, MemoryMetadata, MemoryContextValue, SearchResult } from '@/types/memory';
import { memoryService } from './memoryService';

// Create the context
const MemoryContext = createContext<MemoryContextValue | undefined>(undefined);

// Memory provider component
export const MemoryProvider = ({ children }: { children: ReactNode }) => {
  const [shortTermMemory, setShortTermMemory] = useState<MemoryItem[]>([]);

  const storeMemory = useCallback(async (text: string, metadata: Partial<MemoryMetadata>): Promise<MemoryItem> => {
    const item = await memoryService.storeMemory(text, metadata);
    return item;
  }, []);

  const searchMemory = useCallback(async (query: string, limit?: number): Promise<SearchResult[]> => {
    return await memoryService.searchMemory(query, limit);
  }, []);

  const clearMemory = useCallback(async (filter?: Partial<MemoryMetadata>): Promise<void> => {
    await memoryService.clearMemory(filter);
  }, []);

  const addToContext = useCallback((item: MemoryItem) => {
    setShortTermMemory(prev => {
      // Avoid duplicates
      if (prev.some(i => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  const removeFromContext = useCallback((id: string) => {
    setShortTermMemory(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearContext = useCallback(() => {
    setShortTermMemory([]);
  }, []);

  const value: MemoryContextValue = {
    shortTermMemory,
    storeMemory,
    searchMemory,
    clearMemory,
    addToContext,
    removeFromContext,
    clearContext
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
};

// Hook for using memory
export const useMemory = (): MemoryContextValue => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};
