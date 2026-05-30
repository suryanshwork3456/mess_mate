import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, Star, AlertTriangle, Lightbulb, History, Users, Megaphone, CheckSquare, BarChart } from 'lucide-react';
import { cn } from '../../utils/helpers';

const studentNav = [
  { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { name: "Today's Menu", path: '/student/menu', icon: Utensils },
  { name: 'Rate Food', path: '/student/rate', icon: Star },
  { name: 'My Complaints', path: '/student/complaints', icon: AlertTriangle },
  { name: 'Dish Suggestions', path: '/student/suggestions', icon: Lightbulb },
  { name: 'My History', path: '/student/history', icon: History },
];

const adminNav = [
  { name: 'Command Center', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Complaint Mgt', path: '/admin/complaints', icon: AlertTriangle },
  { name: 'Menu Mgt', path: '/admin/menu', icon: Utensils },
  { name: 'Tasks', path: '/admin/commands', icon: CheckSquare },
  { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
];

export default function Sidebar({ role }) {
  const navItems = role === 'admin' ? adminNav : studentNav;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-glass-border">
      <div className="p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Utensils size={24} className="text-black" />
          </div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-primary">MessMate</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-text-secondary hover:text-white hover:bg-glass-border/50 border border-transparent"
              )
            }
          >
            <item.icon size={20} className="" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-card rounded-2xl p-4 border border-glass-border">
          <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_#22C55E]"></div>
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
