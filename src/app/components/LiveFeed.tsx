import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2, Volume2, VolumeX, AlertTriangle, User, MoreVertical, FileText, Download, Share2, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveFeed({ activeClass }: { activeClass: string }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const detectedEvents = [
    { id: 1, type: 'mobile', name: 'Mobile Usage', location: 'Row 3, Seat 5', confidence: 92, time: '12:42 PM' },
    { id: 2, type: 'sleeping', name: 'Sleeping', location: 'Row 2, Seat 2', confidence: 87, time: '12:40 PM' },
  ];

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 p-6 bg-slate-50 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* Main Camera Feed */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-black/80 backdrop-blur-sm' : 'flex-1'} bg-black rounded-2xl overflow-hidden shadow-2xl relative group`}
      >
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/90 to-transparent z-10 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-2 bg-red-600/95 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-lg border border-red-500/30"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </motion.div>
            <div className="text-white/95 font-mono text-xs bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20 shadow-lg">
              CAM-{activeClass.replace('A', '')} • {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2.5 bg-black/50 text-white/80 hover:bg-white/20 hover:text-white rounded-lg backdrop-blur-md transition-all border border-white/10 shadow-lg"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 bg-black/50 text-white/80 hover:bg-white/20 hover:text-white rounded-lg backdrop-blur-md transition-all border border-white/10 shadow-lg"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          </div>
        </div>

        {/* Video Feed Simulation */}
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900 to-black">
          <img 
            src="https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjBzdHVkZW50cyUyMHdvcmtpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NzEzNDQ1OTF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Classroom Live Feed" 
            className="w-full h-full object-cover"
          />
          
          {/* Detection Boxes - Animated */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ repeat: Infinity, duration: 2.5, repeatType: "reverse" }}
            className="absolute top-[25%] left-[15%] w-40 h-48 border-2.5 border-emerald-500/90 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:border-emerald-400 transition-colors"
          >
            <div className="absolute -top-7 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-md border border-emerald-400/30 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Sarah J. • 98%
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ repeat: Infinity, duration: 3, repeatType: "reverse", delay: 0.8 }}
            className="absolute top-[45%] right-[25%] w-36 h-44 border-2.5 border-amber-500/90 rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:border-amber-400 transition-colors"
          >
            <div className="absolute -top-7 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg backdrop-blur-md border border-amber-400/30 font-bold flex items-center gap-1">
              <AlertTriangle size={12} strokeWidth={3} />
              Possible Sleeping • 76%
            </div>
          </motion.div>

          {/* Network Status Indicator */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2 bg-black/60 px-3 py-2 rounded-lg backdrop-blur-md border border-white/10">
            <div className="flex gap-1">
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></motion.div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></motion.div>
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400"></motion.div>
            </div>
            <span className="text-xs font-semibold text-emerald-400">Live 1080p 30fps</span>
          </div>
        </div>

        {/* Close Fullscreen */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 bg-white text-slate-900 rounded-xl font-bold shadow-xl hover:bg-slate-100 transition-colors z-50 text-sm"
          >
            Exit Fullscreen
          </button>
        )}
      </motion.div>

      {/* Side Panel (Right) - Only show on desktop when not fullscreen */}
      {!isFullscreen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-96 flex flex-col gap-6 shrink-0"
        >
          {/* Alert Events Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900 text-lg">Detected Events</h3>
              <span className="bg-rose-100 text-rose-700 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
                <Zap size={12} strokeWidth={2.5} /> Live
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              {detectedEvents.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className={`p-4 rounded-xl border-2 backdrop-blur-sm ${
                    event.type === 'mobile' 
                      ? 'bg-rose-50 border-rose-200 hover:border-rose-300' 
                      : 'bg-amber-50 border-amber-200 hover:border-amber-300'
                  } transition-colors group cursor-pointer`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-white ${
                      event.type === 'mobile' ? 'bg-gradient-to-br from-rose-400 to-rose-500' : 'bg-gradient-to-br from-amber-400 to-amber-500'
                    }`}>
                      {event.type === 'mobile' ? '📱' : '😴'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${event.type === 'mobile' ? 'text-rose-900' : 'text-amber-900'}`}>
                        {event.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${event.type === 'mobile' ? 'text-rose-700' : 'text-amber-700'}`}>
                        {event.location}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${event.type === 'mobile' ? 'bg-rose-500' : 'bg-amber-500'}`}
                            style={{ width: `${event.confidence}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-bold ${event.type === 'mobile' ? 'text-rose-600' : 'text-amber-600'}`}>
                          {event.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-slate-900 mb-4 text-lg">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all hover:shadow-md group">
                <Download size={16} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                Snapshot
              </button>
              <button className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-all hover:shadow-md group">
                <FileText size={16} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                Report
              </button>
              <button className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition-all hover:shadow-md col-span-2 group">
                <Share2 size={16} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                Announce
              </button>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-2xl p-4 border border-blue-200 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-200 flex items-center justify-center text-blue-600 shrink-0 font-bold">
                ℹ️
              </div>
              <div>
                <p className="text-xs font-bold text-blue-900">Recording Active</p>
                <p className="text-xs text-blue-700 mt-1">All activities are being recorded and will be stored securely.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
