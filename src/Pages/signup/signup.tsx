import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'customer', // Default role set to customer
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase and number';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate phone (basic validation)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid phone number is required (10-15 digits)';
    }
    
    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid, proceed with submission
      setIsSubmitting(true);
      setApiError(null);
      
      try {
        // Prepare the payload for the backend API
        const payload = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        };
        
        // Send data to the backend API
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to register user');
        }
        
        // Registration successful
        console.log('Registration successful:', data);
        setSubmitted(true);
      } catch (error) {
        console.error('Registration error:', error);
        setApiError(error.message || 'An error occurred during registration. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Form has errors
      setErrors(formErrors);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Registration Successful!</h2>
            <p className="mb-6 text-gray-600">Your account has been created successfully.</p>
            <div className="p-4 mb-6 rounded-lg bg-gray-50">
              <p className="font-medium text-gray-800">Account Details:</p>
              <p className="text-gray-600">Name: {formData.fullName}</p>
              <p className="text-gray-600">Email: {formData.email}</p>
              <p className="text-gray-600">Phone: {formData.phone}</p>
              <p className="text-gray-600">Role: {formData.role}</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 text-white transition-colors rounded-lg bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Form */}
      <div className="flex flex-col items-center justify-center w-full px-6 bg-white md:w-1/2 lg:px-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8 space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-sky-500">
              <div className="w-4 h-4 rotate-45 bg-white"></div>
            </div>
            <span className="text-xl font-semibold text-gray-800">AutoBook</span>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Create account</h2>
          <p className="mb-8 text-sm text-gray-600">Join thousands of users and teams today</p>

          {/* API Error Message */}
          {apiError && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
              <p>{apiError}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-sky-500 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-sky-500 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-sky-500 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                  placeholder="1234567890"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-sky-500 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with uppercase, lowercase and number</p>
              )}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-sky-500 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Role field (hidden) */}
            <input type="hidden" name="role" value={formData.role} />
            
            <div className="px-4 py-3 rounded-lg bg-gray-50">
              <p className="flex items-center text-sm font-medium text-gray-700">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                You will be registered as a customer
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 border rounded focus:ring-2 ${errors.agreeTerms ? 'border-red-500 text-red-600 focus:ring-red-500' : 'border-gray-300 text-sky-600 focus:ring-sky-500'}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-600">
                  I agree to the <a href="#" className="text-sky-600 hover:underline">Terms of Service</a> and <a href="#" className="text-sky-600 hover:underline">Privacy Policy</a>
                </label>
                {errors.agreeTerms && <p className="mt-1 text-xs text-red-600">{errors.agreeTerms}</p>}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                isSubmitting 
                ? 'bg-sky-400 cursor-not-allowed' 
                : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-sky-600 hover:text-sky-800">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-400 to-sky-600">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Registration illustration */}
          <div className="relative flex flex-col items-center justify-center p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl">
            <div className="flex items-center justify-center w-24 h-24 mb-4 bg-white rounded-full">
              <svg className="w-12 h-12 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Join Our Community</h3>
            <p className="text-center text-white text-opacity-80">Create an account to access all features and benefits</p>
          </div>

          {/* Decorative elements */}
          <div className="absolute w-32 h-32 bg-white rounded-full top-10 left-10 bg-opacity-10 blur-xl"></div>
          <div className="absolute w-40 h-40 bg-white rounded-full bottom-10 right-10 bg-opacity-10 blur-xl"></div>
          
          {/* Abstract shapes */}
          <div className="absolute w-16 h-16 border border-white top-1/4 right-1/4 border-opacity-30 rounded-xl rotate-12"></div>
          <div className="absolute w-12 h-12 border border-white rounded-full bottom-1/3 left-1/3 border-opacity-30"></div>
          <div className="absolute w-20 h-8 border border-white top-1/2 left-1/4 border-opacity-30 rounded-xl -rotate-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;