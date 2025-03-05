import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>
        <div className="space-y-4">
          <Button onClick={() => navigate('/services')} className="w-full">
            Continue Shopping
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