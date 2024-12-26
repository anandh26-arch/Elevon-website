import React from 'react';
import { Rocket, Shield, Target, Zap } from 'lucide-react';
import Button from './Button';

interface FeatureProps {
  icon: React.ElementType;
  title: string;
}

function Feature({ icon: Icon, title }: FeatureProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 flex items-center justify-center border border-indigo-500/20">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <span className="text-gray-300">{title}</span>
    </div>
  );
}

export default function ApplyProject() {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 animate-gradient" />
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Content */}
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

          {/* Right side: Glass Card */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient" />
            <div className="relative glass-card p-8 rounded-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Requirements</h3>
                <p className="text-gray-400">Meet our standard criteria to apply</p>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Complete KYC verification',
                  'Smart contract audit',
                  'Detailed tokenomics',
                  'Working product/prototype',
                  'Clear roadmap & whitepaper'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <p className="text-sm text-gray-400">
                  * Additional requirements may apply based on project scope
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}