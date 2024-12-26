import React from 'react';
import { X } from 'lucide-react';
import Button from '../Button';
import { useWallet } from '../../context/WalletContext';
import metamaskLogo from '../../assets/metamask-fox.svg';

interface WalletModalProps {
  onClose: () => void;
}

export default function WalletModal({ onClose }: WalletModalProps) {
  const { connect, isConnecting, error } = useWallet();
  const hasMetaMask = window.ethereum?.isMetaMask;

  const handleConnect = async () => {
    try {
      await connect();
      onClose();
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div 
        className="glass-card max-w-md w-full mx-4 relative" 
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 id="wallet-modal-title" className="text-xl font-semibold text-white mb-6">
            Connect Wallet
          </h2>
          
          {error && (
            <div 
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          {hasMetaMask ? (
            <Button
              variant="gradient"
              className="w-full flex items-center justify-center space-x-3"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              <img 
                src={metamaskLogo}
                alt="MetaMask"
                className="w-6 h-6"
              />
              <span>{isConnecting ? 'Connecting...' : 'Connect with MetaMask'}</span>
            </Button>
          ) : (
            <div className="text-center">
              <p className="text-gray-400 mb-4">
                MetaMask extension is required to connect your wallet
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('https://metamask.io/download/', '_blank')}
              >
                Install MetaMask →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}