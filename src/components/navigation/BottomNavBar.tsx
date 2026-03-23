import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export function BottomNavBar() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Translator', icon: 'translate' },
    { path: '/feed', label: 'Feed', icon: 'reorder' },
    { path: '/humble-brag', label: 'Tools', icon: 'psychology' },
    { path: '/saved', label: 'Saved', icon: 'history' },
  ];

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 md:hidden bg-slate-900/70 backdrop-blur-3xl border-t border-white/10 z-50 shadow-[0_-10px_40px_rgba(72,193,255,0.1)]">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center p-2 px-4 rounded-2xl transition-all ${
            location.pathname === item.path
              ? 'bg-sky-500/20 text-sky-300'
              : 'text-slate-500 hover:text-sky-200'
          }`}
        >
          <span className={`material-symbols-outlined ${location.pathname === item.path ? 'material-symbols-filled' : ''}`}>
            {item.icon}
          </span>
          <span className="font-body text-[10px] uppercase tracking-widest mt-1">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
