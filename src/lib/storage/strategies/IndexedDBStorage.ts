import type { Project } from '../../../types';
import type { StorageStrategy } from '../core/types';
import { DB_CONFIG } from '../config';

export class IndexedDBStorage implements StorageStrategy {
  name = 'IndexedDB';
  private db: IDBDatabase | null = null;

  private async getDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(DB_CONFIG.store)) {
          db.createObjectStore(DB_CONFIG.store, { keyPath: 'id' });
        }
      };
    });
  }

  async save(projects: Project[]): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction(DB_CONFIG.store, 'readwrite');
    const store = tx.objectStore(DB_CONFIG.store);

    await Promise.all(
      projects.map(project => new Promise<void>((resolve, reject) => {
        const request = store.put(project);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
      }))
    );
  }

  async load(): Promise<Project[]> {
    const db = await this.getDB();
    const tx = db.transaction(DB_CONFIG.store, 'readonly');
    const store = tx.objectStore(DB_CONFIG.store);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}