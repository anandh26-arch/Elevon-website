import React from 'react';
import ImageUpload from '../../ImageUpload';
import type { FormData } from '../types';

interface ProjectFormFieldsProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (field: 'logo' | 'bannerImage', url: string) => void;
}

export function ProjectFormFields({ formData, onChange, onImageChange }: ProjectFormFieldsProps) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <ImageUpload
          label="Project Logo"
          imageUrl={formData.logo}
          onChange={(url) => onImageChange('logo', url)}
          aspectRatio="square"
        />
        <ImageUpload
          label="Banner Image"
          imageUrl={formData.bannerImage}
          onChange={(url) => onImageChange('bannerImage', url)}
          aspectRatio="banner"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="symbol" className="block text-sm text-gray-400 mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            id="symbol"
            value={formData.symbol}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm text-gray-400 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={onChange}
          className="glass-input w-full h-24"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm text-gray-400 mb-2">
            Token Price (USDT)
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={onChange}
            className="glass-input w-full"
            required
            step="0.000001"
          />
        </div>

        <div>
          <label htmlFor="supply" className="block text-sm text-gray-400 mb-2">
            Total Supply
          </label>
          <input
            type="number"
            id="supply"
            value={formData.supply}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="minInvestment" className="block text-sm text-gray-400 mb-2">
            Min Investment (USDT)
          </label>
          <input
            type="number"
            id="minInvestment"
            value={formData.minInvestment}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="maxInvestment" className="block text-sm text-gray-400 mb-2">
            Max Investment (USDT)
          </label>
          <input
            type="number"
            id="maxInvestment"
            value={formData.maxInvestment}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startTime" className="block text-sm text-gray-400 mb-2">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={formData.startTime}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm text-gray-400 mb-2">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={formData.endTime}
            onChange={onChange}
            className="glass-input w-full"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="vesting" className="block text-sm text-gray-400 mb-2">
          Vesting Schedule
        </label>
        <input
          type="text"
          id="vesting"
          value={formData.vesting}
          onChange={onChange}
          className="glass-input w-full"
          placeholder="e.g., 20% TGE, 20% monthly for 4 months"
          required
        />
      </div>
    </>
  );
}