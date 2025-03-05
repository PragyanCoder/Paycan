import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PaymentFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h1>
        <p className="text-gray-600 mb-8">
          We're sorry, but your payment could not be processed. Please try again or contact our support team for assistance.
        </p>
        <div className="space-y-4">
          <Button onClick={() => navigate('/cart')} className="w-full">
            Try Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = 'https://t.me/QuycanSoftware'}
            className="w-full"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}