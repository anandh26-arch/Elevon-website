import { STORAGE_CONFIG } from './config';
import { compress, decompress } from './compression';

export function getChunkKey(index: number): string {
  return `${STORAGE_CONFIG.keyPrefix}chunk_${index}`;
}

export function splitIntoChunks(data: string): string[] {
  const compressed = compress(data);
  const chunks: string[] = [];
  
  for (let i = 0; i < compressed.length; i += STORAGE_CONFIG.chunkSize) {
    chunks.push(compressed.slice(i, i + STORAGE_CONFIG.chunkSize));
  }
  
  return chunks;
}

export function joinChunks(chunks: string[]): string {
  const joined = chunks.join('');
  return decompress(joined);
}