export function logWalletError(error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('[Wallet Error]:', error);
  }
}

export function logConnectionAttempt(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Wallet] Attempting connection...');
  }
}