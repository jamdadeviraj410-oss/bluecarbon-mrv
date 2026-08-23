import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MRV_DATA } from '../data/mockMrv';
import { getProjectById } from '../../../services/projectService';
import { getVerificationWorkspace, reviewVerification } from '../../../services/mrvService';

export default function ProjectVerificationPage() {
  const { verificationId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [details, setDetails] = useState(MRV_DATA.projectDetails);
  const [metrics, setMetrics] = useState(MRV_DATA.claimedMetrics);
  const [checklist, setChecklist] = useState(MRV_DATA.protocolChecklist);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const activeId = verificationId || 'PRJ-2023-089';

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const prj = await getProjectById(activeId);
        const ws = await getVerificationWorkspace(activeId);

        if (isMounted) {
          if (prj) {
            setDetails({
              id: prj.id,
              name: prj.name,
              type: prj.type,
              status: prj.status,
            });
            setMetrics({
              carbonSequestration: prj.estCO2e?.toLocaleString() || '14,200',
              restorationArea: prj.area?.toString() || '128.0',
              treeDensity: prj.metadata?.treeDensity?.toString() || '1,800',
            });
          }
          if (ws?.caseDetails?.checklist && ws.caseDetails.checklist.length > 0) {
            setChecklist(ws.caseDetails.checklist);
          }
        }
      } catch (err) {
        console.error('Error loading project verification page:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeId]);

  const handleVerificationDecision = async (decision) => {
    setIsSubmitting(true);
    try {
      const ws = await getVerificationWorkspace(activeId);
      if (ws?.caseDetails?.dbId) {
        await reviewVerification(ws.caseDetails.dbId, decision, decisionNotes);
      }
      setDetails((prev) => ({ ...prev, status: decision === 'APPROVE' ? 'Verified' : 'Rejected' }));
      setStatusMessage(`Decision '${decision}' has been recorded in the MRV ledger.`);
      setDecisionModalOpen(false);
      setTimeout(() => setStatusMessage(''), 4000);
    } catch (err) {
      console.error('Error submitting verification decision:', err);
      setStatusMessage('Failed to record verification decision.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
              Project ID: {details.id}
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-200 px-2 py-1 rounded whitespace-nowrap">
              MRV Type: {details.type}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 break-words">{details.name}</h1>
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200 whitespace-nowrap">
              {details.status}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm text-sm">
            <span className="material-symbols-outlined text-lg">cloud_download</span>
            Data Package
          </button>
          <button
            onClick={() => setDecisionModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            <span className="material-symbols-outlined text-lg">gavel</span>
            Verification Decision
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{statusMessage}</span>
        </div>
      )}

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
                <span className="text-3xl font-bold text-gray-900">{metrics.carbonSequestration}</span>
                <span className="text-sm font-semibold text-gray-500">tCO2e</span>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-1">Restoration Area</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{metrics.restorationArea}</span>
                <span className="text-sm font-semibold text-gray-500">Hectares</span>
              </div>
            </div>
            <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center">
              <span className="text-sm font-medium text-gray-500 mb-1">Tree Density</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">{metrics.treeDensity}</span>
                <span className="text-sm font-semibold text-gray-500">stems/ha</span>
              </div>
            </div>
          </div>

          {/* Map/Imagery Area */}
          <div className="bg-gray-200 border border-gray-300 rounded-xl min-h-[400px] flex items-center justify-center relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
            <div className="z-10 flex flex-col items-center text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-2 text-gray-400">map</span>
              <span className="font-medium">GIS/Drone Map Visualization</span>
            </div>
            
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-md">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Layer Control</h4>
              <div className="flex flex-col gap-2 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-gray-700 font-medium">Claimed Polygon (KML)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-gray-700 font-medium">Drone Orthomosaic</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-gray-700 font-medium">NDVI Biomass Filter</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Protocol Checklist */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col h-full">
            <h3 className="text-base font-bold text-gray-900 mb-4">Protocol Compliance Checklist</h3>
            <div className="flex flex-col gap-4">
              {checklist.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-gray-500 font-bold">{item.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.status === 'verified' ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Decision Modal */}
      {decisionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Record Verification Decision</h3>
            <p className="text-sm text-gray-500 mb-4">
              Submit your formal auditor assessment for {details.name}.
            </p>
            <textarea
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              placeholder="Auditor comments, risk buffer allocations, and methodology notes..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDecisionModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerificationDecision('REJECT')}
                disabled={isSubmitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Reject MRV
              </button>
              <button
                onClick={() => handleVerificationDecision('APPROVE')}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Approve & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
