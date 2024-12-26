import React from 'react';
import Logo from './Logo';
import TwitterX from './icons/TwitterX';
import Telegram from './icons/Telegram';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold text-gradient">Elevon</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://twitter.com/elevon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <TwitterX className="h-5 w-5 text-gray-400 hover:text-indigo-400" />
            </a>
            <a
              href="https://t.me/elevon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              <Telegram className="h-5 w-5 text-gray-400 hover:text-indigo-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}