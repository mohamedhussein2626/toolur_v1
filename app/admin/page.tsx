"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  BarChart3,
  Eye,
  Trash2,
  Ban,
  TrendingUp,
  Activity,
  UserCheck,
  Calendar
} from 'lucide-react';

type MenuItem = 'dashboard' | 'users' | 'subscriptions' | 'plans' | 'analytics';

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');

  // Mock data
  const stats = {
    totalUsers: 1250,
    totalFreeUsers: 980,
    thisMonthUsers: 125,
    activeSubscriptions: 270
  };

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', plan: 'Free', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', plan: 'Premium', joinDate: '2024-01-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Banned', plan: 'Free', joinDate: '2023-12-20' },
  ];

  const taskStats = [
    { name: 'Image Compressor', thisWeek: 5, lastWeek: 13, allTime: 1715 },
    { name: 'PNG to JPG Converter', thisWeek: 3, lastWeek: 5, allTime: 336 },
    { name: 'Bilibili Video Downloader', thisWeek: 2, lastWeek: 6, allTime: 20 },
    { name: 'Mozrank Checker', thisWeek: 2, lastWeek: 6, allTime: 2959 },
    { name: 'Credit Card Generator', thisWeek: 2, lastWeek: 7, allTime: 161 },
    { name: 'Fake Name Generator', thisWeek: 2, lastWeek: 6, allTime: 174 },
    { name: 'Rewrite Article', thisWeek: 2, lastWeek: 3, allTime: 298 },
    { name: 'Byte/Bit Converter', thisWeek: 2, lastWeek: 3, allTime: 153 },
    { name: 'Jones Decizer', thisWeek: 2, lastWeek: 7, allTime: 703 },
  ];

  const analytics = {
    mostActiveUsers: [
      { name: 'John Doe', tasks: 245 },
      { name: 'Jane Smith', tasks: 189 },
      { name: 'Alice Williams', tasks: 156 },
    ],
    tasksThisWeek: {
      monday: 45,
      tuesday: 62,
      wednesday: 78,
      thursday: 91,
      friday: 105,
      saturday: 87,
      sunday: 72
    }
  };

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
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'dashboard' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'users' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>

            <button
              onClick={() => setActiveMenu('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'subscriptions' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Subscriptions</span>
            </button>

            <button
              onClick={() => setActiveMenu('plans')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'plans' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Plans</span>
            </button>

            <button
              onClick={() => setActiveMenu('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'analytics' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Dashboard Menu */}
          {activeMenu === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Free Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalFreeUsers.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.thisMonthUsers.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Active Subscriptions</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions.toLocaleString()}</p>
                </div>
              </div>

              {/* Task Done This Week Table */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Task Done This Week</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">This Week</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Week</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">All Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskStats.map((task, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm text-gray-900">{task.name}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{task.thisWeek}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{task.lastWeek}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{task.allTime.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Menu */}
          {activeMenu === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.plan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                                <Ban className="w-4 h-4" />
                                Ban
                              </button>
                              <button className="text-red-600 hover:text-red-900 flex items-center gap-1">
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Menu */}
          {activeMenu === 'subscriptions' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription Stats</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Subscriptions</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeSubscriptions.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Premium Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{(stats.totalUsers - stats.totalFreeUsers).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-gray-900">${(stats.activeSubscriptions * 4.99).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Plans Menu */}
          {activeMenu === 'plans' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Plans Management</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Free Plan</h3>
                  <div className="space-y-3">
                    <p className="text-gray-600">10 Credits per month</p>
                    <p className="text-gray-600">Limited features</p>
                    <p className="text-gray-600">Basic support</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
                  <div className="space-y-3">
                    <p className="text-3xl font-bold">$4.99<span className="text-lg">/month</span></p>
                    <p>Unlimited credits</p>
                    <p>All features</p>
                    <p>Priority support</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Menu */}
          {activeMenu === 'analytics' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
              
              {/* Most Active Users */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Most Active Users</h2>
                <div className="space-y-4">
                  {analytics.mostActiveUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.tasks} tasks completed</p>
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks Done This Week Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Task Done This Week</h2>
                <div className="space-y-4">
                  {Object.entries(analytics.tasksThisWeek).map(([day, tasks]) => (
                    <div key={day} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-600 capitalize">{day}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                        <div 
                          className="bg-purple-600 h-8 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${(tasks / 105) * 100}%` }}
                        >
                          <span className="text-white text-xs font-medium">{tasks}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
