import { useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  icon: React.ReactElement;
}

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState('maintenance');

  const categories = [
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'repair', label: 'Repair Services', icon: '⚙️' },
    { id: 'diagnostic', label: 'Diagnostics', icon: '🔍' },
    { id: 'premium', label: 'Premium Care', icon: '💎' }
  ];

  const services: Record<string, Service[]> = {
    maintenance: [
      {
        id: 'oil-change',
        title: 'Oil Change Service',
        description: 'Complete oil change with premium lubricants and multi-point inspection',
        price: 'From $39.99',
        duration: '30-45 mins',
        features: ['Premium oil & filter', 'Fluid level check', 'Battery test', 'Tire pressure check'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
          </svg>
        )
      },
      {
        id: 'brake-service',
        title: 'Brake Maintenance',
        description: 'Comprehensive brake system inspection and maintenance',
        price: 'From $89.99',
        duration: '60-90 mins',
        features: ['Brake pad inspection', 'Rotor assessment', 'Brake fluid check', 'Performance test'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
        )
      },
      {
        id: 'tire-service',
        title: 'Tire Rotation & Balancing',
        description: 'Professional tire service to extend tire life and improve handling',
        price: 'From $49.99',
        duration: '45-60 mins',
        features: ['Tire rotation', 'Wheel balancing', 'Pressure adjustment', 'Tread inspection'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 0V3"></path>
          </svg>
        )
      }
    ],
    repair: [
      {
        id: 'engine-repair',
        title: 'Engine Repair',
        description: 'Expert engine diagnostics and repair services',
        price: 'From $149.99',
        duration: '2-8 hours',
        features: ['Engine diagnostics', 'Component replacement', 'Performance testing', 'Warranty included'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        )
      },
      {
        id: 'transmission',
        title: 'Transmission Service',
        description: 'Complete transmission maintenance and repair',
        price: 'From $199.99',
        duration: '2-4 hours',
        features: ['Fluid replacement', 'Filter change', 'System diagnostics', 'Road test'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        )
      }
    ],
    diagnostic: [
      {
        id: 'computer-diagnostic',
        title: 'Computer Diagnostics',
        description: 'Advanced computerized vehicle diagnostics',
        price: '$69.99',
        duration: '30-60 mins',
        features: ['OBD-II scan', 'Error code analysis', 'System health check', 'Detailed report'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        )
      },
      {
        id: 'pre-purchase',
        title: 'Pre-Purchase Inspection',
        description: 'Comprehensive vehicle inspection before purchase',
        price: '$129.99',
        duration: '60-90 mins',
        features: ['Complete inspection', 'Detailed report', 'Problem identification', 'Value assessment'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      }
    ],
    premium: [
      {
        id: 'detailing',
        title: 'Premium Detailing',
        description: 'Professional interior and exterior detailing service',
        price: 'From $199.99',
        duration: '3-5 hours',
        features: ['Paint correction', 'Interior deep clean', 'Protection coating', 'Premium products'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
        )
      },
      {
        id: 'concierge',
        title: 'Concierge Service',
        description: 'Premium pickup and delivery service',
        price: 'From $99.99',
        duration: 'By appointment',
        features: ['Vehicle pickup', 'Service at our facility', 'Quality inspection', 'Return delivery'],
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        )
      }
    ]
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleBookService = () => {
    console.log('Booking service:', selectedService?.title);
    // Add booking logic here
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Services List */}
      <div className="flex flex-col w-full px-4 bg-white sm:px-6 lg:px-10 md:w-1/2">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center mt-8 mb-8 space-x-3">
            <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 p-2.5 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Auto
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
                Services
              </span>
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Our Services
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Professional automotive services with certified technicians
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* Services List */}
          <div className="space-y-3 overflow-y-auto max-h-96">
            {services[activeCategory]?.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedService?.id === service.id
                    ? 'border-pink-500 bg-pink-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedService?.id === service.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-medium text-pink-600">
                        {service.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Service Details */}
      <div className="relative hidden overflow-hidden md:flex md:w-1/2">
        {/* Background Image */}
         <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Professional automotive service center"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative flex items-center justify-center w-full h-full p-8">
          {selectedService ? (
            <div className="relative w-full max-w-md p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
              <div className="flex items-center justify-center w-16 h-16 mb-6 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                <div className="text-white">
                  {selectedService.icon}
                </div>
              </div>
              
              <h3 className="mb-4 text-2xl font-bold text-white">
                {selectedService.title}
              </h3>
              
              <p className="mb-6 text-white/90">
                {selectedService.description}
              </p>

              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between text-white/90">
                  <span className="text-sm">Price:</span>
                  <span className="font-semibold">{selectedService.price}</span>
                </div>
                <div className="flex items-center justify-between text-white/90">
                  <span className="text-sm">Duration:</span>
                  <span className="font-semibold">{selectedService.duration}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-lg font-semibold text-white">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-white/90">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleBookService}
                className="w-full py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25"
              >
                Book This Service
              </button>
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center max-w-sm p-8 text-center border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
              <div className="flex items-center justify-center w-16 h-16 mb-6 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Select a Service
              </h3>
              <p className="text-white/90">
                Choose a service from the list to view detailed information, pricing, and features.
              </p>
            </div>
          )}

          {/* Floating Elements */}
          <div className="absolute w-32 h-32 rounded-full bg-white/10 top-16 left-16 blur-xl animate-pulse"></div>
          <div
            className="absolute w-40 h-40 rounded-full bg-white/10 bottom-16 right-16 blur-xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>

          {/* Geometric Shapes */}
          <div
            className="absolute w-16 h-16 border-2 border-white/30 top-1/4 right-1/4 rounded-xl rotate-12 animate-spin"
            style={{ animationDuration: '20s' }}
          ></div>
          <div
            className="absolute w-12 h-12 border-2 rounded-full border-white/40 bottom-1/3 left-1/3 animate-bounce"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Services;