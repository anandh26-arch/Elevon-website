import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import ConnectButton from './wallet/ConnectButton';

export default function Navbar() {
  return (
    <nav className="glass-nav fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gradient">Elevon</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/projects" className="text-gray-300 hover:text-indigo-400 transition-colors">
              Projects
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}