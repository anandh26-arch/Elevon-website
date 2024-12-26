import { Project } from '../types';

const STORAGE_KEY = 'elevon_projects';

export function saveToStorage(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    throw new Error('Failed to save projects');
  }
}

export function loadFromStorage(): Project[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
}