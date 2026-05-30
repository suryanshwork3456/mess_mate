import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Utensils, Lock, User, Shield, HardHat, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState('student');
  const [idStr, setIdStr] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Auto-login for demo purposes if left empty, else try login
    const uid = idStr || 'demo_user';
    const pwd = password || 'demo_pass';

    const res = await login(role, uid, pwd);
    if (!res.success) {
      setError(res.message);
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (role === 'student') return 'Roll Number';
    if (role === 'admin') return 'Admin ID';
    return 'Worker ID';
  };

  const RoleIcon = role === 'admin' ? Shield : role === 'worker' ? HardHat : User;

  return (
    <div className="min-h-screen bg-background flex text-text-primary selection:bg-primary/30">
      
      {/* Left Branding Panel (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 overflow-hidden border-r border-glass-border bg-gradient-to-br from-background via-[#111] to-[#1a1a0f]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.3)]">
              <Utensils size={24} className="text-black" />
            </div>
            <span className="text-3xl font-bold font-display tracking-tight text-white">MessMate</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
            Your Mess.<br/>
            <span className="text-primary text-glow outline-none">Your Voice.</span><br/>
            Transformed.
          </h1>
          <p className="text-text-secondary text-lg max-w-md">
            The intelligent dining management ecosystem designed to bring culinary excellence and data transparency to your hostel.
          </p>
        </div>

        {/* Floating Stat Cards */}
        <div className="relative z-10 flex space-x-6 mt-12">
          <div className="glass-card p-4 flex-1">
            <div className="flex items-center space-x-2 text-primary mb-2">
              <Users size={18} />
              <span className="text-2xl font-bold font-display">1200+</span>
            </div>
            <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Active Students</p>
          </div>
          <div className="glass-card p-4 flex-1 outline outline-1 outline-primary/30 shadow-[0_0_20px_rgba(255,184,0,0.1)]">
            <div className="flex items-center space-x-2 text-success mb-2">
              <TrendingUp size={18} />
              <span className="text-2xl font-bold font-display">98%</span>
            </div>
            <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Satisfaction Score</p>
          </div>
          <div className="glass-card p-4 flex-1">
            <div className="flex items-center space-x-2 text-secondary mb-2">
              <CheckCircle size={18} />
              <span className="text-2xl font-bold font-display">450+</span>
            </div>
            <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">Issues Resolved</p>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8 glass-card p-8 sm:p-10 relative z-10">
          
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(255,184,0,0.3)]">
              <Utensils size={20} className="text-black" />
            </div>
            <span className="text-2xl font-bold font-display tracking-tight text-white">MessMate</span>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold font-display text-white">Welcome Back</h2>
            <p className="text-text-secondary text-sm mt-2">Sign in to access your dashboard</p>
          </div>

          {/* Role Selector */}
          <div className="flex p-1 bg-surface rounded-xl border border-glass-border">
            {['student', 'admin', 'worker'].map((r) => (
              <button
                key={r}
                type="button"
                className={cn(
                  "flex-1 py-2 text-sm font-semibold capitalize rounded-lg transition-all duration-300",
                  role === r ? "bg-glass-bg text-primary shadow-sm border border-glass-border" : "text-text-secondary hover:text-white"
                )}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-alert/10 border border-alert/20 text-alert text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
                  <RoleIcon size={18} />
                </div>
                <input
                  type="text"
                  className="input-glass w-full pl-11 h-12"
                  placeholder={getPlaceholder()}
                  value={idStr}
                  onChange={(e) => setIdStr(e.target.value)}
                  // Let user leave empty to auto demo login
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="input-glass w-full pl-11 h-12"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-12 text-black font-semibold rounded-xl flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-text-secondary opacity-60">
            For demo: Leave fields blank and hit Access Dashboard to auto-login as selected role.
          </p>
        </div>
      </div>
    </div>
  );
}
