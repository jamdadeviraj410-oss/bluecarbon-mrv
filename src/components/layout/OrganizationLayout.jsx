import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function OrganizationLayout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-[var(--sidebar-width)] flex flex-col min-h-screen relative">
        <div className="flex-1 w-full flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

