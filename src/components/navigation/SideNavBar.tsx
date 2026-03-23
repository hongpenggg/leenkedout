import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function SideNavBar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Translator', icon: 'translate' },
    { path: '/feed', label: 'The Feed', icon: 'dynamic_feed' },
    { path: '/humble-brag', label: 'Humble Brag', icon: 'auto_awesome' },
    { path: '/saved', label: 'Saved', icon: 'bookmark' },
  ];

  if (!user) return null;

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 sticky left-0 top-0 z-40 bg-slate-900/60 backdrop-blur-2xl border-r border-white/5 shadow-2xl shadow-sky-500/5 py-8 gap-2">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[1px]">
            <div className="w-full h-full bg-surface-container rounded-[11px] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
          </div>
          <div>
            <p className="font-headline font-bold text-sm text-on-surface leading-tight">
              {user.user_metadata?.full_name || 'Chief Visionary'}
            </p>
            <p className="font-label text-xs text-on-surface-variant leading-tight">
              Synergy Architect
            </p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 font-headline text-sm font-semibold rounded-r-xl transition-all ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-sky-300 border-r-4 border-sky-400 translate-x-1'
                : 'text-slate-400 hover:text-slate-100 hover:backdrop-blur-3xl hover:bg-white/10'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${location.pathname === item.path ? 'material-symbols-filled' : ''}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-4">
        <Button className="w-full primary-gradient text-on-primary font-headline font-bold py-3 rounded-xl shadow-glow hover:scale-[1.02] transition-transform">
          Go Premium
        </Button>
        <div className="flex flex-col gap-1 mt-6">
          <button className="flex items-center gap-3 text-slate-400 hover:text-slate-100 px-4 py-2 text-xs font-semibold transition-colors">
            <span className="material-symbols-outlined text-lg">help</span>
            Help
          </button>
          <button
            onClick={signOut}
            className="flex items-center gap-3 text-slate-400 hover:text-slate-100 px-4 py-2 text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
