import React from 'react';
import { Rocket, Shield, Target, Zap } from 'lucide-react';
import Button from '../Button';
import Feature from './Feature';
import RequirementsCard from './RequirementsCard';

export default function ApplyProject() {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 animate-gradient" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-gradient">Launch Your Project</span>
                <br />
                <span className="text-white">on Elevon Launchpad</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Join the next generation of blockchain innovation. Launch your project with confidence on our secure and transparent platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Feature icon={Shield} title="KYC & Audit Required" />
              <Feature icon={Target} title="Targeted Exposure" />
              <Feature icon={Zap} title="Quick Integration" />
              <Feature icon={Rocket} title="Post-IDO Support" />
            </div>

            <div className="flex space-x-4">
              <Button variant="gradient" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          <RequirementsCard />
        </div>
      </div>
    </div>
  );
}