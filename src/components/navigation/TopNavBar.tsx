import { useAuth } from '@/context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function TopNavBar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Translator' },
    { path: '/feed', label: 'Feed' },
    { path: '/humble-brag', label: 'Humble Brag' },
    { path: '/saved', label: 'Saved' },
  ];

  return (
    <header className="bg-slate-900/60 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(72,193,255,0.08)] sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-full">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400 font-headline">
            LeenkedOUT
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-headline font-bold text-lg transition-colors pb-1 ${
                  location.pathname === item.path
                    ? 'text-sky-400 border-b-2 border-sky-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button className="p-2 text-slate-400 hover:bg-white/5 transition-all duration-300 rounded-lg hidden sm:block">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-400 hover:bg-white/5 transition-all duration-300 rounded-lg hidden sm:block">
                <span className="material-symbols-outlined">settings</span>
              </button>
              <div className="flex items-center gap-3 ml-2">
                <div className="w-10 h-10 rounded-full bg-surface-bright border border-white/10 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <span className="material-symbols-outlined">logout</span>
                </Button>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button className="primary-gradient text-on-primary font-headline font-bold">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
