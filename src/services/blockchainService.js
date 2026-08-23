import { supabase } from '../lib/supabase';

/** Real blockchain writes are performed server-side by the anchor-mrv Edge Function. */
export async function getBlockchainTransactions(filters = {}) {
  let query = supabase.from('blockchain_records').select(`*, credit:carbon_credits(*, project:projects(*, organization:organizations(*))), network:blockchain_networks(*), contract:smart_contracts(*)`).order('on_chain_timestamp', { ascending: false });
  if (filters.status && filters.status !== 'All') query = query.eq('status', filters.status.toUpperCase());
  if (filters.recordType && filters.recordType !== 'All') query = query.eq('record_type', filters.recordType);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getBlockchainRecordById(identifier) {
  if (!identifier) return null;
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
  let query = supabase.from('blockchain_records').select(`*, credit:carbon_credits(*, project:projects(*, organization:organizations(*))), network:blockchain_networks(*), contract:smart_contracts(*)`);
  if (uuid) query = query.eq('id', identifier);
  else if (identifier.startsWith('0x')) query = query.eq('tx_hash', identifier);
  else query = query.eq('record_code', identifier);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

export async function anchorMRVSubmission(submissionId) {
  if (!submissionId) throw new Error('submissionId is required');
  const { data, error } = await supabase.functions.invoke('anchor-mrv', { body: { submissionId } });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error || 'Blockchain anchoring failed');
  return data;
}

/** Read-only integrity check against the immutable hash recorded at anchoring time. */
export async function verifyMRVAnchor(submissionId) {
  if (!submissionId) throw new Error('submissionId is required');
  const { data: anchor, error: anchorError } = await supabase.from('mrv_blockchain_anchors').select('*, blockchain_record:blockchain_records(*), network:blockchain_networks(*)').eq('submission_id', submissionId).eq('status', 'CONFIRMED').maybeSingle();
  if (anchorError) throw anchorError;
  if (!anchor) return { verified: false, reason: 'NO_CONFIRMED_ANCHOR' };

  const { data: submission, error: submissionError } = await supabase.from('mrv_submissions').select('id, submission_code, project_id, status, carbon_estimate, claimed_metrics, period_start, period_end, verified_at').eq('id', submissionId).single();
  if (submissionError) throw submissionError;
  const { data: evidence, error: evidenceError } = await supabase.from('evidence_files').select('id, file_name, file_type, file_size_bytes, sha256_hash, validation_status').eq('submission_id', submissionId).order('id');
  if (evidenceError) throw evidenceError;

  const canonicalize = (value) => {
    if (value === null || typeof value !== 'object') return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`).join(',')}}`;
  };
  const canonical = canonicalize({
    submission: { id: submission.id, code: submission.submission_code, project_id: submission.project_id, status: submission.status, carbon_estimate: submission.carbon_estimate, claimed_metrics: submission.claimed_metrics || {}, period_start: submission.period_start, period_end: submission.period_end, verified_at: submission.verified_at },
    evidence: (evidence || []).map((e) => ({ id: e.id, file_name: e.file_name, file_type: e.file_type, file_size_bytes: e.file_size_bytes, sha256_hash: e.sha256_hash, validation_status: e.validation_status })),
  });
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical));
  const currentHash = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
  return { verified: currentHash === anchor.data_hash, currentHash, anchoredHash: anchor.data_hash, transactionHash: anchor.tx_hash, explorerUrl: anchor.blockchain_record?.explorer_url || null, blockNumber: anchor.block_number, network: anchor.network?.name || null };
}

/** Deprecated: prevents the old random/fake transaction implementation from being used. */
export async function mintCarbonCredits() {
  throw new Error('mintCarbonCredits is deprecated. Use anchorMRVSubmission(submissionId).');
}
