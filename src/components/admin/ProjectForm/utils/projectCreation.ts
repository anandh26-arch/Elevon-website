import type { FormData } from '../types';
import type { Project } from '../../../../types';

export function createNewProject(formData: FormData): Project {
  return {
    id: crypto.randomUUID(),
    name: formData.name,
    tokenSymbol: formData.symbol,
    description: formData.description,
    logo: formData.logo,
    bannerImage: formData.bannerImage,
    tokenPrice: parseFloat(formData.price),
    totalSupply: parseInt(formData.supply),
    minInvestment: parseInt(formData.minInvestment),
    maxInvestment: parseInt(formData.maxInvestment),
    totalRaise: parseInt(formData.supply) * parseFloat(formData.price),
    progress: 0,
    startTime: formData.startTime,
    endTime: formData.endTime,
    status: 'upcoming' as const,
    initialMarketCap: parseInt(formData.supply) * parseFloat(formData.price),
    vestingSchedule: formData.vesting,
    refundPolicy: 'No refund',
    socials: {
      website: 'https://example.com',
      twitter: 'https://twitter.com',
      telegram: 'https://telegram.org'
    }
  };
}