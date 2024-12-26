import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X, RefreshCw } from 'lucide-react';
import Button from './Button';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
  onRetry?: () => void;
}

export default function Toast({ message, type, onClose, onRetry }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`glass-card p-4 flex items-center space-x-3 ${
        type === 'success' ? 'border-green-500/30' : 
        type === 'warning' ? 'border-yellow-500/30' :
        'border-red-500/30'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : type === 'warning' ? (
          <XCircle className="w-5 h-5 text-yellow-400" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400" />
        )}
        <p className="text-white">{message}</p>
        
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="!px-2 !py-1"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
        
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}