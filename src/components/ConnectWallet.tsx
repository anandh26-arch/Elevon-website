import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import Button from './Button';
import WalletModal from './WalletModal';

export default function ConnectWallet() {
  const [showModal, setShowModal] = useState(false);
  const { address, disconnect } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (address) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={disconnect}
      >
        {formatAddress(address)}
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant="gradient" 
        size="sm"
        onClick={() => setShowModal(true)}
      >
        Connect Wallet
      </Button>

      {showModal && (
        <WalletModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}