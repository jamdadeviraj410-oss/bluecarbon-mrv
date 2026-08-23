import React, { useState } from 'react';
import { MRV_DATA } from '../data/mockMrv';

export default function MrvVerificationWorkspacePage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { workspace } = MRV_DATA;

  return (
    <div className="flex-1 bg-gray-50 flex flex-col min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200 whitespace-nowrap">
              {workspace.status}
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Project ID: {workspace.id}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">{workspace.name}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="bg-white border border-gray-300 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm text-sm">
            Reject
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
            Request Clarification
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm">
            Approve MRV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-[1440px]">
        {/* Left Sidebar: Map Layers & Stats */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-base font-bold text-gray-900">Map Layers</h3>
            </div>
            <div className="p-5 flex flex-col gap-3">
              {[
                { name: 'Project Boundary', active: true },
                { name: 'Mangrove Plantation', active: true },
                { name: 'Drone Survey', active: true },
                { name: 'Ground Sensors', active: false, icon: 'sensors' },
                { name: 'Historical Imagery', active: false },
                { name: 'Carbon Sampling Points', active: false }
              ].map((layer, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    defaultChecked={layer.active} 
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                    {layer.name}
                    {layer.icon && <span className="material-symbols-outlined text-[16px] text-gray-400">{layer.icon}</span>}
                  </span>
                </label>
              ))}
            </div>
            <div className="p-5 border-t border-gray-200 bg-gray-50 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Total Area</span>
                <span className="font-bold text-gray-900">{workspace.totalArea}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Sensor Status</span>
                <span className="font-bold text-green-600">{workspace.sensorStatus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle/Right: Workspace content */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-gray-200 p-1 rounded-lg w-fit shadow-inner">
            {['Overview', 'Drone Data', 'Sensor Data', 'Carbon Calc'].map((tab) => (
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
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Main Data Area */}
            <div className="md:col-span-1 xl:col-span-2 flex flex-col gap-6">
              {/* Drone Data Banner */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Flight Date</span>
                    <span className="text-sm font-bold text-gray-900">{workspace.droneData.flightDate}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Resolution</span>
                    <span className="text-sm font-bold text-gray-900">{workspace.droneData.resolution}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Image Count</span>
                    <span className="text-sm font-bold text-gray-900">{workspace.droneData.imageCount}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Coverage</span>
                    <span className="text-sm font-bold text-green-600">{workspace.droneData.coverage}</span>
                  </div>
                </div>
              </div>

              {/* Drone Evidence AI Analysis */}
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Drone Evidence AI Analysis</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-5 flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{workspace.aiAnalysis.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {workspace.aiAnalysis.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Images mock area */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Multispectral Imagery (NDVI)</h4>
                  <div className="flex flex-wrap gap-4">
                    {['Sector B-14_NW', 'Sector B-14_NE', 'Sector B-14_SW'].map((img, i) => (
                      <div key={i} className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden relative border border-gray-300">
                        <div className="absolute inset-0 bg-blue-100 opacity-60"></div>
                        <div className="absolute bottom-0 w-full bg-black/50 py-1 px-2">
                          <span className="text-[10px] text-white truncate block">{img}</span>
                        </div>
                      </div>
                    ))}
                    <div className="w-32 h-24 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500">+447 more</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Audit Trail */}
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Audit Trail</h3>
                <div className="flex flex-col gap-4 relative">
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200"></div>
                  {workspace.auditTrail.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative z-10">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        step.status === 'completed' ? 'bg-green-500 text-white' : 
                        step.status === 'In Review' ? 'bg-yellow-400 text-white' : 'bg-gray-300 text-transparent'
                      }`}>
                        <span className="material-symbols-outlined text-[12px]">
                          {step.status === 'completed' ? 'check' : ''}
                        </span>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-semibold ${step.status === 'Pending' ? 'text-gray-500' : 'text-gray-900'}`}>{step.step}</h4>
                          {step.status !== 'completed' && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              step.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                            }`}>{step.status}</span>
                          )}
                        </div>
                        {step.date && (
                          <p className="text-xs text-gray-500 mt-1">
                            {step.date} • {step.actor}
                          </p>
                        )}
                        {step.assigner && (
                          <p className="text-xs text-gray-500 mt-1">
                            Assigner: {step.assigner}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Summary Sidebar */}
            <div className="md:col-span-1 xl:col-span-1 flex flex-col gap-6">
              <div className="bg-gray-900 text-white border border-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col">
                <div className="p-5 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Verification Summary</h3>
                  <span className="material-symbols-outlined text-blue-400">shield</span>
                </div>
                
                <div className="p-6 flex flex-col gap-6">
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Confidence Score</span>
                    <span className="text-2xl font-bold text-green-400">{workspace.verificationSummary.confidenceScore}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Evidence Completeness</span>
                    <span className="text-lg font-semibold text-white">{workspace.verificationSummary.evidenceCompleteness}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-gray-400 uppercase mb-1">Estimated Yield</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{workspace.verificationSummary.estimatedYield}</span>
                      <span className="text-sm font-medium text-gray-400">tCO2e</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-t border-gray-700 bg-gray-800">
                  <span className="block text-xs font-semibold text-gray-400 uppercase mb-2">Data Integrity</span>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                    <span className="text-sm font-medium text-gray-200">Blockchain Hash Verified</span>
                  </div>
                  <div className="bg-gray-900 text-gray-400 text-xs font-mono p-2 rounded truncate border border-gray-700">
                    {workspace.verificationSummary.hash}
                  </div>
                </div>

                <div className="p-5 bg-gray-800 pt-0">
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2 text-sm mt-4">
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                    Approve & Issue Carbon Credits
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
