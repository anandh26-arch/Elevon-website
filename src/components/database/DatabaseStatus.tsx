import React from 'react';
import { useSupabaseStatus } from '../../lib/supabase/hooks/useSupabaseStatus';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function DatabaseStatus() {
  const { isConnected, isChecking, error } = useSupabaseStatus();

  if (isChecking) {
    return (
      <div className="fixed bottom-4 right-4 glass-card p-3 flex items-center space-x-2">
        <Loader className="w-4 h-4 text-indigo-400 animate-spin" />
        <span className="text-sm text-gray-400">Checking database connection...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4 glass-card p-3 flex items-center space-x-2 border border-red-500/30">
        <AlertCircle className="w-4 h-4 text-red-400" />
        <span className="text-sm text-gray-400">
          {error || 'Database disconnected'}
        </span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 glass-card p-3 flex items-center space-x-2 border border-green-500/30">
      <CheckCircle className="w-4 h-4 text-green-400" />
      <span className="text-sm text-gray-400">Connected to database</span>
    </div>
  );
}