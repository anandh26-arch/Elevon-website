import type { Project } from '../../types';
import { compress, decompress } from './compression';

const CHUNK_SIZE = 500 * 1024; // 500KB chunks
const STORAGE_PREFIX = 'elevon_project_';

function getChunkKey(id: string, index: number): string {
  return `${STORAGE_PREFIX}${id}_chunk_${index}`;
}

function getMetaKey(id: string): string {
  return `${STORAGE_PREFIX}${id}_meta`;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    // Clear old data first
    clearOldData();

    // Save each project separately
    for (const project of projects) {
      await saveProject(project);
    }
  } catch (error) {
    console.error('Failed to save projects:', error);
    throw error;
  }
}

async function saveProject(project: Project): Promise<void> {
  try {
    const data = compress(JSON.stringify(project));
    const chunks: string[] = [];
    
    // Split data into chunks
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      chunks.push(data.slice(i, i + CHUNK_SIZE));
    }

    // Save metadata
    localStorage.setItem(getMetaKey(project.id), JSON.stringify({
      chunks: chunks.length,
      timestamp: Date.now()
    }));

    // Save chunks
    chunks.forEach((chunk, index) => {
      localStorage.setItem(getChunkKey(project.id, index), chunk);
    });
  } catch (error) {
    console.error(`Failed to save project ${project.id}:`, error);
    throw error;
  }
}

export async function loadProjects(): Promise<Project[]> {
  try {
    const projects: Project[] = [];
    const prefix = STORAGE_PREFIX;
    const keys = Object.keys(localStorage);
    const metaKeys = keys.filter(key => key.includes('_meta'));

    for (const metaKey of metaKeys) {
      const id = metaKey.replace(`${prefix}`, '').replace('_meta', '');
      const project = await loadProject(id);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error('Failed to load projects:', error);
    return [];
  }
}

async function loadProject(id: string): Promise<Project | null> {
  try {
    const metaJson = localStorage.getItem(getMetaKey(id));
    if (!metaJson) return null;

    const meta = JSON.parse(metaJson);
    const chunks: string[] = [];

    for (let i = 0; i < meta.chunks; i++) {
      const chunk = localStorage.getItem(getChunkKey(id, i));
      if (!chunk) return null;
      chunks.push(chunk);
    }

    const data = chunks.join('');
    const decompressed = decompress(data);
    return JSON.parse(decompressed);
  } catch (error) {
    console.error(`Failed to load project ${id}:`, error);
    return null;
  }
}

function clearOldData(): void {
  const keys = Object.keys(localStorage);
  const metaKeys = keys.filter(key => key.includes('_meta'));
  
  // Sort by timestamp (oldest first)
  const sortedMeta = metaKeys
    .map(key => ({
      key,
      timestamp: JSON.parse(localStorage.getItem(key) || '{"timestamp":0}').timestamp
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  // Keep only the 10 most recent projects
  const toRemove = sortedMeta.slice(0, -10);
  
  for (const { key } of toRemove) {
    const id = key.replace(STORAGE_PREFIX, '').replace('_meta', '');
    const meta = JSON.parse(localStorage.getItem(key) || '{"chunks":0}');
    
    // Remove chunks
    for (let i = 0; i < meta.chunks; i++) {
      localStorage.removeItem(getChunkKey(id, i));
    }
    
    // Remove metadata
    localStorage.removeItem(key);
  }
}