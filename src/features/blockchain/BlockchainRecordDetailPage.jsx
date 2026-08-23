import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBlockchainRecord } from './blockchainService';
import { truncateHash, formatNumber } from '../../utils/formatters';

export default function BlockchainRecordDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedMerkle, setCopiedMerkle] = useState(false);

  const record = useMemo(() => getBlockchainRecord(id), [id]);

  const handleCopy = (text, setter) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
        <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
        <h2 className="font-headline-md text-primary">Blockchain Record Not Found</h2>
        <p className="text-body-md text-on-surface-variant">
          No blockchain record found for identifier "{id}".
        </p>
        <button
          onClick={() => navigate('/admin/blockchain')}
          className="px-4 py-2 bg-primary text-on-primary rounded-lg font-title-md hover:bg-primary-container transition-colors"
        >
          Return to Blockchain Registry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6 max-w-[1440px] mx-auto font-body-md text-on-surface">
      {/* Top Breadcrumb / Back Link */}
      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
        <Link to="/admin/blockchain" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Blockchain Registry</span>
        </Link>
        <span>/</span>
        <span className="font-mono-data text-primary font-semibold">{record.creditId}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-headline-lg text-primary tracking-tight">On-Chain Transaction Details</h1>
            <span className="px-3 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md flex items-center gap-1 border border-secondary-container">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{record.status}</span>
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant max-w-3xl">
            Cryptographically verified immutable proof of blue carbon sequestration on public ledger.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="font-mono-data text-on-surface-variant px-2.5 py-1 bg-surface-container rounded text-xs">
              Tx: {truncateHash(record.txHash, 10, 8)}
            </span>
            <span className="font-mono-data text-on-surface-variant px-2.5 py-1 bg-surface-container rounded text-xs">
              Token ID: #{record.tokenId}
            </span>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate(`/admin/carbon-credits/${record.creditId}`)}
            className="px-4 py-2 rounded-lg border border-primary-container text-primary-container font-title-md hover:bg-surface-container transition-colors flex items-center gap-2 shadow-sm text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span>View Certificate</span>
          </button>
          <button
            onClick={() => handleCopy(record.txHash, setCopiedHash)}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-title-md hover:bg-primary-container transition-colors flex items-center gap-2 shadow-md text-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copiedHash ? 'check' : 'content_copy'}
            </span>
            <span>{copiedHash ? 'Hash Copied' : 'Copy Hash'}</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-secondary flex flex-col gap-2 relative overflow-hidden">
          <span className="font-label-md text-on-surface-variant uppercase tracking-wider block text-[11px]">CO2e Volume Minted</span>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-on-surface font-mono-data">{formatNumber(record.tCO2e)}</span>
            <span className="font-title-md text-on-surface-variant pb-1">tCO2e</span>
          </div>
          <div className="flex items-center gap-1 text-secondary text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">trending_up</span> Verified Sequestered
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-primary flex flex-col gap-2 relative overflow-hidden">
          <span className="font-label-md text-on-surface-variant uppercase tracking-wider block text-[11px]">Block Height</span>
          <div className="flex items-end gap-2">
            <span className="font-headline-lg text-on-surface font-mono-data">#{record.blockNumber || 'Pending'}</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px] text-primary">hub</span> {record.confirmations} Confirmations
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-tertiary-fixed-dim flex flex-col gap-2 relative overflow-hidden">
          <span className="font-label-md text-on-surface-variant uppercase tracking-wider block text-[11px]">Execution Network</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white font-bold" style={{ backgroundColor: record.networkColor }}>
              {record.networkSymbol}
            </div>
            <span className="font-title-lg text-on-surface">{record.networkFull}</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-1">
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">speed</span> Gas: {record.gasUsed}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border-t-4 border-inverse-surface flex flex-col gap-2 relative overflow-hidden">
          <span className="font-label-md text-on-surface-variant uppercase tracking-wider block text-[11px]">Verification Standard</span>
          <div className="flex flex-col justify-end">
            <span className="font-title-md text-on-surface truncate">{record.methodology}</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[16px] text-outline">gavel</span> ID: {record.verificationId}
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Blockchain Record Slate Card */}
          <div className="bg-inverse-surface p-6 rounded-xl shadow-lg relative overflow-hidden text-inverse-on-surface flex flex-col gap-5">
            <h2 className="font-headline-md text-inverse-on-surface text-lg flex items-center gap-2 border-b border-outline-variant/20 pb-3">
              <span className="material-symbols-outlined text-primary-fixed-dim">lan</span>
              <span>Cryptographic Proof & Contract Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 font-mono-data text-xs">
              <div className="flex flex-col gap-1">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Network Protocol</span>
                <span className="font-title-md text-inverse-on-surface text-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: record.networkColor }}></div>
                  {record.networkFull}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Block Number</span>
                <span className="text-inverse-on-surface text-sm font-semibold">{record.blockNumber ? `#${record.blockNumber}` : 'Pending'}</span>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Smart Contract Address</span>
                <div className="flex items-center gap-2 bg-surface/10 px-3 py-2 rounded-lg w-full justify-between">
                  <span className="text-inverse-on-surface truncate break-all">{record.contractAddress}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(record.contractAddress, setCopiedContract)}
                    className="text-primary-fixed-dim hover:text-inverse-on-surface transition-colors shrink-0 cursor-pointer"
                    title="Copy Contract"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedContract ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Transaction Hash</span>
                <div className="flex items-center gap-2 bg-surface/10 px-3 py-2 rounded-lg w-full justify-between">
                  <span className="text-inverse-on-surface truncate break-all">{record.txHash}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(record.txHash, setCopiedHash)}
                    className="text-primary-fixed-dim hover:text-inverse-on-surface transition-colors shrink-0 cursor-pointer"
                    title="Copy Tx Hash"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedHash ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 sm:col-span-2">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Merkle Root Hash</span>
                <div className="flex items-center gap-2 bg-surface/10 px-3 py-2 rounded-lg w-full justify-between">
                  <span className="text-inverse-on-surface truncate break-all">{record.merkleRoot}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(record.merkleRoot, setCopiedMerkle)}
                    className="text-primary-fixed-dim hover:text-inverse-on-surface transition-colors shrink-0 cursor-pointer"
                    title="Copy Merkle Root"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedMerkle ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Token ID</span>
                <span className="text-inverse-on-surface text-sm font-semibold">{record.tokenId}</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-label-md text-outline uppercase tracking-wider text-[10px]">Timestamp (UTC)</span>
                <span className="text-inverse-on-surface text-sm">{record.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Verification Lifecycle Section */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-4">
            <h2 className="font-headline-md text-primary text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">route</span>
              <span>Provenance & Verification Lifecycle</span>
            </h2>

            <div className="relative pl-6 space-y-5">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-outline-variant"></div>

              {record.lifecycle.map((step) => {
                const isDone = step.status === 'completed';
                return (
                  <div key={step.step} className="relative z-10 flex flex-col gap-0.5">
                    <div
                      className={`absolute -left-6 mt-0.5 w-4 h-4 rounded-full ring-4 ring-surface-container-lowest ${
                        isDone ? 'bg-secondary' : 'bg-surface-variant border border-outline-variant'
                      }`}
                    ></div>
                    <div className="pl-3">
                      <span className="font-title-md text-on-surface text-sm block">{step.title}</span>
                      <span className="font-body-md text-on-surface-variant text-xs">
                        {step.date} • {step.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Associated Project & MRV Card */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container-high flex flex-col gap-4">
            <h3 className="font-title-lg text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">account_tree</span>
              <span>Associated Blue Carbon Asset</span>
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <div className="p-3 bg-surface-container rounded-lg flex flex-col gap-1">
                <span className="text-label-md text-on-surface-variant uppercase text-[10px]">Project Name</span>
                <span className="font-title-md text-primary">{record.projectName}</span>
                <span className="text-body-md text-on-surface-variant text-xs">{record.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface-container rounded-lg flex flex-col gap-1">
                  <span className="text-label-md text-on-surface-variant uppercase text-[10px]">Organization</span>
                  <span className="font-body-md text-on-surface font-medium truncate">{record.organization}</span>
                </div>
                <div className="p-3 bg-surface-container rounded-lg flex flex-col gap-1">
                  <span className="text-label-md text-on-surface-variant uppercase text-[10px]">Lead Auditor</span>
                  <span className="font-body-md text-on-surface font-medium truncate">{record.auditor}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container-high flex flex-col gap-2">
              <Link
                to={`/admin/carbon-credits/${record.creditId}`}
                className="w-full py-2.5 px-4 bg-primary text-on-primary rounded-lg font-title-md text-sm text-center hover:bg-primary-container transition-colors shadow-sm"
              >
                View Official Carbon Certificate
              </Link>
              <Link
                to="/admin/blockchain"
                className="w-full py-2.5 px-4 bg-surface-container text-on-surface rounded-lg font-title-md text-sm text-center hover:bg-surface-container-highest transition-colors"
              >
                Back to Registry Ledger
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
