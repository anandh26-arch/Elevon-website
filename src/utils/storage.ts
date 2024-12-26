export const STORAGE_KEYS = {
  PROJECTS: 'elevon_projects'
} as const;

export function getStoredProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get stored projects:', error);
    return null;
  }
}

export function storeProjects(projects: any[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to store projects:', error);
  }
}