import { STORAGE_CONFIG } from './config';

export async function retry<T>(
  operation: () => Promise<T> | T,
  attempts: number = STORAGE_CONFIG.retryAttempts
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (attempts <= 1) throw error;
    
    await new Promise(resolve => 
      setTimeout(resolve, STORAGE_CONFIG.retryDelay)
    );
    
    return retry(operation, attempts - 1);
  }
}