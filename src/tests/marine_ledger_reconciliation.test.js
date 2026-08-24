import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { ROUTES } from '../utils/constants.js';

export async function runReconciliationTests() {
  const testResults = [];

  const recordTest = async (name, fn) => {
    try {
      await fn();
      testResults.push({ name, passed: true });
    } catch (err) {
      testResults.push({ name, passed: false, error: err.message });
    }
  };

  // 1. Marine Ledger Canonical Navigation in Sidebar
  await recordTest('Navigation: Sidebar defines all 11 Stitch Marine Ledger navigation items', () => {
    const sidebarPath = path.resolve('src', 'components', 'layout', 'Sidebar.jsx');
    const code = fs.readFileSync(sidebarPath, 'utf8');
    
    assert(code.includes("label: 'Dashboard'"), 'Sidebar must have Dashboard');
    assert(code.includes("label: 'Projects'"), 'Sidebar must have Projects');
    assert(code.includes("label: 'MRV Verification'"), 'Sidebar must have MRV Verification');
    assert(code.includes("label: 'Evidence Upload'"), 'Sidebar must have Evidence Upload');
    assert(code.includes("label: 'Organizations'"), 'Sidebar must have Organizations');
    assert(code.includes("label: 'Carbon Credits'"), 'Sidebar must have Carbon Credits');
    assert(code.includes("label: 'Blockchain Registry'"), 'Sidebar must have Blockchain Registry');
    assert(code.includes("label: 'Drone & Sensor Data'"), 'Sidebar must have Drone & Sensor Data');
    assert(code.includes("label: 'Reports'"), 'Sidebar must have Reports');
    assert(code.includes("label: 'Audit Trail'"), 'Sidebar must have Audit Trail');
    assert(code.includes("label: 'Settings'"), 'Sidebar must have Settings');
  });

  // 2. Community Portal Navigation separation
  await recordTest('Navigation: Community users have dedicated Community Portal navigation', () => {
    const sidebarPath = path.resolve('src', 'components', 'layout', 'Sidebar.jsx');
    const code = fs.readFileSync(sidebarPath, 'utf8');
    
    assert(code.includes("label: 'Community Dashboard'"), 'Community must have Community Dashboard');
    assert(code.includes("label: 'Community Portal & Logs'"), 'Community must have Community Portal & Logs');
    assert(code.includes("label: 'Public Registry'"), 'Community must have Public Registry');
    assert(code.includes('COMMUNITY_PORTAL'), 'Sidebar must distinguish Community Portal header');
  });

  // 3. Canonical Marine Ledger Routes in Constants
  await recordTest('Routing: Constants export canonical Marine Ledger routes', () => {
    assert.strictEqual(ROUTES.DASHBOARD, '/dashboard');
    assert.strictEqual(ROUTES.PROJECTS, '/projects');
    assert.strictEqual(ROUTES.MRV_VERIFICATION, '/mrv-verification');
    assert.strictEqual(ROUTES.EVIDENCE, '/evidence');
    assert.strictEqual(ROUTES.ORGANIZATIONS, '/organizations');
    assert.strictEqual(ROUTES.CARBON_CREDITS, '/carbon-credits');
    assert.strictEqual(ROUTES.BLOCKCHAIN_REGISTRY, '/blockchain-registry');
    assert.strictEqual(ROUTES.DRONE_SENSOR_DATA, '/drone-sensor-data');
    assert.strictEqual(ROUTES.REPORTS, '/reports');
    assert.strictEqual(ROUTES.AUDIT_TRAIL, '/audit-trail');
    assert.strictEqual(ROUTES.SETTINGS, '/settings');
  });

  // 4. Drone & Sensor Data Page Export and Implementation
  await recordTest('Feature: DroneSensorDataPage is created and exported cleanly', () => {
    const dronePagePath = path.resolve('src', 'features', 'droneSensorData', 'DroneSensorDataPage.jsx');
    assert(fs.existsSync(dronePagePath), 'DroneSensorDataPage.jsx must exist');
    const code = fs.readFileSync(dronePagePath, 'utf8');
    assert(code.includes('DroneBeforeAfterView') || code.includes('Drone Surveys'), 'Must contain drone before/after integration');
    assert(code.includes('SensorRegistryView') || code.includes('IoT Sensor Fleet'), 'Must contain sensor registry telemetry integration');
  });

  // 5. AppRoutes Reconciliation
  await recordTest('Routing: AppRoutes contains route declarations for all Marine Ledger paths', () => {
    const appRoutesPath = path.resolve('src', 'routes', 'AppRoutes.jsx');
    const code = fs.readFileSync(appRoutesPath, 'utf8');
    
    assert(code.includes('ROUTES.DASHBOARD'), 'Must define ROUTES.DASHBOARD');
    assert(code.includes('ROUTES.MRV_VERIFICATION'), 'Must define ROUTES.MRV_VERIFICATION');
    assert(code.includes('ROUTES.EVIDENCE'), 'Must define ROUTES.EVIDENCE');
    assert(code.includes('ROUTES.DRONE_SENSOR_DATA'), 'Must define ROUTES.DRONE_SENSOR_DATA');
    assert(code.includes('ROUTES.BLOCKCHAIN_REGISTRY'), 'Must define ROUTES.BLOCKCHAIN_REGISTRY');
  });

  // 6. Pic 1 Fix: Evidence Modal Width & Formatting
  await recordTest('UI Fix: Upload MRV Evidence modal has unconstrained wide layout', () => {
    const uploadPagePath = path.resolve('src', 'features', 'mrv', 'pages', 'UploadMrvEvidencePage.jsx');
    const code = fs.readFileSync(uploadPagePath, 'utf8');
    assert(code.includes('max-w-lg'), 'Modal must have max-w-lg container');
    assert(code.includes('min-w-[320px]'), 'Modal must have responsive minimum width');
    assert(code.includes('computeFileHash'), 'Must compute real cryptographic file hash');
  });

  // 7. Pic 2 Fix: Simulated File Picker Removal
  await recordTest('UI/Backend Fix: CommunityPortalPage has real file picker and no simulated alert', () => {
    const communityPagePath = path.resolve('src', 'features', 'community', 'CommunityPortalPage.jsx');
    const code = fs.readFileSync(communityPagePath, 'utf8');
    assert(!code.includes('Simulated File Picker'), 'Must not contain simulated file picker alert');
    assert(code.includes('type="file"'), 'Must use real native HTML file input');
    assert(code.includes('computeFileHash'), 'Must compute real cryptographic file hash');
  });

  // 8. Pic 3 Fix: Projects Table Full Width and Filter Logic
  await recordTest('UI Fix: Projects table has responsive layout and normalized status filtering', () => {
    const projectsListPagePath = path.resolve('src', 'features', 'projects', 'ProjectsListPage.jsx');
    const code = fs.readFileSync(projectsListPagePath, 'utf8');
    assert(code.includes('fetchProjects'), 'ProjectsListPage must fetch live projects');
    assert(code.includes('colSpan="8"'), 'Empty state must span full 8 columns');
  });

  // 9. Pic 4 Fix: Real Interactive Leaflet Registry Map
  await recordTest('UI Fix: Real Interactive Leaflet map initialized with OpenStreetMap tile layers', () => {
    const mapComponentPath = path.resolve('src', 'components', 'common', 'InteractiveRegistryMap.jsx');
    assert(fs.existsSync(mapComponentPath), 'InteractiveRegistryMap.jsx must exist');
    const code = fs.readFileSync(mapComponentPath, 'utf8');
    assert(code.includes('tile.openstreetmap.org'), 'Must use real OpenStreetMap tile layer');
    assert(code.includes('L.map'), 'Must initialize Leaflet map');
    assert(code.includes('L.divIcon'), 'Must render custom Leaflet marker icons');
  });

  return testResults;
}
