import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img alt="BlueCarbon MRV Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEo3Gg8VSa2wpzaewMkfwzDzp-AEpgVkEVdxGxWfXYJTsADpeeOuPEXzYYIng9wPdh4crpMbHbGVaT-QXOhmXcInghXDqCOetdYF0R92t5DUGflY1KFuYfuvTXIRIqL_trDLDdRorNkruqGtdLNfV9DT4obyduIowa451RJJr44VJm6UwUc1B_MbApDtEyG5zyya1s1H0v15FQI_uJ6YNayWyTdcbPh8a4kN-_nT02PlNQbjy_f7245g" />
            <span className="font-title-lg text-primary tracking-tight">BlueCarbon Registry</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/public" className="transition-colors text-primary font-bold">Registry Home</Link>
            <Link to="/public" className="font-label-md text-on-surface-variant hover:text-primary transition-colors">Project Map</Link>
            <a href="#" className="font-label-md text-on-surface-variant hover:text-primary transition-colors">Global Impact</a>
            <a href="#" className="font-label-md text-on-surface-variant hover:text-primary transition-colors">Methodology</a>
            <a href="#" className="font-label-md text-on-surface-variant hover:text-primary transition-colors">Transparency Report</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="px-6 py-2 bg-primary text-on-primary font-label-md rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all">Login</Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col pt-16">
        <Outlet />
      </main>

      <footer className="w-full bg-surface-container-low py-10 border-t border-outline-variant mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row md:items-start gap-8">
          <div className="flex-1 min-w-0 max-w-[36rem]">
            <div className="flex items-center gap-2 mb-4">
              <img alt="BlueCarbon MRV Logo" className="h-6 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEo3Gg8VSa2wpzaewMkfwzDzp-AEpgVkEVdxGxWfXYJTsADpeeOuPEXzYYIng9wPdh4crpMbHbGVaT-QXOhmXcInghXDqCOetdYF0R92t5DUGflY1KFuYfuvTXIRIqL_trDLDdRorNkruqGtdLNfV9DT4obyduIowa451RJJr44VJm6UwUc1B_MbApDtEyG5zyya1s1H0v15FQI_uJ6YNayWyTdcbPh8a4kN-_nT02PlNQbjy_f7245g" />
              <span className="font-title-md text-primary">BlueCarbon Registry</span>
            </div>
            <p className="font-body-md text-on-surface-variant">Ensuring technical precision and institutional trust in global blue carbon sequestration through blockchain-verified MRV frameworks.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-on-surface">Platform</span>
              <a className="text-body-md text-on-surface-variant hover:text-primary" href="#">Verification</a>
              <Link className="text-body-md text-on-surface-variant hover:text-primary" to="/public">Registry Data</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-label-md text-on-surface">Legal</span>
              <a className="text-body-md text-on-surface-variant hover:text-primary" href="#">Methodology</a>
              <a className="text-body-md text-on-surface-variant hover:text-primary" href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 pt-6 border-t border-outline-variant text-center font-label-md text-on-surface-variant">
          © 2024 BlueCarbon MRV. All Technical Audit Trails Secured via Distributed Ledger Technology.
        </div>
      </footer>
    </div>
  );
}
