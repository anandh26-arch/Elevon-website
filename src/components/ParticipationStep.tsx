import React from 'react';
import GlassCard from './GlassCard';

interface ParticipationStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

export default function ParticipationStep({ icon: Icon, title, description }: ParticipationStepProps) {
  return (
    <GlassCard className="p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </GlassCard>
  );
}