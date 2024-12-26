import React from 'react';
import { useProjects } from '../context/ProjectContext';
import ProjectCard from './ProjectCard';
import Toast from './Toast';

export default function ProjectList() {
  const { projects, error, retry } = useProjects();

  return (
    <div className="space-y-8">
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => {}} // Error will stay until resolved
          onRetry={retry}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}