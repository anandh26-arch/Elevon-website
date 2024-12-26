import { useEffect, useState } from 'react';
import { Project } from '../types';
import { calculateProjectStatus } from '../utils/projectStatus';

export function useProjectStatus(project: Project) {
  const [status, setStatus] = useState(calculateProjectStatus(project.startTime, project.endTime));

  useEffect(() => {
    const updateStatus = () => {
      setStatus(calculateProjectStatus(project.startTime, project.endTime));
    };

    // Update every minute
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [project.startTime, project.endTime]);

  return status;
}