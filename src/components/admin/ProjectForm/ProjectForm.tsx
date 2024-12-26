import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../../context/ProjectContext';
import { useProjectForm } from './hooks/useProjectForm';
import { ProjectFormFields } from './components/ProjectFormFields';
import { createNewProject } from './utils/projectCreation';
import Button from '../../Button';
import GlassCard from '../../GlassCard';
import Toast from '../../Toast';

export default function ProjectForm() {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { formData, toast, setToast, handleChange, handleImageChange, validateForm } = useProjectForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const newProject = createNewProject(formData);
      await addProject(newProject);
      
      setToast({
        type: 'success',
        message: 'Project created successfully'
      });
      
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Failed to create project. Please try again.'
      });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProjectFormFields 
            formData={formData}
            onChange={handleChange}
            onImageChange={handleImageChange}
          />

          <Button type="submit" variant="gradient" className="w-full">
            Create Project
          </Button>
        </form>
      </GlassCard>
    </>
  );
}