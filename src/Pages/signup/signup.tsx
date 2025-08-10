import { useState, ChangeEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  agreeTerms?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
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
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    
    // Terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
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
          role: "customer" // Always set as customer
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
      } catch (error: unknown) {
        console.error('Registration error:', error);
        if (error instanceof Error) {
          setApiError(error.message);
        } else {
          setApiError('An error occurred during registration. Please try again.');
        }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 mx-4 bg-white shadow-2xl rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
            <button
              onClick={() => (window.location.href = '/login')}
              className="w-full py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105"
            >
              Go to Login
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
            Create account
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Join thousands of users and start booking today
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
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.fullName 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="John Doe"
                  required
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>
            
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
                  className={`w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="+94712345678"
                  required
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
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
                  className={`w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="MySecurePassword123"
                  required
                />
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with uppercase, lowercase and number</p>
              )}
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Confirm Password
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full py-3 pl-10 pr-4 text-sm transition-colors duration-200 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
                  }`}
                  placeholder="MySecurePassword123"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 border rounded focus:ring-2 ${
                    errors.agreeTerms 
                      ? 'border-red-500 text-red-600 focus:ring-red-500' 
                      : 'border-gray-300 text-pink-600 focus:ring-pink-500'
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-pink-600 transition-colors duration-200 hover:text-pink-800">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-pink-600 transition-colors duration-200 hover:text-pink-800">
                    Privacy Policy
                  </a>
                </label>
                {errors.agreeTerms && <p className="mt-1 text-xs text-red-600">{errors.agreeTerms}</p>}
              </div>
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
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-pink-600 transition-colors duration-200 hover:text-pink-800"
            >
              Sign in
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-center text-white">
              Join Our Community
            </h3>
            <p className="leading-relaxed text-center text-white/90">
              Create your account and start booking premium cars with ease and confidence
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

export default Signup;