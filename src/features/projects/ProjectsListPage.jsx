import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProjects, getProjects, projectTypes } from './projectsService';
import StatusBadge from '../../components/common/StatusBadge';
import { formatNumber, formatCarbon, formatArea } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export default function ProjectsListPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(() => getProjects());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);

  // Eagerly fetch latest projects from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const liveProjects = await fetchProjects();
        if (isMounted && liveProjects && liveProjects.length > 0) {
          setProjects(liveProjects);
        }
      } catch (err) {
        console.warn('Unable to load live projects from Supabase:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute stats dynamically from the actual projects list
  const stats = useMemo(() => {
    const total = projects.length;
    const verified = projects.filter((p) => p.status === 'Verified' || p.dbStatus === 'VERIFIED').length;
    const active = projects.filter((p) => p.status === 'Active' || p.dbStatus === 'ACTIVE').length;
    const pending = projects.filter(
      (p) => p.status === 'Pending' || p.status === 'Under Review' || p.dbStatus === 'SUBMITTED' || p.dbStatus === 'UNDER_REVIEW'
    ).length;
    const totalArea = projects.reduce((sum, p) => sum + (Number(p.area) || 0), 0);
    const totalCO2e = projects.reduce((sum, p) => sum + (Number(p.estCO2e) || Number(p.est_co2e) || 0), 0);

    return { total, verified, active, pending, totalArea, totalCO2e };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];

    // Status Filter (Normalized)
    if (selectedStatus && selectedStatus !== 'All') {
      const target = selectedStatus.toLowerCase().replace(/\s+/g, '_');
      list = list.filter((p) => {
        const pStatus = (p.status || '').toLowerCase().replace(/\s+/g, '_');
        const pDbStatus = (p.dbStatus || '').toLowerCase();
        return (
          pStatus === target ||
          pDbStatus === target ||
          (target === 'active' && (pDbStatus === 'active' || pStatus === 'active')) ||
          (target === 'verified' && (pDbStatus === 'verified' || pStatus === 'verified')) ||
          (target === 'pending' && (pDbStatus === 'submitted' || pStatus === 'pending')) ||
          (target === 'under_review' && (pDbStatus === 'under_review' || pStatus === 'under_review'))
        );
      });
    }

    // Type Filter (Normalized)
    if (selectedType && selectedType !== 'All') {
      const targetType = selectedType.toLowerCase();
      list = list.filter((p) => (p.type || '').toLowerCase().includes(targetType));
    }

    // Search Filter
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.id?.toLowerCase().includes(q) ||
          p.project_code?.toLowerCase().includes(q) ||
          p.organization?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.state?.toLowerCase().includes(q) ||
          p.type?.toLowerCase().includes(q)
      );
    }

    // Sort
    list.sort((a, b) => {
      let valA = a[sortBy] ?? '';
      let valB = b[sortBy] ?? '';

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB || '').toString().toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }, [projects, searchTerm, selectedStatus, selectedType, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All');
    setSelectedType('All');
  };

  const statusOptions = ['All', 'Verified', 'Active', 'Pending', 'Under Review', 'Draft', 'Rejected'];

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 lg:p-8 gap-6 max-w-[1600px] mx-auto font-body-md text-on-surface">
      {/* Top Header / Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant font-mono-data text-xs mb-1">
            <span>REGISTRY</span>
            <span>/</span>
            <span className="text-primary font-semibold">PROJECTS</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl text-primary font-bold tracking-tight">Blue Carbon Projects</h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
            Manage, verify, and monitor coastal ecological restoration and blue carbon sequestration initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={ROUTES.ORG_CREATE_PROJECT || '/organization/projects/new'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-primary relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Total Projects</div>
          <div className="font-headline-md text-2xl font-bold text-primary">{stats.total}</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-secondary relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Verified</div>
          <div className="font-headline-md text-2xl font-bold text-secondary">{stats.verified}</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-[#2e7d32] relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Active Projects</div>
          <div className="font-headline-md text-2xl font-bold text-[#2e7d32]">{stats.active}</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-[#f57f17] relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Under Review</div>
          <div className="font-headline-md text-2xl font-bold text-[#f57f17]">{stats.pending}</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-tertiary-fixed-dim relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Total Area</div>
          <div className="font-headline-md text-2xl font-bold text-on-surface">
            {formatNumber(stats.totalArea)} <span className="text-body-md text-xs text-on-surface-variant font-normal">ha</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 border-t-4 border-t-[#00abc1] relative overflow-hidden">
          <div className="text-label-md text-on-surface-variant uppercase tracking-wider mb-1 text-xs font-semibold">Est. CO2e</div>
          <div className="font-headline-md text-2xl font-bold text-primary">
            {formatNumber(stats.totalCO2e)} <span className="text-body-md text-xs text-on-surface-variant font-normal">t</span>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col w-full">
        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, project name, organization, or location..."
              className="w-full pl-10 pr-4 py-2 bg-surface rounded-xl border border-outline-variant/50 font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-xl border border-outline-variant/50 text-sm">
              <span className="font-label-md text-on-surface-variant text-xs uppercase font-semibold">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent font-title-md text-on-surface outline-none cursor-pointer text-sm pr-1"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Ecosystem Type Filter */}
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-xl border border-outline-variant/50 text-sm">
              <span className="font-label-md text-on-surface-variant text-xs uppercase font-semibold">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent font-title-md text-on-surface outline-none cursor-pointer text-sm pr-1"
              >
                <option value="All">All Types</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {(searchTerm || selectedStatus !== 'All' || selectedType !== 'All') && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-container text-xs font-semibold text-primary transition-colors border border-outline-variant/50 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">filter_list_off</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="px-5 py-2.5 bg-surface-container-low/40 border-b border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
          <div>
            Showing <span className="font-bold text-on-surface">{filteredProjects.length}</span> of{' '}
            <span className="font-bold text-on-surface">{stats.total}</span> projects
            {isLoading && <span className="ml-2 text-primary font-semibold animate-pulse">(Updating...)</span>}
          </div>
          <div className="flex items-center gap-2">
            <span>Sorted by <strong className="text-on-surface">{sortBy}</strong> ({sortOrder})</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/40 text-on-surface-variant text-xs font-semibold uppercase tracking-wider select-none">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Project ID & Name</span>
                    {sortBy === 'name' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('organization')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Organization</span>
                    {sortBy === 'organization' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('type')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Ecosystem Type</span>
                    {sortBy === 'type' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('location')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Location</span>
                    {sortBy === 'location' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('area')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Area (ha)</span>
                    {sortBy === 'area' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('estCO2e')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Est. CO2e</span>
                    {sortBy === 'estCO2e' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <span className="material-symbols-outlined text-[16px]">
                        {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline-variant/20 text-body-md font-body-md text-on-surface">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-16 text-center text-on-surface-variant w-full">
                    <div className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto px-4">
                      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined text-[36px]">search_off</span>
                      </div>
                      <p className="font-title-md text-base font-bold text-on-surface">No projects found</p>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        Try adjusting your search terms or filter criteria to find the blue carbon project.
                      </p>
                      {(searchTerm || selectedStatus !== 'All' || selectedType !== 'All') && (
                        <button
                          onClick={handleClearFilters}
                          className="mt-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                        >
                          Clear All Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => {
                  const detailUrl = `/projects/${project.id}`;

                  return (
                    <tr
                      key={project.id}
                      onClick={() => navigate(detailUrl)}
                      className="hover:bg-primary/5 transition-colors cursor-pointer group"
                    >
                      {/* ID & Name */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="font-title-md text-sm text-primary group-hover:underline font-bold leading-snug">
                            {project.name}
                          </span>
                          <span className="font-mono-data text-xs text-on-surface-variant">
                            {project.id}
                          </span>
                        </div>
                      </td>

                      {/* Organization */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-on-surface text-sm">
                          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                            corporate_fare
                          </span>
                          <span className="truncate max-w-[180px] font-medium">{project.organization}</span>
                        </div>
                      </td>

                      {/* Ecosystem Type */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-surface-container text-on-surface-variant font-medium">
                          <span className="material-symbols-outlined text-[14px] text-secondary">
                            nature
                          </span>
                          {project.type}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px] text-primary">
                            location_on
                          </span>
                          <span className="truncate max-w-[160px]">{project.location}</span>
                        </div>
                      </td>

                      {/* Area */}
                      <td className="py-3.5 px-4 text-right font-mono-data text-sm font-medium">
                        {formatArea(project.area)}
                      </td>

                      {/* Est. CO2e */}
                      <td className="py-3.5 px-4 text-right font-mono-data text-sm font-bold text-primary">
                        {formatCarbon(project.estCO2e)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={project.status} />
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            to={detailUrl}
                            className="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors inline-flex items-center justify-center"
                            title="View Project Details"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              visibility
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
