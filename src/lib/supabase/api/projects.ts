import { supabase } from '../client';
import type { Project } from '../../../types';

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createProject(project: Project): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .insert([project]);

  if (error) throw error;
}

export async function updateProject(project: Project): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', project.id);

  if (error) throw error;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
}