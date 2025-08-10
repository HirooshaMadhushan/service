import React, { useState, useEffect } from 'react';

// Define proper TypeScript interfaces based on your API response
interface BookingFormData {
  vehicleNumber: string;
  serviceDate: string;
  timeSlot: string;
  mealOption: string;
  mealItemName: string;
  mealQuantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests: string;
}

interface BookingResponse {
  booking: {
    status: string;
    id: number;
    vehicleNumber: string;
    serviceDate: string;
    timeSlot: string;
    mealOption: string;
    mealItemName: string;
    mealQuantity: number;
    updatedAt: string;
    createdAt: string;
  };
}

interface UserData {
  id: number;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

const Booking: React.FC = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  // State with proper typing
  const [formData, setFormData] = useState<BookingFormData>({
    vehicleNumber: '',
    serviceDate: '',
    timeSlot: '',
    mealOption: '',
    mealItemName: '',
    mealQuantity: 1,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showAuthHelp, setShowAuthHelp] = useState<boolean>(false);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
          setAuthToken(token);
          // Verify token with backend
          const response = await fetch('http://localhost:3000/api/auth/verify', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include'
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('authToken');
            setAuthToken(null);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        setAuthToken(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  // Available time slots
  const timeSlots: string[] = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00'
  ];

  // Meal options
  const mealOptions: string[] = [
    'breakfast',
    'lunch',
    'dinner',
    'snacks',
    'beverages'
  ];

  // Handle input changes with proper typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'mealQuantity' ? parseInt(value) || 1 : value
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.vehicleNumber || !formData.serviceDate || !formData.timeSlot || !formData.customerName) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare payload to match your backend expectations
      const payload = {
        userId: userData?.id, // Include userId from logged-in user
        vehicleNumber: formData.vehicleNumber,
        serviceDate: formData.serviceDate,
        timeSlot: formData.timeSlot,
        mealOption: formData.mealOption,
        mealItemName: formData.mealItemName,
        mealQuantity: formData.mealQuantity,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        specialRequests: formData.specialRequests
      };

      // API call to your backend
      const response = await fetch('http://localhost:3000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      // Handle different response types
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        data = { error: text };
      }

      if (!response.ok) {
        if (response.status === 401) {
          // Clear invalid auth and redirect to login
          localStorage.removeItem('authToken');
          setAuthToken(null);
          setIsAuthenticated(false);
          throw new Error('Session expired. Please log in again.');
        } else if (response.status === 403) {
          throw new Error('Access denied. You do not have permission to book services.');
        } else if (response.status === 422) {
          throw new Error('Invalid data. Please check your input and try again.');
        } else {
          throw new Error(data.message || data.error || `Server error: ${response.status}`);
        }
      }

      setBookingData(data);
      setSubmitSuccess(true);
      console.log('Booking successful:', data);

    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during booking';
      setApiError(errorMessage);
      
      // Show authentication help for 401 errors
      if (errorMessage.includes('Session expired') || errorMessage.includes('Authentication required')) {
        setShowAuthHelp(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login component
  const LoginComponent = () => {
    const [loginData, setLoginData] = useState({
      email: '',
      password: '',
      rememberMe: false,
    });
    const [loginSubmitting, setLoginSubmitting] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setLoginData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleLogin = async () => {
      setLoginError(null);
      setLoginSubmitting(true);

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        // Save token and user data
        if (data.token) {
          setAuthToken(data.token);
          if (loginData.rememberMe) {
            localStorage.setItem('authToken', data.token);
          }
        }

        setUserData(data.user || data);
        setIsAuthenticated(true);

        // Auto-fill customer information from user data
        if (data.user || data) {
          const user = data.user || data;
          setFormData(prev => ({
            ...prev,
            customerName: user.name || prev.customerName,
            customerEmail: user.email || prev.customerEmail,
            customerPhone: user.phone || prev.customerPhone,
          }));
        }
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          setLoginError(error.message);
        } else {
          setLoginError('Login failed. Please try again.');
        }
      } finally {
        setLoginSubmitting(false);
      }
    };

    return (
      <div className="flex min-h-screen bg-white">
        {/* Left Side - Form */}
        <div className="flex flex-col items-center justify-center w-full px-4 bg-white sm:px-6 lg:px-10 md:w-1/2">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center mb-8 space-x-3">
              <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 p-2.5 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Auto<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600">Book</span>
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">Welcome back</h2>
            <p className="mb-8 text-sm text-gray-600">Please log in to continue with your booking</p>

            {loginError && (
              <div className="p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
                <p>{loginError}</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 text-sm transition-colors duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 text-sm transition-colors duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                    className="w-4 h-4 text-pink-600 border border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                disabled={loginSubmitting}
                className={`w-full py-3 text-white font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 shadow-lg ${
                  loginSubmitting
                    ? 'bg-pink-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25'
                }`}
              >
                {loginSubmitting ? 'Signing in...' : 'Sign in to Book Service'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="relative hidden overflow-hidden md:flex md:w-1/2">
           <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Professional automotive service center"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80"></div>
        </div>
          <div className="relative flex items-center justify-center w-full h-full p-8">
            <div className="relative flex flex-col items-center justify-center p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
              <div className="flex items-center justify-center w-24 h-24 mb-6 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-center text-white">Premium Car Service</h3>
              <p className="leading-relaxed text-center text-white/90">
                Book your car service with our secure platform. Professional service with meal options included.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading screen
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 mb-4 border-b-2 border-pink-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginComponent />;
  }

  // Success screen
  if (submitSuccess && bookingData) {
    return (
      <div className="min-h-screen px-4 py-12 bg-gray-50">
        <div className="max-w-md p-8 mx-auto bg-white shadow-2xl rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
            <p className="mb-2 text-gray-600">Your car service has been successfully booked.</p>
            <p className="mb-6 text-sm text-gray-500">Booking ID: #{bookingData.booking.id}</p>
            
            <div className="p-4 mb-6 text-left rounded-lg bg-gray-50">
              <p className="mb-2 font-medium text-gray-800">Booking Details:</p>
              <p className="text-sm text-gray-600">Booking ID: #{bookingData.booking.id}</p>
              <p className="text-sm text-gray-600">Vehicle: {bookingData.booking.vehicleNumber}</p>
              <p className="text-sm text-gray-600">Date: {bookingData.booking.serviceDate}</p>
              <p className="text-sm text-gray-600">Time: {bookingData.booking.timeSlot}</p>
              <p className="text-sm text-gray-600">Status: {bookingData.booking.status}</p>
              <p className="text-sm text-gray-600">Customer: {formData.customerName}</p>
              {bookingData.booking.mealOption && (
                <>
                  <p className="text-sm text-gray-600">Meal: {bookingData.booking.mealOption}</p>
                  {bookingData.booking.mealItemName && (
                    <p className="text-sm text-gray-600">Item: {bookingData.booking.mealItemName} (x{bookingData.booking.mealQuantity})</p>
                  )}
                </>
              )}
            </div>
            
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setBookingData(null);
                setFormData({
                  vehicleNumber: '',
                  serviceDate: '',
                  timeSlot: '',
                  mealOption: '',
                  mealItemName: '',
                  mealQuantity: 1,
                  customerName: '',
                  customerEmail: '',
                  customerPhone: '',
                  specialRequests: ''
                });
              }}
              className="w-full py-3 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:scale-105"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 shadow-lg bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Book Your Service</h1>
          <p className="text-gray-600">Schedule your car service with our premium team</p>
          {userData && (
            <div className="inline-block p-3 mt-4 border border-green-200 rounded-lg bg-green-50">
              <p className="text-sm text-green-700">
                Welcome back, {userData.name || userData.email}! (ID: {userData.id})
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    setAuthToken(null);
                    setIsAuthenticated(false);
                    setUserData(null);
                  }}
                  className="ml-2 text-pink-600 underline hover:text-pink-800"
                >
                  Logout
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {apiError && (
          <div className="p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="flex-1">
                <p className="text-sm text-red-700">{apiError}</p>
                {showAuthHelp && (
                  <div className="p-3 mt-3 border border-blue-200 rounded-lg bg-blue-50">
                    <p className="mb-2 text-sm font-medium text-blue-700">To fix this authentication issue:</p>
                    <ul className="space-y-1 text-xs text-blue-600">
                      <li>• Make sure your backend doesn't require authentication for booking</li>
                      <li>• Or implement a login system first</li>
                      <li>• Check if you need to pass an API key or token</li>
                      <li>• Verify CORS settings on your backend</li>
                    </ul>
                    <button
                      onClick={() => setShowAuthHelp(false)}
                      className="mt-2 text-xs text-blue-500 underline hover:text-blue-700"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="p-6 bg-white shadow-lg rounded-xl md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            
            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="pb-2 text-lg font-semibold text-gray-900 border-b border-gray-200">Customer Information</h3>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <h3 className="pb-2 text-lg font-semibold text-gray-900 border-b border-gray-200">Service Details</h3>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Vehicle Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., ABC-1234"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Service Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Time Slot <span className="text-red-500">*</span>
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                >
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Meal Options */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">Meal Options (Optional)</h3>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Meal Type</label>
                <select
                  name="mealOption"
                  value={formData.mealOption}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="">Select meal option</option>
                  {mealOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Meal Item</label>
                <input
                  type="text"
                  name="mealItemName"
                  value={formData.mealItemName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="e.g., Pancakes, Sandwich, Coffee"
                  disabled={!formData.mealOption}
                />
              </div>
            </div>

            {formData.mealOption && (
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      mealQuantity: Math.max(1, prev.mealQuantity - 1) 
                    }))}
                    className="flex items-center justify-center w-10 h-10 text-pink-600 transition-colors duration-200 bg-pink-100 rounded-full hover:bg-pink-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="mealQuantity"
                    value={formData.mealQuantity}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-20 px-4 py-2 text-center transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      mealQuantity: Math.min(10, prev.mealQuantity + 1) 
                    }))}
                    className="flex items-center justify-center w-10 h-10 text-pink-600 transition-colors duration-200 bg-pink-100 rounded-full hover:bg-pink-200"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <label className="block mb-2 text-sm font-medium text-gray-700">Special Requests</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Any special instructions or requests..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-6 mt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                isSubmitting
                ? 'bg-pink-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Booking...
                </div>
              ) : (
                'Book Service'
              )}
            </button>
          </div>

          {/* Form Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;