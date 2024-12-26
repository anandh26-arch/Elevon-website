import { STORAGE_CONFIG } from '../config';
import type { Project } from '../../../types';
import { compress, decompress } from '../compression';

function getChunkKey(index: number): string {
  return `${STORAGE_CONFIG.prefix}chunk_${index}`;
}

export async function saveToLocalStorage(projects: Project[]): Promise<void> {
  try {
    const data = compress(JSON.stringify(projects));
    const chunks = [];
    
    for (let i = 0; i < data.length; i += STORAGE_CONFIG.chunkSize) {
      chunks.push(data.slice(i, i + STORAGE_CONFIG.chunkSize));
    }

    localStorage.setItem(`${STORAGE_CONFIG.prefix}count`, String(chunks.length));
    chunks.forEach((chunk, index) => {
      localStorage.setItem(getChunkKey(index), chunk);
    });
  } catch (error) {
    throw new Error('Failed to save to localStorage');
  }
}

export async function loadFromLocalStorage(): Promise<Project[] | null> {
  try {
    const count = Number(localStorage.getItem(`${STORAGE_CONFIG.prefix}count`));
    if (!count) return null;

    const chunks: string[] = [];
    for (let i = 0; i < count; i++) {
      const chunk = localStorage.getItem(getChunkKey(i));
      if (!chunk) return null;
      chunks.push(chunk);
    }

    const data = decompress(chunks.join(''));
    return JSON.parse(data);
  } catch {
    return null;
  }
}