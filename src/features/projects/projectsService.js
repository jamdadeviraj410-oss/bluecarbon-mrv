/**
 * Projects mock service layer
 * Wraps src/data/projects.js for use in project feature components
 */

import { projects, projectTypes, indianStates } from '../../data/projects';

/**
 * Get all projects, optionally filtered
 * @param {{ status?: string, type?: string, search?: string }} filters
 * @returns {Array} filtered projects
 */
export function getProjects(filters = {}) {
  let result = [...projects];

  if (filters.status && filters.status !== 'All') {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.type && filters.type !== 'All') {
    result = result.filter((p) => p.type === filters.type);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }

  return result;
}

/**
 * Get a single project by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

/**
 * Compute summary statistics from all projects
 * @returns {Object}
 */
export function getProjectStats() {
  const total = projects.length;
  const active = projects.filter((p) => p.status === 'Active').length;
  const verified = projects.filter((p) => p.status === 'Verified').length;
  const pending = projects.filter(
    (p) => p.status === 'Pending' || p.status === 'Under Review'
  ).length;
  const totalArea = projects.reduce((sum, p) => sum + p.area, 0);
  const totalCO2e = projects.reduce((sum, p) => sum + p.estCO2e, 0);

  return { total, active, verified, pending, totalArea, totalCO2e };
}

/**
 * Mock create project — returns a new project object with generated ID
 * @param {Object} data
 * @returns {Object}
 */
export function createProject(data) {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return {
    id: `PRJ-${year}-${seq}`,
    status: 'Draft',
    totalCredits: 0,
    retiredCredits: 0,
    activeCredits: 0,
    verificationDate: null,
    ...data,
  };
}

export { projectTypes, indianStates };
