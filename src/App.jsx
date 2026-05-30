import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import WorkerLayout from './layouts/WorkerLayout';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import RateFood from './pages/student/RateFood';
import TodaysMenu from './pages/student/TodaysMenu';
import Complaints from './pages/student/Complaints';
import Suggestions from './pages/student/Suggestions';
import History from './pages/student/History';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ComplaintManagement from './pages/admin/ComplaintManagement';
import MenuManagement from './pages/admin/MenuManagement';
import CommandCenter from './pages/admin/CommandCenter';
import Announcements from './pages/admin/Announcements';
import Analytics from './pages/admin/Analytics';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Student Routes */}
      <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="menu" element={<TodaysMenu />} />
        <Route path="rate" element={<RateFood />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="suggestions" element={<Suggestions />} />
        <Route path="history" element={<History />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="commands" element={<CommandCenter />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Worker Routes */}
      <Route path="/worker" element={<ProtectedRoute allowedRole="worker"><WorkerLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<WorkerDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
