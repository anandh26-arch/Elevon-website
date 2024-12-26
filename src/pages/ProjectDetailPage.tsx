import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useProjectStatus } from '../hooks/useProjectStatus';
import GlassCard from '../components/GlassCard';
import ProjectDetails from '../components/project/ProjectDetails';
import InvestmentCard from '../components/project/InvestmentCard';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { projects } = useProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const currentStatus = useProjectStatus(project);

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Project Banner */}
      <div className="relative h-64 md:h-96">
        <img
          src={project.bannerImage}
          alt={`${project.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="md:col-span-2 space-y-8">
            <GlassCard>
              <div className="flex items-center space-x-6 mb-6">
                <img
                  src={project.logo}
                  alt={project.name}
                  className="w-20 h-20 rounded-full ring-2 ring-indigo-500/30"
                />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                  <p className="text-xl text-indigo-400">${project.tokenSymbol}</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg">{project.description}</p>
            </GlassCard>

            <ProjectDetails project={project} />
          </div>

          {/* Sidebar */}
          <div>
            {currentStatus === 'live' ? (
              <>
                <GlassCard className="mb-8">
                  <div className="mb-4">
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Raised</span>
                    <span className="text-white font-medium">
                      ${(project.totalRaise * project.progress / 100).toLocaleString()} / ${project.totalRaise.toLocaleString()}
                    </span>
                  </div>
                </GlassCard>
                <InvestmentCard project={project} />
              </>
            ) : (
              <GlassCard>
                <h2 className="text-xl font-semibold text-white mb-4">Sale Status</h2>
                <div className="mb-4">
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
                <p className="text-center text-lg font-medium text-white">
                  {currentStatus === 'upcoming' ? 'Coming Soon' : 'Sale Ended'}
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}