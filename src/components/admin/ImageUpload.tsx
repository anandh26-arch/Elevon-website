import React, { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../Button';

interface ImageUploadProps {
  label: string;
  imageUrl: string;
  onChange: (url: string) => void;
  aspectRatio?: 'square' | 'banner';
}

export default function ImageUpload({ 
  label, 
  imageUrl, 
  onChange,
  aspectRatio = 'square'
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(imageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-400 mb-2">
        {label}
      </label>
      
      <div className={`relative glass-card overflow-hidden ${
        aspectRatio === 'banner' ? 'h-40' : 'aspect-square'
      }`}>
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className={`w-full h-full ${aspectRatio === 'banner' ? 'object-cover' : 'object-contain'}`}
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-400">Click to upload</p>
          </div>
        )}
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}