import React, { useState } from 'react';
import { MRV_DATA } from '../data/mockMrv';

export default function ProjectVerificationPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { projectDetails, imageryReconciliation, claimedMetrics, protocolChecklist } = MRV_DATA;

  return (
    <div className="flex-1 bg-gray-50 flex flex-col min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
              Project ID: {projectDetails.id}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
              MRV Type: {projectDetails.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">{projectDetails.name}</h1>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200 whitespace-nowrap">
              {projectDetails.status}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
            <span className="material-symbols-outlined text-lg">cloud_download</span>
            Data Package
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm">
            <span className="material-symbols-outlined text-lg">gavel</span>
            Verification Decision
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-200 p-1 rounded-lg w-fit mb-8 shadow-inner">
        {['Overview', 'GIS/Drone Data', 'Sensor Logs', 'Blockchain Audit'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'
            }`}
          >
            {tab}
            {tab === 'Blockchain Audit' && (
              <span className="material-symbols-outlined text-[14px] ml-1 align-middle">lock</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1440px]">
        {/* Left Column: Metrics & Imagery Reconciliation */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Claimed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-1">Carbon Sequestration</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{claimedMetrics.carbonSequestration}</span>
                <span className="text-sm font-semibold text-gray-500">tCO2e</span>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-1">Restoration Area</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{claimedMetrics.restorationArea}</span>
                <span className="text-sm font-semibold text-gray-500">Hectares</span>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-1">Tree Density</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{claimedMetrics.treeDensity}</span>
                <span className="text-sm font-semibold text-gray-500">stems/ha</span>
              </div>
            </div>
          </div>

          {/* Map/Imagery Area (Placeholder) */}
          <div className="bg-gray-200 border border-gray-300 rounded-xl min-h-[400px] flex items-center justify-center relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
             <div className="z-10 flex flex-col items-center text-gray-500">
               <span className="material-symbols-outlined text-4xl mb-2 text-gray-400">map</span>
               <span className="font-medium">GIS/Drone Map Visualization</span>
             </div>
             
             {/* Map overlays / controls in the corner */}
             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-md">
               <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Layer Control</h4>
               <div className="flex flex-col gap-2 text-sm">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                   <span className="text-gray-700 font-medium">Project Boundaries</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                   <span className="text-gray-700 font-medium">NDVI Heatmap</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                   <span className="text-gray-700 font-medium">Drone Flight Paths</span>
                 </label>
               </div>
               
               <div className="mt-4 pt-4 border-t border-gray-200">
                 <span className="text-xs font-semibold text-gray-600 block mb-2">NDVI Index (Vegetation Health)</span>
                 <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-500 via-yellow-400 to-green-600 mb-1"></div>
                 <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                   <span>-1.0 (Water)</span>
                   <span>0.5</span>
                   <span>1.0 (Dense Canopy)</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Imagery Reconciliation */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Imagery Reconciliation</h3>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-5 flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">AI Alignment Confidence: {imageryReconciliation.aiConfidence}</span>
                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {imageryReconciliation.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Resolution</span>
                  <span className="text-gray-900 font-semibold">{imageryReconciliation.resolution}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                  <span className="text-gray-500 font-medium">Baseline</span>
                  <span className="text-gray-900 font-semibold">Sentinel-2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Upload</span>
                  <span className="text-gray-900 font-semibold">Drone RGB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: MRV Checklist & Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">MRV Protocol Checklist</h3>
                <p className="text-xs text-gray-500 mt-1">Verra VM0033 Methodology</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">V-4.2</span>
            </div>
            <div className="p-5 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {protocolChecklist.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="mt-0.5">
                      {item.status === 'verified' ? (
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                      ) : (
                        <div className="w-[18px] h-[18px] border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold mb-0.5 ${item.status === 'verified' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
                      {item.status === 'pending' && (
                        <button className="text-xs text-blue-600 font-semibold mt-2 hover:text-blue-800">
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 border-t border-gray-200 bg-gray-50 flex flex-col gap-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Approve Issuance
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg shadow-sm transition-colors text-sm">
                  Request Data
                </button>
                <button className="w-full bg-white border border-gray-300 hover:bg-red-50 text-red-600 font-medium py-2 px-3 rounded-lg shadow-sm transition-colors text-sm">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
