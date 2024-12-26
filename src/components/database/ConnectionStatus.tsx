import React from 'react';
import { useSupabaseStatus } from '../../lib/supabase/hooks/useSupabaseStatus';
import { AlertCircle, CheckCircle, Loader, WifiOff } from 'lucide-react';
import Button from '../Button';

export default function ConnectionStatus() {
  const { isConnected, isChecking, isOffline, error, retry } = useSupabaseStatus();

  if (isOffline) {
    return (
      <div className="fixed bottom-4 right-4 glass-card p-4 space-y-2 border border-yellow-500/30">
        <div className="flex items-center space-x-2">
          <WifiOff className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-400">No internet connection</span>
        </div>
      </div>
    );
  }

  if (isChecking) {
    return (
      <div className="fixed bottom-4 right-4 glass-card p-3 flex items-center space-x-2">
        <Loader className="w-4 h-4 text-indigo-400 animate-spin" />
        <span className="text-sm text-gray-400">Checking connection...</span>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4 glass-card p-4 space-y-2 border border-red-500/30">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-gray-400">
            {error || 'Database disconnected'}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={retry}
          className="w-full"
        >
          Retry Connection
        </Button>
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