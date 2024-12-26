import { useState, useEffect } from 'react';
import { supabase } from '../client';
import type { Project } from '../../../types';

export function useSupabase() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('projects').select('count');
        if (error) throw error;
        setError(null);
      } catch (err) {
        setError('Failed to connect to database');
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  const handleError = (err: unknown) => {
    const message = err instanceof Error ? err.message : 'An error occurred';
    setError(message);
    throw err;
  };

  return {
    isLoading,
    error,
    handleError
  };
}