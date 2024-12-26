import React from 'react';
import { X } from 'lucide-react';
import Button from '../Button';

interface DeleteProjectModalProps {
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProjectModal({ projectName, onConfirm, onCancel }: DeleteProjectModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card max-w-md w-full mx-4 relative">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Delete Project</h2>
          <p className="text-gray-300 mb-6">
            Are you sure you want to delete <span className="text-white font-medium">{projectName}</span>? 
            This action cannot be undone.
          </p>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1 !bg-red-600/90 hover:!bg-red-700/90"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}