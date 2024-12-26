import { useState, useEffect, useCallback } from 'react';
import { checkConnection, initializeDatabase } from '../client';
import { SUPABASE_CONFIG } from '../config';
import { useOfflineDetection } from './useOfflineDetection';
import { ConnectionError } from '../errors';

export function useSupabaseStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isOffline = useOfflineDetection();

  const checkStatus = useCallback(async () => {
    if (isOffline) {
      setIsConnected(false);
      setError('No internet connection');
      setIsChecking(false);
      return;
    }

    try {
      setIsChecking(true);
      setError(null);
      
      await initializeDatabase();
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setIsConnected(false);
      if (err instanceof ConnectionError) {
        setError(err.message);
      } else {
        setError('Failed to connect to database');
      }
    } finally {
      setIsChecking(false);
    }
  }, [isOffline]);

  // Initial check
  useEffect(() => {
    checkStatus();
  }, []);

  // Recheck when online status changes
  useEffect(() => {
    if (!isOffline) {
      checkStatus();
    }
  }, [isOffline, checkStatus]);

  // Periodic health check
  useEffect(() => {
    if (isOffline) return;

    const interval = setInterval(async () => {
      try {
        const isAlive = await checkConnection();
        setIsConnected(isAlive);
        if (!isAlive) {
          setError('Lost database connection');
        }
      } catch (err) {
        setIsConnected(false);
        setError(err instanceof ConnectionError ? err.message : 'Connection check failed');
      }
    }, SUPABASE_CONFIG.healthCheckInterval);

    return () => clearInterval(interval);
  }, [isOffline]);

  return {
    isConnected,
    isChecking,
    isOffline,
    error,
    retry: checkStatus
  };
}