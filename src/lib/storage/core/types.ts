import type { Project } from '../../../types';

export interface StorageStrategy {
  name: string;
  save(projects: Project[]): Promise<void>;
  load(): Promise<Project[] | null>;
}

export interface StorageError extends Error {
  code?: string;
  details?: unknown;
}