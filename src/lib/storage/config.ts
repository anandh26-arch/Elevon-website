export const STORAGE_CONFIG = {
  prefix: 'elevon_',             // Keep existing prefix if needed
  chunkSize: 50 * 1024,           // 50KB chunks (if needed)
  version: 1,                     // Database version
  name: 'elevon',                 // Database name
  store: 'projects',              // Store name
  path: '/var/www/147.93.27.98/storage/data' // Set your VPS storage path here
} as const;

export const DB_CONFIG = {
  name: STORAGE_CONFIG.name,
  version: STORAGE_CONFIG.version,
  store: STORAGE_CONFIG.store
} as const;