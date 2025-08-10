import React, { useState, ChangeEvent } from 'react';

interface UserData {
  email: string;
  name?: string;
  role?: string;
  [key: string]: any; // for any other user props
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  // Removed token state as it was unused

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include', // if backend uses cookies (optional)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to localStorage if rememberMe
      if (data.token) {
        if (formData.rememberMe) {
          localStorage.setItem('authToken', data.token);
          console.log('Token saved to localStorage');
        } else {
          // You can keep token in memory or context if you want
          console.log('Token received but not saved persistently');
        }
      }

      setUserData(data.user || data);
      setLoginSuccess(true);
    } catch (error: unknown) {
      // Narrow error type
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unknown error occurred during login. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 mx-4 bg-white shadow-2xl rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Login Successful!
            </h2>
            <p className="mb-6 text-gray-600">
              You have successfully logged in to your account.
            </p>
            {userData && (
              <div className="p-4 mb-6 rounded-lg bg-gray-50">
                <p className="font-medium text-gray-800">Account Details:</p>
                <p className="text-gray-600">Email: {userData.email}</p>
                {userData.name && (
                  <p className="text-gray-600">Name: {userData.name}</p>
                )}
                {userData.role && (
                  <p className="text-gray-600">Role: {userData.role}</p>
                )}
              </div>
            )}
            <button
              onClick={() => (window.location.href = '/dashboard')}
              className="w-full py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105"
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
      <div className="flex flex-col items-center justify-center w-full px-4 bg-white sm:px-6 lg:px-10 md:w-1/2">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-8 space-x-3">
            <div className="bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 p-2.5 rounded-xl shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
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
            Welcome back
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Please enter your credentials to access your account
          </p>

          {/* API Error Message */}
          {apiError && (
            <div className="p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-lg bg-red-50">
              <p>{apiError}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    ></path>
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="MySecurePassword123"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-pink-600 border border-gray-300 rounded focus:ring-pink-500"
                />
                <span className="text-gray-600">Remember for 30 days</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-pink-600 transition-colors duration-200 hover:text-pink-800"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 text-white font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-105 shadow-lg ${
                isSubmitting
                  ? 'bg-pink-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 hover:shadow-pink-500/25'
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="font-medium text-pink-600 transition-colors duration-200 hover:text-pink-800"
            >
              Create account
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative hidden overflow-hidden md:flex md:w-1/2">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Modern car interior with luxury dashboard"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 via-pink-600/70 to-pink-700/80"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative flex items-center justify-center w-full h-full p-8">
          <div className="relative flex flex-col items-center justify-center p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
            <div className="flex items-center justify-center w-24 h-24 mb-6 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-center text-white">
              Secure & Reliable
            </h3>
            <p className="leading-relaxed text-center text-white/90">
              Experience premium car booking with enterprise-grade security and
              24/7 support
            </p>
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
          <div
            className="absolute w-12 h-12 border-2 rounded-full border-white/40 bottom-1/3 left-1/3 animate-bounce"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute w-20 h-8 border-2 border-white/30 top-1/2 left-1/4 rounded-xl -rotate-12 animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
