import React from 'react';

interface FeatureProps {
  icon: React.ElementType;
  title: string;
}

export default function Feature({ icon: Icon, title }: FeatureProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex items-center justify-center border border-indigo-500/20">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <span className="text-gray-300">{title}</span>
    </div>
  );
}