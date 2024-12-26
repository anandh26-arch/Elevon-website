import { useState, useCallback } from 'react';
import { fetchProjects } from '../projects';
import { ConnectionError, DataError } from '../errors';
import type { Project } from '../../../types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      let message = 'Failed to load projects';
      
      if (err instanceof ConnectionError) {
        message = 'Unable to connect to database. Please try again.';
      } else if (err instanceof DataError) {
        message = 'Error loading project data. Please try again.';
      }
      
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(async () => {
    await loadProjects();
  }, [loadProjects]);

  return {
    projects,
    isLoading,
    error,
    retry,
    loadProjects
  };
}