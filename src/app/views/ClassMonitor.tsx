
import React, { useState, useEffect } from 'react';
import { 
  Users, AlertTriangle, Monitor, Maximize2, Activity,
  Smartphone, UserX, UserCheck, Eye, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { StatCard } from '../components/StatCard';
import { STUDENTS, RECENT_ALERTS } from '../data';

interface ClassMonitorProps {
  classId: string;
}

export function ClassMonitor({ classId }: ClassMonitorProps) {
  const [activeTab, setActiveTab] = useState<'live' | 'detection' | 'students'>('live');
  const [showBoxes, setShowBoxes] = useState(true);

  // Mock detections for the live view
  const detections = [
    { id: 1, x: 20, y: 30, w: 10, h: 15, label: 'Person', type: 'normal' },
    { id: 2, x: 45, y: 35, w: 12, h: 18, label: 'Sleeping', type: 'alert' },
    { id: 3, x: 70, y: 40, w: 11, h: 16, label: 'Person', type: 'normal' },
    { id: 4, x: 30, y: 60, w: 14, h: 20, label: 'Mobile', type: 'warning' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-50/50">
      
      {/* Tab Navigation */}
      <div className="px-8 pt-6 pb-0 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">Class {classId} Monitor</h1>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span> LIVE
            </span>
          </div>
        </div>
        
        <div className="flex gap-8">
          {[
            { id: 'live', label: 'Live Feed', icon: Video },
            { id: 'detection', label: 'Detections', icon: AlertTriangle },
            { id: 'students', label: 'Students', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={clsx(
                "pb-4 flex items-center gap-2 text-sm font-medium transition-colors relative",
                activeTab === tab.id ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <AnimatePresence mode="wait">
          
          {/* LIVE MONITOR TAB */}
          {activeTab === 'live' && (
            <motion.div 
              key="live"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
            >
              {/* Main Camera View */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group border border-slate-800">
                  <img 
                    src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1080&auto=format&fit=crop" 
                    alt="Classroom"
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Overlay UI */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-white text-xs font-mono">
                      CAM-01 • 1080p • 30FPS
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-white text-xs font-mono bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                    {new Date().toLocaleTimeString()}
                  </div>

                  {/* Bounding Boxes */}
                  {showBoxes && detections.map((det) => (
                    <motion.div
                      key={det.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                      className={clsx(
                        "absolute border-2 rounded-lg flex flex-col items-start justify-end p-1 shadow-[0_0_15px_rgba(0,0,0,0.3)]",
                        det.type === 'alert' ? 'border-red-500 bg-red-500/10' : 
                        det.type === 'warning' ? 'border-yellow-500 bg-yellow-500/10' : 
                        'border-green-400/50 bg-green-400/5'
                      )}
                      style={{ 
                        left: `${det.x}%`, 
                        top: `${det.y}%`, 
                        width: `${det.w}%`, 
                        height: `${det.h}%` 
                      }}
                    >
                      <span className={clsx(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm",
                        det.type === 'alert' ? 'bg-red-500 text-white' : 
                        det.type === 'warning' ? 'bg-yellow-500 text-black' : 
                        'bg-green-500 text-white'
                      )}>
                        {det.label} {Math.floor(Math.random() * 20 + 80)}%
                      </span>
                    </motion.div>
                  ))}

                  {/* Camera Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-center text-white">
                      <div className="flex gap-4">
                        <button onClick={() => setShowBoxes(!showBoxes)} className="hover:text-blue-400 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="hover:text-blue-400 transition-colors">
                          <Activity className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="hover:text-blue-400 transition-colors">
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-4">
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                      <Monitor className="w-6 h-6 text-blue-500" />
                      <span className="text-xs font-bold uppercase">All Cams</span>
                   </div>
                   <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                      <UserCheck className="w-6 h-6 text-green-500" />
                      <span className="text-xs font-bold uppercase">Mark All</span>
                   </div>
                   {/* Add more fake actions if needed */}
                </div>
              </div>

              {/* Side Panel: Activity Feed */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[600px] lg:h-auto overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-700">Live Detections</h3>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  {/* Alert Items */}
                  {RECENT_ALERTS.map((alert) => (
                    <motion.div 
                      key={alert.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
                    >
                      <img 
                        src={`https://ui-avatars.com/api/?name=${alert.student}&background=random`} 
                        className="w-10 h-10 rounded-lg object-cover" 
                        alt="Avatar"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                           <h4 className="font-bold text-sm text-slate-800">{alert.student}</h4>
                           <span className="text-[10px] text-slate-400">{alert.time}</span>
                        </div>
                        <p className={clsx(
                          "text-xs font-medium mt-0.5 flex items-center gap-1",
                          alert.type === 'sleeping' ? "text-red-500" : 
                          alert.type === 'mobile' ? "text-yellow-600" : "text-slate-500"
                        )}>
                          {alert.type === 'sleeping' && <AlertTriangle className="w-3 h-3" />}
                          {alert.type === 'mobile' && <Smartphone className="w-3 h-3" />}
                          {alert.type === 'unknown' && <UserX className="w-3 h-3" />}
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Detected
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                  <button className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-sm transition-colors">
                    View Full Log
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DETECTION TAB */}
          {activeTab === 'detection' && (
            <motion.div 
              key="detection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                  title="Sleeping" 
                  value="3" 
                  icon={<AlertTriangle className="w-6 h-6" />} 
                  color="red"
                />
                <StatCard 
                  title="Phone Usage" 
                  value="5" 
                  icon={<Smartphone className="w-6 h-6" />} 
                  color="yellow"
                />
                <StatCard 
                  title="Unknown Faces" 
                  value="1" 
                  icon={<UserX className="w-6 h-6" />} 
                  color="purple"
                />
                <StatCard 
                  title="Cheating" 
                  value="0" 
                  icon={<Eye className="w-6 h-6" />} 
                  color="blue"
                />
              </div>

              {/* Detailed List */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">Detection Log</h3>
                </div>
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Event</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Confidence</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Proof</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-600">10:{10 + i} AM</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                              <img src={`https://ui-avatars.com/api/?name=User+${i}&background=random`} alt="" />
                            </div>
                            <span className="font-medium text-slate-700">Student {i}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={clsx(
                            "px-2.5 py-1 rounded-full text-xs font-bold",
                            i % 2 === 0 ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                          )}>
                            {i % 2 === 0 ? "Sleeping" : "Mobile Phone"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">9{8 - i}%</td>
                        <td className="px-6 py-4 text-blue-600 text-sm font-medium cursor-pointer hover:underline">View Clip</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <motion.div 
              key="students"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {STUDENTS.map((student) => (
                  <div key={student.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex flex-col items-center">
                      <div className="relative w-24 h-24 mb-4">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-full h-full rounded-full object-cover border-4 border-slate-50 shadow-inner"
                        />
                        <span className={clsx(
                          "absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white",
                          student.status === 'present' ? "bg-green-500" : 
                          student.status === 'absent' ? "bg-red-500" : "bg-yellow-500"
                        )}></span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{student.name}</h3>
                      <p className="text-sm text-slate-500 mb-4">ID: 2024-00{student.id}</p>
                      
                      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between w-full text-xs text-slate-500 font-medium">
                        <span>Attendance</span>
                        <span>{student.attendance}%</span>
                      </div>
                      
                      <div className="mt-6 flex gap-2 w-full">
                        <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                          Profile
                        </button>
                        <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                          History
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
