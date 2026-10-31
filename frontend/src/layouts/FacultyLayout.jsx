import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, FileText, LogOut, Menu, User, Users, X } from 'lucide-react';
import { logout } from '../api/auth';
import { getSession } from '../utils/auth';

const NAV_ITEMS = [
  { to: '/faculty', label: 'Assigned Works', icon: FileText, end: true },
  { to: '/faculty/candidates', label: 'My Candidates', icon: Users },
  { to: '/faculty/profile', label: 'Profile', icon: User },
];

export default function FacultyLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession();

  useEffect(() => {
    setMenuOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClick(event) {
      if (userRef.current && !userRef.current.contains(event.target)) setUserOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-white">
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-navy-950/60 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-navy-900 transition-transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-navy-800 px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Harding EDD" className="h-7 w-auto" />
            <span className="rounded-md bg-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-navy-950 uppercase tracking-wider">
              Faculty
            </span>
          </div>
          <button type="button" onClick={() => setMenuOpen(false)} className="rounded-md p-1 text-navy-100 hover:bg-navy-800 hover:text-white lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-navy-800 text-white' : 'text-navy-100 hover:bg-navy-800/60 hover:text-white'}`}>
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute inset-y-2 left-0 w-0.5 rounded-md bg-gold-500" aria-hidden="true" />}
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 bg-navy-900 px-4 sm:px-6">
          <button type="button" onClick={() => setMenuOpen(true)} className="rounded-md p-1.5 text-navy-100 hover:bg-navy-800 hover:text-white lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <p className="hidden text-sm text-navy-100 sm:block">
            {session?.user?.name || 'Faculty'} · Committee Member
          </p>

          <div className="ml-auto flex items-center gap-1">
            <div className="relative" ref={userRef}>
              <button type="button" onClick={() => setUserOpen((open) => !open)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-navy-100 hover:bg-navy-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500" aria-label="User menu">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy-700 text-xs font-semibold text-white">
                  {(session?.user?.name || 'F').split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </span>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              
              {userOpen && (
                <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-md border border-navy-100 bg-white shadow-lg">
                  <div className="border-b border-navy-100 px-4 py-3">
                    <p className="text-sm font-medium text-navy-900">{session?.user?.name}</p>
                    <p className="text-xs text-muted">{session?.user?.email}</p>
                  </div>
                  <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-ink hover:bg-navy-50">
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}