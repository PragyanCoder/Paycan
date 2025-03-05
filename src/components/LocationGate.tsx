import { useState, useEffect } from 'react';
import { trackUserInfo } from '@/lib/tracking';
import { Button } from '@/components/ui/button';
import { MapPin, Database, Loader2 } from 'lucide-react';

interface LocationGateProps {
  children: React.ReactNode;
}

export function LocationGate({ children }: LocationGateProps) {
  const [isLocationGranted, setIsLocationGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    try {
      await trackUserInfo();
      setIsLocationGranted(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Location error:', error);
      setIsLocationGranted(false);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setRetryCount(prev => prev + 1);
    checkLocation();
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="relative mb-6">
              <Database className="h-12 w-12 text-blue-600 mx-auto animate-bounce-slow" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg blur-xl animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Initializing Services</h3>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse" style={{ animationDelay: '200ms' }}>•</span>
              <span className="animate-pulse" style={{ animationDelay: '400ms' }}>•</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLocationGranted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-4">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Location Access Required</h2>
          <p className="text-gray-600 mb-6">
            {retryCount === 0 
              ? "To ensure the best possible experience and provide you with localized services, please enable location access."
              : "Location access is required to continue. Please enable location services in your browser settings and try again."}
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleRetry}
              className="w-full"
            >
              {retryCount === 0 ? "Grant Location Access" : "Try Again"}
            </Button>
            {retryCount > 0 && (
              <p className="text-sm text-gray-500">
                If you're having trouble, make sure location services are enabled in your browser settings.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}