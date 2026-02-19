<<<<<<< HEAD
🎓 AI Classroom Monitoring System (Frontend)

An intelligent AI-powered classroom monitoring dashboard designed to automate attendance, monitor student behavior, and provide real-time analytics for modern educational institutions.

This project is part of a full-stack system combining Computer Vision (OpenCV + ML) with a modern React SaaS dashboard UI.

✨ Key Features

🎥 Live Classroom Monitoring
Real-time camera feed with AI detection overlay

🧠 Behavior Detection System
Detects sleeping, mobile usage, and suspicious activities

👨‍🎓 Student Management (Class-wise)
Organized data for each class (6A1 – 6A22)

📊 Attendance Dashboard
Automatic attendance using face recognition

📈 Analytics & Charts
Visual insights of attendance trends

🔐 Secure Login System
Admin and teacher authentication UI

🧭 Class-based Navigation System
Select class → view monitoring, detection, and students

🖥️ UI Modules

Dashboard

Class Monitoring (Live Camera Feed)

Detection (AI Alerts)

Students (Registered + Unknown)

Attendance Analytics

🛠️ Tech Stack

Frontend:

React (Vite)

Tailwind CSS

Framer Motion (animations)

Chart.js (data visualization)

Lucide React Icons

Backend (Connected separately):

Python (Flask)

OpenCV

Face Recognition Model

CSV / Database storage

📂 Project Structure
AI-Classroom-Monitoring-Frontend/
│
├── public/
│   └── parulbanner.png
│
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   └── Login.jsx
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── LiveMonitoring.jsx
│   │   ├── Detection.jsx
│   │   ├── Students.jsx
│   │   └── Attendance.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json

🚀 Getting Started (Run Locally)
1️⃣ Clone the Repository
git clone https://github.com/Harshit9905/AI-Classroom-Monitoring-Frontend.git
cd AI-Classroom-Monitoring-Frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run the Development Server
npm run dev


Open in browser:

http://localhost:5173

🔗 Backend Integration

This frontend connects to a Python Flask backend providing APIs such as:

/video_feed?class=6A1
/students?class=6A1
/attendance
/detection?class=6A1

📸 Screens

Login Page

Dashboard

Live Monitoring

Detection Alerts

Student Management

💡 Use Cases

Schools & Colleges

Smart Classrooms

Coaching Institutes

Online Proctoring Systems

👨‍💻 Author
Vikash Kumar Singh
Yuvraj Singh
Aditya Kumar
Harshit Raj
🎓 BTech Computer Science Engineering
🏫 Parul University


🚀 Future Improvements

Database integration (MongoDB / MySQL)

Cloud camera streaming

Mobile app version

Role-based login (Admin / Teacher / Parent)

Real-time alerts via SMS / Email

⭐ Support

If you like this project, give it a ⭐ on GitHub!
=======
# AI-Classroom-Monitoring-Frontend
>>>>>>> e17c0f8cc4cf5ee41001f1f20e76a4c8b31b793b
