import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setApiError(null);
    setIsSubmitting(true);
    
    try {
      // Prepare the payload for the backend API
      const payload = {
        email: formData.email,
        password: formData.password
      };
      
      // Send data to the backend API
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include' // Include cookies in the request if your backend uses sessions
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Login successful
      console.log('Login successful:', data);
      
      // Store the token if available
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Store user data
      setUserData(data.user || data);
      setLoginSuccess(true);
      
      // If remember me is checked, you could store something in localStorage
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Redirect to dashboard or home page after successful login
      // window.location.href = '/dashboard'; // Uncomment if you want to redirect
      
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.message || 'An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If login is successful, show a success message
  if (loginSuccess) {
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
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Login Successful!</h2>
            <p className="mb-6 text-gray-600">You have successfully logged in to your account.</p>
            {userData && (
              <div className="p-4 mb-6 rounded-lg bg-gray-50">
                <p className="font-medium text-gray-800">Account Details:</p>
                <p className="text-gray-600">Email: {userData.email}</p>
                {userData.name && <p className="text-gray-600">Name: {userData.name}</p>}
                {userData.role && <p className="text-gray-600">Role: {userData.role}</p>}
              </div>
            )}
            <button
              onClick={() => window.location.href = '/dashboard'} // Replace with your dashboard route
              className="w-full py-3 text-white transition-colors rounded-lg bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Go to Dashboard
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
          <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mb-8 text-sm text-gray-600">Please enter your credentials to access your account</p>

          {/* API Error Message */}
          {apiError && (
            <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
              <p>{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="w-full py-3 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
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
                  className="w-full py-3 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input 
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 border border-gray-300 rounded text-sky-600 focus:ring-sky-500" 
                />
                <span className="text-gray-600">Remember for 30 days</span>
              </label>
              <a href="/forgot-password" className="text-sm font-medium text-sky-600 hover:text-sky-800">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                isSubmitting 
                ? 'bg-sky-400 cursor-not-allowed' 
                : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-sky-600 hover:text-sky-800">
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-400 to-sky-600">
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Security icon/image */}
          <div className="relative flex flex-col items-center justify-center p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl">
            <div className="flex items-center justify-center w-24 h-24 mb-4 bg-white rounded-full">
              <svg className="w-12 h-12 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Secure Login</h3>
            <p className="text-center text-white text-opacity-80">Your data is protected with enterprise-grade security</p>
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

export default Login;