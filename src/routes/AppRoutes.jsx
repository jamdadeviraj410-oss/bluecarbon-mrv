import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLES, ROUTES } from '../utils/constants';
import RoleRoute from '../components/auth/RoleRoute';
import AdminLayout from '../components/layout/AdminLayout';
import OrganizationLayout from '../components/layout/OrganizationLayout';
import PublicLayout from '../components/layout/PublicLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import AccessRestricted from '../pages/auth/AccessRestricted';
import StatusTransitionPage from '../pages/auth/StatusTransitionPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NationalGovernancePage from '../features/governance/pages/NationalGovernancePage';
import NationalMapExplorerPage from '../features/governance/pages/NationalMapExplorerPage';
import GovernanceQueuesPage from '../features/governance/pages/GovernanceQueuesPage';
import OrganizationOnboardingPage from '../features/onboarding/pages/OrganizationOnboardingPage';
import OnboardingStatusPage from '../features/onboarding/pages/OnboardingStatusPage';
import OrganizationDashboardPage from '../features/organizations/pages/OrganizationDashboardPage';
import OrganizationProjectsPage from '../features/organizations/pages/OrganizationProjectsPage';
import OrganizationsPage from '../features/organizations/pages/OrganizationsPage';
import ProjectsPage from '../features/projects/pages/ProjectsPage';
import ProjectDetailPage from '../features/projects/pages/ProjectDetailPage';
import ProjectFormPage from '../features/projects/pages/ProjectFormPage';
import UploadMrvEvidencePage from '../features/mrv/pages/UploadMrvEvidencePage';
import ProjectVerificationPage from '../features/mrv/pages/ProjectVerificationPage';
import MrvVerificationWorkspacePage from '../features/mrv/pages/MrvVerificationWorkspacePage';
import MrvBlockchainAnchorPage from '../features/mrv/pages/MrvBlockchainAnchorPage';
import { BlockchainRecordsPage, BlockchainRecordDetailPage } from '../features/blockchain';
import { CarbonCreditsPage, CarbonCreditDetailPage } from '../features/carbonCredits';
import { ReportsPage, ReportDetailPage } from '../features/reports';
import { AuditTrailPage, AuditTrailDetailPage } from '../features/auditTrail';
import { PublicRegistryPage, PublicRegistryDetailPage, CreditDnaProvenancePage } from '../features/publicRegistry';
import { CommunityDashboardPage, CommunityPortalPage } from '../features/community';
import { OcrReviewWorkspace } from '../features/ocr';
import { SensorRegistryView } from '../features/sensors';
import { DroneBeforeAfterView } from '../features/drone';
import { DroneSensorDataPage } from '../features/droneSensorData';
import { MrvIntelligenceDashboard, MrvAnomalyMatrix } from '../features/mrvIntelligence';
import { SettingsPage } from '../features/settings';

import { IS_UI_PREVIEW_MODE } from '../config/uiPreviewMode';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Authentication & Onboarding Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.ACCESS_RESTRICTED} element={<AccessRestricted />} />
      <Route path={ROUTES.ONBOARDING} element={<OrganizationOnboardingPage />} />
      <Route path={ROUTES.ONBOARDING_STATUS} element={<OnboardingStatusPage />} />
      <Route path="/" element={<Navigate to={IS_UI_PREVIEW_MODE ? ROUTES.DASHBOARD : ROUTES.LOGIN} replace />} />

      {/* Canonical Marine Ledger & National Governance Routes (NCCR_ADMIN Only) */}
      <Route element={<RoleRoute allowedRoles={[ROLES.NCCR_ADMIN]}><AdminLayout /></RoleRoute>}>
        {/* Canonical Marine Ledger Routes */}
        <Route path={ROUTES.DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
        <Route path={ROUTES.PROJECT_NEW} element={<ProjectFormPage />} />
        <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetailPage />} />
        <Route path={ROUTES.MRV_VERIFICATION} element={<ProjectVerificationPage />} />
        <Route path={ROUTES.MRV_PROJECT_VERIFICATION} element={<ProjectVerificationPage />} />
        <Route path={ROUTES.MRV_WORKSPACE} element={<MrvVerificationWorkspacePage />} />
        <Route path={ROUTES.EVIDENCE} element={<UploadMrvEvidencePage />} />
        <Route path={ROUTES.ORGANIZATIONS} element={<OrganizationsPage />} />
        <Route path={ROUTES.ORGANIZATION_DETAIL} element={<OrganizationsPage />} />
        <Route path={ROUTES.CARBON_CREDITS} element={<CarbonCreditsPage />} />
        <Route path={ROUTES.CARBON_CREDIT_DETAIL} element={<CarbonCreditDetailPage />} />
        <Route path={ROUTES.BLOCKCHAIN_REGISTRY} element={<BlockchainRecordsPage />} />
        <Route path={ROUTES.BLOCKCHAIN_DETAIL} element={<BlockchainRecordDetailPage />} />
        <Route path={ROUTES.DRONE_SENSOR_DATA} element={<DroneSensorDataPage />} />
        <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
        <Route path={ROUTES.REPORT_DETAIL} element={<ReportDetailPage />} />
        <Route path={ROUTES.AUDIT_TRAIL} element={<AuditTrailPage />} />
        <Route path={ROUTES.AUDIT_DETAIL} element={<AuditTrailDetailPage />} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />

        {/* National Governance & Deep Audit Sub-routes */}
        <Route path={ROUTES.ADMIN_GOVERNANCE} element={<NationalGovernancePage />} />
        <Route path="/governance" element={<NationalGovernancePage />} />
        <Route path={ROUTES.ADMIN_NATIONAL_MAP} element={<NationalMapExplorerPage />} />
        <Route path="/national-map" element={<NationalMapExplorerPage />} />
        <Route path={ROUTES.ADMIN_GOVERNANCE_QUEUES} element={<GovernanceQueuesPage />} />
        <Route path="/governance/queues" element={<GovernanceQueuesPage />} />
        <Route path={ROUTES.ADMIN_MRV} element={<Navigate to={ROUTES.MRV_WORKSPACE.replace(':projectId', 'PRJ-2023-089')} replace />} />
        <Route path={ROUTES.ADMIN_MRV_UPLOAD} element={<UploadMrvEvidencePage />} />
        <Route path="/mrv/blockchain/:submissionId" element={<MrvBlockchainAnchorPage />} />
        <Route path="/blockchain" element={<BlockchainRecordsPage />} />
        <Route path="/blockchain/:id" element={<BlockchainRecordDetailPage />} />
        <Route path="/admin/blockchain/:id" element={<BlockchainRecordDetailPage />} />
        <Route path={ROUTES.ADMIN_OCR_REVIEW} element={<OcrReviewWorkspace />} />
        <Route path="/mrv/ocr" element={<OcrReviewWorkspace />} />
        <Route path={ROUTES.ADMIN_SENSORS} element={<SensorRegistryView />} />
        <Route path="/sensors" element={<SensorRegistryView />} />
        <Route path={ROUTES.ADMIN_DRONE} element={<DroneBeforeAfterView />} />
        <Route path="/drone" element={<DroneBeforeAfterView />} />
        <Route path={ROUTES.ADMIN_MRV_INTELLIGENCE} element={<MrvIntelligenceDashboard />} />
        <Route path="/mrv/intelligence" element={<MrvIntelligenceDashboard />} />
        <Route path={ROUTES.ADMIN_MRV_ANOMALIES} element={<MrvAnomalyMatrix />} />
        <Route path="/mrv/anomalies" element={<MrvAnomalyMatrix />} />
        <Route path="/admin/reports/:id" element={<ReportDetailPage />} />
        <Route path="/admin/audit/:id" element={<AuditTrailDetailPage />} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<SettingsPage />} />
      </Route>

      {/* Organization Portal Routes (NGO, Panchayat, Project Manager, NCCR_ADMIN) */}
      <Route element={<RoleRoute allowedRoles={[ROLES.NGO, ROLES.PANCHAYAT, ROLES.PROJECT_MANAGER, ROLES.NCCR_ADMIN]}><OrganizationLayout /></RoleRoute>}>
        <Route path={ROUTES.ORG_DASHBOARD} element={<OrganizationDashboardPage />} />
        <Route path={ROUTES.ORG_PROJECTS} element={<OrganizationProjectsPage />} />
        <Route path={ROUTES.ORG_CREATE_PROJECT} element={<ProjectFormPage />} />
        <Route path={ROUTES.ORG_PROJECT_DETAIL} element={<ProjectDetailPage />} />
        <Route path={ROUTES.ORG_UPLOAD_EVIDENCE} element={<UploadMrvEvidencePage />} />
        <Route path={ROUTES.ORG_SETTINGS} element={<SettingsPage />} />
      </Route>

      {/* Community User Portal Routes (COMMUNITY, NCCR_ADMIN) */}
      <Route element={<RoleRoute allowedRoles={[ROLES.COMMUNITY, ROLES.NCCR_ADMIN]}><OrganizationLayout /></RoleRoute>}>
        <Route path={ROUTES.COMMUNITY_DASHBOARD} element={<CommunityDashboardPage />} />
        <Route path={ROUTES.COMMUNITY_PORTAL} element={<CommunityPortalPage />} />
      </Route>

      {/* Public Registry & Credit DNA Transparency Routes */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.PUBLIC_REGISTRY} element={<PublicRegistryPage />} />
        <Route path={ROUTES.PUBLIC_PROJECT_DETAIL} element={<PublicRegistryDetailPage />} />
        <Route path={ROUTES.PUBLIC_CREDIT_DETAIL} element={<CarbonCreditDetailPage />} />
        <Route path={ROUTES.PUBLIC_PROVENANCE_DETAIL} element={<CreditDnaProvenancePage />} />
      </Route>

      <Route path={ROUTES.STATUS} element={<StatusTransitionPage />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}
