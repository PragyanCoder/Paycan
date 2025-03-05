import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Database, LineChart, AlertTriangle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export function ProductsPage() {
  const navigate = useNavigate();
  const [activeDemo, setActiveDemo] = useState<'fraud' | 'transactions' | 'data'>('fraud');

  const fraudMetrics: DemoMetric[] = [
    { label: 'Fraud Attempts Blocked', value: '2,847', change: '+12.3%', positive: true },
    { label: 'False Positive Rate', value: '0.02%', change: '-5.1%', positive: true },
    { label: 'Average Response Time', value: '23ms', change: '-15.4%', positive: true },
    { label: 'Money Saved', value: '$124,582', change: '+18.7%', positive: true }
  ];

  const transactionMetrics: DemoMetric[] = [
    { label: 'Transactions Processed', value: '1.2M', change: '+8.4%', positive: true },
    { label: 'Success Rate', value: '99.99%', change: '+0.02%', positive: true },
    { label: 'Average Processing Time', value: '45ms', change: '-12.3%', positive: true },
    { label: 'Revenue Processed', value: '$5.8M', change: '+22.1%', positive: true }
  ];

  const dataMetrics: DemoMetric[] = [
    { label: 'Data Points Collected', value: '850M', change: '+25.7%', positive: true },
    { label: 'API Uptime', value: '99.999%', change: '+0.001%', positive: true },
    { label: 'Average Latency', value: '18ms', change: '-8.9%', positive: true },
    { label: 'Active Integrations', value: '1,234', change: '+15.3%', positive: true }
  ];

  const getMetrics = () => {
    switch (activeDemo) {
      case 'fraud':
        return fraudMetrics;
      case 'transactions':
        return transactionMetrics;
      case 'data':
        return dataMetrics;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Real-Time Solutions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade APIs for fraud detection, transaction processing, and data collection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div 
            className={`p-6 rounded-xl cursor-pointer transition-all ${
              activeDemo === 'fraud' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-blue-50'
            }`}
            onClick={() => setActiveDemo('fraud')}
          >
            <Shield className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fraud Detection API</h3>
            <p className="opacity-90">Real-time fraud prevention with machine learning</p>
          </div>

          <div 
            className={`p-6 rounded-xl cursor-pointer transition-all ${
              activeDemo === 'transactions' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-blue-50'
            }`}
            onClick={() => setActiveDemo('transactions')}
          >
            <Activity className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transaction Management</h3>
            <p className="opacity-90">High-performance transaction processing system</p>
          </div>

          <div 
            className={`p-6 rounded-xl cursor-pointer transition-all ${
              activeDemo === 'data' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-blue-50'
            }`}
            onClick={() => setActiveDemo('data')}
          >
            <Database className="h-8 w-8 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Data Collection API</h3>
            <p className="opacity-90">Scalable real-time data collection and analysis</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Live Demo Dashboard</h2>
            <Button onClick={() => navigate('/signup')} size="lg">
              Get Your API Key
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getMetrics().map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm text-gray-600 mb-2">{metric.label}</h3>
                <div className="text-2xl font-bold mb-2">{metric.value}</div>
                <div className={`flex items-center text-sm ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.positive ? '↑' : '↓'} {metric.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Example API Usage</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              {`// Initialize the API client
const client = new ArivyanAPI('your_api_key');

// Real-time fraud detection
client.detectFraud({
  transaction_id: 'tx_123',
  amount: 299.99,
  user_id: 'user_456',
  ip_address: '192.168.1.1',
  device_id: 'device_789'
}).then(result => {
  if (result.fraudScore > 0.8) {
    // Block transaction
  }
});`}
            </pre>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h3 className="text-xl font-bold mb-4">Features & Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <span>99.99% fraud detection accuracy</span>
              </li>
              <li className="flex items-center">
                <Activity className="h-5 w-5 text-green-500 mr-2" />
                <span>Process 10,000+ transactions per second</span>
              </li>
              <li className="flex items-center">
                <LineChart className="h-5 w-5 text-blue-500 mr-2" />
                <span>Real-time analytics and reporting</span>
              </li>
              <li className="flex items-center">
                <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
                <span>Save up to 95% on fraud-related losses</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={() => navigate('/signup')} size="lg" className="px-8">
            Start Your Free Trial
          </Button>
          <p className="mt-4 text-gray-600">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </div>
  );
}