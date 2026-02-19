import React from 'react';
import { Moon, Smartphone, AlertCircle, UserX, Info, TrendingDown, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function DetectionStats({ activeClass }: { activeClass: string }) {
  const stats = [
    { label: 'Sleeping Detected', count: 3, icon: Moon, color: 'indigo', textColor: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Mobile Usage', count: 5, icon: Smartphone, color: 'rose', textColor: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    { label: 'Cheating Behavior', count: 0, icon: AlertCircle, color: 'amber', textColor: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    { label: 'Unknown Faces', count: 1, icon: UserX, color: 'slate', textColor: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  ];

  const detectionLog = [
    { id: 1, type: 'mobile', message: 'Mobile phone usage detected', student: 'Student #2024', time: '12:42 PM', confidence: 94 },
    { id: 2, type: 'sleeping', message: 'Student sleeping during class', student: 'Student #2015', time: '12:35 PM', confidence: 87 },
    { id: 3, type: 'cheating', message: 'Possible cheating behavior detected', student: 'Student #2008', time: '12:28 PM', confidence: 92 },
    { id: 4, type: 'mobile', message: 'Mobile phone usage detected', student: 'Student #2031', time: '12:15 PM', confidence: 89 },
    { id: 5, type: 'sleeping', message: 'Student sleeping during class', student: 'Student #2019', time: '11:52 AM', confidence: 91 },
  ];

  const getColorClasses = (type: string) => {
    switch(type) {
      case 'mobile': return { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-700', badge: 'bg-rose-100 text-rose-700', icon: 'text-rose-500' };
      case 'sleeping': return { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700', icon: 'text-indigo-500' };
      case 'cheating': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', icon: 'text-amber-500' };
      default: return { bg: 'bg-slate-50', border: 'border-slate-100', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700', icon: 'text-slate-500' };
    }
  };

  return (
    <div className="p-6 lg:p-10 h-full overflow-y-auto bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Detection Analytics</h2>
          <p className="text-slate-600 mt-1.5 text-base">Real-time behavioral analysis for Class {activeClass}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors hover:shadow-md">
            <Zap size={16} strokeWidth={2} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`p-6 rounded-2xl bg-white border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`p-3 rounded-[12px] ${stat.bg} ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} strokeWidth={2} />
              </div>
              <div className="text-right">
                <p className={`text-4xl font-bold ${stat.textColor} tracking-tight`}>{stat.count}</p>
              </div>
            </div>
            <p className="font-semibold text-slate-900 mb-2">{stat.label}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} /> Last 24 hours
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detection Log */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      >
        <div className="p-6 border-b border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Recent Detections Log</h3>
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" title="Filter detections by type">
            <option>All Types</option>
            <option>Sleeping</option>
            <option>Mobile Usage</option>
            <option>Cheating</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/40">
                <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wide">Type</th>
                <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wide">Description</th>
                <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wide">Student</th>
                <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wide">Confidence</th>
                <th className="px-6 py-3.5 text-xs font-bold text-slate-700 uppercase tracking-wide">Time</th>
              </tr>
            </thead>
            <tbody>
              {detectionLog.map((log, idx) => {
                const colors = getColorClasses(log.type);
                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${colors.badge}`}>
                        {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-900">{log.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 font-medium">{log.student}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-6 bg-slate-100 rounded-full overflow-hidden flex-shrink-0" style={{ '--confidence': `${log.confidence}%` } as any}>
                          <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${log.confidence}%` } as any}></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900 w-8">{log.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500 font-medium">{log.time}</p>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <p className="text-sm text-slate-600">Showing 5 of 247 detections</p>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
            View All Detections →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
