import { compress, decompress } from './compression';
import { STORAGE_CONFIG } from './config';
import type { StorageOptions } from './types';

export function shouldCompress(data: string, options?: StorageOptions): boolean {
  return (options?.compress ?? true) && 
         data.length > STORAGE_CONFIG.compressionThreshold;
}

export function processData(data: string, options?: StorageOptions): string {
  return shouldCompress(data, options) ? compress(data) : data;
}

export function processStoredData(data: string, wasCompressed: boolean): string {
  return wasCompressed ? decompress(data) : data;
}

export function getStorageKey(id: string, index?: number): string {
  return index !== undefined
    ? `${STORAGE_CONFIG.prefix}${id}_${index}`
    : `${STORAGE_CONFIG.prefix}${id}`;
}

export function isStorageQuotaError(error: unknown): boolean {
  return error instanceof Error && 
         'code' in error && 
         (error as any).code === 22;
}