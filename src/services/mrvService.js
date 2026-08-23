/* eslint-disable no-unused-vars */
/**
 * MRV service — mock implementation
 * Replace with Supabase queries later
 */
import { mrvSubmissions } from '../data/mrv';

export async function getMRVSubmissions(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let result = [...mrvSubmissions];
  if (filters.status) result = result.filter((m) => m.status === filters.status);
  if (filters.projectId) result = result.filter((m) => m.projectId === filters.projectId);
  return result;
}

export async function getMRVById(id) {
  await new Promise((r) => setTimeout(r, 200));
  return mrvSubmissions.find((m) => m.id === id) || null;
}

export async function submitMRVEvidence(data) {
  await new Promise((r) => setTimeout(r, 1000));
  return { success: true, id: 'MRV-' + Date.now() };
}

export async function verifyMRV(id, decision) {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true, status: decision };
}
