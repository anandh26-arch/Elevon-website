import { createClient } from '@supabase/supabase-js';
import type { Project } from '../../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function saveToSupabase(projects: Project[]): Promise<void> {
  const { error } = await supabase
    .from('projects')
    .upsert(
      projects.map(project => ({
        ...project,
        updated_at: new Date().toISOString()
      }))
    );

  if (error) throw error;
}

export async function loadFromSupabase(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}