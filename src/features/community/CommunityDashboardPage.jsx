import { Link } from 'react-router-dom';

const MOCK_KPIS = [
  { label: 'Active Projects', value: '4', border: 'border-tertiary-fixed-dim' },
  { label: 'Submitted for Verification', value: '2', border: 'border-primary-fixed-dim' },
  { label: 'Verified Projects', value: '8', border: 'border-secondary-fixed' },
  { label: 'Total Restoration Area', value: '450', unit: 'ha', border: 'border-tertiary-container' },
  { label: 'Estimated CO2e', value: '42.5k', unit: 't', border: 'border-secondary-container' },
  { label: 'Carbon Credits', value: '12.4k', border: 'border-primary' },
];

const MOCK_PROJECTS = [
  {
    name: 'Sundarbans West Reserve',
    location: 'Bangladesh • Mangrove',
    status: 'MRV Review',
    statusColor: 'bg-error-container text-on-error-container',
    area: '120.5 ha',
    co2e: '14,200 t',
    progress: 70,
    steps: [
      { label: 'Registered', done: true },
      { label: 'Data Collection', done: true },
      { label: 'Evidence Submitted', done: true },
      { label: 'MRV Review', active: true },
      { label: 'Verified', done: false },
    ],
  },
  {
    name: 'Mida Creek Conservation',
    location: 'Kenya • Seagrass',
    status: 'Data Collection',
    statusColor: 'bg-surface-variant text-on-surface-variant',
    area: '85.2 ha',
    co2e: '8,450 t',
    progress: 30,
    steps: [
      { label: 'Registered', done: true },
      { label: 'Data Collection', active: true },
      { label: 'Evidence Submitted', done: false },
      { label: 'MRV Review', done: false },
      { label: 'Verified', done: false },
    ],
  },
];

const MOCK_ACTIVITY = [
  { icon: 'upload_file', iconBg: 'bg-surface-container-high', text: 'Survey uploaded for', project: 'Mida Creek Conservation', time: '2 hours ago by Sarah Jenkins' },
  { icon: 'precision_manufacturing', iconBg: 'bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant', text: 'Drone data processed and validated for', project: 'Sundarbans West Reserve', time: 'Yesterday at 14:30', hasImage: true },
  { icon: 'verified', iconBg: 'bg-secondary-container text-on-secondary-container', text: 'MRV verified successfully for', project: 'Gazi Bay Mangrove Project', time: '3 days ago' },
];

const MOCK_ALERTS = [
  { icon: 'warning', type: 'error', title: 'Additional field evidence requested', desc: 'Sundarbans West Reserve MRV review requires additional soil sample photos for plot 4B.', action: 'Upload Evidence' },
  { icon: 'task_alt', type: 'success', title: 'Project MRV Verified', desc: 'Gazi Bay Mangrove Project has passed final verification. 4,200 Carbon Credits issued.', action: 'View Certificate' },
  { icon: 'info', type: 'neutral', title: 'System Update', desc: 'New drone data formatting guidelines take effect next week. Please review documentation.' },
];

function ProgressStepper({ steps, progressPercent }) {
  return (
    <div className="mt-2">
      <p className="text-label-md text-on-surface-variant mb-4">Verification Progress</p>
      <div className="flex items-center w-full relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-outline-variant/30 rounded-full -z-10" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-tertiary-fixed-dim rounded-full -z-10 shadow-[0_0_8px_rgba(68,216,241,0.6)]" style={{ width: `${progressPercent}%` }} />
        <div className="flex justify-between w-full">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col items-center gap-2 ${!step.done && !step.active ? 'opacity-40' : ''}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${
                step.done ? 'bg-tertiary-fixed-dim text-on-tertiary-fixed' :
                step.active ? 'bg-surface-container border-2 border-tertiary-fixed-dim relative' :
                'bg-surface-container border-2 border-outline-variant'
              }`}>
                {step.done && <span className="material-symbols-outlined text-[14px]">check</span>}
                {step.active && <div className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse" />}
              </div>
              <span className="text-[10px] font-semibold text-on-surface whitespace-nowrap">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommunityDashboardPage() {
  return (
    <div className="flex flex-col w-full p-6 sm:p-8 lg:p-10 gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-display-lg text-on-surface tracking-tight text-3xl sm:text-4xl lg:text-[48px] leading-tight">My Restoration Projects</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">Monitor your coastal restoration activities and verification status.</p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <button className="px-4 sm:px-6 py-3 rounded-lg border border-primary-container text-primary-container font-title-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm text-sm sm:text-base">Upload Evidence</button>
          <button className="px-4 sm:px-6 py-3 rounded-lg bg-primary-container text-on-primary-container font-title-md hover:bg-primary-container/90 transition-colors shadow-md flex items-center gap-2 text-sm sm:text-base">
            <span className="material-symbols-outlined">add</span> Create New Project
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {MOCK_KPIS.map((kpi, i) => (
          <div key={i} className={`bg-surface-container rounded-xl p-4 sm:p-6 shadow-sm border-t-[3px] ${kpi.border} hover:shadow-md transition-shadow`}>
            <p className="font-label-md text-on-surface-variant uppercase mb-2">{kpi.label}</p>
            <p className="font-headline-lg text-on-surface">
              {kpi.value}
              {kpi.unit && <span className="font-title-md text-on-surface-variant ml-1">{kpi.unit}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Current Projects */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-on-surface">Current Projects</h2>
          <a className="text-primary-container font-body-md font-semibold hover:underline" href="#">View All</a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_PROJECTS.map((proj, i) => (
            <div key={i} className="bg-surface-container rounded-2xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-container/5 rounded-full blur-2xl group-hover:bg-primary-container/10 transition-all" />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start z-10 gap-2">
                <div>
                  <h3 className="font-title-lg text-on-surface mb-1">{proj.name}</h3>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {proj.location}
                  </p>
                </div>
                <span className={`px-3 py-1 ${proj.statusColor} font-label-md rounded-full shadow-sm whitespace-nowrap`}>{proj.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 z-10">
                <div>
                  <p className="font-label-md text-on-surface-variant mb-1">Restoration Area</p>
                  <p className="font-title-md text-on-surface font-mono">{proj.area}</p>
                </div>
                <div>
                  <p className="font-label-md text-on-surface-variant mb-1">Estimated CO2e</p>
                  <p className="font-title-md text-on-surface font-mono">{proj.co2e}</p>
                </div>
              </div>
              <ProgressStepper steps={proj.steps} progressPercent={proj.progress} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h2 className="font-title-lg text-on-surface">Recent Activity</h2>
          <div className="bg-surface-container rounded-2xl p-6 shadow-sm relative">
            <div className="absolute left-[39px] top-8 bottom-8 w-px bg-outline-variant/30" />
            <div className="flex flex-col gap-8">
              {MOCK_ACTIVITY.map((item, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-full ${item.iconBg} border-2 border-surface flex items-center justify-center flex-shrink-0 mt-1 shadow-sm`}>
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-body-md text-on-surface">
                      {item.text} <span className="font-title-md text-primary-container">{item.project}</span>
                    </p>
                    <p className="font-label-md text-on-surface-variant">{item.time}</p>
                    {item.hasImage && (
                      <div className="mt-3 w-full max-w-sm h-24 rounded-lg bg-surface-container-high overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-r from-tertiary/20 to-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[32px]">satellite_alt</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h2 className="font-title-lg text-on-surface flex items-center gap-2">
            Alerts &amp; Notifications
            <span className="bg-error text-on-error rounded-full px-2 py-0.5 text-[10px] font-bold">2</span>
          </h2>
          <div className="flex flex-col gap-4">
            {MOCK_ALERTS.map((alert, i) => (
              <div key={i} className={`rounded-xl p-4 shadow-sm flex gap-4 ${
                alert.type === 'error' ? 'bg-error-container/30 border border-error/20' :
                alert.type === 'success' ? 'bg-secondary-container/20 border border-secondary/20' :
                'bg-surface-container'
              }`}>
                <span className={`material-symbols-outlined mt-0.5 ${
                  alert.type === 'error' ? 'text-error' :
                  alert.type === 'success' ? 'text-secondary' :
                  'text-on-surface-variant'
                }`}>{alert.icon}</span>
                <div className="min-w-0">
                  <h4 className="font-title-md text-on-surface mb-1">{alert.title}</h4>
                  <p className="font-body-md text-on-surface-variant mb-3">{alert.desc}</p>
                  {alert.action && (
                    <button className={`font-label-md font-semibold uppercase hover:underline ${
                      alert.type === 'error' ? 'text-error' : 'text-secondary'
                    }`}>{alert.action}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
