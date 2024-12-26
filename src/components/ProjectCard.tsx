import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { useProjectStatus } from '../hooks/useProjectStatus';
import GlassCard from './GlassCard';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const currentStatus = useProjectStatus(project);

  const getButtonText = () => {
    switch (currentStatus) {
      case 'live':
        return 'Participate Now';
      case 'upcoming':
        return 'Coming Soon';
      case 'ended':
        return 'Sale Ended';
      default:
        return 'View Details';
    }
  };

  return (
    <GlassCard className="overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-40 -mx-6 -mt-6 mb-6">
        <img 
          src={project.bannerImage} 
          alt={`${project.name} banner`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <img 
          src={project.logo} 
          alt={project.name} 
          className="w-12 h-12 rounded-full ring-2 ring-indigo-500/30" 
        />
        <div>
          <h3 className="text-xl font-semibold text-white">{project.name}</h3>
          <p className="text-sm text-indigo-400">${project.tokenSymbol}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Price and Total Raise */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-3">
            <p className="text-sm text-gray-400 mb-1">Price</p>
            <p className="text-lg font-semibold text-white">
              ${project.tokenPrice.toFixed(3)}
            </p>
          </div>
          <div className="glass-card p-3">
            <p className="text-sm text-gray-400 mb-1">Total Raise</p>
            <p className="text-lg font-semibold text-white">
              ${project.totalRaise.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-indigo-400 font-medium">{project.progress}%</span>
          </div>
          <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/project/${project.id}`}
          className={`block text-center py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 ${
            currentStatus === 'live'
              ? 'bg-gradient-to-r from-indigo-600/90 to-indigo-500/90 hover:from-indigo-600 hover:to-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          {getButtonText()}
        </Link>
      </div>
    </GlassCard>
  );
}