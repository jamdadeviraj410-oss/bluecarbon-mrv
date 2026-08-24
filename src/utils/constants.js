/**
 * Application-wide constants
 */

export const ROLES = {
  NCCR_ADMIN: 'NCCR_ADMIN',
  NGO: 'NGO',
  PANCHAYAT: 'PANCHAYAT',
  COMMUNITY: 'COMMUNITY',
  PUBLIC: 'PUBLIC',
};

export const PROJECT_STATUS = {
  ACTIVE: 'Active',
  VERIFIED: 'Verified',
  PENDING: 'Pending',
  UNDER_REVIEW: 'Under Review',
  REJECTED: 'Rejected',
  DRAFT: 'Draft',
  COMPLETED: 'Completed',
};

export const MRV_STATUS = {
  VERIFIED: 'Verified',
  UNDER_REVIEW: 'Under Review',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  DRAFT: 'Draft',
};

export const CREDIT_STATUS = {
  ACTIVE: 'Active',
  RETIRED: 'Retired',
  PENDING: 'Pending',
  MINTED: 'Minted',
};

export const ROUTES = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  ACCESS_RESTRICTED: '/access-restricted',

  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PROJECTS: '/projects',
  ADMIN_PROJECT_NEW: '/projects/new',
  ADMIN_PROJECT_DETAIL: '/projects/:id',
  ADMIN_MRV: '/admin/mrv',
  ADMIN_MRV_INTELLIGENCE: '/admin/mrv-intelligence',
  ADMIN_MRV_OCR: '/admin/mrv-intelligence/ocr',
  ADMIN_MRV_SENSORS: '/admin/mrv-intelligence/sensors',
  ADMIN_MRV_DRONE: '/admin/mrv-intelligence/drone',
  ADMIN_MRV_ANOMALIES: '/admin/mrv-intelligence/anomalies',
  ADMIN_MRV_UPLOAD: '/mrv/upload',
  ADMIN_MRV_PROJECT_VERIFICATION: '/mrv/project-verification/:verificationId',
  ADMIN_MRV_WORKSPACE: '/mrv/workspace/:projectId',
  ADMIN_ORGANIZATIONS: '/organizations',
  ADMIN_ORGANIZATION_DETAIL: '/organizations/:id',
  ADMIN_CARBON_CREDITS: '/admin/carbon-credits',
  ADMIN_CARBON_CREDIT_DETAIL: '/admin/carbon-credits/:id',
  ADMIN_BLOCKCHAIN: '/admin/blockchain',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_AUDIT: '/admin/audit',
  ADMIN_SETTINGS: '/admin/settings',

  ORG_DASHBOARD: '/organization/dashboard',
  ORG_PROJECTS: '/organization/projects',
  ORG_CREATE_PROJECT: '/organization/projects/new',
  ORG_PROJECT_DETAIL: '/organization/projects/:id',
  ORG_UPLOAD_EVIDENCE: '/organization/evidence/upload',
  ORG_SETTINGS: '/organization/settings',

  COMMUNITY_DASHBOARD: '/community/dashboard',
  COMMUNITY_PORTAL: '/community/portal',

  PUBLIC_REGISTRY: '/public',
  PUBLIC_PROJECT_DETAIL: '/public/projects/:id',
  PUBLIC_CREDIT_DETAIL: '/public/credits/:id',
  STATUS: '/status',
};
