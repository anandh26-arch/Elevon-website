import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectWallet } from '../lib/web3/wallet';
import { addWalletListeners } from '../lib/web3/utils/provider';

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return addWalletListeners(
      (accounts) => {
        if (accounts.length === 0) {
          setAddress(null);
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
        }
      },
      () => window.location.reload()
    );
  }, [address]);

  const connect = async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    setError(null);

    try {
      const account = await connectWallet();
      setAddress(account);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
      throw err; // Re-throw for UI handling
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setError(null);
  };

  return (
    <WalletContext.Provider value={{
      address,
      isConnecting,
      error,
      connect,
      disconnect
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}