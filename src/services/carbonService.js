/* eslint-disable no-unused-vars */
/**
 * Carbon credits service — mock implementation
 * Replace with Supabase + blockchain queries later
 */
import { carbonCredits } from '../data/carbonCredits';

export async function getCarbonCredits(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let result = [...carbonCredits];
  if (filters.status) result = result.filter((c) => c.status === filters.status);
  if (filters.projectId) result = result.filter((c) => c.projectId === filters.projectId);
  return result;
}

export async function getCreditById(id) {
  await new Promise((r) => setTimeout(r, 200));
  return carbonCredits.find((c) => c.id === id) || null;
}

export async function retireCredits(id, quantity) {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true, transactionHash: '0x' + Math.random().toString(16).slice(2, 10) };
}
