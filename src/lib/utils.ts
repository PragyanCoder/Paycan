import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// VPS Products with AI/ML capabilities
export const mockProducts = [
  {
    id: '1',
    name: 'AI Development VPS',
    description: 'Perfect for machine learning development and testing',
    specifications: {
      cpu: '4 vCPU',
      ram: '16 GB',
      storage: '100 GB NVMe SSD',
      gpu: 'NVIDIA T4 (Optional)',
    },
    price: 49.99,
    server_type: 'Ubuntu/Windows',
    features: ['TensorFlow', 'PyTorch', 'CUDA Support', 'Jupyter Notebooks']
  },
  {
    id: '2',
    name: 'ML Production VPS',
    description: 'High-performance solution for ML model deployment',
    specifications: {
      cpu: '8 vCPU',
      ram: '32 GB',
      storage: '200 GB NVMe SSD',
      gpu: 'NVIDIA T4',
    },
    price: 99.99,
    server_type: 'Ubuntu/Windows',
    features: ['Docker Support', 'Kubernetes Ready', 'MLflow', 'Model Serving']
  },
  {
    id: '3',
    name: 'Enterprise AI VPS',
    description: 'Enterprise-grade infrastructure for AI workloads',
    specifications: {
      cpu: '16 vCPU',
      ram: '64 GB',
      storage: '500 GB NVMe SSD',
      gpu: 'NVIDIA A100',
    },
    price: 199.99,
    server_type: 'Ubuntu/Windows',
    features: ['Distributed Training', 'Auto-scaling', 'High Availability', 'Enterprise Support']
  }
];

// Generate server tiers
export function generateServerTiers(category: 'cloud' | 'gaming' | 'streaming') {
  const tiers = [];
  const cpuTypes = {
    cloud: 'Intel Xeon',
    gaming: 'AMD EPYC',
    streaming: 'Intel Xeon'
  };

  // Basic tiers (1GB - 8GB)
  for (let i = 1; i <= 8; i++) {
    tiers.push({
      id: `${category}-basic-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Basic ${i}GB`,
      category,
      description: `Entry-level ${i}GB server for basic ${category} needs`,
      specifications: {
        cpu: `${i} vCPU ${cpuTypes[category]}`,
        ram: `${i}GB DDR4`,
        storage: `${i * 25}GB NVMe SSD`,
        ...(category !== 'cloud' && { gpu: i <= 4 ? 'Shared GPU' : 'NVIDIA T4 (Shared)' }),
        network: `${i}Gbps`,
        bandwidth: `${i * 2}TB/month`,
        ddos_protection: 'Basic DDoS Protection',
        backup: 'Weekly Backups',
        os: ['Ubuntu', 'CentOS', 'Windows Server']
      },
      features: [
        'Basic Monitoring',
        '99.9% Uptime',
        '24/7 Support',
        `${i} Snapshots`
      ],
      price: i * 9.99
    });
  }

  // Professional tiers (16GB - 64GB)
  for (let i = 16; i <= 64; i *= 2) {
    tiers.push({
      id: `${category}-pro-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Pro ${i}GB`,
      category,
      description: `Professional ${i}GB server for advanced ${category} workloads`,
      specifications: {
        cpu: `${i / 2} vCPU ${cpuTypes[category]}`,
        ram: `${i}GB DDR4 ECC`,
        storage: `${i * 50}GB NVMe SSD`,
        ...(category !== 'cloud' && { gpu: `NVIDIA ${i <= 32 ? 'T4' : 'A4000'}` }),
        network: `${i / 4}Gbps`,
        bandwidth: `${i}TB/month`,
        ddos_protection: 'Advanced DDoS Protection',
        backup: 'Daily Backups',
        os: ['Ubuntu Pro', 'CentOS', 'Windows Server', 'Red Hat']
      },
      features: [
        'Advanced Monitoring',
        '99.95% Uptime',
        'Priority Support',
        `${i / 4} Dedicated IP(s)`,
        'Load Balancing'
      ],
      price: (i / 2) * 19.99
    });
  }

  // Enterprise tiers (128GB - 512GB)
  for (let i = 128; i <= 512; i *= 2) {
    tiers.push({
      id: `${category}-enterprise-${i}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Enterprise ${i}GB`,
      category,
      description: `Enterprise-grade ${i}GB server for large-scale ${category} operations`,
      specifications: {
        cpu: `${i / 4} vCPU ${cpuTypes[category]}`,
        ram: `${i}GB DDR4 ECC`,
        storage: `${i * 100}GB NVMe SSD RAID 10`,
        ...(category !== 'cloud' && { gpu: `NVIDIA ${i <= 256 ? 'A4000' : 'A100'}` }),
        network: `${i / 8}Gbps`,
        bandwidth: 'Unlimited',
        ddos_protection: 'Enterprise DDoS Protection',
        backup: 'Real-time Backups',
        os: ['All Major Distributions']
      },
      features: [
        'Enterprise Monitoring',
        '99.99% Uptime',
        'Dedicated Account Manager',
        `${i / 32} Dedicated IP(s)`,
        'Global Load Balancing',
        'Multi-region Deployment',
        'Custom Solutions'
      ],
      price: (i / 4) * 29.99
    });
  }

  return tiers;
}

// Generate all server specifications
export const serverSpecs = [
  ...generateServerTiers('cloud'),
  ...generateServerTiers('gaming'),
  ...generateServerTiers('streaming')
];