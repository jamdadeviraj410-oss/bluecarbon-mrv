import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES, ROUTES } from '../../utils/constants';

function SidebarItem({ icon, label, to, active, badge }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all font-title-md text-sm ${
        active
          ? 'bg-primary-container text-on-primary font-bold shadow-sm'
          : 'text-on-primary/70 hover:bg-primary-container/50 hover:text-on-primary'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-[22px]">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono-data font-bold bg-secondary text-on-secondary">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCommunity = user?.role === ROLES.COMMUNITY;

  // Stitch Source of Truth: Canonical Marine Ledger Navigation
  const marineLedgerLinks = [
    { icon: 'dashboard', label: 'Dashboard', to: ROUTES.DASHBOARD, basePath: '/dashboard' },
    { icon: 'forest', label: 'Projects', to: ROUTES.PROJECTS, basePath: '/projects' },
    { icon: 'verified', label: 'MRV Verification', to: ROUTES.MRV_VERIFICATION, basePath: '/mrv' },
    { icon: 'upload_file', label: 'Evidence Upload', to: ROUTES.EVIDENCE, basePath: '/evidence' },
    { icon: 'corporate_fare', label: 'Organizations', to: ROUTES.ORGANIZATIONS, basePath: '/organizations' },
    { icon: 'workspace_premium', label: 'Carbon Credits', to: ROUTES.CARBON_CREDITS, basePath: '/carbon-credits' },
    { icon: 'link', label: 'Blockchain Registry', to: ROUTES.BLOCKCHAIN_REGISTRY, basePath: '/blockchain' },
    { icon: 'sensors', label: 'Drone & Sensor Data', to: ROUTES.DRONE_SENSOR_DATA, basePath: '/drone-sensor-data' },
    { icon: 'assessment', label: 'Reports', to: ROUTES.REPORTS, basePath: '/reports' },
    { icon: 'history', label: 'Audit Trail', to: ROUTES.AUDIT_TRAIL, basePath: '/audit' },
    { icon: 'settings', label: 'Settings', to: ROUTES.SETTINGS, basePath: '/settings' },
  ];

  // Community Portal Navigation
  const communityLinks = [
    { icon: 'dashboard', label: 'Community Dashboard', to: ROUTES.COMMUNITY_DASHBOARD },
    { icon: 'diversity_3', label: 'Community Portal & Logs', to: ROUTES.COMMUNITY_PORTAL },
    { icon: 'public', label: 'Public Registry', to: ROUTES.PUBLIC_REGISTRY },
  ];

  const links = isCommunity ? communityLinks : marineLedgerLinks;

  const isItemActive = (link) => {
    if (currentPath === link.to) return true;
    if (link.to !== '/' && currentPath.startsWith(link.to + '/')) return true;
    if (link.basePath && (currentPath === link.basePath || currentPath.startsWith(link.basePath + '/'))) return true;
    // Special alias matching for dashboard
    if (link.to === ROUTES.DASHBOARD && (currentPath === '/admin/dashboard' || currentPath === '/organization/dashboard')) return true;
    return false;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] bg-primary text-on-primary flex flex-col z-40 border-r border-outline/20">
      <div className="h-[var(--topbar-height)] flex items-center px-6 gap-3 border-b border-outline/20 bg-primary/95 backdrop-blur-md">
        <div className="w-8 h-8 rounded-lg bg-surface/15 flex items-center justify-center p-1">
          <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">water_ec</span>
        </div>
        <div>
          <span className="font-headline-md text-title-lg tracking-tight block leading-tight">Marine Ledger</span>
          <span className="text-[10px] font-mono-data text-primary-fixed-dim uppercase tracking-wider block">NCCR BlueCarbon MRV</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-5 px-3 flex flex-col gap-1 scrollbar-thin">
        <div className="px-3 mb-1 text-[11px] font-label-md uppercase tracking-wider text-primary-fixed-dim">
          {isCommunity ? 'COMMUNITY PORTAL' : 'MARINE LEDGER'}
        </div>
        {links.map((link) => (
          <SidebarItem
            key={link.to}
            icon={link.icon}
            label={link.label}
            to={link.to}
            badge={link.badge}
            active={isItemActive(link)}
          />
        ))}
      </div>

      <div className="p-4 border-t border-outline/20 mt-auto bg-primary/95">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-xl bg-primary-container/30 border border-outline/20">
          <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-outline/30 text-on-primary-container shrink-0">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-title-md text-xs font-bold truncate text-on-primary">{user?.name || 'User'}</span>
            <span className="font-body-md text-[11px] text-on-primary/70 truncate">{user?.organization || (isCommunity ? 'Community' : 'Registrar')}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-error hover:bg-error/10 transition-colors font-title-md text-xs font-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
