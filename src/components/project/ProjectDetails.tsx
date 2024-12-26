import React from 'react';
import { Project } from '../../types';
import GlassCard from '../GlassCard';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const details = [
    { label: 'Minimum Investment', value: `${project.minInvestment} USDT` },
    { label: 'Maximum Investment', value: `${project.maxInvestment} USDT` },
    { label: 'Total Supply', value: `${project.totalSupply.toLocaleString()} ${project.tokenSymbol}` },
    { label: 'Initial Market Cap', value: `$${project.initialMarketCap.toLocaleString()}` },
    { label: 'Vesting Schedule', value: project.vestingSchedule },
    { label: 'Refund Policy', value: project.refundPolicy },
  ];

  return (
    <GlassCard>
      <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
            <span className="text-gray-400">{detail.label}</span>
            <span className="text-white font-medium">{detail.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}