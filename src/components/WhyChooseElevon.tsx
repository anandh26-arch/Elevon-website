import React from 'react';
import { Coins, Network, Timer } from 'lucide-react';
import GlassCard from './GlassCard';

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function Benefit({ icon: Icon, title, description }: BenefitProps) {
  return (
    <GlassCard className="p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-indigo-500/30">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex items-center justify-center mb-6 border border-indigo-500/20">
        <Icon className="w-8 h-8 text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </GlassCard>
  );
}

export default function WhyChooseElevon() {
  return (
    <div className="py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Why Choose Elevon</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience the next generation of token launches with our unique advantages
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Benefit
          icon={Coins}
          title="No Staking Required"
          description="Participate in token sales without any staking requirements. Equal opportunity for all investors."
        />
        <Benefit
          icon={Network}
          title="Multi-Chain Projects"
          description="Access projects across multiple blockchain networks, all in one platform."
        />
        <Benefit
          icon={Timer}
          title="FCFS Allocation"
          description="Fair and transparent First Come, First Served allocation system for all participants."
        />
      </div>
    </div>
  );
}