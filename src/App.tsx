import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
import { LocationGate } from '@/components/LocationGate';
import { Header } from '@/components/layout/header';
import { HomePage } from '@/pages/home';
import { ServicesPage } from '@/pages/services';
import { ProductsPage } from '@/pages/products';
import { CartPage } from '@/pages/cart';
import { SignUpPage } from '@/pages/signup';
import { SignInPage } from '@/pages/signin';
import { ContactPage } from '@/pages/contact';
import { PaymentSuccessPage } from '@/pages/payment/success';
import { PaymentFailedPage } from '@/pages/payment/failed';
import { PaymentCallbackPage } from '@/pages/payment/callback';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              {/* Public routes */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Payment routes */}
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
              <Route path="/payment/failed" element={<PaymentFailedPage />} />
              <Route path="/payment/callback" element={<PaymentCallbackPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <LocationGate>
                  <HomePage />
                </LocationGate>
              } />
              <Route path="/products" element={
                <LocationGate>
                  <ProductsPage />
                </LocationGate>
              } />
              <Route path="/cart" element={
                <LocationGate>
                  <CartPage />
                </LocationGate>
              } />
              <Route path="*" element={<Navigate to="/services" replace />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;