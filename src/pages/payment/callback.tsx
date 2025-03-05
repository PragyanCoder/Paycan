import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export function PaymentCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle payment callback
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    // Redirect based on payment status
    if (status === 'success') {
      navigate('/payment/success');
    } else {
      navigate('/payment/failed');
    }
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Processing your payment...</p>
      </div>
    </div>
  );
}