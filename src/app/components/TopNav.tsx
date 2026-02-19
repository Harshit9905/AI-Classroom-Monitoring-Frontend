import React from 'react';
import { Search, Bell, Menu, User, ChevronDown, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavProps {
  activeView?: 'dashboard' | 'class';
  activeClass?: string | null;
  setIsMobileOpen: (open: boolean) => void;
  isMobileOpen: boolean;
  userName?: string;
  notificationsCount?: number;
  onShowNotifications?: () => void;
  onLogout?: () => void;
}

export function TopNav({ 
  activeView = 'dashboard', 
  activeClass = null, 
  setIsMobileOpen, 
  isMobileOpen,
  userName = 'User',
  notificationsCount = 0,
  onShowNotifications = () => {},
  onLogout = () => {}
}: TopNavProps) {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const displayName = userName.split('@')[0].substring(0, 15); // Show only email prefix, max 15 chars
  const userRole = userName.includes('admin') ? 'Super Admin' : 'Teacher';

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {activeView === 'dashboard' ? 'Dashboard Overview' : `Class ${activeClass} Monitoring`}
          </h2>
          {activeView === 'class' && (
            <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full w-fit mt-0.5 border border-green-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              System Active
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all w-64">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search students, alerts..." 
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button 
          onClick={onShowNotifications}
          className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors group"
        >
          <Bell size={20} />
          {notificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border border-white group-hover:scale-110 transition-transform flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">{notificationsCount > 9 ? '9+' : notificationsCount}</span>
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-full pl-2 pr-3 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-slate-800">{displayName}</p>
              <p className="text-xs text-slate-500">{userRole}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{displayName.charAt(0).toUpperCase()}</span>
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 hidden md:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1 md:hidden">
                  <p className="text-sm font-semibold text-slate-800">{displayName}</p>
                  <p className="text-xs text-slate-500">{userRole}</p>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                  <User size={16} /> Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors">
                  <Settings size={16} /> Settings
                </button>
                <div className="my-1 border-t border-slate-100"></div>
                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
