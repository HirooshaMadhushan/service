import React, { useState } from 'react';
import { FaFacebookF, FaTiktok, FaInstagram, FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-sky-500">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <FaHome className="text-xl text-blue-600" />
          </div>
          <span className="text-xl font-bold text-white">Auto Book</span>
        </div>

        {/* Center: Nav links - Desktop */}
        <div className="hidden space-x-8 md:flex">
          <a href="/" className="font-medium text-white transition duration-200 hover:text-blue-100">Home</a>
          <a href="/about" className="font-medium text-white transition duration-200 hover:text-blue-100">About Us</a>
          <a href="/booking" className="font-medium text-white transition duration-200 hover:text-blue-100">Booking</a>
          <a href="/contact" className="font-medium text-white transition duration-200 hover:text-blue-100">Contact Us</a>
        </div>

        {/* Right: Socials + Auth Buttons - Desktop */}
        <div className="items-center hidden space-x-4 md:flex">
          {/* Socials */}
          <div className="flex space-x-3">
            <a href="#" className="text-white transition duration-200 hover:text-blue-100">
              <FaFacebookF className="text-lg" />
            </a>
            <a href="#" className="text-white transition duration-200 hover:text-blue-100">
              <FaTiktok className="text-lg" />
            </a>
            <a href="#" className="text-white transition duration-200 hover:text-blue-100">
              <FaInstagram className="text-lg" />
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex ml-4 space-x-3">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-medium text-blue-600 transition duration-200 bg-white rounded-lg shadow-sm hover:bg-blue-50"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800"
            >
              Sign Up
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-white transition duration-200 hover:text-blue-100"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="pt-4 pb-3 mt-4 border-t border-blue-400 md:hidden">
          <div className="flex flex-col space-y-3">
            <a href="/" className="px-4 py-2 font-medium text-white rounded hover:bg-blue-600">Home</a>
            <a href="/about" className="px-4 py-2 font-medium text-white rounded hover:bg-blue-600">About</a>
            <a href="/services" className="px-4 py-2 font-medium text-white rounded hover:bg-blue-600">Services</a>
            <a href="/contact" className="px-4 py-2 font-medium text-white rounded hover:bg-blue-600">Contact</a>
          </div>
          
          <div className="flex flex-col px-4 mt-4 space-y-4">
            {/* Socials for mobile */}
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white hover:text-blue-100">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-100">
                <FaTiktok className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-blue-100">
                <FaInstagram className="text-xl" />
              </a>
            </div>
            
            {/* Auth buttons for mobile */}
            <div className="flex space-x-3">
              <a
                href="/login"
                className="flex-1 py-2 text-sm font-medium text-center text-blue-600 bg-white rounded-lg hover:bg-blue-50"
              >
                Login
              </a>
              <a
                href="/signup"
                className="flex-1 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;