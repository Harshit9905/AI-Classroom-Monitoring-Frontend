import React from 'react';
import { LayoutDashboard, Users, Search, AlertCircle, Monitor, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeClass: string | null;
  setActiveClass: (cls: string | null) => void;
  activeView: 'dashboard' | 'class';
  setActiveView: (view: 'dashboard' | 'class') => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const classesList = Array.from({ length: 22 }, (_, i) => `6A${i + 1}`);

export function Sidebar({ activeClass, setActiveClass, activeView, setActiveView, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  
  const handleClassClick = (cls: string) => {
    setActiveView('class');
    setActiveClass(cls);
    setIsMobileOpen(false); // Close mobile sidebar after selection
  };

  const handleDashboard = () => {
    setActiveView('dashboard');
    setActiveClass(null);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container - Fixed Position for Desktop, Overlay for Mobile */}
      <motion.aside 
        initial={false}
        className={`
          fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white 
          z-40 flex flex-col shadow-xl
          transition-transform duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors z-50"
          title="Close sidebar"
        >
          <X size={24} className="text-white" />
        </button>

        {/* College Logo Area */}
        <div className="p-6 border-b border-slate-700/50 flex items-center gap-3">
          <div className="bg-white p-1 rounded-full shadow-lg flex items-center justify-center shrink-0">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="/parullogo.png" 
              alt="College Logo" 
              className="w-16 h-16 object-contain" 
            />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Classroom Monitor</h1>
            <p className="text-xs text-slate-400 font-medium">Real-time Monitoring</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
          <div className="space-y-1 mb-8">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main</p>
            <button
              onClick={handleDashboard}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeView === 'dashboard' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </div>

          <div className="space-y-1">
            <div className="px-3 flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Class Monitoring</p>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full">22</span>
            </div>
            
            <div className="space-y-0.5 max-h-96 overflow-y-auto scrollbar-hide">
              {classesList.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleClassClick(cls)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeClass === cls 
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Monitor size={16} className={activeClass === cls ? 'text-blue-400' : 'text-slate-600'} />
                    <span className={activeClass === cls ? 'font-semibold' : 'font-medium'}>{cls}</span>
                  </div>
                  {activeClass === cls && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
