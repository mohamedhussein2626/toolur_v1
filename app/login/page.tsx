"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Section - Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">toolur</h1>
            <h2 className="text-3xl font-bold text-orange-500 mb-2">Log in</h2>
            <p className="text-gray-600 mb-8">Sign in to your account</p>

            <form className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                    placeholder="Enter your email"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Log in
              </button>
            </form>
          </div>

          {/* Right Section - Registration Prompt */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-orange-500 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
            <p className="text-white text-lg mb-8">
              To keep connected with us please login with your personal info
            </p>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

