
import { Moon, Smartphone, FileWarning, AlertTriangle, User } from 'lucide-react';

export const CLASSES = Array.from({ length: 22 }, (_, i) => ({
  id: `6A${i + 1}`,
  name: `6A${i + 1}`,
  status: Math.random() > 0.8 ? 'alert' : 'active',
  students: 35 + Math.floor(Math.random() * 15),
  alerts: Math.floor(Math.random() * 8),
}));

export const STUDENTS = Array.from({ length: 30 }, (_, i) => ({
  id: `S${i + 1}`,
  name: `Student ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?u=${i}`,
  attendance: Math.floor(Math.random() * 20) + 80,
  status: Math.random() > 0.9 ? 'absent' : 'present',
}));

export const UNKNOWN_STUDENTS = Array.from({ length: 3 }, (_, i) => ({
  id: `U${i + 1}`,
  image: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop`,
  detectedAt: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
}));

export const DETECTION_TYPES = [
  { id: 1, type: 'sleeping', label: 'Sleeping Detected', count: 3, icon: Moon, color: 'indigo', change: '+2 in last hour' },
  { id: 2, type: 'mobile', label: 'Mobile Usage', count: 5, icon: Smartphone, color: 'rose', change: '+3 in last hour' },
  { id: 3, type: 'cheating', label: 'Cheating Behavior', count: 0, icon: FileWarning, color: 'amber', change: 'No incidents' },
  { id: 4, type: 'unknown', label: 'Unknown Faces', count: 1, icon: AlertTriangle, color: 'slate', change: '1 detected' },
];

export const SYSTEM_STATS = {
  totalStudents: 1240,
  presentToday: 1180,
  absent: 60,
  activeAlerts: 14,
  classesMonitored: 22,
  camerasActive: 22,
  systemUptime: '99.8%',
  lastUpdated: new Date(),
};
