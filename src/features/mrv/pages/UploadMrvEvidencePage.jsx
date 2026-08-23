import React from 'react';
import { MRV_DATA } from '../data/mockMrv';

export default function UploadMrvEvidencePage() {
  const { uploadEvidence } = MRV_DATA;

  return (
    <div className="flex-1 bg-gray-50 flex flex-col min-h-screen p-6 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Upload MRV Evidence</h1>
          <p className="text-sm md:text-base text-gray-500 max-w-3xl">
            Submit field, drone, sensor and supporting evidence for project verification.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm">
          <span className="text-xs text-gray-500 font-medium">CURRENT PROJECT</span>
          <span className="text-sm font-semibold text-gray-900 mx-2">{uploadEvidence.currentProject}</span>
          <span className="material-symbols-outlined text-gray-400 text-lg">unfold_more</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1440px]">
        {/* Left Column: Input Types */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">smartphone</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Mobile / Field Survey</h3>
                <p className="text-sm text-gray-500 mb-3">Direct observation data from on-ground field agents.</p>
                <div className="flex gap-2 text-xs font-medium text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">Photos</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">GPS Tracks</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">CSV</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">flight</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Drone Survey</h3>
                <p className="text-sm text-gray-500 mb-3">High-resolution aerial imagery and point clouds.</p>
                <div className="flex gap-2 text-xs font-medium text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">GeoTIFF</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">LAS/LAZ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">sensors</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Ground Sensors</h3>
                <p className="text-sm text-gray-500 mb-3">Continuous telemetry from deployed IoT devices.</p>
                <div className="flex gap-2 text-xs font-medium text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">JSON</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Telemetry Log</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Documents</h3>
                <p className="text-sm text-gray-500 mb-3">Legal, land rights, and contextual reports.</p>
                <div className="flex gap-2 text-xs font-medium text-gray-600">
                  <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Upload Area */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Files</h2>
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 text-center hover:bg-gray-100 transition-colors min-h-[250px]">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <span className="material-symbols-outlined text-3xl text-blue-500">cloud_upload</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Select files or drag and drop here</h3>
              <p className="text-sm text-gray-500 mb-6">Supports CSV, GeoTIFF, JPG, PDF up to 500MB</p>
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
                Browse Files
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Current Uploads</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-green-500">image</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadEvidence.uploads[0].name}</p>
                      <p className="text-xs text-gray-500">{uploadEvidence.uploads[0].size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Validated
                    </span>
                    <button className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">close</span></button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-500">map</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadEvidence.uploads[1].name}</p>
                      <p className="text-xs text-gray-500">{uploadEvidence.uploads[1].size} • 65%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[14px]">sync</span> Uploading...
                    </span>
                    <button className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined text-lg">close</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Validation & Submission */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Data Validation Summary</h2>
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold text-gray-900">{uploadEvidence.validationSummary.total}</span>
                <span className="text-sm font-medium text-gray-500">Records Detected</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: '99%' }}></div>
                <div className="bg-red-500 h-full" style={{ width: '0.5%' }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: '0.5%' }}></div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                    Valid Records
                  </span>
                  <span className="font-semibold">{uploadEvidence.validationSummary.valid}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
                    Invalid Records
                  </span>
                  <span className="font-semibold text-red-600">{uploadEvidence.validationSummary.invalid}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-yellow-500 text-[18px]">content_copy</span>
                    Duplicates
                  </span>
                  <span className="font-semibold text-yellow-600">{uploadEvidence.validationSummary.duplicates}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <h3 className="text-base font-bold text-gray-900 mb-4">Submission Checklist</h3>
            <div className="flex flex-col gap-3 mb-8">
              {uploadEvidence.checklist.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-5 h-5 rounded-sm border ${item.checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-transparent'}`}>
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className={`text-sm ${item.checked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{item.title}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-base">
              Submit Evidence for MRV
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
