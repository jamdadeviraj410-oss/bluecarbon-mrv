/**
 * Reports & Analytics Service Layer
 * BlueCarbon MRV Registry
 * Provides mock data, statistics, time-series projections, and report generation workflows
 */

export const reportKPIs = {
  totalRestorationArea: {
    value: '14.2k',
    unit: 'ha',
    change: '+12% vs last year',
    trend: 'up',
    label: 'Total Restoration Area',
  },
  co2eSequestered: {
    value: '1.2M',
    unit: 'tCO2e',
    change: '+8% vs last year',
    trend: 'up',
    label: 'CO2e Sequestered',
  },
  verifiedCredits: {
    value: '850k',
    unit: '',
    change: '+15% vs last year',
    trend: 'up',
    label: 'Verified Credits',
  },
  projectsVerified: {
    value: '142',
    unit: '',
    change: '+5 new this month',
    trend: 'up',
    label: 'Projects Verified',
  },
  avgSurvivalRate: {
    value: '88%',
    unit: '',
    change: 'Stable trend',
    trend: 'neutral',
    label: 'Avg. Survival Rate',
  },
};

export const carbonSequestrationTimeSeries = [
  { year: '2020', sequestered: 180000, display: '180k', credits: 120000 },
  { year: '2021', sequestered: 420000, display: '420k', credits: 310000 },
  { year: '2022', sequestered: 680000, display: '680k', credits: 500000 },
  { year: '2023', sequestered: 990000, display: '990k', credits: 720000 },
  { year: '2024', sequestered: 1200000, display: '1.2M', credits: 850000 },
];

export const areaByStateData = [
  { state: 'Maharashtra', areaHa: 4200, display: '4.2k', percentage: 80, color: '#003941' },
  { state: 'Gujarat', areaHa: 3100, display: '3.1k', percentage: 65, color: '#004e59' },
  { state: 'Tamil Nadu', areaHa: 2500, display: '2.5k', percentage: 45, color: '#00abc1' },
  { state: 'Andhra P.', areaHa: 1800, display: '1.8k', percentage: 30, color: '#44d8f1' },
  { state: 'West Bengal', areaHa: 1400, display: '1.4k', percentage: 24, color: '#799dd6' },
  { state: 'Kerala', areaHa: 1200, display: '1.2k', percentage: 20, color: '#a0f399' },
];

export const projectStatusDistribution = [
  { status: 'Verified', count: 85, percentage: 60, color: '#003941', dotColor: 'bg-[#003941]' },
  { status: 'In Review', count: 36, percentage: 25, color: '#00abc1', dotColor: 'bg-[#00abc1]' },
  { status: 'Registered', count: 21, percentage: 15, color: '#88d982', dotColor: 'bg-[#88d982]' },
];

export const coastalProjectLocations = [
  {
    id: 'PRJ-2023-089',
    name: 'Maharashtra Mangrove Restoration',
    location: 'Ratnagiri, Maharashtra',
    state: 'Maharashtra',
    type: 'Mangrove',
    coordinates: { lat: 16.9902, lng: 73.312 },
    area: 128,
    sequestered: '14.2k tCO2e',
    status: 'Verified',
  },
  {
    id: 'PRJ-2023-156',
    name: 'Kutch Tidal Flats',
    location: 'Kutch, Gujarat',
    state: 'Gujarat',
    type: 'Salt Marsh',
    coordinates: { lat: 23.7337, lng: 69.8597 },
    area: 512,
    sequestered: '22.1k tCO2e',
    status: 'In Review',
  },
  {
    id: 'PRJ-2023-092',
    name: 'Pichavaram Mangrove Project',
    location: 'Cuddalore, Tamil Nadu',
    state: 'Tamil Nadu',
    type: 'Mangrove',
    coordinates: { lat: 11.4285, lng: 79.7922 },
    area: 1100,
    sequestered: '42.5k tCO2e',
    status: 'Verified',
  },
  {
    id: 'PRJ-2023-142',
    name: 'Godavari Estuary Restore',
    location: 'East Godavari, Andhra Pradesh',
    state: 'Andhra Pradesh',
    type: 'Seagrass',
    coordinates: { lat: 16.75, lng: 82.25 },
    area: 256,
    sequestered: '8.5k tCO2e',
    status: 'Pending',
  },
  {
    id: 'PRJ-2023-201',
    name: 'Sundarbans Biosphere Core',
    location: 'South 24 Parganas, West Bengal',
    state: 'West Bengal',
    type: 'Mangrove',
    coordinates: { lat: 21.9497, lng: 88.8927 },
    area: 3400,
    sequestered: '185.0k tCO2e',
    status: 'Verified',
  },
  {
    id: 'PRJ-2023-214',
    name: 'Vembanad Wetland Conservation',
    location: 'Alappuzha, Kerala',
    state: 'Kerala',
    type: 'Salt Marsh',
    coordinates: { lat: 9.601, lng: 76.398 },
    area: 480,
    sequestered: '16.8k tCO2e',
    status: 'In Review',
  },
];

export const generatedReportsList = [
  {
    id: 'REP-2024-001',
    title: 'National Blue Carbon Annual Summary Report 2023-2024',
    type: 'National Summary Report',
    period: 'FY 2023-2024',
    dateGenerated: '2024-02-15T10:30:00Z',
    format: 'PDF',
    size: '4.8 MB',
    status: 'Finalized',
    author: 'National Centre for Coastal Research (NCCR)',
    authorRole: 'Registrar & Verifier Office',
    hash: '0x8f2a4b9c1d3e5f7a9b0c2d4e6f8a0b1c',
    description: 'Comprehensive assessment of 142 verified coastal restoration projects across 6 coastal states. Details cumulative biomass growth, carbon sequestration, and carbon credit issuance.',
    summaryMetrics: {
      totalArea: '14,200 ha',
      totalSequestered: '1,200,000 tCO2e',
      creditsIssued: '850,000',
      activeProjects: 142,
      survivalRate: '88.4%',
    },
    methodologies: ['VM0033 (Tidal Wetland and Seagrass Restoration)', 'IPCC 2013 Wetlands Supplement'],
    keyFindings: [
      'Mangrove coverage expanded by 12% across western and eastern coastal belts.',
      'Average canopy cover increased by 14.8% measured via multi-spectral drone telemetry.',
      'Ratnagiri and Pichavaram projects achieved a 92% 3-year seedling survival rate.',
      'All 850k issued credits have verified on-chain cryptographic audit proofs.',
    ],
  },
  {
    id: 'REP-2024-002',
    title: 'Q4 2023 National MRV Verification & Audit Log',
    type: 'MRV Verification Log',
    period: 'Q4 2023 (Oct - Dec)',
    dateGenerated: '2024-01-20T14:45:00Z',
    format: 'PDF',
    size: '3.2 MB',
    status: 'Verified',
    author: 'MRV Technical Oversight Committee',
    authorRole: 'Audit Verifier',
    hash: '0x3c1d9f4a7b2e8a1d5f9c0e2a4b6c8e0a',
    description: 'Detailed logs of multispectral drone telemetry, ground soil organic carbon (SOC) core samples, and remote sensing biomass models validated during Q4 2023.',
    summaryMetrics: {
      totalArea: '4,850 ha',
      totalSequestered: '412,000 tCO2e',
      creditsIssued: '290,000',
      activeProjects: 48,
      survivalRate: '89.1%',
    },
    methodologies: ['NCCR Standard Blue Carbon MRV Protocol v2.1', 'Verra VM0033'],
    keyFindings: [
      '48 quarterly monitoring audits approved with 0 non-conformities.',
      'High correlation (R² = 0.94) between UAV LiDAR biomass estimations and destructive sample controls.',
      'Soil carbon stock retention reached 420 tC/ha in dense mangrove strata.',
    ],
  },
  {
    id: 'REP-2023-018',
    title: 'Blockchain Distributed Ledger Immutability & Audit Trail Log',
    type: 'Blockchain Audit Trail',
    period: 'All-Time (Genesis - Q4 2023)',
    dateGenerated: '2023-12-31T23:59:59Z',
    format: 'CSV',
    size: '1.9 MB',
    status: 'Immutable',
    author: 'BlueCarbon Smart Contract Sentinel',
    authorRole: 'Automated System',
    hash: '0x9e2b4d7c0f1a3b5e7d9c1b3a5f7e9d1c',
    description: 'Complete transaction history of credit minting, serial number lineage, retirement certificates, and state machine transitions logged on distributed ledger networks.',
    summaryMetrics: {
      totalArea: '14,200 ha',
      totalSequestered: '1,200,000 tCO2e',
      creditsIssued: '850,000',
      activeProjects: 142,
      survivalRate: '88.0%',
    },
    methodologies: ['ERC-1155 EcoToken Standard', 'Chainlink Decentralized Oracle Network'],
    keyFindings: [
      '1,248 immutable ledger state transitions executed with zero double-counting.',
      'Over 280,000 carbon credits retired by sovereign and corporate beneficiaries with cryptographic proofs.',
    ],
  },
  {
    id: 'REP-2023-012',
    title: 'Maharashtra & Gujarat Coastal Mangrove Restoration Index',
    type: 'State Carbon Sequestration Assessment',
    period: 'Calendar Year 2023',
    dateGenerated: '2023-11-10T09:15:00Z',
    format: 'PDF',
    size: '5.1 MB',
    status: 'Finalized',
    author: 'West Coast Ecological Advisory Group',
    authorRole: 'Regional Lead',
    hash: '0x7a3f8b2e1c9d4e5f6a7b8c9d0e1f2a3b',
    description: 'Regional comparative analysis of mangrove restoration and tidal marsh revival along the Arabian Sea coast, focusing on Ratnagiri, Thane Creek, and Kutch deltas.',
    summaryMetrics: {
      totalArea: '7,300 ha',
      totalSequestered: '685,000 tCO2e',
      creditsIssued: '495,000',
      activeProjects: 68,
      survivalRate: '87.6%',
    },
    methodologies: ['VM0033', 'WCMC Mangrove Restoration Toolkit'],
    keyFindings: [
      'Ratnagiri cluster sequestered 14.2k tCO2e with robust Avicennia marina stands.',
      'Tidal flow restoration in Kutch increased active intertidal vegetative cover by 310 hectares.',
    ],
  },
];

/**
 * Filter generated reports
 */
export function getGeneratedReports(filters = {}) {
  let reports = [...generatedReportsList];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    reports = reports.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q)
    );
  }

  if (filters.type && filters.type !== 'All Types' && filters.type !== 'All') {
    reports = reports.filter((r) => r.type === filters.type);
  }

  if (filters.format && filters.format !== 'All Formats' && filters.format !== 'All') {
    reports = reports.filter((r) => r.format.toLowerCase() === filters.format.toLowerCase());
  }

  return reports;
}

/**
 * Get single report by ID
 */
export function getReportById(id) {
  if (!id) return generatedReportsList[0];
  const found = generatedReportsList.find((r) => r.id === id);
  return found || generatedReportsList[0];
}

/**
 * Simulate report generation
 */
export function generateNewReport({ reportType = 'National Summary Report', format = 'PDF', dateRange = 'Last 12 Months', state = 'All States', projectType = 'All Types' }) {
  const newId = `REP-${new Date().getFullYear()}-${String(Math.floor(100 + Math.random() * 900))}`;
  const timestamp = new Date().toISOString();
  const hash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  const newReport = {
    id: newId,
    title: `${reportType} — ${state === 'All States' ? 'National' : state} (${dateRange})`,
    type: reportType,
    period: dateRange,
    dateGenerated: timestamp,
    format: format.toUpperCase(),
    size: format.toUpperCase() === 'PDF' ? `${(2.5 + Math.random() * 3).toFixed(1)} MB` : `${(0.8 + Math.random() * 1.2).toFixed(1)} MB`,
    status: 'Finalized',
    author: 'National Centre for Coastal Research (NCCR)',
    authorRole: 'Registrar & Verifier Office',
    hash: hash,
    description: `Automated ${reportType} generated on ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })} covering ${state} and ${projectType} restoration assets.`,
    summaryMetrics: {
      totalArea: '14,200 ha',
      totalSequestered: '1,200,000 tCO2e',
      creditsIssued: '850,000',
      activeProjects: 142,
      survivalRate: '88.0%',
    },
    methodologies: ['VM0033 (Tidal Wetland and Seagrass Restoration)', 'IPCC 2013 Wetlands Supplement'],
    keyFindings: [
      `Data verified through NCCR digital MRV framework.`,
      `Spatial boundary validated via drone telemetry and Sentinel-2 satellite index.`,
      `All associated carbon units registered under cryptographic ledger integrity standards.`,
    ],
  };

  // Add to top of array in memory
  generatedReportsList.unshift(newReport);
  return newReport;
}

/**
 * Export reports as CSV data
 */
export function exportReportsCSV() {
  const headers = ['Report ID', 'Title', 'Type', 'Period', 'Date Generated', 'Format', 'Size', 'Status', 'Hash'];
  const rows = generatedReportsList.map((r) => [
    `"${r.id}"`,
    `"${r.title.replace(/"/g, '""')}"`,
    `"${r.type}"`,
    `"${r.period}"`,
    `"${r.dateGenerated}"`,
    `"${r.format}"`,
    `"${r.size}"`,
    `"${r.status}"`,
    `"${r.hash}"`,
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
