import React, { useState } from 'react';
import { mockOrganizations } from '../data/mockOrganizations';
import OrganizationDetailDialog from '../components/OrganizationDetailDialog';

const StatusBadge = ({ status }) => {
  let colors = "bg-gray-100 text-gray-700";
  if (status === "Verified") {
    colors = "bg-[#4CAF50]/10 text-[#2E7D32]";
  } else if (status === "Pending") {
    colors = "bg-[#FFA000]/10 text-[#B47000]";
  } else if (status === "Suspended" || status === "Rejected") {
    colors = "bg-[#D32F2F]/10 text-[#D32F2F]";
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full font-label-md text-[12px] uppercase tracking-wider ${colors}`}>
      {status}
    </span>
  );
};

const OrganizationsPage = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrgs = mockOrganizations.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-primary tracking-tight">Registered Organizations</h1>
          <p className="font-body-md text-on-surface-variant mt-1">
            Manage and verify participating entities in the blue carbon registry.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Search organizations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 w-full md:w-64 transition-shadow"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-on-surface font-title-sm hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-title-sm hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Register Org
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F1F5F9] border-b border-outline-variant/30">
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Organization</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Type & Location</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Projects</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Verified Credits</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => setSelectedOrg(org)}>
                  <td className="px-6 py-4">
                    <div className="font-title-md text-on-surface">{org.name}</div>
                    <div className="font-mono-data text-outline text-[12px]">{org.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-body-md text-on-surface">{org.type}</div>
                    <div className="font-body-sm text-on-surface-variant">{org.location}</div>
                  </td>
                  <td className="px-6 py-4 font-body-md text-on-surface">
                    {org.activeProjects}
                  </td>
                  <td className="px-6 py-4 font-mono-data text-secondary">
                    {org.totalVerifiedCredits}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={org.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrg(org);
                      }}
                      className="p-2 rounded-md hover:bg-surface-container text-primary transition-colors inline-flex items-center justify-center"
                      title="View Details"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredOrgs.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-on-surface-variant font-body-md">
                    No organizations found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
          <span className="font-body-sm text-on-surface-variant">Showing 1 to {filteredOrgs.length} of {mockOrganizations.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container text-on-surface transition-colors" disabled>Previous</button>
            <button className="px-3 py-1 bg-primary text-on-primary rounded transition-colors">1</button>
            <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container text-on-surface transition-colors" disabled>Next</button>
          </div>
        </div>
      </div>

      <OrganizationDetailDialog 
        organization={selectedOrg} 
        isOpen={!!selectedOrg} 
        onClose={() => setSelectedOrg(null)} 
      />
    </div>
  );
};

export default OrganizationsPage;
