import { Project } from '../../../types';
import { StorageStrategy } from './types';
import { MemoryStorage } from '../strategies/MemoryStorage';
import { IndexedDBStorage } from '../strategies/IndexedDBStorage';
import { LocalStorage } from '../strategies/LocalStorage';

export class StorageManager {
  private strategies: StorageStrategy[];
  private memoryCache: MemoryStorage;

  constructor() {
    this.memoryCache = new MemoryStorage();
    this.strategies = [
      this.memoryCache,
      new IndexedDBStorage(),
      new LocalStorage()
    ];
  }

  async save(projects: Project[]): Promise<void> {
    let lastError: Error | null = null;

    // Always save to memory first
    await this.memoryCache.save(projects);

    // Try each persistence strategy
    for (const strategy of this.strategies.slice(1)) {
      try {
        await strategy.save(projects);
        return; // Success - exit early
      } catch (error) {
        lastError = error as Error;
        console.warn(`Storage strategy ${strategy.name} failed:`, error);
        continue; // Try next strategy
      }
    }

    // If we get here, all persistence strategies failed
    throw lastError || new Error('All storage strategies failed');
  }

  async load(): Promise<Project[] | null> {
    // Try memory first
    const cached = await this.memoryCache.load();
    if (cached) return cached;

    // Try each persistence strategy
    for (const strategy of this.strategies.slice(1)) {
      try {
        const projects = await strategy.load();
        if (projects) {
          // Cache successful result
          await this.memoryCache.save(projects);
          return projects;
        }
      } catch (error) {
        console.warn(`Storage strategy ${strategy.name} failed:`, error);
        continue;
      }
    }

    return null;
  }
}