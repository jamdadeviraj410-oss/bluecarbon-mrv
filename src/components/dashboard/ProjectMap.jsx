import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import InteractiveRegistryMap from '../common/InteractiveRegistryMap';
import { getProjects, fetchProjects } from '../../features/projects/projectsService';

export default function ProjectMap() {
  const [projects, setProjects] = useState(() => getProjects());

  useEffect(() => {
    let isMounted = true;
    fetchProjects().then((data) => {
      if (isMounted && data && data.length > 0) {
        setProjects(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="lg:col-span-8 bg-surface rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest border-b border-outline-variant/30">
        <div>
          <h2 className="font-headline-sm text-on-surface text-[18px] font-bold m-0">National Coastal Project Distribution</h2>
          <p className="text-xs text-on-surface-variant m-0">Live spatial status across India&apos;s maritime mangrove &amp; seagrass ecosystems</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-3 text-xs font-bold text-on-surface-variant">
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>Verified</div>
            <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#00abc1]"></span>Monitoring</div>
          </div>
          <Link
            to={ROUTES.ADMIN_NATIONAL_MAP || ROUTES.BLOCKCHAIN_REGISTRY}
            className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_full</span>
            National Explorer
          </Link>
        </div>
      </div>
      
      {/* Real Interactive Map Container */}
      <div className="relative w-full h-[460px] overflow-hidden bg-slate-900">
        <InteractiveRegistryMap projects={projects} />

        {/* Floating Map Footer */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-white flex items-center justify-between text-xs z-10">
          <div className="flex items-center gap-2 font-mono-data">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span>{projects.length} Coastal Restoration Sites Monitored</span>
          </div>
          <Link
            to={ROUTES.PUBLIC_REGISTRY || '/public'}
            className="text-tertiary-fixed font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Drilldown to Plots
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
