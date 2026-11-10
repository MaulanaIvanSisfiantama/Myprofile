/**
 * Robust Client-Side Persistent Storage Utility
 * Uses IndexedDB as the primary high-capacity storage (> 100MB quota),
 * with localStorage as a lightweight synchronous fallback.
 * Safely catches QuotaExceededError so the UI never crashes on large image uploads.
 */

const DB_NAME = 'ivan_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB tidak didukung pada browser ini.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

/**
 * Save data to IndexedDB
 */
export async function saveToIndexedDB<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.put(value, key);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[storageUtils] Failed to save ${key} to IndexedDB:`, err);
  }
}

/**
 * Read data from IndexedDB
 */
export async function loadFromIndexedDB<T>(key: string): Promise<T | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        resolve(req.result ?? null);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[storageUtils] Failed to load ${key} from IndexedDB:`, err);
    return null;
  }
}

/**
 * Delete key from IndexedDB
 */
export async function removeFromIndexedDB(key: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const req = store.delete(key);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`[storageUtils] Failed to remove ${key} from IndexedDB:`, err);
  }
}

/**
 * Safely write to localStorage without throwing QuotaExceededError
 */
export function safeSetLocalStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    // QuotaExceededError or security block
    console.warn(`[storageUtils] localStorage.setItem failed for key "${key}" (storage quota reached). Saved to IndexedDB instead.`, err);
    return false;
  }
}

/**
 * Safely read from localStorage
 */
export function safeGetLocalStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely remove from localStorage
 */
export function safeRemoveLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
