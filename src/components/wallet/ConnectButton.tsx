import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import Button from '../Button';
import WalletModal from './WalletModal';

export default function ConnectButton() {
  const [showModal, setShowModal] = useState(false);
  const { address, disconnect, isConnecting } = useWallet();

  const handleClick = () => {
    if (address) {
      disconnect();
    } else {
      setShowModal(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Button 
        variant={address ? "outline" : "gradient"}
        size="sm"
        onClick={handleClick}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 
         address ? formatAddress(address) : 'Connect Wallet'}
      </Button>

      {showModal && (
        <WalletModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}