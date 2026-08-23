/**
 * Audit Trail Service Layer
 * BlueCarbon MRV Registry
 * Provides comprehensive audit events, cryptographic immutability records, and filtering
 */

export const mockAuditEntries = [
  {
    id: 'ACT-8271',
    refId: 'ACT-8271',
    timestamp: '2023-10-24T14:20:05Z',
    displayTimestamp: '24 Oct 2023, 14:20:05',
    timestampUtc: '24 Oct 2023, 14:20:05 UTC',
    user: 'Dr. Sarah Jenkins',
    role: 'Lead Verifier',
    userRole: 'NCCR_ADMIN',
    organization: 'BioMarine NGO',
    action: 'MRV Approved',
    project: 'Red Sea Mangrove',
    projectId: 'PRJ-2023-089',
    entity: 'Carbon Credit',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'Final approval of Monitoring, Reporting, and Verification (MRV) report Q3 2023. Validated spatial biomass growth of 4.2% against baseline.',
    stateChange: {
      old: '"mrv_status": "Pending_Review"',
      new: '"mrv_status": "Approved"',
    },
    ipAddress: '192.168.1.145',
    txHash: '0x8f2a994b9c3e12a4b8109d77f24098231a4781bc',
    txHashShort: '0x8f2a...4b9c',
    blockNumber: 48199201,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8270',
    refId: 'ACT-8270',
    timestamp: '2023-10-24T11:15:30Z',
    displayTimestamp: '24 Oct 2023, 11:15:30',
    timestampUtc: '24 Oct 2023, 11:15:30 UTC',
    user: 'Ahmed Al-Fayed',
    role: 'GIS Specialist',
    userRole: 'NGO',
    organization: 'Ministry of Env',
    action: 'Survey Uploaded',
    project: 'Gulf Coast Seagrass',
    projectId: 'PRJ-2023-102',
    entity: 'Drone Survey',
    status: 'Rejected',
    statusDot: 'bg-[#ba1a1a]',
    statusColor: 'error',
    description:
      'High-resolution multispectral survey dataset (GeoTIFF, 1.4 GB) uploaded for Gulf Coast Seagrass plot B-4. Quality inspection failed cloud threshold.',
    stateChange: {
      old: '"survey_quality": "Under_Analysis"',
      new: '"survey_quality": "Cloud_Cover_Excess_Rejected"',
    },
    ipAddress: '172.16.44.12',
    txHash: '0x3c1d09f4a7b2e8a1d5f9c0e2a4b6c8e0a29481bc',
    txHashShort: '0x3c1d...81bc',
    blockNumber: 48198940,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8269',
    refId: 'ACT-8269',
    timestamp: '2023-10-23T09:45:12Z',
    displayTimestamp: '23 Oct 2023, 09:45:12',
    timestampUtc: '23 Oct 2023, 09:45:12 UTC',
    user: 'System Auto',
    role: 'Automated Oracle',
    userRole: 'SYSTEM',
    organization: '-',
    action: 'Sensor Data Added',
    project: 'Red Sea Mangrove',
    projectId: 'PRJ-2023-089',
    entity: 'Telemetry',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'Automated ingestion of IoT soil salinity and water table level telemetry from 16 sensor nodes in Ratnagiri sector 3.',
    stateChange: {
      old: '"sensor_sync_epoch": 1698048000',
      new: '"sensor_sync_epoch": 1698054312',
    },
    ipAddress: '10.0.8.204',
    txHash: '0x9e2b4d7c0f1a3b5e7d9c1b3a5f7e9d1c810427bc',
    txHashShort: '0x9e2b...27bc',
    blockNumber: 48197410,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8268',
    refId: 'ACT-8268',
    timestamp: '2023-10-22T16:30:00Z',
    displayTimestamp: '22 Oct 2023, 16:30:00',
    timestampUtc: '22 Oct 2023, 16:30:00 UTC',
    user: 'Priya Sharma',
    role: 'Project Lead',
    userRole: 'NGO',
    organization: 'EcoTrust India',
    action: 'Project Registered',
    project: 'Maharashtra Mangrove Restoration',
    projectId: 'PRJ-2023-089',
    entity: 'Project',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'New blue carbon project proposal submitted with 128 ha coastal polygon shapefile, baseline biomass model, and 5-year replanting timeline.',
    stateChange: {
      old: '"project_state": "Draft"',
      new: '"project_state": "Submitted_For_Review"',
    },
    ipAddress: '203.115.82.19',
    txHash: '0x7a3f8b2e1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
    txHashShort: '0x7a3f...6e7f',
    blockNumber: 48195120,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8267',
    refId: 'ACT-8267',
    timestamp: '2023-10-21T18:10:45Z',
    displayTimestamp: '21 Oct 2023, 18:10:45',
    timestampUtc: '21 Oct 2023, 18:10:45 UTC',
    user: 'Smart Contract Engine',
    role: 'Token Registry',
    userRole: 'SYSTEM',
    organization: 'BlueCarbon MRV Ltd.',
    action: 'Credits Minted',
    project: 'Maharashtra Mangrove Restoration',
    projectId: 'PRJ-2023-089',
    entity: 'Carbon Credit',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'Minted 14,200 ERC-1155 EcoToken carbon credits (Serial range: BC-2023-089-00001 to BC-2023-089-14200) to verified registry treasury.',
    stateChange: {
      old: '"minted_supply": 0',
      new: '"minted_supply": 14200',
    },
    ipAddress: '127.0.0.1 (Oracle Engine)',
    txHash: '0x5c8e1a4d9f2b7a0c3e6d8f1b4a7c9e0d2f5a8b1c',
    txHashShort: '0x5c8e...8b1c',
    blockNumber: 48193890,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8266',
    refId: 'ACT-8266',
    timestamp: '2023-10-20T13:05:22Z',
    displayTimestamp: '20 Oct 2023, 13:05:22',
    timestampUtc: '20 Oct 2023, 13:05:22 UTC',
    user: 'Admin User',
    role: 'Registrar Officer',
    userRole: 'NCCR_ADMIN',
    organization: 'Registrar Office',
    action: 'Organization Approved',
    project: 'General',
    projectId: 'ORG-2023-004',
    entity: 'Organization',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'Approved registration of Kerala Coastal Authority as verified NGO partner after statutory document validation.',
    stateChange: {
      old: '"kyc_status": "Pending"',
      new: '"kyc_status": "Verified_Active"',
    },
    ipAddress: '103.21.144.50',
    txHash: '0x1d4e7f0a3b6c9e2a5f8b1c4d7e0a3f6b9c2e5a8d',
    txHashShort: '0x1d4e...5a8d',
    blockNumber: 48192100,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8265',
    refId: 'ACT-8265',
    timestamp: '2023-10-19T15:40:18Z',
    displayTimestamp: '19 Oct 2023, 15:40:18',
    timestampUtc: '19 Oct 2023, 15:40:18 UTC',
    user: 'Corporate Beneficiary',
    role: 'Credit Buyer',
    userRole: 'PUBLIC',
    organization: 'Tata Sustainability Fund',
    action: 'Credits Retired',
    project: 'Maharashtra Mangrove Restoration',
    projectId: 'PRJ-2023-089',
    entity: 'Carbon Credit',
    status: 'Verified',
    statusDot: 'bg-[#1b6d24]',
    statusColor: 'success',
    description:
      'Permanent retirement of 5,600 tCO2e carbon credits for Corporate Scope 1 emissions offset. Retirement certificate CR-RET-8921 issued.',
    stateChange: {
      old: '"active_credits": 14200, "retired_credits": 0',
      new: '"active_credits": 8600, "retired_credits": 5600',
    },
    ipAddress: '49.36.120.88',
    txHash: '0x4b7c0e3a6d9f2a5b8c1e4d7f0a3b6c9e2a5f8b1c',
    txHashShort: '0x4b7c...8b1c',
    blockNumber: 48190560,
    network: 'Polygon Mainnet',
  },
  {
    id: 'ACT-8264',
    refId: 'ACT-8264',
    timestamp: '2023-10-18T10:20:10Z',
    displayTimestamp: '18 Oct 2023, 10:20:10',
    timestampUtc: '18 Oct 2023, 10:20:10 UTC',
    user: 'Vikram Reddy',
    role: 'Field Officer',
    userRole: 'NGO',
    organization: 'Coastal Watch NGO',
    action: 'Soil SOC Core Sample Ingested',
    project: 'Godavari Estuary Restore',
    projectId: 'PRJ-2023-142',
    entity: 'Field Lab Test',
    status: 'Pending',
    statusDot: 'bg-[#f57f17]',
    statusColor: 'warning',
    description:
      'Submitted laboratory results for 12 deep soil carbon cores from Godavari intertidal mudflats. Lab certification awaiting senior chemist countersign.',
    stateChange: {
      old: '"soil_carbon_density": null',
      new: '"soil_carbon_density": "384.2 tC/ha (Awaiting Sign-off)"',
    },
    ipAddress: '117.200.45.92',
    txHash: '0x6e9f2a5b8c1e4d7f0a3b6c9e2a5f8b1c4d7e0a3f',
    txHashShort: '0x6e9f...0a3f',
    blockNumber: 48188900,
    network: 'Polygon Mainnet',
  },
];

/**
 * Filter audit entries
 */
export function getAuditEntries(filters = {}) {
  let entries = [...mockAuditEntries];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    entries = entries.filter(
      (e) =>
        e.refId.toLowerCase().includes(q) ||
        e.action.toLowerCase().includes(q) ||
        e.user.toLowerCase().includes(q) ||
        e.organization.toLowerCase().includes(q) ||
        e.project.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }

  if (filters.user && filters.user !== 'All Users') {
    entries = entries.filter((e) => e.user === filters.user);
  }

  if (filters.organization && filters.organization !== 'All Organizations') {
    entries = entries.filter((e) => e.organization === filters.organization);
  }

  if (filters.action && filters.action !== 'All Actions') {
    entries = entries.filter((e) => e.action === filters.action);
  }

  if (filters.project && filters.project !== 'All Projects') {
    entries = entries.filter((e) => e.project === filters.project);
  }

  if (filters.status && filters.status !== 'All Status' && filters.status !== 'All') {
    entries = entries.filter((e) => e.status.toLowerCase() === filters.status.toLowerCase());
  }

  return entries;
}

/**
 * Get single audit entry by Ref ID
 */
export function getAuditEntryById(id) {
  if (!id) return mockAuditEntries[0];
  const found = mockAuditEntries.find((e) => e.id === id || e.refId === id);
  return found || mockAuditEntries[0];
}

/**
 * Export audit trail to CSV
 */
export function exportAuditTrailCSV(entries = mockAuditEntries) {
  const headers = ['Ref ID', 'Timestamp', 'User', 'Role', 'Organization', 'Action', 'Project', 'Entity', 'Status', 'IP Address', 'Tx Hash'];
  const rows = entries.map((e) => [
    `"${e.refId}"`,
    `"${e.timestampUtc}"`,
    `"${e.user}"`,
    `"${e.role}"`,
    `"${e.organization}"`,
    `"${e.action}"`,
    `"${e.project}"`,
    `"${e.entity}"`,
    `"${e.status}"`,
    `"${e.ipAddress || ''}"`,
    `"${e.txHash || ''}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
