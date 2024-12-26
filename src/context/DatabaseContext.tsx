import React, { createContext, useContext } from 'react';
import { useSupabaseStatus } from '../lib/supabase/hooks';

interface DatabaseContextType {
  isConnected: boolean;
  isChecking: boolean;
  isOffline: boolean;
  error: string | null;
  retry: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const status = useSupabaseStatus();

  return (
    <DatabaseContext.Provider value={status}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within DatabaseProvider');
  }
  return context;
}