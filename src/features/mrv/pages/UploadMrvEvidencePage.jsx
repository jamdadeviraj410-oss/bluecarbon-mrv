import { useState, useEffect, useRef } from 'react';
import { MRV_DATA } from '../data/mockMrv';
import { getProjects } from '../../../services/projectService';
import {
  getEvidenceFiles,
  uploadEvidence,
  deleteEvidence,
  submitMrv,
} from '../../../services/mrvService';

export default function UploadMrvEvidencePage() {
  const { uploadEvidence: fallbackData } = MRV_DATA;
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [evidenceList, setEvidenceList] = useState(fallbackData.uploads);
  const [selectedType, setSelectedType] = useState('FIELD_SURVEY');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const prjList = await getProjects();
        if (isMounted && prjList && prjList.length > 0) {
          setProjects(prjList);
          const current = prjList[0];
          setSelectedProject(current);

          const files = await getEvidenceFiles(current.id);
          if (files && files.length > 0) {
            setEvidenceList(files);
          }
        }
      } catch (err) {
        console.error('Error initializing Upload Evidence page:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleProjectChange = async (e) => {
    const prjId = e.target.value;
    const found = projects.find((p) => p.id === prjId || p.dbId === prjId);
    if (found) {
      setSelectedProject(found);
      try {
        const files = await getEvidenceFiles(found.id);
        setEvidenceList(files.length > 0 ? files : fallbackData.uploads);
      } catch (err) {
        console.error('Error fetching files for project:', err);
      }
    }
  };

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedProject) return;

    setIsUploading(true);
    setErrorMessage('');
    try {
      for (const file of Array.from(files)) {
        const uploaded = await uploadEvidence({
          projectId: selectedProject.id,
          file,
          evidenceType: selectedType,
          metadata: {
            uploadedAt: new Date().toISOString(),
          },
        });
        setEvidenceList((prev) => [uploaded, ...prev]);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMessage(err.message || 'File upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (evidenceId) => {
    try {
      await deleteEvidence(evidenceId);
      setEvidenceList((prev) => prev.filter((item) => item.id !== evidenceId));
    } catch (err) {
      console.error('Failed to delete evidence:', err);
    }
  };

  const handleSubmitMRV = async () => {
    if (!selectedProject) return;
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await submitMrv(selectedProject.id, {
        reportingPeriod: 'Q3 2023',
        submissionType: 'Quarterly Report',
        carbonEstimate: selectedProject.estCO2e || 14200,
        notes: 'Submitted via Upload MRV Evidence workspace',
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      console.error('MRV Submission failed:', err);
      setErrorMessage(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <select
            value={selectedProject?.id || ''}
            onChange={handleProjectChange}
            className="text-sm font-semibold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>MRV Evidence Package successfully submitted for verification!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1440px]">
        {/* Left Column: Input Types */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div
            onClick={() => setSelectedType('FIELD_SURVEY')}
            className={`bg-white p-5 border rounded-xl shadow-sm transition-colors cursor-pointer group ${
              selectedType === 'FIELD_SURVEY' ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-gray-200 hover:border-blue-500'
            }`}
          >
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

          <div
            onClick={() => setSelectedType('DRONE')}
            className={`bg-white p-5 border rounded-xl shadow-sm transition-colors cursor-pointer group ${
              selectedType === 'DRONE' ? 'border-green-600 ring-2 ring-green-600/20' : 'border-gray-200 hover:border-blue-500'
            }`}
          >
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

          <div
            onClick={() => setSelectedType('SENSOR')}
            className={`bg-white p-5 border rounded-xl shadow-sm transition-colors cursor-pointer group ${
              selectedType === 'SENSOR' ? 'border-purple-600 ring-2 ring-purple-600/20' : 'border-gray-200 hover:border-blue-500'
            }`}
          >
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

          <div
            onClick={() => setSelectedType('DOCUMENT')}
            className={`bg-white p-5 border rounded-xl shadow-sm transition-colors cursor-pointer group ${
              selectedType === 'DOCUMENT' ? 'border-orange-600 ring-2 ring-orange-600/20' : 'border-gray-200 hover:border-blue-500'
            }`}
          >
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Upload Files ({selectedType})</h2>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-8 text-center hover:bg-gray-100 transition-colors min-h-[250px] cursor-pointer"
            >
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <span className="material-symbols-outlined text-3xl text-blue-500">
                  {isUploading ? 'progress_activity' : 'cloud_upload'}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {isUploading ? 'Uploading to Supabase Vault...' : 'Select files or drag and drop here'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">Supports CSV, GeoTIFF, JPG, PDF up to 500MB</p>
              <button
                type="button"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Browse Files
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Current Uploads</h4>
              <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
                {evidenceList.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-green-500">
                        {item.type === 'DRONE' ? 'flight' : item.type === 'SENSOR' ? 'sensors' : 'image'}
                      </span>
                      <div className="min-w-0 max-w-[180px]">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name || item.originalFilename}</p>
                        <p className="text-xs text-gray-500">{item.size || `${(item.fileSize / 1024 / 1024).toFixed(1)} MB`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full whitespace-nowrap">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> {item.status || 'Validated'}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Delete file"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                  </div>
                ))}
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
                <span className="text-2xl font-bold text-gray-900">{fallbackData.validationSummary.total}</span>
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
                  <span className="font-semibold">{fallbackData.validationSummary.valid}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
                    Invalid Records
                  </span>
                  <span className="font-semibold text-red-600">{fallbackData.validationSummary.invalid}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="material-symbols-outlined text-yellow-500 text-[18px]">content_copy</span>
                    Duplicates
                  </span>
                  <span className="font-semibold text-yellow-600">{fallbackData.validationSummary.duplicates}</span>
                </div>
              </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <h3 className="text-base font-bold text-gray-900 mb-4">Submission Checklist</h3>
            <div className="flex flex-col gap-3 mb-8">
              {fallbackData.checklist.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-5 h-5 rounded-sm border ${
                      item.checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <span className={`text-sm ${item.checked ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{item.title}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmitMRV}
              disabled={isSubmitting || !selectedProject}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-base disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                  <span>Submitting to Registry...</span>
                </>
              ) : (
                <>
                  <span>Submit Evidence for MRV</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
