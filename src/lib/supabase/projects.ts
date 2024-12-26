import { supabase } from './client';
import { retry } from './retry';
import { DataError } from './errors';
import type { Project } from '../../types';
import type { Database } from './types';

type ProjectInsert = Omit<Project, 'id'>;
type ProjectRow = Database['public']['Tables']['projects']['Row'];

function mapToProject(row: ProjectRow): Project {
  return {
    ...row,
    socials: row.socials as Project['socials']
  };
}

export async function fetchProjects(): Promise<Project[]> {
  return retry(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw new DataError('Failed to fetch projects');
      }

      if (!data) {
        throw new DataError('No data returned from database');
      }

      return data.map(mapToProject);
    } catch (error) {
      if (error instanceof DataError) throw error;
      throw new DataError('Failed to fetch projects');
    }
  });
}

export async function createProject(project: ProjectInsert): Promise<Project> {
  return retry(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...project,
          id: crypto.randomUUID(),
          progress: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new DataError('Failed to create project');
      }

      if (!data) {
        throw new DataError('No data returned after project creation');
      }

      return mapToProject(data);
    } catch (error) {
      if (error instanceof DataError) throw error;
      throw new DataError('Failed to create project');
    }
  });
}

export async function updateProject(project: Project): Promise<Project> {
  return retry(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...project,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new DataError('Failed to update project');
      }

      if (!data) {
        throw new DataError('No data returned after project update');
      }

      return mapToProject(data);
    } catch (error) {
      if (error instanceof DataError) throw error;
      throw new DataError('Failed to update project');
    }
  });
}

export async function deleteProject(id: string): Promise<void> {
  return retry(async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw new DataError('Failed to delete project');
      }
    } catch (error) {
      if (error instanceof DataError) throw error;
      throw new DataError('Failed to delete project');
    }
  });
}