import { useState, useCallback } from 'react';
import { connectWallet } from '../wallet';
import type { WalletState } from '../types';

const INITIAL_STATE: WalletState = {
  address: null,
  chainId: null,
  isConnecting: false,
  error: null,
};

export function useWalletConnection() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);

  const connect = useCallback(async () => {
    // Prevent multiple connection attempts
    if (state.isConnecting) return;

    try {
      // Set connecting state
      setState(prev => ({ ...prev, isConnecting: true, error: null }));

      // Attempt connection
      const walletState = await connectWallet();
      
      // Update state with connection result
      setState({
        ...walletState,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      // Handle connection error
      setState({
        ...INITIAL_STATE,
        error: error instanceof Error ? error.message : 'Connection failed',
      });
    }
  }, [state.isConnecting]);

  const disconnect = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    connect,
    disconnect,
  };
}