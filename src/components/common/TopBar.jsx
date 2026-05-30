import React, { useContext } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function TopBar({ isAdmin, isWorker }) {
  const { user, logout } = useContext(AuthContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="h-20 border-b border-glass-border px-8 flex items-center justify-between z-10 shrink-0">
      <div>
        <h2 className="text-xl font-semibold text-white hidden sm:block">
          {isAdmin ? 'Command Center' : isWorker ? 'Task Dashboard' : `${getGreeting()}, ${user?.name || 'Student'} \uD83D\uDC4B`}
        </h2>
        <p className="text-sm text-text-secondary">{today}</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
          <Bell size={24} className="" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full border-2 border-background"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-glass-border">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
            <p className="text-xs text-text-secondary capitalize">{user?.role || 'Guest'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-black font-bold flex items-center justify-center">
            {user?.name ? user.name.slice(0,2).toUpperCase() : 'U'}
          </div>
          <button 
            onClick={logout}
            className="p-2 text-text-secondary hover:text-alert transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
