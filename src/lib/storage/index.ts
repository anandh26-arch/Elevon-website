import { saveProjects, loadProjects } from './chunkedStorage';
import type { Project } from '../../types';

export async function saveToStorage(projects: Project[]): Promise<void> {
  return saveProjects(projects);
}

export async function loadFromStorage(): Promise<Project[] | null> {
  return loadProjects();
}