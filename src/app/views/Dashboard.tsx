
import React from 'react';
import { StatCard } from '../components/StatCard';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { motion } from 'motion/react';
import { Activity, Users, AlertTriangle, MonitorPlay } from 'lucide-react';

const data = [
  { name: '8AM', alert: 40, pv: 2400, amt: 2400 },
  { name: '9AM', alert: 30, pv: 1398, amt: 2210 },
  { name: '10AM', alert: 20, pv: 9800, amt: 2290 },
  { name: '11AM', alert: 27, pv: 3908, amt: 2000 },
  { name: '12PM', alert: 18, pv: 4800, amt: 2181 },
  { name: '1PM', alert: 23, pv: 3800, amt: 2500 },
  { name: '2PM', alert: 34, pv: 4300, amt: 2100 },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1">Real-time monitoring stats across all classrooms.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Classes" 
          value="22" 
          icon={<MonitorPlay className="w-6 h-6" />} 
          trend="100%" 
          trendUp={true} 
          color="blue"
        />
        <StatCard 
          title="Total Students" 
          value="845" 
          icon={<Users className="w-6 h-6" />} 
          trend="2.4%" 
          trendUp={true} 
          color="purple"
        />
        <StatCard 
          title="Active Alerts" 
          value="12" 
          icon={<AlertTriangle className="w-6 h-6" />} 
          trend="5.1%" 
          trendUp={false} 
          color="red"
        />
        <StatCard 
          title="System Health" 
          value="98%" 
          icon={<Activity className="w-6 h-6" />} 
          trend="Stable" 
          trendUp={true} 
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-700">Alert Trends (Today)</h3>
            <select className="bg-slate-50 border-none text-sm text-slate-500 rounded-lg p-2 focus:ring-2 focus:ring-blue-100">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAlert" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="alert" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAlert)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Alerts Feed */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-700 mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Sleeping Detected</p>
                  <p className="text-xs text-slate-500">Class 6A{i} • 2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
            View All Alerts
          </button>
        </motion.div>

      </div>
    </div>
  );
}
