import { STORAGE_CONFIG } from './config';

const PREFIX = 'elevon_project_';

export function cleanupStorage(): void {
  try {
    const keys = Object.keys(localStorage);
    const projectKeys = keys.filter(key => key.startsWith(PREFIX));
    
    // Group by project ID
    const projectGroups = new Map<string, string[]>();
    projectKeys.forEach(key => {
      const id = key.split('_')[2]; // Get project ID from key
      const group = projectGroups.get(id) || [];
      group.push(key);
      projectGroups.set(id, group);
    });

    // Sort projects by timestamp (newest first)
    const sortedProjects = Array.from(projectGroups.entries())
      .sort(([idA], [idB]) => {
        const timeA = localStorage.getItem(`${PREFIX}${idA}_time`);
        const timeB = localStorage.getItem(`${PREFIX}${idB}_time`);
        return (timeB ? Number(timeB) : 0) - (timeA ? Number(timeA) : 0);
      });

    // Remove old projects
    const projectsToRemove = sortedProjects.slice(STORAGE_CONFIG.maxItems);
    projectsToRemove.forEach(([_, keys]) => {
      keys.forEach(key => localStorage.removeItem(key));
    });
  } catch (error) {
    console.warn('Storage cleanup failed:', error);
  }
}