import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf, LogIn } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-slate-800">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Leaf size={20} />
          </div>
          <span className="italic font-semibold tracking-tight">Co2 Calculator</span>
        </Link>

        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
          <Link to="/calculator" className="hover:text-green-600 transition-colors">Calcolatore</Link>
          <Link to="/conoscici" className="hover:text-green-600 transition-colors">Chi Siamo</Link>
        </div>

        {/* BOTTONE ACCEDI DESKTOP */}
        <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all font-semibold text-sm">
          <LogIn size={18} />
          Accedi
        </button>

        {/* MENU HAMBURGER (Solo mobile) */}
        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* TENDINA MOBILE */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/calculator" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Calcolatore</Link>
          <Link to="/conoscici" className="text-lg font-medium text-slate-700" onClick={() => setIsOpen(false)}>Chi Siamo</Link>

        </div>
      )}
    </nav>
  );
}