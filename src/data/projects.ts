import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'clyze',
    name: 'Clyze',
    description: 'Next-generation blockchain analytics platform',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=128&h=128&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=400&fit=crop',
    tokenSymbol: 'CLYZE',
    tokenPrice: 0.033,
    totalRaise: 166666,
    progress: 0,
    startTime: '2024-03-19T14:00:00Z',
    endTime: '2024-03-21T14:00:00Z',
    status: 'live',
    minInvestment: 100,
    maxInvestment: 3000,
    totalSupply: 100000000,
    initialMarketCap: 3300000,
    vestingSchedule: '20% TGE, 20% monthly for 4 months',
    refundPolicy: 'No refund',
    socials: {
      website: 'https://example.com',
      twitter: 'https://twitter.com',
      telegram: 'https://telegram.org'
    }
  }
];