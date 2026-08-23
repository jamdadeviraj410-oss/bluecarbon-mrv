

export default function ProjectMap() {
  return (
    <div className="lg:col-span-8 bg-surface rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="p-md flex justify-between items-center bg-surface-container-lowest border-b border-surface-container-high/50">
        <h2 className="font-title-lg text-on-surface m-0">Project Distribution & Status</h2>
        <div className="flex gap-md font-label-md text-on-surface-variant">
          <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-secondary"></span>Verified</div>
          <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-tertiary-fixed-dim"></span>Pending</div>
          <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-primary-fixed-dim"></span>Under Review</div>
          <div className="flex items-center gap-xs"><span className="w-3 h-3 rounded-full bg-error"></span>Rejected</div>
        </div>
      </div>
      <div className="relative w-full h-[500px]">
        {/* Pseudo Map */}
        <div
          className="w-full h-full bg-cover bg-center"
          title="India Coastline, Bay of Bengal"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFP2ZKxjWPZy2p8VQLUC-WABJ7EeqQ_3mxsXLua_dM6iXYAqdfwZ58Y5od3LoxfoCGjl9fAYvF44XKqF-ZMO2y_jiO2uo3ExfVkiOkUAwGMizsb2dapPELg8hCUMZvFzIzGyInWekFDkQvRR0yZzpnfPp0_e3fiv3oTu6R2TlYUREX6rbXB7kzfEiyPANNZVTBeSCME22eLl7svQCGTt7_pTQMgz-VoHQP1TbXM3Yon6gkMG7GLV27Iw')" }}
        ></div>
        {/* Overlay Markers (Simulated) */}
        <div className="absolute top-[30%] left-[65%] w-4 h-4 bg-secondary rounded-full shadow-[0_0_10px_rgba(27,109,36,0.8)] animate-pulse" title="Sundarbans Project - Verified"></div>
        <div className="absolute top-[45%] left-[55%] w-3 h-3 bg-tertiary-fixed-dim rounded-full shadow-md" title="Mahanadi Delta - Pending"></div>
        <div className="absolute top-[60%] left-[45%] w-3 h-3 bg-secondary rounded-full shadow-md"></div>
        <div className="absolute top-[75%] left-[30%] w-4 h-4 bg-primary-fixed-dim rounded-full shadow-md animate-pulse"></div>
        <div className="absolute top-[35%] left-[20%] w-3 h-3 bg-error rounded-full shadow-md"></div>
      </div>
    </div>
  );
}
