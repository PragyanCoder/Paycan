import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center px-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center space-x-2">
            <div className="relative group">
              {/* Unique Pigeon + Server Logo */}
              <div className="relative w-12 h-12">
                {/* Base shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg transform rotate-45 group-hover:rotate-[225deg] transition-transform duration-500">
                  {/* Pigeon body shape */}
                  <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-2 text-white transform -rotate-45 group-hover:rotate-[135deg] transition-transform duration-500">
                    <path fill="currentColor" d="M12,3C8,3 4,6 4,9c0,2 1,4 3,4v3h3v5l2,-2l2,2v-5h3v-3c2,0 3,-2 3,-4C20,6 16,3 12,3M12,5c2.5,0 4,1.5 4,3c0,1.5 -1.5,3 -4,3S8,9.5 8,8C8,6.5 9.5,5 12,5M9,15h2v3l1,-1l1,1v-3h2v-1H9v1Z"/>
                  </svg>
                  {/* Server lines overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-1 transform -rotate-45 group-hover:rotate-[135deg] transition-transform duration-500">
                    <div className="w-full h-0.5 bg-white/30 rounded mb-1"></div>
                    <div className="w-full h-0.5 bg-white/30 rounded"></div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-sm group-hover:bg-indigo-500/20 transition-colors duration-500"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Quycan
              </span>
              <span className="text-sm font-medium text-gray-500">Software</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Products
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xs text-white animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                  <span className="text-sm font-medium hidden md:inline">{user.displayName || user.email}</span>
                </div>
                <button 
                  onClick={() => signOut()} 
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500 h-9 px-4 text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin"
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus-visible:ring-blue-500 h-9 px-4 text-sm"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity md:hidden",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      >
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg transform rotate-45"></div>
                  <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full p-1.5 text-white transform -rotate-45">
                    <path fill="currentColor" d="M12,3C8,3 4,6 4,9c0,2 1,4 3,4v3h3v5l2,-2l2,2v-5h3v-3c2,0 3,-2 3,-4C20,6 16,3 12,3M12,5c2.5,0 4,1.5 4,3c0,1.5 -1.5,3 -4,3S8,9.5 8,8C8,6.5 9.5,5 12,5M9,15h2v3l1,-1l1,1v-3h2v-1H9v1Z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Quycan
                </span>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleSidebar}
            >
              Services
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleSidebar}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleSidebar}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}