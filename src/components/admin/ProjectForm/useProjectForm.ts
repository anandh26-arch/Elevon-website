import { useState } from 'react';
import type { FormData } from './types';
import { validateFormData } from './validation';

const initialFormData: FormData = {
  name: '',
  symbol: '',
  description: '',
  logo: '',
  bannerImage: '',
  price: '',
  supply: '',
  minInvestment: '',
  maxInvestment: '',
  startTime: '',
  endTime: '',
  vesting: ''
};

export function useProjectForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleImageChange = (field: 'logo' | 'bannerImage', url: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: url
    }));
  };

  const validateForm = () => {
    const { isValid, error } = validateFormData(formData);
    if (!isValid && error) {
      setToast({ type: 'error', message: error });
    }
    return isValid;
  };

  return {
    formData,
    toast,
    setToast,
    handleChange,
    handleImageChange,
    validateForm
  };
}