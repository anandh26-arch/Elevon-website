import type { FormData } from './types';

export function validateFormData(formData: FormData): { isValid: boolean; error?: string } {
  if (!formData.name || !formData.symbol || !formData.description || !formData.logo || !formData.bannerImage) {
    return {
      isValid: false,
      error: 'Please fill in all required fields and upload images'
    };
  }

  if (parseFloat(formData.minInvestment) >= parseFloat(formData.maxInvestment)) {
    return {
      isValid: false,
      error: 'Minimum investment must be less than maximum investment'
    };
  }

  if (new Date(formData.startTime) >= new Date(formData.endTime)) {
    return {
      isValid: false,
      error: 'Start time must be before end time'
    };
  }

  return { isValid: true };
}