import React from 'react';
import RequirementsList from './RequirementsList';

export default function RequirementsCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient" />
      <div className="relative glass-card p-8 rounded-2xl space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Requirements</h3>
          <p className="text-gray-400">Meet our standard criteria to apply</p>
        </div>
        
        <RequirementsList />

        <div className="pt-4">
          <p className="text-sm text-gray-400">
            * Additional requirements may apply based on project scope
          </p>
        </div>
      </div>
    </div>
  );
}