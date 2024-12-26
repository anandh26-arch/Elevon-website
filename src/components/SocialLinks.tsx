import React from 'react';
import Website from './icons/Website';
import TwitterX from './icons/TwitterX';
import Telegram from './icons/Telegram';

interface SocialLinksProps {
  website: string;
  twitter: string;
  telegram: string;
}

export default function SocialLinks({ website, twitter, telegram }: SocialLinksProps) {
  return (
    <div className="flex space-x-4">
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <Website className="h-5 w-5 text-gray-400 hover:text-indigo-400" />
      </a>
      <a
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <TwitterX className="h-5 w-5 text-gray-400 hover:text-indigo-400" />
      </a>
      <a
        href={telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <Telegram className="h-5 w-5 text-gray-400 hover:text-indigo-400" />
      </a>
    </div>
  );
}