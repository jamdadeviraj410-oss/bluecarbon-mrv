/**
 * Public Registry Service Layer
 * BlueCarbon MRV Registry
 * Provides public registry projects, GIS coordinates, ledger audit trails, and filters
 */

export const publicRegistryProjects = [
  {
    id: 'IND-MRV-0892',
    name: 'Pichavaram Mangrove Project',
    location: 'Tamil Nadu, India',
    country: 'in',
    countryName: 'India',
    region: 'South Asia',
    type: 'Mangrove',
    estYear: '2019',
    developer: 'EcoRestore NGO Foundation',
    developerRole: 'Project Developer',
    status: 'Verified Active',
    statusCategory: 'verified',
    totalSequestered: '42.5k',
    totalSequesteredNum: 42500,
    areaCoverage: '1,100',
    areaCoverageHa: 1100,
    creditPrice: 28,
    priceDisplay: '$28 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARARvpi_ywg1IODqwa8tFgPJZdlPZEfQO1ZHLwKo_rddzRYnvR0zJl6RvLTBV5Fo9ehGXURG953ZkoyZy8fPBEye12JTG3NB9NxErPvv-EqAv4EN1_kq9BExs4rkspmQoTKDnQTV2H4WE8qVzcwPO4fdhvWcge1aWWLgiVXYnTwMnTj6cKbJ_f1pxo3kXVyODh_axyFlq0E08eyMlRrH6E3xB05g51E4tSuhKohgExat1hDmU9m_7suA',
    coordinates: { lat: 11.4285, lng: 79.7922 },
    mapPosition: { top: '55%', left: '52%' },
    description:
      'Large-scale coastal mangrove conservation and rehabilitation in Pichavaram estuary. Dense Rhizophora mucronata and Avicennia marina canopy provides critical storm surge defense and blue carbon sequestration.',
    ledgerTimeline: [
      {
        id: 'L-01',
        title: 'Credit Issuance (V3)',
        date: 'Oct 12, 2023',
        description: '12,500 tCO2e verified and minted to registry.',
        txHash: '0x8f2a99c91e4a3b81d77f24098231a4781bc091e',
        txShort: 'Tx: 0x8f2a...c91e',
        active: true,
      },
      {
        id: 'L-02',
        title: 'MRV Audit Approved',
        date: 'Sep 28, 2023',
        description: 'UAV multi-spectral NDVI telemetry cross-verified with field core sampling.',
        txHash: '0x3c1d09f4a7b2e8a1d5f9c0e2a4b6c8e0a29481bc',
        txShort: 'Tx: 0x3c1d...81bc',
        active: false,
      },
      {
        id: 'L-03',
        title: 'Baseline Multispectral Survey',
        date: 'Aug 15, 2023',
        description: 'Initial LiDAR biomass density survey completed by NCCR technical inspectors.',
        txHash: '0x7a3f8b2e1c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
        txShort: 'Tx: 0x7a3f...6e7f',
        active: false,
      },
    ],
  },
  {
    id: 'IND-MRV-0890',
    name: 'Maharashtra Mangrove Restoration',
    location: 'Ratnagiri, Maharashtra, India',
    country: 'in',
    countryName: 'India',
    region: 'South Asia',
    type: 'Mangrove',
    estYear: '2021',
    developer: 'EcoTrust India',
    developerRole: 'Project Developer',
    status: 'Verified Active',
    statusCategory: 'verified',
    totalSequestered: '14.2k',
    totalSequesteredNum: 14200,
    areaCoverage: '128',
    areaCoverageHa: 128,
    creditPrice: 32,
    priceDisplay: '$32 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEo3Gg8VSa2wpzaewMkfwzDzp-AEpgVkEVdxGxWfXYJTsADpeeOuPEXzYYIng9wPdh4crpMbHbGVaT-QXOhmXcInghXDqCOetdYF0R92t5DUGflY1KFuYfuvTXIRIqL_trDLDdRorNkruqGtdLNfV9DT4obyduIowa451RJJr44VJm6UwUc1B_MbApDtEyG5zyya1s1H0v15FQI_uJ6YNayWyTdcbPh8a4kN-_nT02PlNQbjy_f7245g',
    coordinates: { lat: 16.9902, lng: 73.312 },
    mapPosition: { top: '48%', left: '46%' },
    description:
      'Intertidal mangrove reforestation restoring severely eroded creeks in Ratnagiri district. Direct community engagement with local Gram Panchayats.',
    ledgerTimeline: [
      {
        id: 'L-11',
        title: 'Credit Batch Minted',
        date: 'Nov 01, 2023',
        description: '14,200 carbon credits minted to smart contract.',
        txHash: '0x9e2b4d7c0f1a3b5e7d9c1b3a5f7e9d1c810427bc',
        txShort: 'Tx: 0x9e2b...27bc',
        active: true,
      },
      {
        id: 'L-12',
        title: 'MRV Baseline Validated',
        date: 'Oct 12, 2023',
        description: 'Field verifiers validated 14.2k tCO2e biomass expansion.',
        txHash: '0x5c8e1a4d9f2b7a0c3e6d8f1b4a7c9e0d2f5a8b1c',
        txShort: 'Tx: 0x5c8e...8b1c',
        active: false,
      },
    ],
  },
  {
    id: 'IND-MRV-0201',
    name: 'Sundarbans Biosphere Core Delta',
    location: 'West Bengal, India',
    country: 'in',
    countryName: 'India',
    region: 'South Asia',
    type: 'Mangrove',
    estYear: '2018',
    developer: 'Sundarbans Foundation for Climate Action',
    developerRole: 'Project Developer',
    status: 'Verified Active',
    statusCategory: 'verified',
    totalSequestered: '185.0k',
    totalSequesteredNum: 185000,
    areaCoverage: '3,400',
    areaCoverageHa: 3400,
    creditPrice: 35,
    priceDisplay: '$35 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrxUcsryifukdbT3YUw4CMkIqVshE--og2tgkgjUBT4inrkEBBprXHu92jPqSB_P-XahelsX8WeIGTHOD_De2qO0i67tU5lzd68fO1_P30k44OaZQGr-NttFybJ4RooBbWn72kXoywdhR47XGWSr__hnhyEdmdGvv-fWhmB0jVu45sPcZs_mhJWBbbCR5VpaEVYmauMJkXwM7AkiCIKhCnmKDJ1HnEYIr_kyuybHBdXh-VFEbuDmuZFw',
    coordinates: { lat: 21.9497, lng: 88.8927 },
    mapPosition: { top: '42%', left: '60%' },
    description:
      'World Heritage mangrove ecosystem restoration protecting critical delta wetlands, tiger corridors, and massive subterranean peat soil carbon stocks.',
    ledgerTimeline: [
      {
        id: 'L-21',
        title: 'Annual MRV Batch Confirmed',
        date: 'Dec 05, 2023',
        description: '185,000 tCO2e multi-year sequestration audit certified.',
        txHash: '0x1d4e7f0a3b6c9e2a5f8b1c4d7e0a3f6b9c2e5a8d',
        txShort: 'Tx: 0x1d4e...5a8d',
        active: true,
      },
    ],
  },
  {
    id: 'COL-MRV-0412',
    name: 'Cispata Bay Mangrove Sanctuary',
    location: 'Cispata, Cordoba, Colombia',
    country: 'co',
    countryName: 'Colombia',
    region: 'South America',
    type: 'Tidal Marsh',
    estYear: '2020',
    developer: 'Conservation International Colombia',
    developerRole: 'Project Developer',
    status: 'Monitoring Phase',
    statusCategory: 'monitoring',
    totalSequestered: '28.0k',
    totalSequesteredNum: 28000,
    areaCoverage: '850',
    areaCoverageHa: 850,
    creditPrice: 22,
    priceDisplay: '$22 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuXD9_qXDdzhEOJUeUp4m7Q75K83Ee9Mc1jT-jPtBCyK65ziXOOpNn7KpDndZ1B47zznrWGzzDKb8POTlY9bukfBT5m85JP4hYaiVVl4i4_hUuzF1wN-TwXeKa3yoCW87ogsavvD313MEVpdzj-ET1Z_S2fV0L-Ugdg2KGolg7EnsQUM6zMUhi787e5gzeC1MLHqy5gAF-X4wn2DipXWMj1CWR_qFTuZKe0XskzXvxFmuYZM-ICIdmRA',
    coordinates: { lat: 9.387, lng: -75.765 },
    mapPosition: { top: '56%', left: '22%' },
    description:
      'Pioneering blue carbon initiative measuring both aboveground biomass and deep sediment organic carbon stocks in Caribbean coastal estuaries.',
    ledgerTimeline: [
      {
        id: 'L-31',
        title: 'UAV Telemetry Ingested',
        date: 'Nov 18, 2023',
        description: 'Spectral vegetation index synced to decentralized oracle.',
        txHash: '0x4b7c0e3a6d9f2a5b8c1e4d7f0a3b6c9e2a5f8b1c',
        txShort: 'Tx: 0x4b7c...8b1c',
        active: true,
      },
    ],
  },
  {
    id: 'MDG-MRV-0718',
    name: 'Madagascar Coastal Mangrove Haven',
    location: 'Bombetoka Bay, Madagascar',
    country: 'mg',
    countryName: 'Madagascar',
    region: 'East Africa',
    type: 'Seagrass',
    estYear: '2021',
    developer: 'Blue Ventures Conservation',
    developerRole: 'Project Developer',
    status: 'Verified Active',
    statusCategory: 'verified',
    totalSequestered: '64.0k',
    totalSequesteredNum: 64000,
    areaCoverage: '1,450',
    areaCoverageHa: 1450,
    creditPrice: 26,
    priceDisplay: '$26 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARARvpi_ywg1IODqwa8tFgPJZdlPZEfQO1ZHLwKo_rddzRYnvR0zJl6RvLTBV5Fo9ehGXURG953ZkoyZy8fPBEye12JTG3NB9NxErPvv-EqAv4EN1_kq9BExs4rkspmQoTKDnQTV2H4WE8qVzcwPO4fdhvWcge1aWWLgiVXYnTwMnTj6cKbJ_f1pxo3kXVyODh_axyFlq0E08eyMlRrH6E3xB05g51E4tSuhKohgExat1hDmU9m_7suA',
    coordinates: { lat: -15.82, lng: 46.28 },
    mapPosition: { top: '65%', left: '78%' },
    description:
      'Community-led conservation protecting 1,450 hectares of rich intertidal estuary mangroves and seagrass beds in Western Madagascar.',
    ledgerTimeline: [
      {
        id: 'L-41',
        title: 'Quarterly Verification Sealed',
        date: 'Oct 30, 2023',
        description: 'Verified 64k tCO2e total biological sequestration.',
        txHash: '0x6e9f2a5b8c1e4d7f0a3b6c9e2a5f8b1c4d7e0a3f',
        txShort: 'Tx: 0x6e9f...0a3f',
        active: true,
      },
    ],
  },
  {
    id: 'IDN-MRV-0955',
    name: 'North Sumatra Mangrove Belt',
    location: 'Sumatra, Indonesia',
    country: 'id',
    countryName: 'Indonesia',
    region: 'Southeast Asia',
    type: 'Mangrove',
    estYear: '2020',
    developer: 'Wetlands International Indonesia',
    developerRole: 'Project Developer',
    status: 'Verified Active',
    statusCategory: 'verified',
    totalSequestered: '92.0k',
    totalSequesteredNum: 92000,
    areaCoverage: '2,100',
    areaCoverageHa: 2100,
    creditPrice: 30,
    priceDisplay: '$30 / tCO2e',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrxUcsryifukdbT3YUw4CMkIqVshE--og2tgkgjUBT4inrkEBBprXHu92jPqSB_P-XahelsX8WeIGTHOD_De2qO0i67tU5lzd68fO1_P30k44OaZQGr-NttFybJ4RooBbWn72kXoywdhR47XGWSr__hnhyEdmdGvv-fWhmB0jVu45sPcZs_mhJWBbbCR5VpaEVYmauMJkXwM7AkiCIKhCnmKDJ1HnEYIr_kyuybHBdXh-VFEbuDmuZFw',
    coordinates: { lat: 3.59, lng: 98.67 },
    mapPosition: { top: '52%', left: '68%' },
    description:
      'Restoring critical mangrove barriers along the Malacca Strait, providing rich breeding grounds for coastal fisheries and high soil organic carbon accumulation.',
    ledgerTimeline: [
      {
        id: 'L-51',
        title: 'Carbon Credit Issuance V2',
        date: 'Nov 24, 2023',
        description: '28,000 vintage 2023 credits verified and registered.',
        txHash: '0x8f4d99c3a72e81b490f238d91c84b91278143b2c',
        txShort: 'Tx: 0x8f4d...3b2c',
        active: true,
      },
    ],
  },
];

/**
 * Filter public registry projects
 */
export function getPublicRegistryProjects(filters = {}) {
  let projects = [...publicRegistryProjects];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    projects = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.countryName.toLowerCase().includes(q) ||
        p.developer.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
  }

  if (filters.country && filters.country !== 'all' && filters.country !== '') {
    projects = projects.filter((p) => p.country.toLowerCase() === filters.country.toLowerCase());
  }

  if (filters.type && filters.type !== 'All' && filters.type !== '') {
    projects = projects.filter((p) => p.type.toLowerCase() === filters.type.toLowerCase());
  }

  if (filters.maxPrice) {
    projects = projects.filter((p) => p.creditPrice <= filters.maxPrice);
  }

  if (filters.status && filters.status !== 'All') {
    projects = projects.filter((p) => p.status.toLowerCase().includes(filters.status.toLowerCase()));
  }

  return projects;
}

/**
 * Get project by ID
 */
export function getPublicProjectById(id) {
  if (!id) return publicRegistryProjects[0];
  const found = publicRegistryProjects.find((p) => p.id === id);
  return found || publicRegistryProjects[0];
}
