"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AdminAuthGuard from '@/components/AdminAuthGuard';
import { adminAuth } from '@/lib/auth';
import { getAllUsersUsageStats, getAllUsers } from '@/lib/api';
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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFreeUsers: 0,
    thisMonthUsers: 0,
    activeSubscriptions: 0,
    totalUsage: 0,
    activeUsers: 0
  });
  const [toolStats, setToolStats] = useState<{ toolName: string; count: number }[]>([]);

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', plan: 'Free', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', plan: 'Premium', joinDate: '2024-01-10' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Banned', plan: 'Free', joinDate: '2023-12-20' },
  ];

  useEffect(() => {
    const fetchUsageStats = async () => {
      try {
        setLoading(true);
        const response = await getAllUsersUsageStats();
        if (response.success && response.stats) {
          setStats({
            totalUsers: response.stats.totalUsers || 0,
            totalFreeUsers: (response.stats.totalUsers || 0) - (response.stats.activeUsers || 0),
            thisMonthUsers: 0, // Can be calculated from createdAt if needed
            activeSubscriptions: 0, // Can be added later
            totalUsage: response.stats.totalUsage || 0,
            activeUsers: response.stats.activeUsers || 0
          });
          setToolStats(response.stats.byTool || []);
        }
      } catch (error) {
        console.error('Failed to fetch usage stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageStats();
  }, []);

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

  const adminData = adminAuth.getAdminData();

  return (
    <AdminAuthGuard>
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

            <Link
              href="/admin/users"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === 'users' ? 'bg-purple-700' : 'hover:bg-purple-700/50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>

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
                  <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalUsers.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <UserCheck className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Active Users</h3>
                  <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.activeUsers.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Total Tool Uses</h3>
                  <p className="text-3xl font-bold text-gray-900">{loading ? '...' : stats.totalUsage.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Available Tools</h3>
                  <p className="text-3xl font-bold text-gray-900">{toolStats.length > 0 ? toolStats.length + 6 : 12}</p>
                </div>
              </div>

              {/* Tool Usage Statistics Table */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tool Usage Statistics (All Time)</h2>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Activity className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                ) : toolStats.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tool Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Uses</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {toolStats.map((tool, index) => {
                          const percentage = stats.totalUsage > 0 ? ((tool.count / stats.totalUsage) * 100).toFixed(1) : '0';
                          return (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-4 px-4 text-sm text-gray-900">{tool.toolName}</td>
                              <td className="py-4 px-4 text-sm text-gray-600">{tool.count.toLocaleString()}</td>
                              <td className="py-4 px-4 text-sm text-gray-600">{percentage}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Activity className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-600">No tool usage data available yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Menu */}
          {activeMenu === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
              <p className="text-gray-600 mb-6">Click on "Users" in the sidebar to view the full users page.</p>
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
    </AdminAuthGuard>
  );
}
