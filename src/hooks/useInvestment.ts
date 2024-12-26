import { useState } from 'react';
import { invest } from '../lib/web3/contracts/investment';

export function useInvestment() {
  const [isInvesting, setIsInvesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInvestment = async (amount: string) => {
    setIsInvesting(true);
    setError(null);

    try {
      const txHash = await invest(amount);
      return txHash;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Investment failed');
      throw err;
    } finally {
      setIsInvesting(false);
    }
  };

  return {
    isInvesting,
    error,
    invest: handleInvestment
  };
}