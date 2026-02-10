"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Lock } from 'lucide-react';
import { api } from '@/lib/api';
import { adminAuth } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (adminAuth.isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.loginAdmin(email, password);
      
      if (response.success && response.admin && response.token) {
        // Store token and admin data
        adminAuth.setToken(response.token);
        adminAuth.setAdminData(response.admin);
        
        // Redirect to admin panel
        router.push('/admin');
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section - Admin Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">toolur</h1>
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Admin Login</h2>
            <p className="text-gray-600 mb-8">Sign in to admin panel</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter your admin email"
                  />
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-purple-600 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Admin Panel</h2>
            <p className="text-white text-lg mb-8">
              Access the admin dashboard to manage users, subscriptions, and analytics
            </p>
            <Link
              href="/"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

