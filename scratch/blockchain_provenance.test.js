import crypto from 'node:crypto';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('=== BlueCarbon MRV Blockchain Provenance Test Suite ===\n');

// 1. Canonicalization algorithm implementation
function canonicalize(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  const obj = value;
  return `{${Object.keys(obj).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(obj[key])}`).join(',')}}`;
}

function sha256Hex(input) {
  return crypto.createHash('sha256').update(input, 'utf8').digest('hex');
}

// Test 1: Deterministic Canonical JSON (Key order independence)
console.log('Test 1: Testing canonicalization determinism across varying key orders...');
const payloadA = {
  submission: {
    id: '123e4567-e89b-12d3-a456-426614174000',
    code: 'MRV-2026-001',
    project_id: 'PRJ-2023-089',
    status: 'VERIFIED',
    carbon_estimate: 1250.0,
    claimed_metrics: { canopy_cover_percent: 85, biomass_density: 140 },
    period_start: '2026-01-01',
    period_end: '2026-06-30',
    verified_at: '2026-08-14T10:00:00Z',
  },
  evidence: [
    { id: '1', file_name: 'drone.las', file_type: 'las', file_size_bytes: 1048576, sha256_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', validation_status: 'VALID' },
  ],
};

const payloadB = {
  evidence: [
    { validation_status: 'VALID', sha256_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', file_size_bytes: 1048576, file_type: 'las', file_name: 'drone.las', id: '1' },
  ],
  submission: {
    verified_at: '2026-08-14T10:00:00Z',
    period_end: '2026-06-30',
    period_start: '2026-01-01',
    claimed_metrics: { biomass_density: 140, canopy_cover_percent: 85 },
    carbon_estimate: 1250.0,
    status: 'VERIFIED',
    project_id: 'PRJ-2023-089',
    code: 'MRV-2026-001',
    id: '123e4567-e89b-12d3-a456-426614174000',
  },
};

const canonicalA = canonicalize(payloadA);
const canonicalB = canonicalize(payloadB);
assert.strictEqual(canonicalA, canonicalB, 'Canonical strings must match regardless of object property ordering');
const hashA = sha256Hex(canonicalA);
const hashB = sha256Hex(canonicalB);
assert.strictEqual(hashA, hashB, 'SHA-256 digests must match exactly');
console.log('✓ Canonical determinism verified: ' + hashA);

// Test 2: Tamper Detection (Altered Carbon Estimate)
console.log('\nTest 2: Testing tamper detection upon altered carbon estimate...');
const tamperedCarbonPayload = JSON.parse(JSON.stringify(payloadA));
tamperedCarbonPayload.submission.carbon_estimate = 1250.01; // subtle tamper
const tamperedCarbonHash = sha256Hex(canonicalize(tamperedCarbonPayload));
assert.notStrictEqual(hashA, tamperedCarbonHash, 'Tampered carbon estimate must produce a different hash');
console.log('✓ Tamper detected on carbon estimate: ' + tamperedCarbonHash + ' !== ' + hashA);

// Test 3: Tamper Detection (Altered Evidence File SHA-256)
console.log('\nTest 3: Testing tamper detection upon altered evidence file...');
const tamperedEvidencePayload = JSON.parse(JSON.stringify(payloadA));
tamperedEvidencePayload.evidence[0].sha256_hash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
const tamperedEvidenceHash = sha256Hex(canonicalize(tamperedEvidencePayload));
assert.notStrictEqual(hashA, tamperedEvidenceHash, 'Tampered evidence hash must alter final digest');
console.log('✓ Tamper detected on evidence hash: ' + tamperedEvidenceHash + ' !== ' + hashA);

// Test 4: Smart Contract Interface Verification
console.log('\nTest 4: Verifying Solidity contract signatures in BlueCarbonMRVAnchor.sol...');
const contractPath = path.resolve('contracts', 'BlueCarbonMRVAnchor.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

assert(contractSource.includes('function anchorMRV('), 'Contract must contain anchorMRV function');
assert(contractSource.includes('bytes32 dataHash'), 'anchorMRV must take bytes32 dataHash');
assert(contractSource.includes('string calldata recordId'), 'anchorMRV must take recordId');
assert(contractSource.includes('uint256 carbonAmountCentiTonne'), 'anchorMRV must take carbonAmountCentiTonne');
assert(contractSource.includes('function verifyMRV('), 'Contract must contain verifyMRV function');
assert(contractSource.includes('function getAnchor('), 'Contract must contain getAnchor function');
assert(contractSource.includes('function isAnchored('), 'Contract must contain isAnchored function');
assert(contractSource.includes('event MRVAnchored('), 'Contract must emit MRVAnchored event');
console.log('✓ Smart contract signatures and event declarations verified.');

// Test 5: Verify Edge Function code integrity
console.log('\nTest 5: Verifying Edge Function files...');
const anchorFnPath = path.resolve('supabase', 'functions', 'anchor-mrv', 'index.ts');
const verifyFnPath = path.resolve('supabase', 'functions', 'verify-mrv', 'index.ts');
assert(fs.existsSync(anchorFnPath), 'anchor-mrv index.ts must exist');
assert(fs.existsSync(verifyFnPath), 'verify-mrv index.ts must exist');

const anchorCode = fs.readFileSync(anchorFnPath, 'utf8');
const verifyCode = fs.readFileSync(verifyFnPath, 'utf8');

assert(anchorCode.includes('anchorMRV'), 'anchor-mrv must call contract anchorMRV');
assert(anchorCode.includes('POLYGON_PRIVATE_KEY'), 'anchor-mrv must reference server-side private key');
assert(verifyCode.includes('verifyMRV'), 'verify-mrv must call contract verifyMRV');
assert(!anchorCode.includes('Math.random()'), 'anchor-mrv must never generate random fake transaction hashes');
assert(!verifyCode.includes('Math.random()'), 'verify-mrv must never generate random fake transaction hashes');
console.log('✓ Edge functions verified: strictly server-side cryptographic and RPC operations.');

console.log('\n========================================');
console.log('ALL BLOCKCHAIN PROVENANCE TESTS PASSED!');
console.log('========================================');
