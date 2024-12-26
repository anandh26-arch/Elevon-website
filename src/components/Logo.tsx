import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="elevonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#F39C12" />
        </linearGradient>
        <linearGradient id="elevonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#F39C12" />
        </linearGradient>
      </defs>
      {/* Circular background */}
      <circle cx="20" cy="20" r="19" fill="none" stroke="url(#elevonGradient)" strokeWidth="2" />
      
      {/* Half circle for 'E' */}
      <path
        d="M14 12C14 12 26 12 26 20C26 28 14 28 14 28"
        stroke="url(#elevonGradient2)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Middle line of 'E' */}
      <line
        x1="14"
        y1="20"
        x2="22"
        y2="20"
        stroke="url(#elevonGradient2)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* Arrow */}
      <path
        d="M22 16L26 12L30 16"
        stroke="url(#elevonGradient2)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}