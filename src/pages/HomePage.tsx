import React from 'react';
import Button from '../components/Button';
import { Wallet, Search, PiggyBank } from 'lucide-react';
import ParticipationStep from '../components/ParticipationStep';
import WhyChooseElevon from '../components/WhyChooseElevon';
import UpcomingProjects from '../components/home/UpcomingProjects';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-black/50 backdrop-blur-sm" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className="text-[#ABAAAA]">Launch Your Project on{' '}</span>
              <span className="text-white">Elevon</span>
            </h1>
            <p className="text-xl text-indigo-200/80 mb-8 max-w-2xl mx-auto">
              Secure, transparent, and efficient token launches for the next generation of blockchain projects
            </p>
            <Button variant="gradient" size="lg">
              Apply for IDO
            </Button>
          </div>
        </div>
      </div>

      {/* Why Choose Elevon Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyChooseElevon />
      </div>

      {/* Upcoming Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UpcomingProjects />
      </div>

      {/* How to Participate Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">How to Participate</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join the next generation of blockchain projects in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ParticipationStep
            icon={Wallet}
            title="Connect Your Wallet"
            description="Connect your Web3 wallet to get started with the investment process"
          />
          <ParticipationStep
            icon={Search}
            title="Choose Your Project"
            description="Browse through our curated list of high-quality blockchain projects"
          />
          <ParticipationStep
            icon={PiggyBank}
            title="Invest"
            description="Participate in the token sale of your chosen project securely"
          />
        </div>
      </div>
    </div>
  );
}