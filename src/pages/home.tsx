import { Link } from 'react-router-dom';
import { Cloud, Server, Shield, Zap, MapPin, Brain, Cpu, Network, Code, Database, Bot, Workflow, Globe, Layers, GitBranch, Activity, LineChart, Laptop, Blocks, Wifi, Sparkles, Lightbulb, Rocket, Microscope, Atom } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return; // Disable effect on mobile
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = hero.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      const color1 = `hsl(${x * 360}, 70%, 50%)`;
      const color2 = `hsl(${y * 360}, 70%, 50%)`;
      
      hero.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          ${color1},
          ${color2}
        )
      `;
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-24 transition-all duration-300"
        style={{ background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight animate-fade-in">
              Transform Your Business with Erycan Tech Solutions
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 opacity-90 leading-relaxed">
              Experience enterprise-grade cloud infrastructure powered by cutting-edge AI technology
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <Button 
                size="lg" 
                className="text-lg px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/services">Explore Solutions</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-6 md:px-8 py-3 md:py-4 border-2 hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://t.me/ArivyanSoftware" target="_blank" rel="noopener noreferrer">
                  Schedule a Demo
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements - Hidden on Mobile */}
        <div className="hidden md:block">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
            <Cloud className="h-24 w-24 animate-float" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 opacity-20">
            <Brain className="h-24 w-24 animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="absolute top-1/2 right-1/3 transform -translate-y-1/2 opacity-20">
            <Database className="h-20 w-20 animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </section>

      {/* AI/ML Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Cutting-Edge AI/ML Development Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Deep Learning */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Brain className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Deep Learning</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  TensorFlow & PyTorch
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Keras & FastAI
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  CUDA Optimization
                </li>
              </ul>
            </div>

            {/* Machine Learning */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Bot className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Machine Learning</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Scikit-learn & XGBoost
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  LightGBM & CatBoost
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  MLflow & Weights & Biases
                </li>
              </ul>
            </div>

            {/* Data Processing */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Database className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Data Processing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Pandas & NumPy
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Apache Spark
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Dask & Ray
                </li>
              </ul>
            </div>

            {/* MLOps & DevOps */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Workflow className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">MLOps & DevOps</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Docker & Kubernetes
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  CI/CD Pipelines
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Model Monitoring
                </li>
              </ul>
            </div>

            {/* Cloud Infrastructure */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Cloud className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Cloud Infrastructure</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  GPU-Optimized VMs
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Auto-scaling Clusters
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Distributed Training
                </li>
              </ul>
            </div>

            {/* Development Tools */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <Code className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Development Tools</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Jupyter & VSCode
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Git & DVC
                </li>
                <li className="flex items-center">
                  <Code className="h-5 w-5 text-blue-500 mr-2" />
                  Streamlit & Gradio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI/ML Infrastructure?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Ready Infrastructure"
              description="Pre-configured environments with popular ML frameworks and CUDA support"
            />
            <FeatureCard
              icon={<Cpu className="h-8 w-8" />}
              title="High-Performance Computing"
              description="Access to powerful GPUs and optimized hardware for ML workloads"
            />
            <FeatureCard
              icon={<Network className="h-8 w-8" />}
              title="Scalable Architecture"
              description="Easily scale your resources as your AI models grow"
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8" />}
              title="Cloud-Native Platform"
              description="Built for modern cloud-native AI/ML applications"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Enterprise Security"
              description="Advanced security measures to protect your AI models and data"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Instant Deployment"
              description="Quick setup of your AI development environment"
            />
          </div>
        </div>
      </section>

      {/* New Interactive Tech Stack Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">
            Our Technology Universe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Interactive Architecture Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white text-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                <Globe className="h-12 w-12 text-blue-600 mb-6 animate-spin-slow" />
                <h3 className="text-xl font-bold mb-4">Global Infrastructure</h3>
                <ul className="space-y-3">
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Server className="h-5 w-5 text-blue-500 mr-2" />
                    Edge Computing Network
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    DDoS Protection
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    Ultra-Low Latency
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Integration Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-purple-500 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-white text-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                <Layers className="h-12 w-12 text-purple-600 mb-6 animate-bounce-slow" />
                <h3 className="text-xl font-bold mb-4">Integration Layer</h3>
                <ul className="space-y-3">
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Code className="h-5 w-5 text-purple-500 mr-2" />
                    RESTful APIs
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Database className="h-5 w-5 text-purple-500 mr-2" />
                    Real-time Streaming
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <GitBranch className="h-5 w-5 text-purple-500 mr-2" />
                    Version Control
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Analytics Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-green-500 rounded-2xl transform rotate-2 group-hover:rotate-4 transition-transform duration-300"></div>
              <div className="relative bg-white text-gray-800 p-8 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2">
                <Brain className="h-12 w-12 text-green-600 mb-6 animate-pulse" />
                <h3 className="text-xl font-bold mb-4">Analytics Engine</h3>
                <ul className="space-y-3">
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Bot className="h-5 w-5 text-green-500 mr-2" />
                    AI-Powered Insights
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <Activity className="h-5 w-5 text-green-500 mr-2" />
                    Real-time Monitoring
                  </li>
                  <li className="flex items-center transform hover:translate-x-2 transition-transform">
                    <LineChart className="h-5 w-5 text-green-500 mr-2" />
                    Predictive Analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* New Innovation Hub Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12">Innovation Hub</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TechCard
                icon={<Laptop className="h-8 w-8" />}
                title="Edge Computing"
                description="Process data closer to the source"
              />
              <TechCard
                icon={<Blocks className="h-8 w-8" />}
                title="Quantum Ready"
                description="Future-proof architecture"
              />
              <TechCard
                icon={<Wifi className="h-8 w-8" />}
                title="5G Integration"
                description="Ultra-fast connectivity"
              />
              <TechCard
                icon={<Sparkles className="h-8 w-8" />}
                title="Smart Automation"
                description="Self-optimizing systems"
              />
            </div>
          </div>

          {/* Research & Development Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12">R&D Initiatives</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ResearchCard
                icon={<Microscope className="h-10 w-10" />}
                title="Quantum Computing"
                progress={75}
              />
              <ResearchCard
                icon={<Atom className="h-10 w-10" />}
                title="Neural Networks"
                progress={90}
              />
              <ResearchCard
                icon={<Rocket className="h-10 w-10" />}
                title="Space Tech"
                progress={60}
              />
            </div>
          </div>

          {/* Animated Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2 animate-count">99.99%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2 animate-count">50+</div>
              <div className="text-blue-200">Global Data Centers</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2 animate-count">10ms</div>
              <div className="text-blue-200">Average Latency</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2 animate-count">24/7</div>
              <div className="text-blue-200">Expert Support</div>
            </div>
          </div>

          {/* Future Tech Timeline */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12">Technology Roadmap</h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-400"></div>
              <div className="space-y-12">
                <TimelineItem
                  year="2024"
                  title="Quantum Integration"
                  description="Quantum-ready infrastructure deployment"
                  icon={<Atom className="h-6 w-6" />}
                />
                <TimelineItem
                  year="2025"
                  title="Neural Cloud"
                  description="Self-evolving cloud architecture"
                  icon={<Brain className="h-6 w-6" />}
                />
                <TimelineItem
                  year="2026"
                  title="Space Cloud"
                  description="Orbital data centers deployment"
                  icon={<Rocket className="h-6 w-6" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Visit Our Office</h2>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mr-2" />
              <p className="text-base md:text-lg text-gray-800 font-medium">
                IT 14-15, EPIP, Sitapura Industrial Area,<br />
                Jaipur, Rajasthan, 302022
              </p>
            </div>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href="https://t.me/dolphinclouds" target="_blank" rel="noopener noreferrer">
                  Contact Us on Telegram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TechCard({ icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
      <div className="text-blue-300 mb-4 animate-bounce-slow">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-blue-100 text-sm">{description}</p>
    </div>
  );
}

function ResearchCard({ icon, title, progress }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
      <div className="text-blue-300 mb-4 animate-pulse">{icon}</div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="w-full bg-white/20 rounded-full h-2">
        <div 
          className="bg-blue-400 h-2 rounded-full animate-pulse-glow"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right mt-2 text-blue-200">{progress}%</p>
    </div>
  );
}

function TimelineItem({ year, title, description, icon }) {
  return (
    <div className="relative pl-8 md:pl-0">
      <div className="flex items-center md:justify-center mb-4">
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="md:w-1/2 md:ml-auto md:pl-12 animate-slide-in">
        <span className="text-blue-300 font-bold">{year}</span>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-blue-100">{description}</p>
      </div>
    </div>
  );
}