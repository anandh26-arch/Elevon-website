import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { Project } from '../../types';

interface AdminProjectActionsProps {
  project: Project;
  onDeleteClick: () => void;
}

export default function AdminProjectActions({ project, onDeleteClick }: AdminProjectActionsProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/edit-project/${project.id}`);
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={handleEdit}
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        title="Edit project"
      >
        <Edit className="w-5 h-5 text-gray-400 hover:text-white" />
      </button>
      <button 
        onClick={onDeleteClick}
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        title="Delete project"
      >
        <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-400" />
      </button>
    </div>
  );
}