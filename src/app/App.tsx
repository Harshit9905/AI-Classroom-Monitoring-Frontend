import React, { useState, useEffect } from 'react';
import '../styles/fonts.css';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './components/Dashboard';
import { LiveFeed } from './components/LiveFeed';
import { DetectionStats } from './components/DetectionStats';
import { StudentList } from './components/StudentList';
import { Login } from './components/Login';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Activity, Users } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [notifications, setNotifications] = useState<Array<{id: number; message: string; type: 'info' | 'warning' | 'error'}>>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'class'>('dashboard');
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'detection' | 'students'>('live');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Restore auth from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const { email, name } = JSON.parse(saved);
      setUserEmail(email);
      setUserName(name);
      setIsAuthenticated(true);
    }
  }, []);

  // Demo notifications don't auto-show, only added to count
  useEffect(() => {
    if (isAuthenticated) {
      const alertMessages = [
        { message: 'Mobile usage detected in Class 6A3', type: 'warning' as const },
        { message: 'System backup completed successfully', type: 'info' as const },
        { message: 'Sleeping detected in Class 6A5', type: 'warning' as const },
      ];

      const interval = setInterval(() => {
        const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        setTimeout(() => {
          setNotifications(prev => [...prev, {
            id: Date.now(),
            message: randomAlert.message,
            type: randomAlert.type
          }]);
        }, Math.random() * 5000);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogin = (email: string, name: string) => {
    localStorage.setItem('auth', JSON.stringify({ email, name }));
    setUserEmail(email);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUserEmail('');
    setUserName('');
    setActiveView('dashboard');
    setActiveClass(null);
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // When class changes, reset tab to live
  React.useEffect(() => {
    if (activeClass) {
      setActiveTab('live');
    }
  }, [activeClass]);

  const renderContent = () => {
    if (activeView === 'dashboard') {
      return <Dashboard />;
    }

    if (activeClass) {
      return (
        <div className="h-full flex flex-col">
          {/* Class Tabs */}
          <div className="bg-white border-b border-slate-200 px-6 pt-2 sticky top-16 z-20 shadow-sm">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('live')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'live' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Camera size={18} /> Live Monitoring
              </button>
              <button
                onClick={() => setActiveTab('detection')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'detection' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Activity size={18} /> Detection
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`pb-3 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'students' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Users size={18} /> Students
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden bg-slate-50/50 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'live' && <LiveFeed activeClass={activeClass} />}
                {activeTab === 'detection' && <DetectionStats activeClass={activeClass} />}
                {activeTab === 'students' && <StudentList activeClass={activeClass} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      );
    }
    
    return null;
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Notifications Dropdown - Only show when button is clicked */}
      {showNotifications && (
        <div className="fixed top-20 right-4 z-50 w-96 max-h-96 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-slate-400 hover:text-slate-600 text-lg leading-none"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                <AnimatePresence>
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 border-l-4 flex items-start justify-between gap-3 ${
                        notif.type === 'warning' ? 'bg-amber-50 border-l-amber-400' :
                        notif.type === 'error' ? 'bg-red-50 border-l-red-400' :
                        'bg-blue-50 border-l-blue-400'
                      }`}
                    >
                      <p className={`text-sm font-medium flex-1 ${
                        notif.type === 'warning' ? 'text-amber-800' :
                        notif.type === 'error' ? 'text-red-800' :
                        'text-blue-800'
                      }`}>{notif.message}</p>
                      <button
                        onClick={() => clearNotification(notif.id)}
                        className="text-xs font-semibold opacity-60 hover:opacity-100 shrink-0"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      )}

      <Sidebar 
        activeClass={activeClass} 
        setActiveClass={setActiveClass}
        activeView={activeView}
        setActiveView={setActiveView}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        <TopNav 
          activeView={activeView} 
          activeClass={activeClass}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          userName={userName}
          notificationsCount={notifications.length}
          onShowNotifications={() => setShowNotifications(!showNotifications)}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
