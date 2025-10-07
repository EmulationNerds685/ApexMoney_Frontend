import React, { useState } from 'react';
import axios from 'axios'; // Axios ko import karein

// SVG Icon for the logo, matching the purple theme
const LogoIcon = () => (
  <svg className="w-12 h-12 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

export const Signup=()=> {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    // Clear fields and messages on toggle
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Email aur password dono zaroori hain.');
      setIsLoading(false);
      return;
    }

    const endpoint = isLoginView ? '/create/login' : '/create/signup';
    const API_URL = `${import.meta.env.VITE_BACKENDURL}${endpoint}`;

    try {
      // Axios se POST request bhejein. JSON.stringify ki zaroorat nahi.
      const response = await axios.post(API_URL, {
        email,
        password,
      });

      // Success case
      setSuccess(response.data.message || (isLoginView ? 'Login successful!' : 'Signup successful!'));
      setEmail('');
      setPassword('');

    } catch (err) {
      // Axios error handling alag hota hai. Server ka error message yahan milega.
      setError(err.response?.data?.message || err.message || 'Kuch galat ho gaya');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-purple-200 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <LogoIcon />
            </div>
          <h1 className="text-3xl font-bold text-gray-800">
            {isLoginView ? 'Welcome Back!' : 'Create an Account'}
          </h1>
          <p className="text-gray-500">
            {isLoginView ? 'Login to continue to ApexMoney' : 'Get started with your financial journey'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>}
          {success && <p className="text-sm text-green-600 bg-green-100 p-3 rounded-lg text-center">{success}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Sign Up')}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLoginView ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={handleToggleView}
              className="ml-1 font-semibold text-purple-600 hover:underline focus:outline-none"
            >
              {isLoginView ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

