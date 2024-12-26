import { SUPABASE_CONFIG } from './config';

export async function retry<T>(
  operation: () => Promise<T>,
  attempts: number = SUPABASE_CONFIG.retryAttempts
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (attempts <= 1) throw error;
    
    await new Promise(resolve => 
      setTimeout(resolve, SUPABASE_CONFIG.retryDelay)
    );
    
    return retry(operation, attempts - 1);
  }
}