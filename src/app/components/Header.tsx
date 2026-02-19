
import React from 'react';
import { Bell, Search, ChevronDown, User, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  currentView: string;
  selectedClass: string | null;
  toggleMobileMenu: () => void;
}

export function Header({ currentView, selectedClass, toggleMobileMenu }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow-sm border-b border-slate-100 z-40 flex items-center justify-between px-6">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          {selectedClass ? (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              key={selectedClass}
              className="flex items-center gap-2"
            >
              <Monitor className="w-5 h-5 text-blue-500" />
              <span>Class {selectedClass} Monitoring</span>
            </motion.div>
          ) : (
             <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              key="dash"
              className="flex items-center gap-2"
            >
              <span className="capitalize">{currentView.replace('-', ' ')}</span>
            </motion.div>
          )}
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* Class Selector Dropdown (Optional as per prompt) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 hover:border-blue-200 hover:bg-white transition-colors cursor-pointer">
          <span>{selectedClass || "Select Class"}</span>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
            HR
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-700">Harshit Raj</p>
            <p className="text-xs text-slate-400">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
        </div>

      </div>
    </header>
  );
}
