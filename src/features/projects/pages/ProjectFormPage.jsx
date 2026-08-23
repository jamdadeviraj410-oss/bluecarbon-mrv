import { useState } from 'react';

const ProjectFormPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-xl shadow-lg border border-outline-variant/30 p-10 text-center max-w-lg w-full animate-slide-in-right">
          <div className="w-16 h-16 bg-[#4CAF50]/10 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <h2 className="font-headline-md text-on-surface mb-2">Project Registered</h2>
          <p className="font-body-md text-on-surface-variant mb-8">
            Your project has been successfully submitted for verification. It is currently under review by the registry authorities.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full py-3 bg-primary text-on-primary rounded-lg font-title-sm hover:bg-primary-container transition-colors shadow-sm"
          >
            View Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div>
        <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-title-sm mb-4">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          Back to Projects
        </button>
        <h2 className="font-headline-lg text-primary tracking-tight">New Project</h2>
        <p className="font-body-md text-on-surface-variant mt-1">Register a new blue carbon project to the ledger.</p>
      </div>

      <div className="space-y-8">
        {/* Section 1: Project Information */}
        <section className="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30">
            <h1 className="font-title-lg text-on-surface">Project Information</h1>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="space-y-2">
              <label className="block font-label-md text-on-surface uppercase">Project Name</label>
              <input 
                type="text" 
                placeholder="e.g. Pichavaram Mangrove Restoration" 
                className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface uppercase">Ecosystem Type</label>
                <select className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all appearance-none">
                  <option>Mangrove</option>
                  <option>Seagrass</option>
                  <option>Tidal Marsh</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface uppercase">Methodology</label>
                <select className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all appearance-none">
                  <option>VM0033</option>
                  <option>AR-ACM0003</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-on-surface uppercase">Description</label>
              <textarea 
                rows="4"
                placeholder="Provide a detailed description of the project goals..." 
                className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all resize-none"
              />
            </div>

          </div>
        </section>

        {/* Section 2: Location & Boundary */}
        <section className="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
          <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30">
            <h1 className="font-title-lg text-on-surface">Location & Boundary</h1>
          </div>
          <div className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface uppercase">Country/Region</label>
                <input 
                  type="text" 
                  placeholder="e.g. India" 
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-label-md text-on-surface uppercase">Total Area (ha)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg font-body-md text-on-surface focus:outline-none focus:border-tertiary focus:ring-2 focus:ring-tertiary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-label-md text-on-surface uppercase">GeoJSON Boundary Data</label>
              <div className="border-2 border-dashed border-outline-variant/50 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[32px] text-outline mb-2">upload_file</span>
                <p className="font-title-sm text-on-surface mb-1">Upload GIS File</p>
                <p className="font-body-sm text-on-surface-variant">.geojson, .kml up to 10MB</p>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* Form Actions */}
      <div className="flex justify-between items-center pt-4">
        <button className="px-6 py-2 border border-outline-variant text-on-surface rounded-lg font-title-sm hover:bg-surface-container transition-colors">
          Save Draft
        </button>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-primary text-primary rounded-lg font-title-sm hover:bg-primary/5 transition-colors">
            Next Step
          </button>
          <button 
            onClick={() => setIsSubmitted(true)}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-title-sm hover:bg-primary-container transition-colors shadow-sm"
          >
            Submit Registration
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProjectFormPage;
