import type { Project } from '../../../types';
import type { StorageStrategy } from '../core/types';

export class MemoryStorage implements StorageStrategy {
  private static cache: { data: Project[] | null; timestamp: number } | null = null;
  private static TTL = 5 * 60 * 1000; // 5 minutes

  name = 'Memory';

  async save(projects: Project[]): Promise<void> {
    MemoryStorage.cache = {
      data: projects,
      timestamp: Date.now()
    };
  }

  async load(): Promise<Project[] | null> {
    if (!MemoryStorage.cache) return null;

    // Check if cache is still valid
    if (Date.now() - MemoryStorage.cache.timestamp > MemoryStorage.TTL) {
      MemoryStorage.cache = null;
      return null;
    }

    return MemoryStorage.cache.data;
  }
}