export const BSC_CHAIN_ID = '0x38'; // BSC Mainnet
export const BSC_TESTNET_CHAIN_ID = '0x61'; // BSC Testnet

export const BSC_CONFIG = {
  chainId: BSC_CHAIN_ID,
  chainName: 'BNB Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com']
};

export type WalletState = {
  address: string | null;
  chainId: string | null;
  isConnecting: boolean;
  error: string | null;
};

async function switchToBSC(ethereum: any): Promise<void> {
  try {
    // Try to switch to BSC
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BSC_CHAIN_ID }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_CONFIG],
        });
      } catch (addError) {
        throw new Error('Failed to add BSC network to MetaMask');
      }
    } else {
      throw switchError;
    }
  }
}

export async function connectMetaMask(): Promise<WalletState> {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Please install MetaMask to connect your wallet');
    }

    const ethereum = window.ethereum;

    if (!ethereum.isMetaMask) {
      throw new Error('Please use MetaMask');
    }

    // Request account access
    const accounts = await ethereum.request({ 
      method: 'eth_requestAccounts' 
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    // Get current chain ID
    const chainId = await ethereum.request({ 
      method: 'eth_chainId'
    });

    // If not on BSC, switch to it
    if (chainId !== BSC_CHAIN_ID) {
      await switchToBSC(ethereum);
    }

    return {
      address: accounts[0],
      chainId: BSC_CHAIN_ID,
      isConnecting: false,
      error: null
    };
  } catch (err: any) {
    if (err.code === 4001) {
      throw new Error('Please connect to MetaMask');
    }
    throw err;
  }
}