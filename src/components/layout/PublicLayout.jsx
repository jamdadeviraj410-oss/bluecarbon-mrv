import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="h-[var(--topbar-height)] flex items-center px-8 bg-surface border-b border-outline-variant/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center p-1">
            <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">water_ec</span>
          </div>
          <span className="font-headline-md text-title-lg tracking-tight text-primary">Marine Ledger Public Registry</span>
        </div>
      </header>
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <footer className="mt-auto py-6 border-t border-outline-variant/30 text-center flex items-center justify-center gap-lg text-label-md text-on-surface-variant">
        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
      </footer>
    </div>
  );
}
