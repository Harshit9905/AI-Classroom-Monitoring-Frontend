import React from 'react';
import { Users, UserX, AlertTriangle, CheckCircle, Camera, Badge, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { getClassData } from '../data';

export function StudentList({ activeClass }: { activeClass: string }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const classData = getClassData(activeClass);
  
  const students = classData.students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unknown = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `U${i + 1}`,
    image: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop`,
    detectedAt: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
  }));

  return (
    <div className="p-6 lg:p-10 h-full overflow-y-auto bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Student Roster</h2>
        <p className="text-slate-600 mt-1.5 text-base">Class {activeClass} • {students.length} Registered Students • {unknown.length} Unknown Detected</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search students by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium shadow-sm"
          />
        </div>
      </div>

      {/* Registered Students Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-blue-100 flex items-center justify-center text-blue-600">
            <Users size={20} strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Registered Students</h3>
          <span className="ml-auto text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{students.length} Students</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {students.map((student, i) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group cursor-pointer relative"
            >
              {student.status === 'absent' && (
                <div className="absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-100 text-red-700 z-10">
                  Absent
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-[12px] bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden ring-3 ring-white shadow-md group-hover:ring-blue-200 transition-all">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{student.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{student.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-700">Attendance</span>
                    <span className={`font-bold ${student.attendance >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                    <div 
                      className={`h-full rounded-full transition-all ${student.attendance >= 90 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-amber-500'}`} 
                      style={{ width: `${Math.min(student.attendance, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                  <div className={`w-2.5 h-2.5 rounded-full ${student.status === 'present' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                  <span className={`text-xs font-bold ${student.status === 'present' ? 'text-emerald-700' : 'text-red-700'}`}>
                    {student.status === 'present' ? '✓ Present' : '✗ Absent'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Unknown Faces Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-[10px] bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle size={20} strokeWidth={2} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Unknown Faces Detected</h3>
          <span className="ml-auto text-sm font-semibold text-slate-600 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">{unknown.length} Detected</span>
        </div>
        
        {unknown.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {unknown.map((u, idx) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + idx * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-dashed border-amber-200 bg-gradient-to-br from-amber-50 to-amber-50/50 hover:border-amber-300 hover:from-amber-100 transition-all p-4 cursor-pointer"
              >
                <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-slate-200 border border-amber-200">
                  <img src={u.image} alt={`Unknown ${u.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className="font-bold text-amber-900 text-sm">{u.id}</p>
                  <div className="flex items-center gap-1.5 text-xs text-amber-700 mt-2">
                    <Camera size={12} strokeWidth={2} />
                    {u.detectedAt}
                  </div>
                </div>
                <button 
                  className="absolute top-3 right-3 p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-amber-200 text-amber-600 hover:bg-white hover:text-amber-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Mark as verified"
                >
                  <Badge size={16} strokeWidth={2} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-emerald-600" strokeWidth={2} />
            </div>
            <p className="text-slate-600 font-medium">No unknown faces detected</p>
            <p className="text-slate-500 text-sm mt-1">All detected individuals are registered students</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
