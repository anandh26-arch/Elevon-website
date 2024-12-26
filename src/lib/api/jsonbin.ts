import { Project } from '../../types';
import { apiGet, apiPut } from './client';
import { saveToLocalStorage, loadFromLocalStorage } from '../storage/localStorage';

export async function fetchProjects(): Promise<Project[]> {
  try {
    // Try to fetch from API
    const data = await apiGet<Project[]>();
    const projects = Array.isArray(data) ? data : [];
    
    // Cache successful response
    if (projects.length > 0) {
      saveToLocalStorage(projects);
    }
    
    return projects;
  } catch (error) {
    // On error, try to load from localStorage
    const cachedProjects = loadFromLocalStorage();
    if (cachedProjects) {
      console.warn('Using cached projects due to network error');
      return cachedProjects;
    }
    
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export async function updateProjects(projects: Project[]): Promise<void> {
  try {
    // Update localStorage first
    saveToLocalStorage(projects);
    
    // Then try to update API
    await apiPut<Project[]>(projects);
  } catch (error) {
    console.error('Failed to update projects:', error);
    // Don't throw here - we've already saved to localStorage
    // Instead, we could implement a sync queue for retry later
  }
}