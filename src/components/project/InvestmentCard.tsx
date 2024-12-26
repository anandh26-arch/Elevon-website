import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useInvestment } from '../../hooks/useInvestment';
import { Project } from '../../types';
import Button from '../Button';
import GlassCard from '../GlassCard';
import Toast from '../Toast';

interface InvestmentCardProps {
  project: Project;
}

export default function InvestmentCard({ project }: InvestmentCardProps) {
  const [amount, setAmount] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { address } = useWallet();
  const { invest, isInvesting, error } = useInvestment();

  const handleInvest = async () => {
    if (!address) {
      setToast({
        type: 'error',
        message: 'Please connect your wallet first'
      });
      return;
    }

    try {
      const txHash = await invest(amount);
      setToast({
        type: 'success',
        message: 'Investment successful! Transaction: ' + txHash.slice(0, 6) + '...' + txHash.slice(-4)
      });
      setAmount('');
    } catch (err) {
      setToast({
        type: 'error',
        message: error || 'Investment failed. Please try again.'
      });
    }
  };

  const isValidAmount = Number(amount) >= project.minInvestment && 
                       Number(amount) <= project.maxInvestment;

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-white mb-4">Participate</h2>
      
      <div className="mb-6">
        <label htmlFor="investment" className="block text-sm text-gray-400 mb-2">
          Investment Amount (USDT)
        </label>
        <div className="relative">
          <input
            type="number"
            id="investment"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Min: ${project.minInvestment} USDT`}
            className="w-full bg-white/5 border border-indigo-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
            <span className="text-sm font-medium text-indigo-400">USDT</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm mb-6">
        <span className="text-gray-400">Price per Token</span>
        <span className="text-white font-medium">${project.tokenPrice} USDT</span>
      </div>

      <Button 
        variant="gradient" 
        className="w-full"
        onClick={handleInvest}
        disabled={!isValidAmount || isInvesting || !address}
      >
        {isInvesting ? 'Processing...' : 'Invest Now'}
      </Button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </GlassCard>
  );
}