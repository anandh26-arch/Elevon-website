export function getProvider(): Window['ethereum'] | null {
  // Check if we're in an iframe
  if (window.parent !== window) {
    try {
      // Try to access parent ethereum provider
      return window.parent.ethereum || window.ethereum || null;
    } catch (e) {
      // Fallback to window ethereum if parent access fails
      return window.ethereum || null;
    }
  }
  return window.ethereum || null;
}

export function isMetaMaskInstalled(): boolean {
  const provider = getProvider();
  return !!provider?.isMetaMask;
}

export function addWalletListeners(
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: () => void
): () => void {
  const provider = getProvider();
  if (!provider) return () => {};

  provider.on('accountsChanged', onAccountsChanged);
  provider.on('chainChanged', onChainChanged);

  return () => {
    provider.removeListener('accountsChanged', onAccountsChanged);
    provider.removeListener('chainChanged', onChainChanged);
  };
}