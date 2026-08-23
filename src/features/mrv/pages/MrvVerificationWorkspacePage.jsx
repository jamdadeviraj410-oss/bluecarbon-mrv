import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MRV_DATA } from '../data/mockMrv';
import { getVerificationWorkspace, reviewVerification } from '../../../services/mrvService';

export default function MrvVerificationWorkspacePage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [actionSuccess, setActionSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [workspaceData, setWorkspaceData] = useState(MRV_DATA.workspace);
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [verificationCase, setVerificationCase] = useState(null);

  const activeProjectId = projectId || 'PRJ-2023-089';

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await getVerificationWorkspace(activeProjectId);
        if (isMounted && data) {
          if (data.caseDetails) {
            setVerificationCase(data.caseDetails);
            setWorkspaceData((prev) => ({
              ...prev,
              id: activeProjectId,
              status: data.caseDetails.status,
              name: `Verification Workspace: ${activeProjectId}`,
              verificationSummary: {
                ...prev.verificationSummary,
                confidenceScore: data.caseDetails.confidenceScore,
                evidenceCompleteness: data.caseDetails.evidenceCompleteness,
                estimatedYield: data.caseDetails.estimatedYield,
                hash: data.caseDetails.hash,
              },
            }));
          }
          if (data.evidenceFiles && data.evidenceFiles.length > 0) {
            setEvidenceFiles(data.evidenceFiles);
          }
        }
      } catch (err) {
        console.error('Error loading MRV workspace:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeProjectId]);

  const handleDecision = async (decision) => {
    if (!verificationCase?.dbId) return;
    setIsProcessing(true);
    try {
      const updated = await reviewVerification(
        verificationCase.dbId,
        decision,
        `Auditor ${decision} action from Verification Workspace`
      );
      setVerificationCase(updated);
      setWorkspaceData((prev) => ({ ...prev, status: updated.status }));
      setActionSuccess(`MRV decision '${decision}' successfully recorded!`);
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      console.error('Failed to submit decision:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200 whitespace-nowrap">
              {workspaceData.status}
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Project ID: {workspaceData.id}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">{workspaceData.name}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleDecision('REJECT')}
            disabled={isProcessing}
            className="bg-white border border-gray-300 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm text-sm disabled:opacity-50"
          >
            Reject
          </button>
          <button
            onClick={() => handleDecision('REQUEST_CHANGES')}
            disabled={isProcessing}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm disabled:opacity-50"
          >
            Request Clarification
          </button>
          <button
            onClick={() => handleDecision('APPROVE')}
            disabled={isProcessing}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm flex items-center gap-1 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Approve MRV
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{actionSuccess}</span>
        </div>
      )}

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
                { name: 'Carbon Sampling Points', active: false },
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
                <span className="font-bold text-gray-900">{workspaceData.totalArea}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Sensor Status</span>
                <span className="font-bold text-green-600">{workspaceData.sensorStatus}</span>
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
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Aerial & Drone Survey Analysis</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="block text-xs text-gray-500 mb-1">Flight Date</span>
                    <span className="font-semibold text-gray-900 text-sm">{workspaceData.droneData.flightDate}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="block text-xs text-gray-500 mb-1">Resolution</span>
                    <span className="font-semibold text-gray-900 text-sm">{workspaceData.droneData.resolution}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="block text-xs text-gray-500 mb-1">Captures</span>
                    <span className="font-semibold text-gray-900 text-sm">{workspaceData.droneData.imageCount}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="block text-xs text-gray-500 mb-1">Coverage</span>
                    <span className="font-semibold text-green-600 text-sm">{workspaceData.droneData.coverage}</span>
                  </div>
                </div>

                <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">Computer Vision Canopy Check</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Validated</span>
                    </div>
                    <p className="text-sm text-gray-600">{workspaceData.aiAnalysis.description}</p>
                  </div>
                </div>

                {evidenceFiles.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">Linked Evidence Files ({evidenceFiles.length})</h4>
                    <div className="flex flex-col gap-2">
                      {evidenceFiles.map((ef) => (
                        <div key={ef.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-500 text-[18px]">attachment</span>
                            <span className="font-medium text-gray-800">{ef.name}</span>
                          </div>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">{ef.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Audit trail */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Verification Audit Trail</h3>
                <div className="relative pl-6 border-l-2 border-gray-200 flex flex-col gap-6 ml-2">
                  {workspaceData.auditTrail.map((step, idx) => (
                    <div key={idx} className="relative">
                      <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                        step.status === 'completed' ? 'border-green-500 bg-green-500' : 'border-blue-500'
                      }`}></span>
                      <h4 className="text-sm font-semibold text-gray-900">{step.step}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {step.date && `${step.date} • `}{step.actor || step.assigner || step.status}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Verification summary card */}
            <div className="md:col-span-1 xl:col-span-1 flex flex-col gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Verification Summary</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Confidence Score</span>
                    <span className="text-base font-bold text-green-600">{workspaceData.verificationSummary.confidenceScore}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Evidence Completeness</span>
                    <span className="text-base font-bold text-gray-900">{workspaceData.verificationSummary.evidenceCompleteness}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-sm text-gray-500">Estimated Yield</span>
                    <span className="text-base font-bold text-blue-600">{workspaceData.verificationSummary.estimatedYield} tCO2e</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Verification Hash</span>
                    <span className="text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded truncate max-w-[120px]">
                      {workspaceData.verificationSummary.hash}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
