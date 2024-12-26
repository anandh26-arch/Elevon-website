import { compress as lzCompress, decompress as lzDecompress } from 'lz-string';

export function compress(data: string): string {
  try {
    return lzCompress(data);
  } catch (error) {
    console.warn('Compression failed:', error);
    return data;
  }
}

export function decompress(data: string): string {
  try {
    return lzDecompress(data) || data;
  } catch (error) {
    console.warn('Decompression failed:', error);
    return data;
  }
}