

const About = () => {
  const stats = [
    { number: '15+', label: 'Years of Experience', icon: '📅' },
    { number: '10K+', label: 'Satisfied Customers', icon: '😊' },
    { number: '5K+', label: 'Services Completed', icon: '🔧' },
    { number: '40%', label: 'Cost Savings', icon: '💰' }
  ];

  const values = [
    {
      title: 'Quality Service',
      description: 'We use only premium parts and follow manufacturer specifications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Certified Technicians',
      description: 'Our team is ASE-certified with years of automotive expertise',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      )
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees or surprises - honest pricing you can trust',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - About Content */}
      <div className="flex flex-col w-full px-4 bg-white sm:px-6 lg:px-10 md:w-1/2">
        <div className="w-full max-w-md py-8 mx-auto">
          {/* Logo */}
          <div className="flex items-center mb-8 space-x-3">
            <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 p-2.5 rounded-xl shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Auto
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">
                Book
              </span>
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            About AutoBook
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Your trusted partner in automotive service excellence since 2010
          </p>

          {/* Mission Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
            OUR MISSION
          </div>

          {/* Story Content */}
          <div className="space-y-4 overflow-y-auto text-sm leading-relaxed text-gray-600 max-h-80">
            <p>
              <strong className="text-gray-900">AutoBook</strong> provides the premier automotive service experience, 
              being the first service station in Sri Lanka to offer comprehensive online booking and transparent 
              service management. We make it possible for vehicle owners to access professional automotive care 
              with complete transparency and convenience.
            </p>
            
            <p>
              We enable you to bypass the uncertainty of traditional service centers by providing clear pricing, 
              certified technicians, and quality parts. Our services range from routine maintenance to complex 
              repairs, all offered at competitive prices tailored to your budget.
            </p>
            
            <p>
              <strong className="text-gray-900">AutoBook</strong> is an automotive service platform connecting 
              vehicle owners with professional technicians and quality service worldwide. Car owners can access 
              reliable, certified automotive care while we offer transparent pricing and comprehensive service 
              options with significant savings compared to traditional service centers.
            </p>
            
            <p>
              We understand that trust and reliability are crucial when servicing your vehicle! As a customer, 
              you can view feedback from previous clients and track service history. AutoBook offers the widest 
              range of services – from basic maintenance to performance upgrades and luxury vehicle care – 
              we'll find the perfect service solution for your needs!
            </p>
            
            <p>
              We offer flexible scheduling for all types of automotive services from quick 30-minute oil changes 
              to comprehensive multi-day restoration projects. <strong className="text-pink-600">Save up to 40% 
              compared to traditional dealership service centers!</strong> Experience the difference with AutoBook!
            </p>
          </div>

          {/* Core Values */}
          <div className="mt-6 space-y-3">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Our Values</h3>
            {values.map((value, index) => (
              <div key={index} className="flex items-start p-3 space-x-3 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center w-8 h-8 text-pink-600 bg-pink-100 rounded-lg">
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{value.title}</h4>
                  <p className="text-xs text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Statistics & Visual */}
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
          <div className="relative w-full max-w-md p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
            <div className="flex items-center justify-center w-16 h-16 mb-6 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            
            <h3 className="mb-6 text-2xl font-bold text-center text-white">
              Why Choose AutoBook?
            </h3>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 text-center border bg-white/10 backdrop-blur-sm rounded-xl border-white/20">
                  <div className="mb-1 text-2xl">{stat.icon}</div>
                  <div className="mb-1 text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="mb-4 text-sm text-white/90">
                Experience the AutoBook difference today
              </p>
              <button className="w-full py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25">
                Book Your Service
              </button>
            </div>
          </div>

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
          {/* <div
            className="absolute w-12 h-12 border-2 rounded-full border-white/40 bottom-1/3 left-1/3 animate-bounce"
            style={{ animationDelay: '0.5s' }}
          ></div> */}
          <div
            className="absolute w-20 h-8 border-2 border-white/30 top-1/2 left-1/4 rounded-xl -rotate-12 animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default About;