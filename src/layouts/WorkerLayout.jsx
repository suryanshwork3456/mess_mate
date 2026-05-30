import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/common/TopBar';

export default function WorkerLayout() {
  return (
    <div className="flex flex-col h-screen bg-background text-text-primary font-sans overflow-hidden selection:bg-primary/30">
      <TopBar isWorker />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth will-change-scroll">
        <Outlet />
      </main>
      {/* Mobile-first bottom nav can be added here or in components */}
    </div>
  );
}
