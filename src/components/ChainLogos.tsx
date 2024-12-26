import React, { useEffect, useState } from 'react';
import { chains } from '../data/chains';

export default function ChainLogos() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (chains.length * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const displayedChains = [...chains, ...chains];

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className="flex space-x-8 transition-transform duration-1000"
        style={{
          transform: `translateX(-${offset * (128 + 32)}px)`,
        }}
      >
        {displayedChains.map((chain, index) => (
          <div
            key={`${chain.name}-${index}`}
            className="flex-shrink-0 w-32 h-32 rounded-2xl overflow-hidden glass-card p-4 border border-white/10"
          >
            <img
              src={chain.logo}
              alt={chain.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
      
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}