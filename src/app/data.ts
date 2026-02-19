
export interface Student {
  id: string;
  name: string;
  avatar: string;
  attendance: number;
  status: 'present' | 'absent' | 'late';
}

export interface ClassData {
  id: string;
  name: string;
  students: Student[];
  detections: {
    sleeping: number;
    mobile: number;
    cheating: number;
    unknown: number;
  };
  liveStatus: 'active' | 'offline';
}

const firstNames = ['Arjun', 'Priya', 'Rohan', 'Ananya', 'Vikram', 'Divya', 'Aditya', 'Shreya', 'Karan', 'Neha', 'Rahul', 'Pooja', 'Nikhil', 'Isha', 'Sanjay', 'Meera', 'Amit', 'Anjali', 'Rishabh', 'Kavya', 'Dhruv', 'Riya', 'Varun', 'Anya'];
const lastNames = ['Sharma', 'Kumar', 'Singh', 'Patel', 'Gupta', 'Verma', 'Chopra', 'Desai', 'Mishra', 'Bhat', 'Rao', 'Nair', 'Khan', 'Das', 'Iyer', 'Menon', 'Reddy', 'Pillai', 'Saxena', 'Dutta'];

const avatarUrls = [
  'https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1729697967428-5b98d11486a5?w=150&h=150&fit=crop',
  'https://images.unsplash.com/photo-1621962366578-7364ccb3352b?w=150&h=150&fit=crop',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/11.jpg',
];

function generateStudentName(classId: string, studentIndex: number): string {
  const classNum = parseInt(classId.replace('6A', ''));
  const seed = classNum * 100 + studentIndex;
  const firstIdx = (seed * 7) % firstNames.length;
  const lastIdx = (seed * 13) % lastNames.length;
  return `${firstNames[firstIdx]} ${lastNames[lastIdx]}`;
}

function generateStudentsForClass(classId: string, count: number = 40): Student[] {
  const classNum = parseInt(classId.replace('6A', ''));
  return Array.from({ length: count }, (_, i) => ({
    id: `${classId}-${i}`,
    name: generateStudentName(classId, i),
    avatar: avatarUrls[(classNum + i) % avatarUrls.length],
    attendance: 75 + Math.floor(Math.random() * 25),
    status: Math.random() > 0.95 ? 'absent' : Math.random() > 0.9 ? 'late' : 'present',
  }));
}

function generateDetectionsForClass(classId: string) {
  const classNum = parseInt(classId.replace('6A', ''));
  const seed = classNum * 123;
  return {
    sleeping: (seed % 3),
    mobile: ((seed * 3) % 4),
    cheating: 0,
    unknown: ((seed * 7) % 2),
  };
}

export function getClassData(classId: string): ClassData {
  return {
    id: classId,
    name: classId,
    students: generateStudentsForClass(classId),
    detections: generateDetectionsForClass(classId),
    liveStatus: 'active',
  };
}

export const CLASSES: ClassData[] = Array.from({ length: 22 }, (_, i) => 
  getClassData(`6A${i + 1}`)
);

export const RECENT_ALERTS = [
  { id: 1, type: 'sleeping', student: 'David Lee', time: '2m ago', classId: '6A1' },
  { id: 2, type: 'mobile', student: 'Grace Hall', time: '5m ago', classId: '6A3' },
  { id: 3, type: 'unknown', student: 'Unknown Person', time: '12m ago', classId: '6A1' },
  { id: 4, type: 'sleeping', student: 'Alice Johnson', time: '15m ago', classId: '6A2' },
];
