import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { anchorMRVSubmission, verifyMRVAnchor } from '../../../services/blockchainService';

export default function MrvBlockchainAnchorPage() {
  const { submissionId } = useParams();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function run(action) {
    setBusy(true);
    setError('');
    try {
      const data = await action(submissionId);
      setResult(data);
    } catch (err) {
      setError(err?.message || 'Blockchain operation failed');
    } finally {
      setBusy(false);
    }
  }

  const verified = result?.verified === true || result?.success === true;
  return (
    <div className="min-h-[70vh] p-6 md:p-8 max-w-4xl mx-auto">
      <Link to="/admin/blockchain" className="text-sm text-primary hover:underline">← Blockchain Registry</Link>
      <div className="mt-5 bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-on-surface-variant font-semibold">MRV Blockchain Anchor</p>
            <h1 className="text-2xl font-bold text-primary mt-1">Immutable integrity proof</h1>
            <p className="text-sm text-on-surface-variant mt-2 break-all">Submission: {submissionId}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button disabled={busy} onClick={() => run(anchorMRVSubmission)} className="px-4 py-2 rounded-lg bg-primary text-on-primary disabled:opacity-50">
              {busy ? 'Working…' : 'Anchor on Polygon'}
            </button>
            <button disabled={busy} onClick={() => run(verifyMRVAnchor)} className="px-4 py-2 rounded-lg border border-primary text-primary disabled:opacity-50">
              Verify On-Chain
            </button>
          </div>
        </div>

        {error && <div className="mt-5 p-4 rounded-xl bg-error-container text-on-error-container text-sm">{error}</div>}

        {result && (
          <div className="mt-6 grid gap-3">
            <div className={`p-4 rounded-xl border ${verified ? 'bg-secondary-container/30 border-secondary' : 'bg-error-container/30 border-error'}`}>
              <div className="font-semibold">{verified ? '✓ Blockchain integrity verified' : 'Blockchain verification not confirmed'}</div>
              {result.reason && <div className="text-sm mt-1">Reason: {result.reason}</div>}
            </div>
            {result.dataHash && <div className="p-4 rounded-xl bg-surface-container"><div className="text-xs text-on-surface-variant">MRV SHA-256</div><code className="text-xs break-all">{result.dataHash}</code></div>}
            {result.transactionHash && <div className="p-4 rounded-xl bg-surface-container"><div className="text-xs text-on-surface-variant">Transaction</div><code className="text-xs break-all">{result.transactionHash}</code>{result.explorerUrl && <a className="block mt-2 text-sm text-primary hover:underline" href={result.explorerUrl} target="_blank" rel="noreferrer">Open Polygon Explorer ↗</a>}</div>}
            {result.blockNumber && <div className="text-sm text-on-surface-variant">Block #{result.blockNumber}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
