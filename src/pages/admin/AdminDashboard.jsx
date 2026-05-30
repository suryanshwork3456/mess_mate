// import React from 'react';
// import { Users, AlertTriangle, TrendingUp, TrendingDown, Star, Activity, Plus } from 'lucide-react';
// import { Line, Doughnut, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: { display: false },
//     tooltip: { backgroundColor: '#1A1A1A', titleColor: '#FFFFFF', bodyColor: '#A0A0A0', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }
//   },
//   scales: {
//     x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A0A0A0' } },
//     y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A0A0A0' } }
//   }
// };

// const lineData = {
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   datasets: [{
//     label: 'Avg Rating',
//     data: [4.1, 4.3, 4.2, 4.5, 4.0, 4.6, 4.4],
//     borderColor: '#FFB800',
//     backgroundColor: 'rgba(255, 184, 0, 0.1)',
//     tension: 0.4,
//     fill: true,
//   }]
// };

// const donutData = {
//   labels: ['Food Quality', 'Hygiene', 'Quantity', 'Other'],
//   datasets: [{
//     data: [45, 25, 20, 10],
//     backgroundColor: ['#FFB800', '#FF6B35', '#A855F7', '#2A2A2A'],
//     borderWidth: 0,
//   }]
// };

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      
//       {/* Header Actions */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold font-display text-white">Overview</h2>
//         <div className="flex space-x-3">
//           <select className="input-glass text-sm h-10 py-0">
//             <option>This Week</option>
//             <option>Last Week</option>
//             <option>This Month</option>
//           </select>
//           <button className="btn-primary h-10 py-0 px-4 text-sm">Export PDF</button>
//         </div>
//       </div>

//       {/* KPIs */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {[
//           { label: 'Total Feedback', value: '450', trend: '+12%', icon: Star, color: 'text-primary' },
//           { label: 'Active Complaints', value: '18', trend: '-5%', icon: AlertTriangle, color: 'text-alert' },
//           { label: 'Avg Rating', value: '4.3', trend: '+0.1', icon: Activity, color: 'text-secondary' },
//           // Add more if needed
//         ].map((kpi, i) => (
//           <div key={i} className="glass-card p-4 col-span-2">
//             <div className="flex justify-between items-start mb-2">
//               <div className="text-text-secondary">
//                 <p className="text-xs uppercase tracking-wider font-semibold">{kpi.label}</p>
//                 <p className="text-2xl font-bold font-display text-white mt-1">{kpi.value}</p>
//               </div>
//               <div className={`p-2 rounded-lg bg-surface border border-glass-border ${kpi.color}`}>
//                 <kpi.icon size={18} />
//               </div>
//             </div>
//             <p className={`text-xs ${kpi.trend.startsWith('+') ? 'text-success' : 'text-alert'} flex items-center`}>
//               {kpi.trend.startsWith('+') ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
//               {kpi.trend} vs last period
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Main Charts Area */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col">
//           <h3 className="text-lg font-bold font-display text-white mb-4">Weekly Rating Trend</h3>
//           <div className="flex-1 min-h-0">
//             <Line data={lineData} options={chartOptions} />
//           </div>
//         </div>
//         <div className="lg:col-span-1 glass-card p-6 h-[400px] flex flex-col">
//           <h3 className="text-lg font-bold font-display text-white mb-4">Complaint Categories</h3>
//           <div className="flex-1 min-h-0 relative">
//             <Doughnut 
//               data={donutData} 
//               options={{...chartOptions, cutout: '75%'}} 
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className="text-center">
//                 <span className="text-3xl font-bold text-white block">18</span>
//                 <span className="text-xs text-text-secondary uppercase">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Insights & Table */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* AI Insights Card */}
//         <div className="lg:col-span-1 glass-card p-6 border border-[#A855F7]/30 shadow-[0_0_30px_rgba(168,85,247,0.05)] relative overflow-hidden group">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#A855F7]/20 transition-all duration-700"></div>
//           <div className="flex items-center space-x-2 text-[#A855F7] mb-6">
//             <Star size={20} className="fill-[#A855F7]" />
//             <h3 className="text-lg font-bold uppercase tracking-widest text-[#dcb5ff]">AI Synthesis</h3>
//           </div>
//           <div className="space-y-4">
//             <div className="p-4 rounded-xl bg-surface/50 border border-glass-border">
//               <p className="text-sm text-text-secondary">
//                 <strong className="text-white">Alert:</strong> Spikes in "cold food" complaints detected specifically during Tuesday dinners. Recommend checking bain-marie temperatures at 7:00 PM.
//               </p>
//             </div>
//             <div className="p-4 rounded-xl bg-surface/50 border border-glass-border">
//               <p className="text-sm text-text-secondary">
//                 <strong className="text-white">Trend:</strong> "Paneer Butter Masala" has hit a 95% approval rate. Consider making it a bi-weekly staple.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Priority Table */}
//         <div className="lg:col-span-2 glass-card p-6 flex flex-col">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-bold font-display text-white">Urgent Complaints</h3>
//             <button className="text-primary text-sm hover:underline">View All</button>
//           </div>
//           <div className="overflow-x-auto flex-1">
//             <table className="w-full text-sm text-left">
//               <thead className="text-xs text-text-secondary uppercase border-b border-glass-border">
//                 <tr>
//                   <th className="pb-3 px-2">ID</th>
//                   <th className="pb-3 px-2">Issue</th>
//                   <th className="pb-3 px-2">Priority</th>
//                   <th className="pb-3 px-2 text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-glass-border/50 hover:bg-white/5 transition-colors">
//                   <td className="py-3 px-2 text-text-secondary">#C-104</td>
//                   <td className="py-3 px-2 font-medium text-white">Stale bread served</td>
//                   <td className="py-3 px-2"><span className="badge bg-alert/10 text-alert border border-alert/20">High</span></td>
//                   <td className="py-3 px-2 text-right">
//                     <button className="text-primary hover:text-white transition-colors">Resolve</button>
//                   </td>
//                 </tr>
//                 <tr className="hover:bg-white/5 transition-colors">
//                   <td className="py-3 px-2 text-text-secondary">#C-105</td>
//                   <td className="py-3 px-2 font-medium text-white">Water cooler empty in Wing B</td>
//                   <td className="py-3 px-2"><span className="badge bg-secondary/10 text-secondary border border-secondary/20">Med</span></td>
//                   <td className="py-3 px-2 text-right">
//                     <button className="text-primary hover:text-white transition-colors">Resolve</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>

//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Star, Activity } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const API_BASE_URL = 'http://localhost:8000';

// Keep chart options static outside the component for optimization
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { 
      backgroundColor: '#1A1A1A', 
      titleColor: '#FFFFFF', 
      bodyColor: '#A0A0A0', 
      borderColor: 'rgba(255,255,255,0.1)', 
      borderWidth: 1 
    }
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A0A0A0' } },
    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A0A0A0' }, min: 1, max: 5 }
  }
};

export default function AdminDashboard() {
  // 1. Dashboard State Hooks
  const [metrics, setMetrics] = useState({ totalFeedback: 0, activeComplaints: 0, avgRating: 0.0 });
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [urgentComplaints, setUrgentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch Data from FastAPI Backend
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        // Parallelized fetch requests to keep your dashboard quick and responsive
        const [metricsRes, trendRes, categoriesRes, insightsRes, urgentRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/dashboard/metrics`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/weekly-ratings`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/complaints`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/insights`),
          fetch(`${API_BASE_URL}/api/admin/dashboard/complaints/urgent`)
        ]);

        const metricsData = await metricsRes.json();
        const trendData = await trendRes.json();
        const categoriesData = await categoriesRes.json();
        const insightsData = await insightsRes.json();
        const urgentData = await urgentRes.json();

        // Update states
        setMetrics(metricsData);
        setWeeklyTrend(trendData.trend || []);
        setComplaintCategories(categoriesData.categories || []);
        setAiInsights(insightsData.insights || []);
        setUrgentComplaints(urgentData || []);
      } catch (error) {
        console.error("Error synchronization administrative dashboard state:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // 3. Action Handler to resolve complaints directly from the table
  const handleResolve = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/complaints/${id}/resolve`, {
        method: 'PATCH',
      });
      if (response.ok) {
        // Responsively drop the resolved complaint row immediately out of state
        setUrgentComplaints(prev => prev.filter(complaint => complaint.id !== id));
        setMetrics(prev => ({ ...prev, activeComplaints: Math.max(0, prev.activeComplaints - 1) }));
      }
    } catch (error) {
      console.error("Failed to update status of structural complaint item:", error);
    }
  };

  // 4. Construct Live ChartJS Data Structures
  const lineData = {
    labels: weeklyTrend.map(item => item.day),
    datasets: [{
      label: 'Avg Rating',
      data: weeklyTrend.map(item => item.rating),
      borderColor: '#FFB800',
      backgroundColor: 'rgba(255, 184, 0, 0.1)',
      tension: 0.4,
      fill: true,
    }]
  };

  const donutData = {
    labels: complaintCategories.map(c => c.category),
    datasets: [{
      data: complaintCategories.map(c => c.count),
      backgroundColor: ['#FFB800', '#FF6B35', '#A855F7', '#2A2A2A'],
      borderWidth: 0,
    }]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-white font-medium">
        Syncing Admin Analytics Control Panel...
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display text-white">Overview</h2>
        <div className="flex space-x-3">
          <select className="input-glass text-sm h-10 py-0">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
          <button className="btn-primary h-10 py-0 px-4 text-sm">Export PDF</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Feedback', value: metrics.totalFeedback, trend: '+12%', icon: Star, color: 'text-primary' },
          { label: 'Active Complaints', value: metrics.activeComplaints, trend: '-5%', icon: AlertTriangle, color: 'text-alert' },
          { label: 'Avg Rating', value: Number(metrics.avgRating).toFixed(1), trend: '+0.1', icon: Activity, color: 'text-secondary' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-4 col-span-2">
            <div className="flex justify-between items-start mb-2">
              <div className="text-text-secondary">
                <p className="text-xs uppercase tracking-wider font-semibold">{kpi.label}</p>
                <p className="text-2xl font-bold font-display text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-surface border border-glass-border ${kpi.color}`}>
                <kpi.icon size={18} />
              </div>
            </div>
            <p className={`text-xs ${kpi.trend.startsWith('+') ? 'text-success' : 'text-alert'} flex items-center`}>
              {kpi.trend.startsWith('+') ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
              {kpi.trend} vs last period
            </p>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Trend Line Chart */}
        <div className="lg:col-span-2 glass-card p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold font-display text-white mb-4">Weekly Rating Trend</h3>
          <div className="flex-1 min-h-0">
            {weeklyTrend.length > 0 ? (
              <Line data={lineData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">No rating entries logged this week.</div>
            )}
          </div>
        </div>

        {/* Complaint Categories Donut Chart */}
        <div className="lg:col-span-1 glass-card p-6 h-[400px] flex flex-col">
          <h3 className="text-lg font-bold font-display text-white mb-4">Complaint Categories</h3>
          <div className="flex-1 min-h-0 relative">
            {complaintCategories.length > 0 ? (
              <>
                <Doughnut data={donutData} options={{...chartOptions, cutout: '75%'}} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-white block">{metrics.activeComplaints}</span>
                    <span className="text-xs text-text-secondary uppercase">Active</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">No active complaint parameters logged.</div>
            )}
          </div>
        </div>
      </div>

      {/* Insights & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insights Card */}
        <div className="lg:col-span-1 glass-card p-6 border border-[#A855F7]/30 shadow-[0_0_30px_rgba(168,85,247,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#A855F7]/20 transition-all duration-700"></div>
          <div className="flex items-center space-x-2 text-[#A855F7] mb-6">
            <Star size={20} className="fill-[#A855F7]" />
            <h3 className="text-lg font-bold uppercase tracking-widest text-[#dcb5ff]">AI Synthesis</h3>
          </div>
          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-1">
            {aiInsights.length > 0 ? (
              aiInsights.map((insight, index) => (
                <div key={index} className="p-4 rounded-xl bg-surface/50 border border-glass-border">
                  <p className="text-sm text-text-secondary">
                    <strong className="text-white">{insight.type}:</strong> {insight.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-text-secondary py-12">Parsing recent logs to generate feedback patterns...</div>
            )}
          </div>
        </div>

        {/* Priority Urgent Complaints Table */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold font-display text-white">Urgent Complaints</h3>
            <button className="text-primary text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-secondary uppercase border-b border-glass-border">
                <tr>
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">Issue</th>
                  <th className="pb-3 px-2">Priority</th>
                  <th className="pb-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {urgentComplaints.length > 0 ? (
                  urgentComplaints.map((complaint) => (
                    <tr key={complaint.id} className="border-b border-glass-border/50 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-2 text-text-secondary">#{complaint.custom_id || complaint.id}</td>
                      <td className="py-3 px-2 font-medium text-white">{complaint.issue}</td>
                      <td className="py-3 px-2">
                        <span className={`badge ${
                          complaint.priority === 'High' 
                            ? 'bg-alert/10 text-alert border border-alert/20' 
                            : 'bg-secondary/10 text-secondary border border-secondary/20'
                        }`}>
                          {complaint.priority}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button 
                          onClick={() => handleResolve(complaint.id)}
                          className="text-primary hover:text-white transition-colors"
                        >
                          Resolve
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-text-secondary py-12">
                      All urgent complaints resolved! Excellent management work.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}