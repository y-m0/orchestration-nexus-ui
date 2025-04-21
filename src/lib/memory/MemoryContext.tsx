import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Memory, MemoryContextType } from './types';

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);

  const storeMemory = async (memory: Omit<Memory, 'id' | 'timestamp'>) => {
    const newMemory: Memory = {
      ...memory,
      id: uuidv4(),
      timestamp: new Date().toISOString(),
    };
    setMemories(prev => [...prev, newMemory]);
  };

  const getMemoryById = (id: string) => {
    return memories.find(memory => memory.id === id);
  };

  const searchMemory = (filter: Partial<Memory>) => {
    return memories.filter(memory => {
      return Object.entries(filter).every(([key, value]) => {
        if (key === 'metadata' && value && memory.metadata) {
          return Object.entries(value).every(
            ([metaKey, metaValue]) => memory.metadata?.[metaKey] === metaValue
          );
        }
        return memory[key as keyof Memory] === value;
      });
    });
  };

  const clearMemory = async () => {
    setMemories([]);
  };

  const value = React.useMemo<MemoryContextType>(
    () => ({
      memories,
      storeMemory,
      getMemoryById,
      searchMemory,
      clearMemory,
    }),
    [memories]
  );

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory() {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
} 