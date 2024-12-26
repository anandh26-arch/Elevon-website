import React from 'react';

const requirements = [
  'Complete KYC verification',
  'Smart contract audit',
  'Detailed tokenomics',
  'Working product/prototype',
  'Clear roadmap & whitepaper'
];

export default function RequirementsList() {
  return (
    <ul className="space-y-4">
      {requirements.map((item, index) => (
        <li key={index} className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}