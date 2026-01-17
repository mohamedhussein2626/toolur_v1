"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  RefreshCw, 
  CheckCircle, 
  DollarSign, 
  ArrowRight,
  FileText,
  LayoutDashboard,
  FileEdit,
  Image as ImageIcon,
  Star,
  Crown,
  Settings,
  HelpCircle,
  Sparkles,
  Clock,
  Zap,
  Infinity,
  Coffee
} from 'lucide-react';

export default function DashboardPage() {
  const [totalConversions] = useState(0);
  const [membership] = useState('Free');
  const [availableCredits] = useState('10/10');
  const [storageUsed] = useState('0 B');
  const [storageTotal] = useState('None');
  const [trialsUsed] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-purple-600 text-white h-[calc(100vh-80px)] sticky top-20 overflow-y-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">toolur</span>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-700 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
              <FileEdit className="w-5 h-5" />
              <span>AI Writing</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
              <ImageIcon className="w-5 h-5" />
              <span>AI Image</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
              <Star className="w-5 h-5" />
              <span>Favorites</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
              <Crown className="w-5 h-5" />
              <span>Ultra Tools</span>
            </button>

            <div className="pt-6 mt-6 border-t border-purple-500">
              <p className="px-4 py-2 text-xs font-semibold text-purple-200 uppercase tracking-wider mb-2">
                USER SETTINGS
              </p>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
                <FileText className="w-5 h-5" />
                <span>What's New</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700/50 transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>Support</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, User</h1>
            <p className="text-gray-600">Explore your available tools and features</p>
          </div>

          {/* Plan Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Free Plan Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-900">Free Plan (Limited)</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">10-Second Cooldowns Active</p>
                    <p className="text-sm text-gray-600">Wait between each AI generation</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-4">{trialsUsed}/5 trials used</p>
              </div>
            </div>

            {/* Ultra Exclusive Plan Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Limited Time</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-xl font-bold">Ultra Exclusive</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-lg line-through text-purple-200">$7.99</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">New Year Sale</span>
                </div>
                <p className="text-4xl font-bold mb-2">$4.99<span className="text-xl">/month</span></p>
                <div className="flex items-center gap-1 text-purple-200 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Ends January 31st</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span>Zero Cooldowns Forever</span>
                </div>
                <div className="flex items-center gap-3">
                  <Infinity className="w-5 h-5" />
                  <span>Unlimited AI Generations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  <span>100% Ad-Free Experience</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-purple-200 mb-2">Join 50,000+ creators who upgraded</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              
              <button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                Upgrade to Ultra
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-purple-200 text-sm">
                <Coffee className="w-4 h-4" />
                <span>Less than a coffee per month</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Conversions Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Conversions</h3>
              <p className="text-3xl font-bold text-gray-900">{totalConversions}</p>
            </div>

            {/* Membership Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Membership</h3>
              <p className="text-3xl font-bold text-gray-900">{membership}</p>
            </div>

            {/* Available Credits Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Available Credits</h3>
              <p className="text-3xl font-bold text-gray-900">{availableCredits}</p>
            </div>
          </div>

          {/* Storage Usage Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Storage Usage</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {storageUsed} used of {storageTotal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-500 h-3 rounded-full" 
                style={{ width: '0%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              Free users don't have dedicated storage, but files are kept until you delete them.
            </p>
          </div>

          {/* Recent Conversions Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Conversions</h2>
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">You haven't converted any files yet.</p>
              <Link 
                href="/" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                Start your first conversion
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link 
                href="/conversions" 
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                View all conversions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
