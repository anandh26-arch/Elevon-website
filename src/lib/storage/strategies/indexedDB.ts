import { DB_CONFIG } from '../constants';
import type { Project } from '../../../types';

let db: IDBDatabase | null = null;

async function getDB(): Promise<IDBDatabase> {
  if (db) return db;
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DB_CONFIG.stores.projects)) {
        db.createObjectStore(DB_CONFIG.stores.projects, { keyPath: 'id' });
      }
    };
  });
}

export async function saveToIndexedDB(projects: Project[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction(DB_CONFIG.stores.projects, 'readwrite');
  const store = tx.objectStore(DB_CONFIG.stores.projects);

  await Promise.all(projects.map(project => 
    new Promise<void>((resolve, reject) => {
      const request = store.put(project);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    })
  ));
}

export async function loadFromIndexedDB(): Promise<Project[]> {
  const db = await getDB();
  const tx = db.transaction(DB_CONFIG.stores.projects, 'readonly');
  const store = tx.objectStore(DB_CONFIG.stores.projects);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}