/* eslint-disable no-unused-vars */
/**
 * Project service — mock implementation
 * Replace with Supabase queries later
 */
import { projects } from '../data/projects';

export async function getProjects(filters = {}) {
  await new Promise((r) => setTimeout(r, 300));
  let result = [...projects];
  if (filters.status) result = result.filter((p) => p.status === filters.status);
  if (filters.state) result = result.filter((p) => p.state === filters.state);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    );
  }
  return result;
}

export async function getProjectById(id) {
  await new Promise((r) => setTimeout(r, 200));
  return projects.find((p) => p.id === id) || null;
}

export async function createProject(data) {
  await new Promise((r) => setTimeout(r, 800));
  return { success: true, id: 'PRJ-' + Date.now() };
}

export async function updateProject(id, data) {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
}
