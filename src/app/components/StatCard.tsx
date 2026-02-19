
import React from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export function StatCard({ title, value, icon, trend, trendUp, color = 'blue' }: StatCardProps) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600 ring-blue-100',
    green: 'bg-green-50 text-green-600 ring-green-100',
    red: 'bg-red-50 text-red-600 ring-red-100',
    yellow: 'bg-yellow-50 text-yellow-600 ring-yellow-100',
    purple: 'bg-purple-50 text-purple-600 ring-purple-100',
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
        </div>
        <div className={clsx("p-3 rounded-xl ring-1", colorStyles[color])}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className={clsx(trendUp ? "text-green-500" : "text-red-500", "flex items-center gap-1")}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
          <span className="text-slate-400 font-normal">vs last hour</span>
        </div>
      )}
    </motion.div>
  );
}
