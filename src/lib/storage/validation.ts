import type { Project } from '../../types';

export function isValidProject(project: unknown): project is Project {
  if (!project || typeof project !== 'object') return false;
  
  const p = project as Partial<Project>;
  return !!(
    p.id &&
    p.name &&
    p.description &&
    p.logo &&
    p.bannerImage &&
    p.tokenSymbol &&
    typeof p.tokenPrice === 'number' &&
    typeof p.totalRaise === 'number'
  );
}

export function isValidProjectArray(data: unknown): data is Project[] {
  return Array.isArray(data) && data.every(isValidProject);
}