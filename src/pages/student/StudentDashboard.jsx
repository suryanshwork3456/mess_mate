import React from 'react';
import { Star, AlertTriangle, Lightbulb, CheckCircle2, Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Ratings Given', value: '12', icon: Star, color: 'text-primary' },
  { label: 'Complaints Filed', value: '2', icon: AlertTriangle, color: 'text-alert' },
  { label: 'Suggestions Made', value: '5', icon: Lightbulb, color: 'text-secondary' },
  { label: 'Resolved Issues', value: '2', icon: CheckCircle2, color: 'text-success' },
];

const todayMeals = [
  { type: 'Breakfast', time: '7:30 AM - 9:30 AM', items: ['Aloo Paratha', 'Curd', 'Tea', 'Banana'], rating: 4.2 },
  { type: 'Lunch', time: '12:30 PM - 2:30 PM', items: ['Rajma', 'Jeera Rice', 'Roti', 'Salad'], rating: 4.5 },
  { type: 'Dinner', time: '7:30 PM - 9:30 PM', items: ['Paneer Butter Masala', 'Naan', 'Gulab Jamun'], rating: null },
];

const trendingDishes = [
  { id: 1, name: 'Chole Bhature', votes: 145 },
  { id: 2, name: 'Masala Dosa', votes: 120 },
  { id: 3, name: 'Chicken Biryani', votes: 98 },
  { id: 4, name: 'Pav Bhaji', votes: 85 },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      
      {/* Top Section: Health Score & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Mess Health Score */}
        <div className="lg:col-span-1 glass-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none"></div>
          <h3 className="text-text-secondary font-medium mb-4">Mess Health Score</h3>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-surface-container-highest fill-none" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" className="stroke-primary fill-none" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.85)} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-display text-white">85</span>
              <span className="text-xs text-primary">/100</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-success flex items-center">
            <TrendingUp size={14} className="mr-1" /> +2% this week
          </p>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl bg-glass-bg border border-glass-border ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold font-display text-white mb-1">{stat.value}</p>
                <p className="text-xs text-text-secondary uppercase tracking-wider font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Menu */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold font-display text-white">Today's Menu</h2>
          <Link to="/student/menu" className="text-primary text-sm hover:underline flex items-center">
            View week <ArrowRight size={14} className="ml-1"/>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {todayMeals.map((meal, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col h-full group">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">{meal.type}</h3>
                <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-md">{meal.time}</span>
              </div>
              <ul className="flex-1 space-y-2 mb-6">
                {meal.items.map((item, i) => (
                  <li key={i} className="text-sm text-text-secondary flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full before:mr-2">
                    {item}
                  </li>
                ))}
              </ul>
              {meal.rating ? (
                <div className="flex items-center text-sm">
                  <Star size={16} className="text-primary mr-1 fill-primary" />
                  <span className="text-white font-medium">{meal.rating}</span>
                  <span className="text-text-secondary ml-1">avg rating</span>
                </div>
              ) : (
                <Link to="/student/rate" className="w-full btn-primary py-2 text-center text-sm shadow-none opacity-90 group-hover:opacity-100">
                  Rate Meal
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Complaints & Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Complaints */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-display text-white">Recent Complaints</h2>
            <Link to="/student/complaints" className="text-primary text-sm hover:underline text-text-secondary">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase border-b border-glass-border">
                <tr>
                  <th className="pb-3 px-2">Issue</th>
                  <th className="pb-3 px-2">Date</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-glass-border/50 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 font-medium text-white">Cold food during dinner</td>
                  <td className="py-3 px-2 text-text-secondary">Oct 12</td>
                  <td className="py-3 px-2"><span className="badge bg-alert/10 text-alert border border-alert/20">Reviewing</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 font-medium text-white">Plate hygiene issue</td>
                  <td className="py-3 px-2 text-text-secondary">Oct 10</td>
                  <td className="py-3 px-2"><span className="badge bg-success/10 text-success border border-success/20">Resolved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trending Suggestions */}
        <div className="lg:col-span-1 glass-card p-6 border-t-0 lg:border-t flex flex-col">
          <div className="flex items-center space-x-2 mb-6">
            <Flame size={20} className="text-secondary" />
            <h2 className="text-xl font-bold font-display text-white">Trending Dishes</h2>
          </div>
          <div className="flex-1 space-y-4">
            {trendingDishes.map((dish, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-surface border border-glass-border hover:border-primary/30 transition-colors">
                <span className="text-sm font-medium text-white">{dish.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-primary font-bold">{dish.votes}</span>
                  <button className="p-1.5 rounded-lg bg-glass-bg hover:bg-primary hover:text-black text-text-secondary transition-colors">
                    <Flame size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

// Needed because TrendingUp was used but not imported
import { TrendingUp } from 'lucide-react';
