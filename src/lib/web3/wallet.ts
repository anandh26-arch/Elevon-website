import { BSC_CHAIN_ID, BSC_NETWORK_CONFIG } from './constants';
import { WALLET_ERRORS } from './constants/errors';
import { getProvider, isMetaMaskInstalled } from './utils/provider';
import { logWalletError, logConnectionAttempt } from './utils/debug';

async function switchToBSC(provider: any): Promise<void> {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BSC_CHAIN_ID }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_NETWORK_CONFIG],
        });
      } catch (addError) {
        throw new Error(WALLET_ERRORS.NETWORK_ERROR);
      }
    } else {
      throw error;
    }
  }
}

export async function connectWallet(): Promise<string> {
  logConnectionAttempt();

  // Check if MetaMask is installed
  if (!isMetaMaskInstalled()) {
    throw new Error(WALLET_ERRORS.NO_PROVIDER);
  }

  const provider = getProvider();
  if (!provider) {
    throw new Error(WALLET_ERRORS.NO_PROVIDER);
  }

  try {
    // Request account access
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });

    if (!accounts?.length) {
      throw new Error(WALLET_ERRORS.NO_ACCOUNTS);
    }

    // Get current chain ID
    const chainId = await provider.request({
      method: 'eth_chainId',
    });

    // Switch to BSC if needed
    if (chainId !== BSC_CHAIN_ID) {
      await switchToBSC(provider);
    }

    return accounts[0];
  } catch (error: any) {
    logWalletError(error);

    // Handle specific error cases
    if (error.code === 4001) {
      throw new Error(WALLET_ERRORS.USER_REJECTED);
    }
    
    if (error.code === -32002) {
      throw new Error(WALLET_ERRORS.ALREADY_PENDING);
    }

    throw error;
  }
}