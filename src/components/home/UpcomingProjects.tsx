import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import ProjectCard from '../ProjectCard';
import { calculateProjectStatus } from '../../utils/projectStatus';

export default function UpcomingProjects() {
  const { projects } = useProjects();
  const upcomingProjects = projects.filter(project => 
    calculateProjectStatus(project.startTime, project.endTime) === 'upcoming'
  );

  return (
    <div className="py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Upcoming Projects</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Be the first to participate in these exciting upcoming token launches
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}