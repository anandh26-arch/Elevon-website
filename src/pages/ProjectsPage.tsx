import React, { useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import { calculateProjectStatus } from '../utils/projectStatus';

type ProjectStatus = 'live' | 'upcoming' | 'ended';

export default function ProjectsPage() {
  const { projects } = useProjects();
  const [filter, setFilter] = useState<ProjectStatus>('live');

  const filteredProjects = projects.filter(project => 
    calculateProjectStatus(project.startTime, project.endTime) === filter
  );

  return (
    <div className="min-h-screen bg-black pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
        
        <div className="flex space-x-4 mb-8">
          {(['live', 'upcoming', 'ended'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === status
                  ? 'glass-button'
                  : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}