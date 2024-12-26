import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import AdminProjectCard from '../../components/admin/AdminProjectCard';

export default function AdminDashboard() {
  const { projects } = useProjects();
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="grid gap-6">
        {projects.map(project => (
          <AdminProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}