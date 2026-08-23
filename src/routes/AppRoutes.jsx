import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

// Layouts
import AdminLayout from '../components/layout/AdminLayout';
import OrganizationLayout from '../components/layout/OrganizationLayout';
import PublicLayout from '../components/layout/PublicLayout';

// Auth Pages (will be implemented next)
import Login from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword';
import AccessRestricted from '../pages/auth/AccessRestricted';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

// Blockchain & Carbon Credits Pages
import {
  BlockchainRecordsPage,
  BlockchainRecordDetailPage,
} from '../features/blockchain';
import {
  CarbonCreditsPage,
  CarbonCreditDetailPage,
} from '../features/carbonCredits';

// Placeholder
import Placeholder from '../pages/Placeholder';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.ACCESS_RESTRICTED} element={<AccessRestricted />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_PROJECTS} element={<Placeholder title="Projects" />} />
        <Route path={ROUTES.ADMIN_PROJECT_DETAIL} element={<Placeholder title="Project Details" />} />
        <Route path={ROUTES.ADMIN_MRV} element={<Placeholder title="MRV Reports" />} />
        <Route path={ROUTES.ADMIN_MRV_DETAIL} element={<Placeholder title="MRV Details" />} />
        <Route path={ROUTES.ADMIN_ORGANIZATIONS} element={<Placeholder title="Organizations" />} />
        <Route path={ROUTES.ADMIN_CARBON_CREDITS} element={<CarbonCreditsPage />} />
        <Route path={ROUTES.ADMIN_CARBON_CREDIT_DETAIL} element={<CarbonCreditDetailPage />} />
        <Route path={ROUTES.ADMIN_BLOCKCHAIN} element={<BlockchainRecordsPage />} />
        <Route path="/admin/blockchain/:id" element={<BlockchainRecordDetailPage />} />
        
        {/* Direct / Shortcut Routes */}
        <Route path="/carbon-credits" element={<CarbonCreditsPage />} />
        <Route path="/carbon-credits/:id" element={<CarbonCreditDetailPage />} />
        <Route path="/blockchain" element={<BlockchainRecordsPage />} />
        <Route path="/blockchain/:id" element={<BlockchainRecordDetailPage />} />

        <Route path={ROUTES.ADMIN_REPORTS} element={<Placeholder title="Reports" />} />
        <Route path={ROUTES.ADMIN_AUDIT} element={<Placeholder title="Audit Trail" />} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<Placeholder title="Settings" />} />
      </Route>

      {/* Organization Routes */}
      <Route element={<OrganizationLayout />}>
        <Route path={ROUTES.ORG_DASHBOARD} element={<Placeholder title="Organization Dashboard" />} />
        <Route path={ROUTES.ORG_PROJECTS} element={<Placeholder title="My Projects" />} />
        <Route path={ROUTES.ORG_CREATE_PROJECT} element={<Placeholder title="Create Project" />} />
        <Route path={ROUTES.ORG_PROJECT_DETAIL} element={<Placeholder title="Project Details" />} />
        <Route path={ROUTES.ORG_UPLOAD_EVIDENCE} element={<Placeholder title="Upload Evidence" />} />
        <Route path={ROUTES.ORG_SETTINGS} element={<Placeholder title="Settings" />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.PUBLIC_REGISTRY} element={<Placeholder title="Public Registry" />} />
        <Route path={ROUTES.PUBLIC_PROJECT_DETAIL} element={<Placeholder title="Public Project Details" />} />
        <Route path={ROUTES.PUBLIC_CREDIT_DETAIL} element={<CarbonCreditDetailPage />} />
      </Route>

      {/* Status Page */}
      <Route path={ROUTES.STATUS} element={<Placeholder title="System Status" />} />
      
      {/* Catch-all */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
