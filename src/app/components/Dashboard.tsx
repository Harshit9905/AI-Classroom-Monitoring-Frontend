import React from 'react';
import { Users, UserCheck, UserX, AlertTriangle, Activity, TrendingUp, Clock, Monitor, Zap, Server } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Students', value: '1,240', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { label: 'Present Today', value: '1,180', change: '95.1%', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  { label: 'Absent', value: '60', change: '-2%', icon: UserX, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  { label: 'Active Alerts', value: '14', change: '+4', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

export function Dashboard() {
  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-600 mt-1.5 text-base">Real-time monitoring insights across 22 classrooms & 1,240 students</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            System Active
          </div>
          <button className="bg-white border border-slate-200 shadow-sm px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Monitor size={16} /> System Health
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-white p-6 rounded-2xl shadow-sm border ${stat.border} hover:shadow-md hover:border-blue-200 transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-[12px] ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} strokeWidth={2} />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight mb-1">{stat.value}</h3>
            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Alerts */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
              <Activity size={20} className="text-blue-500" /> Recent Alerts
            </h3>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center gap-4 group cursor-pointer">
                <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 font-semibold text-white ${i % 2 === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 'bg-gradient-to-br from-red-400 to-red-500'}`}>
                  {i % 2 === 0 ? <AlertTriangle size={20} strokeWidth={2} /> : <UserX size={20} strokeWidth={2} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {i % 2 === 0 ? 'Sleeping Detected - Class 6A' + (i + 1) : 'Mobile Usage - Class 6A' + (i + 1)}
                    </p>
                    <span className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1.5 ml-2">
                      <Clock size={12} /> {i * 12 + 2}m ago
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    Camera 0{i + 1} • Confidence: {(95 - i * 3)}% • Student ID: #{20240 + i}
                  </p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-3">
                  <span className="text-xs font-semibold px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Review</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow"
        >
          <div className="p-6 border-b border-slate-100 bg-slate-50/40">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
              <Server size={20} className="text-emerald-500" /> System Health
            </h3>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center gap-6">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">Camera Uptime</span>
                  <span className="font-bold text-slate-900">99.8%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 w-[99.8%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">Server Load</span>
                  <span className="font-bold text-slate-900">42%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 w-[42%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">Storage Used</span>
                  <span className="font-bold text-slate-900">78%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 w-[78%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/50 rounded-[14px] p-4 border border-emerald-200/50">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-emerald-900">All Systems Operational</p>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">Last backup completed at 3:00 AM. Next maintenance in 4 days.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900">Classes Monitored</h4>
            <div className="w-10 h-10 rounded-[10px] bg-blue-100 flex items-center justify-center text-blue-600">
              <Monitor size={18} strokeWidth={2} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-2">22/22</p>
          <p className="text-sm text-slate-600">All classrooms online</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900">Records (24h)</h4>
            <div className="w-10 h-10 rounded-[10px] bg-purple-100 flex items-center justify-center text-purple-600">
              <Zap size={18} strokeWidth={2} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-2">1.2 TB</p>
          <p className="text-sm text-slate-600">High quality storage</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900">Accuracy</h4>
            <div className="w-10 h-10 rounded-[10px] bg-emerald-100 flex items-center justify-center text-emerald-600">
              <TrendingUp size={18} strokeWidth={2} />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-2">98.7%</p>
          <p className="text-sm text-slate-600">AI detection accuracy</p>
        </motion.div>
      </div>
    </div>
  );
}
