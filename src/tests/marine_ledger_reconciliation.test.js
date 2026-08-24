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

  // 4. Drone & Sensor Data Feature integration
  await recordTest('Feature: DroneSensorDataPage is created and exported cleanly', () => {
    const pagePath = path.resolve('src', 'features', 'droneSensorData', 'DroneSensorDataPage.jsx');
    assert(fs.existsSync(pagePath), 'DroneSensorDataPage.jsx must exist');
    const code = fs.readFileSync(pagePath, 'utf8');
    assert(code.includes('DroneBeforeAfterView'), 'DroneSensorDataPage must embed DroneBeforeAfterView');
    assert(code.includes('SensorRegistryView'), 'DroneSensorDataPage must embed SensorRegistryView');
  });

  // 5. AppRoutes registers all canonical routes
  await recordTest('Routing: AppRoutes contains route declarations for all Marine Ledger paths', () => {
    const routesPath = path.resolve('src', 'routes', 'AppRoutes.jsx');
    const code = fs.readFileSync(routesPath, 'utf8');
    assert(code.includes('ROUTES.DASHBOARD'), 'AppRoutes must include ROUTES.DASHBOARD');
    assert(code.includes('ROUTES.PROJECTS'), 'AppRoutes must include ROUTES.PROJECTS');
    assert(code.includes('ROUTES.MRV_VERIFICATION'), 'AppRoutes must include ROUTES.MRV_VERIFICATION');
    assert(code.includes('ROUTES.EVIDENCE'), 'AppRoutes must include ROUTES.EVIDENCE');
    assert(code.includes('ROUTES.ORGANIZATIONS'), 'AppRoutes must include ROUTES.ORGANIZATIONS');
    assert(code.includes('ROUTES.CARBON_CREDITS'), 'AppRoutes must include ROUTES.CARBON_CREDITS');
    assert(code.includes('ROUTES.BLOCKCHAIN_REGISTRY'), 'AppRoutes must include ROUTES.BLOCKCHAIN_REGISTRY');
    assert(code.includes('ROUTES.DRONE_SENSOR_DATA'), 'AppRoutes must include ROUTES.DRONE_SENSOR_DATA');
    assert(code.includes('ROUTES.REPORTS'), 'AppRoutes must include ROUTES.REPORTS');
    assert(code.includes('ROUTES.AUDIT_TRAIL'), 'AppRoutes must include ROUTES.AUDIT_TRAIL');
    assert(code.includes('ROUTES.SETTINGS'), 'AppRoutes must include ROUTES.SETTINGS');
  });

  return testResults;
}
