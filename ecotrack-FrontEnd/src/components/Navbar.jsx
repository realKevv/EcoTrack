import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Serve per aggiornare la nav quando cambi pagina

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-slate-800 hover:opacity-80 transition-opacity">
          <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
            <Leaf size={20} />
          </div>
          <span className="italic font-semibold tracking-tight">EcoTrack</span>
        </Link>

        {/* LINK CENTRALI (Desktop) */}
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/calculator" className="hover:text-emerald-600 transition-colors">Calcolatore</Link>
          <Link to="/conoscici" className="hover:text-emerald-600 transition-colors">Chi Siamo</Link>
        </div>

        {/* ZONA UTENTE (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            // SE LOGGATO: Mostra nome e Logout
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-2 text-slate-700 font-bold bg-slate-100 px-4 py-2 rounded-full">
                <User size={18} className="text-emerald-600" />
                <span>{user.username}</span>
                {/* Se vuoi mostrare gli XP: <span className="text-xs text-slate-400">LVL {user.level}</span> */}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors font-medium text-sm"
              >
                <LogOut size={18} /> Esci
              </button>
            </div>
          ) : (
            // SE NON LOGGATO: Mostra Accedi
            <Link to="/login">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 hover:shadow-lg transition-all font-semibold text-sm active:scale-95">
                <LogIn size={18} />
                Accedi
              </button>
            </Link>
          )}
        </div>

        {/* MENU HAMBURGER (Mobile) */}
        <button className="md:hidden text-slate-600 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* TENDINA MOBILE */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5">
          <Link to="/" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/calculator" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Calcolatore</Link>
          <Link to="/conoscici" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Chi Siamo</Link>

          <hr className="border-slate-100" />

          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <User size={20} className="text-emerald-600" /> {user.username}
              </div>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-2 text-red-500 font-medium">
                <LogOut size={20} /> Esci
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold">
                  <LogIn size={20} /> Accedi
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="text-center text-emerald-600 font-bold cursor-pointer hover:underline py-2">
                Non hai un account?
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}