import { useState } from 'react';

const MOCK_PROJECTS = [
  { id: 'PRJ-BC-0924', name: 'Boca Chica Mangrove Restoration', dueLabel: 'Submission Due: 14 Days', dueSeverity: 'warn' },
  { id: 'PRJ-SE-1102', name: 'Salinas Estuary Protection', dueLabel: 'Submission Due: 45 Days', dueSeverity: 'ok' },
];

const MOCK_ACTIVE_PROJECTS = [
  {
    name: 'Boca Chica Mangrove',
    image: null,
    progress: 82,
    step: 'Step 4/5: Biomass Survey',
    dueText: 'Due in 14 days',
    dueColor: 'text-error',
    barColor: 'bg-secondary',
  },
  {
    name: 'Salinas Estuary',
    image: null,
    progress: 45,
    step: 'Step 2/5: Drone Mapping',
    dueText: 'On Track',
    dueColor: 'text-on-surface-variant',
    barColor: 'bg-tertiary',
  },
];

const MOCK_TIMELINE = [
  { time: 'Today, 09:42 AM', title: 'Biomass CSV verified by Auditor', hash: '0x7a...f92', badge: 'On-Chain', dotColor: 'bg-secondary' },
  { time: 'Yesterday, 14:15 PM', title: 'Drone imagery uploaded (Set A)', detail: 'Salinas Estuary • 4.2GB • 450 images', dotColor: 'bg-tertiary' },
  { time: 'Oct 12, 2023', title: 'MRV Report Generated', detail: 'Q3 2023 Summary Report ready for review.', dotColor: 'bg-outline-variant' },
];

const STEP_LABELS = ['Select Project', 'Upload Data', 'Field Notes', 'Sign & Submit'];

export default function CommunityPortalPage() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex flex-col w-full px-6 sm:px-8 py-8 gap-8">
      {/* Welcome & Highlights */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-4 relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-surface-container-high/50 rounded-full blur-3xl -z-10" />
          <p className="font-label-md text-on-surface-variant uppercase tracking-widest">[ PROJECT LEAD DASHBOARD ]</p>
          <h1 className="font-display-lg text-primary tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Welcome back,<br />
            <span className="text-on-surface">Coastal Restoration Society</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed mt-2">
            Your active mangrove restoration sites are currently accumulating carbon data. You have 2 projects nearing their next mandatory MRV submission window.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="bg-primary text-on-primary font-title-md px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group">
              <span className="material-symbols-outlined transition-transform group-hover:-translate-y-0.5">add_circle</span>
              Submit New Survey Data
            </button>
            <button className="border border-outline-variant text-on-surface font-title-md px-6 py-3 rounded-xl hover:bg-surface-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">map</span>
              View Portfolio Map
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-surface-container-low p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-secondary">forest</span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase mb-1 relative z-10">Est. Credits Generated</p>
            <p className="font-headline-lg text-secondary relative z-10">14,250 <span className="font-title-md text-on-surface-variant">tCO2e</span></p>
            <div className="mt-2 flex items-center gap-2 relative z-10">
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
              </span>
              <span className="font-body-md text-on-surface-variant">vs last quarter</span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[48px] text-tertiary">groups</span>
            </div>
            <p className="font-label-md text-on-surface-variant uppercase mb-1 relative z-10">Local Impact</p>
            <p className="font-headline-lg text-tertiary relative z-10">124 <span className="font-title-md text-on-surface-variant">Jobs Supported</span></p>
            <p className="font-body-md text-on-surface-variant mt-2 relative z-10">Across 3 coastal communities</p>
          </div>
        </div>
      </section>

      {/* Upload Component & Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Multi-step Upload */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="font-headline-md text-on-surface flex items-center gap-3">
              <span className="bg-primary-container text-on-primary-container p-2 rounded-xl material-symbols-outlined">upload_file</span>
              Submit New Survey Data
            </h2>
            <span className="font-label-md text-on-surface-variant px-4 py-1 bg-surface-container rounded-full border border-outline-variant/30">Step {currentStep} of 4</span>
          </div>

          {/* Stepper */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${(currentStep / 4) * 100}%` }} />
            <div className="flex justify-between relative z-10">
              {STEP_LABELS.map((label, i) => {
                const stepNum = i + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setCurrentStep(stepNum)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-title-md ring-4 ring-surface-container-lowest transition-all ${
                      isCompleted ? 'bg-primary text-on-primary shadow-sm' :
                      isCurrent ? 'bg-primary text-on-primary shadow-md scale-110' :
                      'bg-surface-container text-on-surface-variant'
                    }`}>
                      {isCompleted ? <span className="material-symbols-outlined text-[20px]">check</span> : stepNum}
                    </div>
                    <span className={`font-label-md hidden sm:block ${isCurrent || isCompleted ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[260px] flex flex-col justify-between">
            {currentStep === 1 && (
              <div>
                <p className="font-title-lg text-on-surface mb-6">Which project are you uploading data for?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_PROJECTS.map((proj, i) => (
                    <label key={i} className={`relative flex cursor-pointer rounded-2xl border p-4 sm:p-6 shadow-sm transition-colors ${
                      selectedProject === i ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
                    }`}>
                      <input className="sr-only" type="radio" name="project_select" checked={selectedProject === i} onChange={() => setSelectedProject(i)} />
                      <span className="flex flex-col min-w-0">
                        <span className={`font-title-md mb-1 ${selectedProject === i ? 'text-primary' : 'text-on-surface'}`}>{proj.name}</span>
                        <span className="font-body-md text-on-surface-variant mb-3">ID: {proj.id}</span>
                        <span className={`font-label-md px-2 py-1 rounded-md w-max ${proj.dueSeverity === 'warn' ? 'text-secondary-fixed-dim bg-secondary-fixed/20' : 'text-on-surface-variant bg-surface-container'}`}>{proj.dueLabel}</span>
                      </span>
                      <span className={`absolute top-4 right-4 sm:top-6 sm:right-6 material-symbols-outlined ${selectedProject === i ? 'text-primary' : 'text-outline-variant'}`} style={{ fontVariationSettings: selectedProject === i ? "'FILL' 1" : "'FILL' 0" }}>
                        {selectedProject === i ? 'radio_button_checked' : 'radio_button_unchecked'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <p className="font-title-lg text-on-surface mb-6">Upload Drone Imagery or CSV Data</p>
                <div className="border-2 border-dashed border-primary/30 rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer min-h-[200px]">
                  <span className="material-symbols-outlined text-[48px] text-primary mb-4">cloud_upload</span>
                  <p className="font-title-md text-on-surface mb-1">Drag and drop files here</p>
                  <p className="font-body-md text-on-surface-variant">Supports .zip, .csv, .geojson (Max 5GB)</p>
                  <button className="mt-6 border border-primary text-primary px-6 py-2 rounded-xl font-title-md hover:bg-primary hover:text-on-primary transition-colors">Browse Files</button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <p className="font-title-lg text-on-surface mb-6">Add Field Notes &amp; Metadata</p>
                <div className="space-y-4">
                  <div>
                    <label className="font-label-md text-on-surface-variant uppercase mb-1 block">Survey Date</label>
                    <input type="date" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20" />
                  </div>
                  <div>
                    <label className="font-label-md text-on-surface-variant uppercase mb-1 block">Observations</label>
                    <textarea rows={4} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20" placeholder="Describe weather conditions, unexpected findings..." />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div>
                <p className="font-title-lg text-on-surface mb-6">Cryptographic Signature Required</p>
                <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 flex items-start gap-4">
                  <span className="material-symbols-outlined text-tertiary text-[32px]">security</span>
                  <div className="min-w-0">
                    <p className="font-title-md text-on-surface">Sign Payload to Blockchain</p>
                    <p className="font-body-md text-on-surface-variant mb-4">This action creates an immutable record of your upload on the verification ledger. Ensure all data is accurate.</p>
                    <div className="bg-surface-container-highest p-2 rounded-lg font-mono text-on-surface-variant text-[11px] break-all mb-4">
                      Payload Hash: 0x8f7b2c9d1a3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-8 pt-4 border-t border-outline-variant/20">
              {currentStep < 4 ? (
                <button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-title-md shadow-md hover:shadow-lg transition-all" onClick={() => setCurrentStep(currentStep + 1)}>
                  {currentStep === 1 ? 'Continue to Upload' : 'Continue'}
                </button>
              ) : (
                <button className="bg-tertiary text-on-tertiary px-8 py-3 rounded-xl font-title-md shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">fingerprint</span>
                  Sign &amp; Submit to Ledger
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Projects & Timeline Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Active Projects */}
          <div className="bg-surface-container-low rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="font-title-lg text-on-surface">Active Projects</h3>
                <p className="font-body-md text-on-surface-variant">Progress to next MRV verification</p>
              </div>
              <button className="text-primary font-label-md hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {MOCK_ACTIVE_PROJECTS.map((proj, i) => (
                <div key={i} className="group bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/30 hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">forest</span>
                      </div>
                      <h4 className="font-title-md text-on-surface group-hover:text-primary transition-colors">{proj.name}</h4>
                    </div>
                    <span className="font-mono text-on-surface-variant text-sm">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mb-2 relative">
                    <div className={`absolute top-0 left-0 h-full ${proj.barColor} rounded-full`} style={{ width: `${proj.progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center font-label-md">
                    <span className="text-on-surface-variant">{proj.step}</span>
                    <span className={`${proj.dueColor} flex items-center gap-1`}>
                      {proj.dueColor === 'text-error' && <span className="material-symbols-outlined text-[14px]">warning</span>}
                      {proj.dueText}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Verification Activity */}
          <div className="bg-surface-container-low rounded-3xl p-6 shadow-sm flex-1">
            <h3 className="font-title-lg text-on-surface mb-6">Recent Verification Activity</h3>
            <div className="relative pl-4 border-l-2 border-surface-container-high space-y-6">
              {MOCK_TIMELINE.map((item, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full ${item.dotColor} border-4 border-surface-container-low`} />
                  <p className="font-label-md text-on-surface-variant uppercase mb-1">{item.time}</p>
                  <p className="font-title-md text-on-surface">{item.title}</p>
                  {item.hash && (
                    <p className="font-body-md text-on-surface-variant mt-1">Hash: <span className="font-mono bg-surface-container px-1 py-px rounded text-on-surface text-xs">{item.hash}</span></p>
                  )}
                  {item.detail && (
                    <p className="font-body-md text-on-surface-variant mt-1">{item.detail}</p>
                  )}
                  {item.badge && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md font-label-md">
                      <span className="material-symbols-outlined text-[16px]">verified</span> {item.badge}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
