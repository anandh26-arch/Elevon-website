import React from 'react';
import ProjectForm from '../../components/admin/ProjectForm/ProjectForm';

export default function NewProject() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">New Project</h1>
      <ProjectForm />
    </div>
  );
}