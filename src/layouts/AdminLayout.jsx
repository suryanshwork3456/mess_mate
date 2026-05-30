import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background text-text-primary font-sans overflow-hidden selection:bg-primary/30">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar isAdmin />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth will-change-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
