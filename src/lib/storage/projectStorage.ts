import { Project } from '../../types';
import { projects as mockProjects } from '../../data/projects';

const API_URL = 'http://147.93.27.98/api';

export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) throw new Error('Failed to load projects');
    return await response.json();
  } catch (error) {
    console.error('Failed to load projects:', error);
    return mockProjects;
  }
}

export async function saveProjects(project: Project): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to save project');
  } catch (error) {
    console.error('Failed to save project:', error);
    throw error;
  }
}