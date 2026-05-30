import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const initialTasks = [
  { id: 'T-101', title: 'Refill Water Coolers', desc: 'Wing A and B coolers are empty.', priority: 'Medium', status: 'Pending', time: '10:30 AM' },
  { id: 'T-102', title: 'Check Bain-Marie Temps', desc: 'Dinner service prep. Ensure 70°C+', priority: 'High', status: 'In Progress', time: '6:00 PM' },
];

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-alert/10 text-alert border-alert/30';
    if (p === 'Medium') return 'bg-secondary/10 text-secondary border-secondary/30';
    return 'bg-success/10 text-success border-success/30';
  };

  const getPriorityBorder = (p) => {
    if (p === 'High') return 'border-l-alert';
    if (p === 'Medium') return 'border-l-secondary';
    return 'border-l-success';
  };

  const cycleStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        let newStatus = t.status === 'Pending' ? 'In Progress' 
                     : t.status === 'In Progress' ? 'Completed' 
                     : 'Completed';
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl font-bold font-display text-white">My Tasks</h2>
      </div>

      <div className="space-y-4">
        {tasks.filter(t => t.status !== 'Completed').map(task => (
          <div key={task.id} className={cn("glass-card p-5 border-l-4", getPriorityBorder(task.priority))}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              <span className={cn("px-2 py-1 text-xs font-semibold rounded-md border", getPriorityColor(task.priority))}>
                {task.priority}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-4">{task.desc}</p>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center text-xs text-text-secondary bg-surface px-2 py-1 rounded-md border border-glass-border">
                <Clock size={12} className="mr-1" />
                {task.time}
              </div>
              <button 
                onClick={() => cycleStatus(task.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border",
                  task.status === 'Pending' 
                    ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(255,184,0,0.2)]" 
                    : "bg-secondary text-black border-secondary shadow-[0_0_10px_rgba(255,107,53,0.2)]"
                )}
              >
                {task.status === 'Pending' ? 'Start Task' : 'Complete Task'}
              </button>
            </div>
          </div>
        ))}

        {tasks.filter(t => t.status !== 'Completed').length === 0 && (
           <div className="text-center py-12 glass-card">
             <CheckCircle2 className="mx-auto text-success mb-4" size={32} />
             <h3 className="text-white font-semibold">All caught up!</h3>
             <p className="text-text-secondary text-sm">No active tasks right now.</p>
           </div>
        )}
      </div>

      {/* Completed Section */}
      {tasks.filter(t => t.status === 'Completed').length > 0 && (
        <div className="pt-8">
          <h2 className="text-lg font-bold font-display text-text-secondary mb-4">Completed Today</h2>
          <div className="space-y-3 opacity-60">
            {tasks.filter(t => t.status === 'Completed').map(task => (
              <div key={task.id} className="glass-card p-4 flex justify-between items-center bg-surface/30">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="text-success" size={20} />
                  <span className="text-white font-medium line-through decoration-text-secondary">{task.title}</span>
                </div>
                <span className="text-xs text-text-secondary">{task.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
