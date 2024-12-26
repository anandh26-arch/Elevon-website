export interface StorageItem<T> {
  id: string;
  data: T;
  timestamp: number;
}

export interface StorageOptions {
  compress?: boolean;
  maxSize?: number;
}

export interface StorageError extends Error {
  code?: string;
  details?: unknown;
}