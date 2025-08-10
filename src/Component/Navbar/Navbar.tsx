import  { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-pink-500/20 shadow-2xl' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="p-3 transition-transform duration-300 transform shadow-lg bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 rounded-xl group-hover:scale-105">
                <svg 
                  className="text-white w-7 h-7" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                Auto<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Book</span>
              </span>
              <span className="text-xs font-medium tracking-wider text-gray-600 uppercase">Premium Service</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-1 lg:flex">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Services', href: '/services' },
              { name: 'Booking', href: '/booking' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 font-medium text-gray-700 transition-all duration-300 hover:text-gray-900 group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 transition-all duration-300 transform scale-95 rounded-lg opacity-0 bg-gradient-to-r from-pink-500/10 to-pink-600/10 group-hover:opacity-100 group-hover:scale-100"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="items-center hidden space-x-4 lg:flex">
            <a
              href="/login"
              className="relative px-6 py-2.5 text-gray-800 font-medium border border-gray-300 rounded-lg hover:border-pink-500/50 hover:bg-pink-50 transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">Login</span>
            </a>
            <a
              href="/signup"
              className="relative px-6 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-pink-400 to-pink-500 group-hover:opacity-100"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="relative p-2 text-gray-700 transition-colors duration-300 rounded-lg hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              aria-label="Toggle navigation menu"
            >
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 border-t border-pink-500/20' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 space-y-2 bg-white/95 backdrop-blur-sm">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Services', href: '/services' },
              { name: 'Booking', href: '/booking' },
              { name: 'Contact', href: '/contact' }
            ].map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="block px-4 py-3 font-medium text-gray-700 transition-all duration-300 transform rounded-lg hover:text-gray-900 hover:bg-pink-50 hover:translate-x-1"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-3">
              <a
                href="/login"
                onClick={closeMenu}
                className="block w-full py-3 font-medium text-center text-gray-800 transition-all duration-300 border border-gray-300 rounded-lg hover:border-pink-500/50 hover:bg-pink-50"
              >
                Login
              </a>
              <a
                href="/signup"
                onClick={closeMenu}
                className="block w-full py-3 text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-pink-500/25 transform hover:scale-[1.02] transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;