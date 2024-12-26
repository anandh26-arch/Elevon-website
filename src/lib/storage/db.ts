import { DB_CONFIG } from './constants';

let db: IDBDatabase | null = null;

export async function initDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DB_CONFIG.stores.projects)) {
        db.createObjectStore(DB_CONFIG.stores.projects, { keyPath: 'id' });
      }
    };
  });
}

export async function getDB(): Promise<IDBDatabase> {
  if (!db) {
    await initDB();
  }
  return db!;
}