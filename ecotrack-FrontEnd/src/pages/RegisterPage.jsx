import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, UserPlus, User, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tips, setTips] = useState([]); // Per i suggerimenti se l'username è occupato

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTips([]);

        try {
            const response = await fetch('http://localhost:8080/register', { // O /api/register
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Se l'errore contiene dei "tips" (username alternativi), li mostriamo
                if (data.tips) setTips(data.tips);
                throw new Error(data.error || "Errore durante la registrazione");
            }

            // SUCCESSO!
            alert("Account creato con successo! Ora puoi accedere.");
            navigate('/login');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500 border border-slate-100">

                {/* Header Blu/Viola per differenziare dal Login */}
                <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm mb-4">
                            <Leaf size={32} className="text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Unisciti a noi</h2>
                        <p className="text-slate-300 mt-2 font-medium">Inizia a tracciare il tuo impatto 🚀</p>
                    </div>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleRegister} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200 text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        {/* Suggerimenti Username (Se occupato) */}
                        {tips.length > 0 && (
                            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                <p className="text-sm text-yellow-800 font-bold mb-2">Prova uno di questi:</p>
                                <div className="flex flex-wrap gap-2">
                                    {tips.map(tip => (
                                        <button
                                            key={tip}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, username: tip })}
                                            className="px-2 py-1 bg-white border border-yellow-300 rounded text-xs text-yellow-700 hover:bg-yellow-100 font-mono"
                                        >
                                            {tip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Scegli Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Es. GreenHero"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-slate-700 bg-slate-50 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Scegli Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-slate-700 bg-slate-50 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Crea Account <UserPlus className="group-hover:translate-x-1 transition-transform" size={20} /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400 font-medium">
                        Hai già un account? <Link to="/login" className="text-slate-900 font-bold hover:underline">Accedi qui</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}