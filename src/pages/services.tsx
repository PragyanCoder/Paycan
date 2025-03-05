import { useState } from 'react';
import { Server, Cpu, MemoryStick as Memory, HardDrive, Cpu as Gpu, Gamepad, Cloud, Video, Network, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serverSpecs } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import toast from 'react-hot-toast';

interface ServerSpec {
  id: string;
  name: string;
  description: string;
  category: 'cloud' | 'gaming' | 'streaming';
  specifications: {
    cpu: string;
    ram: string;
    storage: string;
    gpu?: string;
    network: string;
    bandwidth: string;
    ddos_protection: string;
    backup: string;
    os: string[];
  };
  features: string[];
  price: number;
}

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'cloud' | 'gaming' | 'streaming'>('cloud');
  const { addItem } = useCart();

  const handleAddToCart = (server: ServerSpec) => {
    addItem(server);
    toast.success('Added to cart!');
  };

  const filteredServers = serverSpecs.filter(server => server.category === selectedCategory);

  const CategoryIcon = {
    cloud: Cloud,
    gaming: Gamepad,
    streaming: Video
  }[selectedCategory];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">High-Performance Server Solutions</h1>
          <p className="text-xl text-gray-600">
            Enterprise-grade infrastructure for your specific needs
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'cloud' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('cloud')}
            className="flex items-center gap-2"
          >
            <Cloud className="h-5 w-5" />
            Cloud Servers
          </Button>
          <Button
            variant={selectedCategory === 'gaming' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('gaming')}
            className="flex items-center gap-2"
          >
            <Gamepad className="h-5 w-5" />
            Gaming Servers
          </Button>
          <Button
            variant={selectedCategory === 'streaming' ? 'primary' : 'outline'}
            onClick={() => setSelectedCategory('streaming')}
            className="flex items-center gap-2"
          >
            <Video className="h-5 w-5" />
            Streaming Servers
          </Button>
        </div>

        {/* Server Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServers.map((server) => (
            <div key={server.id} className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-4">
                <CategoryIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-bold">{server.name}</h3>
              </div>
              <p className="text-gray-600 mb-6">{server.description}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Cpu className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>CPU:</strong> {server.specifications.cpu}</p>
                </div>
                <div className="flex items-center">
                  <Memory className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>RAM:</strong> {server.specifications.ram}</p>
                </div>
                <div className="flex items-center">
                  <HardDrive className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>Storage:</strong> {server.specifications.storage}</p>
                </div>
                {server.specifications.gpu && (
                  <div className="flex items-center">
                    <Gpu className="h-5 w-5 text-blue-500 mr-2" />
                    <p><strong>GPU:</strong> {server.specifications.gpu}</p>
                  </div>
                )}
                <div className="flex items-center">
                  <Network className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>Network:</strong> {server.specifications.network}</p>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>Bandwidth:</strong> {server.specifications.bandwidth}</p>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>Security:</strong> {server.specifications.ddos_protection}</p>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-blue-500 mr-2" />
                  <p><strong>Backup:</strong> {server.specifications.backup}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {server.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div>
                  <span className="text-3xl font-bold text-blue-600">${server.price.toFixed(2)}</span>
                  <span className="text-gray-600">/mo</span>
                </div>
                <Button 
                  onClick={() => handleAddToCart(server)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}