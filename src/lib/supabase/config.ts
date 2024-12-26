import { ConnectionError } from './errors';

// Development fallback values
const DEV_DEFAULTS = {
  url: 'http://localhost:54321',
  key: 'dummy-key'
};

// Validate environment variables with development fallbacks
function validateConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL || DEV_DEFAULTS.url;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || DEV_DEFAULTS.key;

  if (!url || !key) {
    throw new ConnectionError(
      'Missing Supabase configuration. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
    );
  }

  return { url, key };
}

const { url, key } = validateConfig();

export const SUPABASE_CONFIG = {
  url,
  anonKey: key,
  timeout: 5000, // 5 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  healthCheckInterval: 30000, // 30 seconds
} as const;