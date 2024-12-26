import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { loadProjects, saveProjects } from '../lib/storage/projectStorage';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => void;
  updateProject: (project: Project) => void;
  isLoading: boolean;
  error: string | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects on mount
  useEffect(() => {
    loadProjects()
      .then(loadedProjects => {
        setProjects(loadedProjects);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load projects:', err);
        setError('Failed to load projects');
        setIsLoading(false);
      });
  }, []);

  const addProject = useCallback(async (project: Project) => {
    try {
      await saveProjects([project, ...projects]);
      setProjects(prev => [project, ...prev]);
    } catch (err) {
      console.error('Failed to save project:', err);
      throw new Error('Failed to save project');
    }
  }, [projects]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProject = useCallback((project: Project) => {
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  }, []);

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject, 
      deleteProject, 
      updateProject,
      isLoading,
      error
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}