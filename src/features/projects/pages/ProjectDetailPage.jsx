import { useState } from 'react';
import { mockProjects } from '../data/mockProjects';

const ProjectDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  
  // Hardcoded to the specific project for demonstration based on Stitch
  const project = mockProjects.find(p => p.id === "PRJ-MMR-01") || mockProjects[0];

  const tabs = ["Overview", "MRV Evidence", "Drone Data", "Carbon", "Blockchain", "Audit Trail"];

  return (
    <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-headline-lg text-primary tracking-tight">{project.name}</h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full font-label-md text-[12px] uppercase tracking-wider ${project.status === 'Verified' ? 'bg-[#4CAF50]/10 text-[#2E7D32]' : 'bg-[#FFA000]/10 text-[#B47000]'}`}>
              {project.status}
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant flex items-center gap-2">
            <span className="font-mono-data bg-surface-container px-2 py-0.5 rounded text-outline">{project.id}</span>
            <span>•</span>
            <span>{project.location}</span>
            <span>•</span>
            <span>Managed by {project.developer}</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-on-surface font-title-sm hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Edit Project
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-outline-variant rounded-lg text-on-surface font-title-sm hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-title-sm hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[20px]">link</span>
            View Blockchain Record
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-outline-variant/30 overflow-x-auto hide-scrollbar">
        <nav className="flex gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-title-sm transition-colors whitespace-nowrap relative ${
                activeTab === tab 
                  ? 'text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-t-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-title-lg text-on-surface mb-4">Project Description</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </section>
            
            <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6">
              <h3 className="font-title-md text-on-surface mb-6">Target Ecosystem</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="block font-label-md text-outline mb-1 uppercase">Ecosystem Type</span>
                  <p className="font-body-md text-on-surface">{project.ecosystem.target}</p>
                </div>
                <div>
                  <span className="block font-label-md text-outline mb-1 uppercase">Primary Species</span>
                  <p className="font-body-md text-on-surface">{project.ecosystem.primarySpecies}</p>
                </div>
                <div>
                  <span className="block font-label-md text-outline mb-1 uppercase">Project Sites</span>
                  <p className="font-body-md text-on-surface">{project.ecosystem.sites}</p>
                </div>
                <div>
                  <span className="block font-label-md text-outline mb-1 uppercase">Community Involvement</span>
                  <p className="font-body-md text-on-surface">{project.ecosystem.communityInvolved}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Content (Right Column) */}
          <div className="space-y-6">
            <section className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
              <h2 className="font-title-md text-on-surface mb-4">Project Vital Stats</h2>
              
              <ul className="space-y-4">
                <li className="flex flex-col">
                  <span className="font-label-md text-outline mb-1 uppercase">Start Date</span>
                  <span className="font-body-md text-on-surface">{project.startDate}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-outline mb-1 uppercase">Methodology</span>
                  <span className="font-body-md text-on-surface">{project.methodology}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-outline mb-1 uppercase">Crediting Period</span>
                  <span className="font-body-md text-on-surface">{project.creditingPeriod}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-outline mb-1 uppercase">Last Verification Date</span>
                  <span className="font-body-md text-on-surface">{project.verificationDate}</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-label-md text-outline mb-1 uppercase">Next Audit Due</span>
                  <span className="font-body-md text-on-surface">{project.nextAuditDue}</span>
                </li>
              </ul>
            </section>

            <section className="bg-surface rounded-xl border border-outline-variant/30 p-6 shadow-sm">
              <h3 className="font-title-md text-on-surface mb-4">Blockchain Status</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#00BCD4]/10 flex items-center justify-center text-[#00BCD4]">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <div className="font-title-sm text-on-surface">{project.blockchainStatus}</div>
                  <div className="font-body-sm text-on-surface-variant">Immutable Record</div>
                </div>
              </div>
              <div>
                <span className="block font-label-md text-outline mb-1 uppercase">Tx Hash</span>
                <span className="font-mono-data text-tertiary break-all bg-surface-container-low p-2 rounded block">{project.txHash}</span>
              </div>
            </section>
          </div>

        </div>
      )}

      {/* Placeholders for other tabs */}
      {activeTab !== "Overview" && (
        <div className="py-12 flex flex-col items-center justify-center text-on-surface-variant bg-surface rounded-xl border border-outline-variant/30 border-dashed">
          <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">construction</span>
          <p className="font-title-md">{activeTab} section is under construction.</p>
        </div>
      )}

    </div>
  );
};

export default ProjectDetailPage;
