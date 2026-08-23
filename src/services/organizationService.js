/**
 * Organization service — mock implementation
 * Replace with Supabase queries later
 */
import { organizations } from '../data/organizations';

export async function getOrganizations(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let result = [...organizations];
  if (filters.status) result = result.filter((o) => o.status === filters.status);
  if (filters.type) result = result.filter((o) => o.type === filters.type);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (o) => o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    );
  }
  return result;
}

export async function getOrganizationById(id) {
  await new Promise((r) => setTimeout(r, 200));
  return organizations.find((o) => o.id === id) || null;
}
