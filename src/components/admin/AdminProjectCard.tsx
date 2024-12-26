import React, { useState } from 'react';
import { Project } from '../../types';
import { useProjects } from '../../context/ProjectContext';
import { useProjectStatus } from '../../hooks/useProjectStatus';
import GlassCard from '../GlassCard';
import AdminProjectActions from './AdminProjectActions';
import DeleteProjectModal from './DeleteProjectModal';

interface AdminProjectCardProps {
  project: Project;
}

export default function AdminProjectCard({ project }: AdminProjectCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteProject } = useProjects();
  const currentStatus = useProjectStatus(project);

  const handleDelete = () => {
    deleteProject(project.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <GlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={project.logo}
              alt={project.name}
              className="w-12 h-12 rounded-full ring-2 ring-indigo-500/30"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <p className="text-indigo-400">${project.tokenSymbol}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              currentStatus === 'live' ? 'bg-green-500/20 text-green-400' :
              currentStatus === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
            </span>
            
            <AdminProjectActions 
              project={project}
              onDeleteClick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>
      </GlassCard>

      {showDeleteModal && (
        <DeleteProjectModal
          projectName={project.name}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}