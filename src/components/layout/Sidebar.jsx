import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES, ROUTES } from '../../utils/constants';

function SidebarItem({ icon, label, to, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-title-md text-title-md ${
        active
          ? 'bg-primary-container text-on-primary font-bold'
          : 'text-on-primary/70 hover:bg-primary-container/50 hover:text-on-primary'
      }`}
    >
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isOrg = user?.role === ROLES.NGO || user?.role === ROLES.PANCHAYAT;

  const adminLinks = [
    { icon: 'dashboard', label: 'Dashboard', to: ROUTES.ADMIN_DASHBOARD },
    { icon: 'forest', label: 'Projects', to: ROUTES.ADMIN_PROJECTS },
    { icon: 'verified', label: 'MRV Verification', to: ROUTES.ADMIN_MRV_WORKSPACE.replace(':projectId', 'PRJ-2023-089'), basePath: '/mrv/workspace' },
    { icon: 'upload_file', label: 'Evidence Upload', to: ROUTES.ADMIN_MRV_UPLOAD },
    { icon: 'corporate_fare', label: 'Organizations', to: ROUTES.ADMIN_ORGANIZATIONS },
    { icon: 'workspace_premium', label: 'Carbon Credits', to: ROUTES.ADMIN_CARBON_CREDITS },
    { icon: 'link', label: 'Blockchain Registry', to: ROUTES.ADMIN_BLOCKCHAIN },
    { icon: 'satellite_alt', label: 'Drone & Sensor Data', to: ROUTES.ADMIN_MRV_PROJECT_VERIFICATION.replace(':verificationId', 'M-78392-BD'), basePath: '/mrv/project-verification' },
    { icon: 'assessment', label: 'Reports', to: ROUTES.ADMIN_REPORTS },
    { icon: 'history', label: 'Audit Trail', to: ROUTES.ADMIN_AUDIT },
    { icon: 'settings', label: 'Settings', to: ROUTES.ADMIN_SETTINGS },
  ];

  const orgLinks = [
    { icon: 'dashboard', label: 'Dashboard', to: ROUTES.ORG_DASHBOARD },
    { icon: 'forest', label: 'My Projects', to: ROUTES.ORG_PROJECTS },
    { icon: 'upload_file', label: 'Upload Evidence', to: ROUTES.ORG_UPLOAD_EVIDENCE },
    { icon: 'settings', label: 'Settings', to: ROUTES.ORG_SETTINGS },
  ];

  const links = isOrg ? orgLinks : adminLinks;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] bg-primary text-on-primary flex flex-col z-40 border-r border-outline/20">
      <div className="h-[var(--topbar-height)] flex items-center px-6 gap-3 border-b border-outline/20 bg-primary/95 backdrop-blur-md">
        <div className="w-8 h-8 rounded bg-surface/10 flex items-center justify-center p-1">
          {/* Using material icon as placeholder for logo */}
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">water_ec</span>
        </div>
        <span className="font-headline-md text-title-lg tracking-tight">Marine Ledger</span>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        <div className="px-4 mb-2 text-label-md font-label-md uppercase tracking-wider text-primary-fixed-dim">
          MAIN MENU
        </div>
        {links.map((link) => (
          <SidebarItem
            key={link.to}
            icon={link.icon}
            label={link.label}
            to={link.to}
            active={currentPath === link.to || currentPath.startsWith(link.to + '/') || (link.basePath && currentPath.startsWith(link.basePath))}
          />
        ))}
      </div>

      <div className="p-4 border-t border-outline/20 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline/30">
            <span className="material-symbols-outlined text-on-primary-container">person</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-title-md text-title-md truncate">{user?.name || 'NCCR Admin'}</span>
            <span className="font-body-md text-label-md text-on-primary/70 truncate">{user?.organization || 'National Centre for Coastal Research'}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-error hover:bg-error/10 transition-colors font-title-md text-body-md"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
