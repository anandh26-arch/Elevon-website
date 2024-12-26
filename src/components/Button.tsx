import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50',
        // Size variants
        {
          'text-sm px-4 py-2': size === 'sm',
          'text-base px-6 py-2.5': size === 'md',
          'text-lg px-8 py-3': size === 'lg',
        },
        // Style variants
        {
          // Primary variant with glow effect
          'bg-indigo-600/90 hover:bg-indigo-700/90 text-white rounded-xl backdrop-blur-sm shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.45)] border border-indigo-500/20':
            variant === 'primary',
          
          // Secondary variant with glass effect
          'bg-white/10 hover:bg-white/15 text-white rounded-2xl backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]':
            variant === 'secondary',
          
          // Outline variant with hover fill effect
          'border-2 border-indigo-500/50 text-indigo-400 hover:text-white rounded-xl relative overflow-hidden hover:border-indigo-500 before:absolute before:inset-0 before:-z-10 before:bg-indigo-600/90 before:transition-transform before:duration-300 before:translate-y-full hover:before:translate-y-0':
            variant === 'outline',
          
          // Gradient variant with animated gradient
          'text-white rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] animate-gradient border border-white/10 shadow-[0_0_20px_rgba(79,70,229,0.3)]':
            variant === 'gradient',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}