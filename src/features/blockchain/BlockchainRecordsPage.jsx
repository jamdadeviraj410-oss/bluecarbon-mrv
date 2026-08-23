import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getBlockchainRecords,
  getBlockchainStats,
  exportBlockchainRegistryCSV,
  blockchainNetworks,
} from './blockchainService';
import { truncateHash, formatNumber } from '../../utils/formatters';

export default function BlockchainRecordsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState('CRD-2023-8921A');
  const [copiedHash, setCopiedHash] = useState(null);
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedPanelHash, setCopiedPanelHash] = useState(false);
  const [showExplorerModal, setShowExplorerModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const stats = useMemo(() => getBlockchainStats(), []);

  const filteredRecords = useMemo(() => {
    return getBlockchainRecords({
      search: searchTerm,
      network: selectedNetwork,
      status: selectedStatus,
    });
  }, [searchTerm, selectedNetwork, selectedStatus]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage]);

  const selectedRecord = useMemo(() => {
    return (
      filteredRecords.find((r) => r.creditId === selectedRecordId) ||
      filteredRecords[0] ||
      getBlockchainRecords()[0]
    );
  }, [filteredRecords, selectedRecordId]);

  const handleCopy = (text, type = 'hash') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (type === 'contract') {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else if (type === 'panelHash') {
      setCopiedPanelHash(true);
      setTimeout(() => setCopiedPanelHash(false), 2000);
    } else {
      setCopiedHash(text);
      setTimeout(() => setCopiedHash(null), 2000);
    }
  };

  const handleExport = () => {
    const csvData = exportBlockchainRegistryCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bluecarbon-blockchain-registry-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6 max-w-[1440px] mx-auto font-body-md text-on-surface">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-1.5 relative z-10">
          <h1 className="font-headline-lg text-primary tracking-tight">Blockchain Carbon Registry</h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Immutable record of verified blue-carbon credits. All transactions are cryptographically secured and permanently recorded on public ledger networks.
          </p>
          <div className="inline-flex items-center gap-1.5 bg-surface-container-high px-3 py-1 rounded-full mt-1 shadow-sm w-fit">
            <span className="material-symbols-outlined text-secondary text-[16px] animate-pulse">verified_user</span>
            <span className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Data Integrity Verified</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 bg-surface-container rounded-lg font-body-md text-on-surface placeholder-outline-variant focus:outline-none focus:ring-2 focus:ring-primary/20 w-full sm:w-64 shadow-sm transition-shadow border border-transparent focus:border-outline-variant"
              placeholder="Search Txn Hash or ID"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 bg-surface-container rounded-lg font-title-md text-on-surface hover:bg-surface-container-highest transition-colors shadow-sm cursor-pointer ${
              showFilters || selectedNetwork !== 'All' || selectedStatus !== 'All' ? 'ring-2 ring-primary/20 bg-surface-container-high' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span>Filters</span>
            {(selectedNetwork !== 'All' || selectedStatus !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
            )}
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-lg font-title-md hover:bg-primary-container transition-colors shadow-md hover:shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">download</span>
            <span>Export Registry</span>
          </button>
        </div>
      </div>

      {/* Filter Dropdown Bar (Toggleable) */}
      {showFilters && (
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-wrap items-center gap-4 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-label-md uppercase tracking-wider text-on-surface-variant">Network:</span>
            <select
              value={selectedNetwork}
              onChange={(e) => {
                setSelectedNetwork(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface-container px-3 py-1.5 rounded-lg text-body-md font-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Networks</option>
              <option value="Polygon">Polygon POS / Mainnet</option>
              <option value="Ethereum">Ethereum Mainnet</option>
              <option value="Celo">Celo Network</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-label-md uppercase tracking-wider text-on-surface-variant">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-surface-container px-3 py-1.5 rounded-lg text-body-md font-body-md border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {(selectedNetwork !== 'All' || selectedStatus !== 'All' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedNetwork('All');
                setSelectedStatus('All');
                setSearchTerm('');
                setCurrentPage(1);
              }}
              className="text-primary hover:text-primary-container text-label-md font-semibold ml-auto cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-4 lg:p-5 rounded-xl shadow-sm border-t-4 border-secondary flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-container/30 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between z-10">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wide">Total Credits Issued</span>
            <span className="material-symbols-outlined text-secondary bg-secondary-container/50 p-1.5 rounded-md text-[20px]">
              workspace_premium
            </span>
          </div>
          <div className="font-headline-lg text-on-surface z-10 tracking-tight">{stats.totalCreditsIssued}</div>
          <div className="font-body-md text-secondary inline-flex items-center gap-1 z-10 text-[13px] font-semibold">
            <span className="material-symbols-outlined text-[16px]">trending_up</span> {stats.totalCreditsIssuedChange}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-4 lg:p-5 rounded-xl shadow-sm border-t-4 border-tertiary-fixed-dim flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-container/10 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between z-10">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wide">Total CO2e Tokenized</span>
            <span className="material-symbols-outlined text-tertiary-fixed-dim bg-tertiary-container/50 p-1.5 rounded-md text-on-tertiary text-[20px]">
              token
            </span>
          </div>
          <div className="font-headline-lg text-on-surface z-10 tracking-tight">
            {stats.totalCO2eTokenized} <span className="font-title-md text-on-surface-variant">tCO2e</span>
          </div>
          <div className="font-body-md text-outline z-10 text-[13px]">across {stats.activeNetworksCount} active networks</div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-4 lg:p-5 rounded-xl shadow-sm border-t-4 border-primary flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/20 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between z-10">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wide">Verified Projects</span>
            <span className="material-symbols-outlined text-primary bg-primary-container/30 p-1.5 rounded-md text-[20px]">
              account_tree
            </span>
          </div>
          <div className="font-headline-lg text-on-surface z-10 tracking-tight">{stats.verifiedProjectsCount}</div>
          <div className="font-body-md text-on-surface-variant z-10 text-[13px]">Global MRV locations</div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-4 lg:p-5 rounded-xl shadow-sm border-t-4 border-inverse-surface flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-inverse-surface/10 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          <div className="flex items-center justify-between z-10">
            <span className="font-label-md text-on-surface-variant uppercase tracking-wide">Blockchain Txns</span>
            <span className="material-symbols-outlined text-inverse-surface bg-inverse-on-surface p-1.5 rounded-md text-[20px]">
              dataset
            </span>
          </div>
          <div className="font-headline-lg text-on-surface z-10 tracking-tight">{stats.blockchainTxnsCount}</div>
          <div className="font-body-md text-secondary inline-flex items-center gap-1 z-10 text-[13px]">
            <span className="material-symbols-outlined text-[16px]">sync</span> Synced {stats.lastSynced}
          </div>
        </div>
      </div>

      {/* Main Content Layout (Master Table 2/3 + Sticky Detail Panel 1/3) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Registry Table Area (Left 2/3) */}
        <div className="w-full lg:w-2/3 bg-surface-container-lowest rounded-xl shadow-md overflow-hidden flex flex-col border border-surface-container-high">
          <div className="px-6 py-4 border-b border-surface-container-high bg-surface flex justify-between items-center">
            <h2 className="font-title-lg text-on-surface">Recent Issuances</h2>
            <div className="flex gap-2">
              <span className="font-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                Showing {paginatedRecords.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}-{Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-surface-container-high">
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold whitespace-nowrap">Credit ID</th>
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold whitespace-nowrap">Project</th>
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold text-right whitespace-nowrap">tCO2e</th>
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold whitespace-nowrap">Network</th>
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold whitespace-nowrap">Tx Hash</th>
                  <th className="py-3 px-4 font-label-md text-on-surface-variant font-semibold text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md divide-y divide-surface-container-high">
                {paginatedRecords.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-[36px] text-outline">database</span>
                        <span>No blockchain records match your search criteria.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedRecords.map((record) => {
                    const isSelected = selectedRecord?.creditId === record.creditId;
                    return (
                      <tr
                        key={record.creditId}
                        onClick={() => setSelectedRecordId(record.creditId)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-primary/5 border-l-4 border-l-primary'
                            : 'hover:bg-primary/5 border-l-4 border-l-transparent'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <span className={`font-mono-data font-semibold ${isSelected ? 'text-primary' : 'text-on-surface group-hover:text-primary group-hover:underline'}`}>
                            {record.creditId}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-on-surface">
                          <div className="font-body-md font-medium text-on-surface line-clamp-1">{record.projectName}</div>
                          <div className="text-[12px] text-on-surface-variant">{record.organization}</div>
                        </td>
                        <td className="py-3.5 px-4 text-on-surface font-mono-data text-right font-medium">
                          {formatNumber(record.tCO2e)}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0"
                              style={{ backgroundColor: record.networkColor }}
                            >
                              {record.networkSymbol}
                            </div>
                            <span className="text-on-surface text-body-md">{record.network}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center gap-1.5 text-on-surface-variant font-mono-data text-[12px]">
                            <span>{truncateHash(record.txHash, 6, 4)}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(record.txHash);
                              }}
                              className="text-outline hover:text-primary transition-colors cursor-pointer"
                              title="Copy Hash"
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                {copiedHash === record.txHash ? 'check' : 'content_copy'}
                              </span>
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {record.status === 'Confirmed' ? (
                            <div className="inline-flex items-center justify-center bg-secondary-container/20 text-on-secondary-container px-2.5 py-0.5 rounded-full gap-1 border border-secondary-container">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span>
                              <span className="font-label-md text-[11px]">Confirmed</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center justify-center bg-surface-variant text-on-surface-variant px-2.5 py-0.5 rounded-full gap-1 border border-outline-variant">
                              <span className="material-symbols-outlined text-[14px] animate-spin">hourglass_empty</span>
                              <span className="font-label-md text-[11px]">Pending ({record.confirmations || 12}/{record.confirmationsTotal || 15})</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-3 border-t border-surface-container-high bg-surface-container-lowest flex justify-end items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 text-on-surface-variant hover:bg-surface-container rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Page"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="font-body-md text-on-surface-variant text-sm">
              <span className="text-on-surface font-semibold">{currentPage}</span> / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 text-on-surface-variant hover:bg-surface-container rounded-md disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Next Page"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Right Detail Panel (Pinned for Selected Credit, 1/3) */}
        {selectedRecord && (
          <div className="w-full lg:w-1/3 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high flex flex-col relative overflow-hidden lg:sticky lg:top-24">
            {/* Header / Banner Area */}
            <div className="p-5 lg:p-6 border-b border-surface-container-high bg-gradient-to-b from-primary/5 to-transparent relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div className="font-label-md text-on-surface-variant uppercase tracking-wider text-[11px]">Credit Detail</div>
                <div className="bg-secondary-container/20 text-on-secondary-container px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border border-secondary-container inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Verified</span>
                </div>
              </div>
              <h3 className="font-headline-md text-on-surface font-mono-data tracking-tight text-xl">{selectedRecord.creditId}</h3>
              <p className="font-body-md text-primary font-semibold mt-1 line-clamp-1">{selectedRecord.projectName}</p>
              
              <div className="mt-4 bg-surface p-3 rounded-lg border border-surface-container-high flex items-center justify-between">
                <span className="font-body-md text-on-surface-variant text-sm">Quantity Minted</span>
                <span className="font-title-lg text-secondary font-mono-data text-base font-bold">
                  {formatNumber(selectedRecord.tCO2e)}{' '}
                  <span className="text-[12px] text-on-surface-variant font-body-md font-normal">tCO2e</span>
                </span>
              </div>
            </div>

            {/* Panel Body */}
            <div className="p-5 lg:p-6 flex-1 overflow-y-auto z-10 flex flex-col gap-5">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                <div>
                  <div className="font-label-md text-outline text-[11px] uppercase tracking-wider">Organization</div>
                  <div className="font-body-md text-on-surface font-medium truncate">{selectedRecord.organization}</div>
                </div>
                <div>
                  <div className="font-label-md text-outline text-[11px] uppercase tracking-wider">Issue Date</div>
                  <div className="font-body-md text-on-surface">{selectedRecord.issueDate}</div>
                </div>
                <div>
                  <div className="font-label-md text-outline text-[11px] uppercase tracking-wider">Methodology</div>
                  <div className="font-body-md text-on-surface">{selectedRecord.methodology}</div>
                </div>
                <div>
                  <div className="font-label-md text-outline text-[11px] uppercase tracking-wider">Verification ID</div>
                  <div className="font-mono-data text-primary text-[12px] hover:underline cursor-pointer truncate">
                    {selectedRecord.verificationId}
                  </div>
                </div>
              </div>

              <div className="h-px bg-surface-container-high w-full"></div>

              {/* On-Chain Record Details */}
              <div className="flex flex-col gap-2">
                <h4 className="font-title-md text-on-surface mb-1 flex items-center gap-1.5 text-sm">
                  <span className="material-symbols-outlined text-[18px] text-outline">link</span>
                  <span>On-Chain Record</span>
                </h4>
                <div className="bg-surface-container rounded-lg p-3 flex flex-col gap-2 font-mono-data text-[12px]">
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Network</span>
                    <span className="text-on-surface font-semibold flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedRecord.networkColor }}></div>
                      {selectedRecord.networkFull}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Contract</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedRecord.contractAddress, 'contract')}
                      className="text-primary hover:underline cursor-pointer flex items-center gap-1"
                      title="Copy Contract Address"
                    >
                      <span>{selectedRecord.contractAddressShort || truncateHash(selectedRecord.contractAddress, 6, 4)}</span>
                      <span className="material-symbols-outlined text-[13px]">
                        {copiedContract ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-outline">Block No.</span>
                    <span className="text-on-surface">{selectedRecord.blockNumber ? `#${selectedRecord.blockNumber}` : 'Pending...'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
                    <span className="text-outline">Tx Hash</span>
                    <div className="flex items-center gap-1 text-on-surface-variant">
                      <span>{selectedRecord.txHashShort || truncateHash(selectedRecord.txHash, 6, 4)}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedRecord.txHash, 'panelHash')}
                        className="material-symbols-outlined text-[14px] cursor-pointer hover:text-primary transition-colors"
                        title="Copy Tx Hash"
                      >
                        {copiedPanelHash ? 'check' : 'content_copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-surface-container-high w-full"></div>

              {/* Lifecycle Timeline */}
              <div>
                <h4 className="font-title-md text-on-surface mb-3 text-sm">Issuance Lifecycle</h4>
                <div className="flex flex-col gap-0 relative">
                  {/* Vertical line connecting nodes */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-secondary-container z-0"></div>

                  {selectedRecord.lifecycle.map((step) => {
                    const isDone = step.status === 'completed';
                    return (
                      <div key={step.step} className="flex gap-3 items-start relative z-10 py-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                            isDone
                              ? 'bg-secondary text-on-secondary'
                              : 'bg-surface-variant text-on-surface-variant border border-outline-variant'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">{step.icon}</span>
                        </div>
                        <div className="pt-0.5 flex-1 min-w-0">
                          <div className="font-title-md text-on-surface text-sm leading-tight truncate">{step.title}</div>
                          <div className="font-label-md text-outline mt-0.5 text-[11px] truncate">
                            {step.date} • {step.subtitle}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Panel Actions */}
            <div className="p-4 border-t border-surface-container-high bg-surface flex gap-2.5 z-10">
              <button
                onClick={() => navigate(`/admin/carbon-credits/${selectedRecord.creditId}`)}
                className="flex-1 px-3 py-2 border border-outline text-on-surface font-title-md text-sm rounded-lg hover:bg-surface-container-low transition-colors text-center cursor-pointer"
              >
                View Certificate
              </button>
              <button
                onClick={() => setShowExplorerModal(true)}
                className="flex-1 px-3 py-2 bg-primary text-on-primary font-title-md text-sm rounded-lg hover:bg-primary-container transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>View Explorer</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transparent by Design Section (MRV -> Calc -> Blockchain Flow) */}
      <div className="mt-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-headline-md text-primary text-lg font-semibold">Transparent by Design</h3>
          <p className="text-body-md text-on-surface-variant">
            Every blue carbon credit issued on this platform is mathematically derived from rigorous MRV (Measurement, Reporting, and Verification) sensor data. This physical truth is inextricably linked to an immutable blockchain record, ensuring government-grade transparency and eliminating double-counting.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-between w-full p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">sensors</span>
            </div>
            <span className="text-label-md text-center text-on-surface-variant font-medium">MRV Data</span>
          </div>
          <div className="w-8 h-[2px] bg-outline-variant"></div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <span className="text-label-md text-center text-on-surface-variant font-medium">Calculation</span>
          </div>
          <div className="w-8 h-[2px] bg-outline-variant"></div>
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-md">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <span className="text-label-md text-center text-primary font-bold">Blockchain</span>
          </div>
        </div>
      </div>

      {/* Explorer Modal Simulation */}
      {showExplorerModal && selectedRecord && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full border border-outline-variant/40 overflow-hidden flex flex-col animate-scaleUp">
            <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">lan</span>
                <span className="font-title-lg text-primary">Blockchain Ledger Explorer</span>
              </div>
              <button
                onClick={() => setShowExplorerModal(false)}
                className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 font-mono-data text-xs overflow-y-auto max-h-[70vh]">
              <div className="flex flex-col gap-1 bg-surface-container p-3 rounded-lg">
                <span className="text-outline uppercase text-[10px]">Transaction Hash</span>
                <span className="text-primary font-semibold break-all">{selectedRecord.txHash}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-outline uppercase text-[10px]">Status</span>
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> {selectedRecord.status}
                  </span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-outline uppercase text-[10px]">Block Height</span>
                  <span className="text-on-surface font-semibold">#{selectedRecord.blockNumber || 'Pending'}</span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-outline uppercase text-[10px]">Network</span>
                  <span className="text-on-surface font-semibold">{selectedRecord.networkFull}</span>
                </div>
                <div className="bg-surface-container p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-outline uppercase text-[10px]">Gas Consumption</span>
                  <span className="text-on-surface font-semibold">{selectedRecord.gasUsed}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 bg-surface-container p-3 rounded-lg">
                <span className="text-outline uppercase text-[10px]">Cryptographic Merkle Root</span>
                <span className="text-on-surface-variant break-all">{selectedRecord.merkleRoot}</span>
              </div>

              <div className="flex flex-col gap-1 bg-surface-container p-3 rounded-lg">
                <span className="text-outline uppercase text-[10px]">Smart Contract Method Call</span>
                <span className="text-on-surface font-mono">
                  mintBlueCarbonCredit(address recipient, uint256 amount, string creditId, string verificationProof)
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-surface-container-high bg-surface flex justify-end gap-2">
              <button
                onClick={() => setShowExplorerModal(false)}
                className="px-4 py-2 bg-primary text-on-primary rounded-lg font-title-md text-sm hover:bg-primary-container transition-colors cursor-pointer"
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
