export interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  bannerImage: string;
  tokenSymbol: string;
  tokenPrice: number;
  totalRaise: number;
  progress: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'live' | 'ended';
  minInvestment: number;
  maxInvestment: number;
  totalSupply: number;
  initialMarketCap: number;
  vestingSchedule: string;
  refundPolicy: string;
  socials: {
    website: string;
    twitter: string;
    telegram: string;
    discord?: string;
  };
}