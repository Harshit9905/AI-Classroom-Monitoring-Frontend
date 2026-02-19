import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, Mail, Lock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter valid email');
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const name = email.split('@')[0];
    onLogin(email, name);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1931] via-[#0F3460] to-black flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0A1931] via-[#0F3460] to-black px-6 py-5 flex items-center justify-between gap-4">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white text-xl shrink-0">
              📹
            </div>

            <div>
              <h1 className="text-white text-xl font-bold whitespace-nowrap">
                AI Classroom
              </h1>
              <p className="text-slate-300 text-sm whitespace-nowrap">
                Real-time Monitoring
              </p>
            </div>
          </div>

          {/* RIGHT SIDE LOGO WITH WHITE BACKGROUND (IMPORTANT FIX) */}
          <div className="ml-auto bg-white px-2 py-1 rounded-md shadow-md flex items-center shrink-0">
            <motion.img
              whileHover={{ scale: 1.03 }}
              src="/parulbanner.png"   // 👈 same image
              alt="Parul University"
              className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain"
            />
          </div>

        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="email"
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm flex gap-2 items-center">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* BUTTON */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#0F3460] to-black text-white font-bold py-3 rounded-xl shadow-lg"
          >
            {isLoading ? "Signing in..." : (
              <span className="flex items-center justify-center gap-2">
                <Zap size={18} />
                Sign In
              </span>
            )}
          </motion.button>

          {/* DEMO */}
          <div className="bg-gray-100 p-4 rounded-lg text-sm">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>admin@school.com</p>
            <p>Any password</p>
          </div>

        </form>
      </div>
    </div>
  );
}
