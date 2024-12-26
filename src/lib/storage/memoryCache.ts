import type { Project } from '../../types';
import { compress, decompress } from './compression';

const CACHE_KEY = Symbol.for('__projectsCache');

interface GlobalWithCache {
  [CACHE_KEY]: {
    data: string;
    timestamp: number;
  } | undefined;
}

declare const global: GlobalWithCache;

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function saveToMemory(projects: Project[]): void {
  try {
    const data = compress(JSON.stringify(projects));
    global[CACHE_KEY] = {
      data,
      timestamp: Date.now()
    };
  } catch (error) {
    console.warn('Failed to save to memory cache:', error);
  }
}

export function loadFromMemory(): Project[] | null {
  try {
    const cache = global[CACHE_KEY];
    
    if (!cache) return null;
    
    // Check if cache is still valid
    if (Date.now() - cache.timestamp > CACHE_TTL) {
      clearMemoryCache();
      return null;
    }
    
    const decompressed = decompress(cache.data);
    return JSON.parse(decompressed);
  } catch (error) {
    console.warn('Failed to load from memory cache:', error);
    return null;
  }
}

export function clearMemoryCache(): void {
  delete global[CACHE_KEY];
}