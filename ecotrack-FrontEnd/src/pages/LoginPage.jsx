import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    // Nota: usiamo "username" e "password" che corrispondono ai campi della tua classe User Java
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Chiamata al tuo endpoint
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Credenziali errate!");
            }

            // SUCCESSO! Salviamo Mario nel browser
            console.log("Login effettuato:", data);
            localStorage.setItem('user', JSON.stringify(data));

            // Portiamo Mario al calcolatore
            navigate('/calculator');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500 border border-slate-100">

                {/* Header Verde */}
                <div className="bg-emerald-600 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm mb-4">
                            <Leaf size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Bentornato!</h2>
                        <p className="text-emerald-100 mt-2 font-medium">EcoTrack ti stava aspettando 🌍</p>
                    </div>
                </div>

                {/* Form di Login */}
                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200 text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Il tuo username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-slate-700 bg-slate-50 focus:bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
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
                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Accedi <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-400 font-medium">
                        Non hai un account? <Link to="/register" className="text-emerald-600 font-bold cursor-pointer hover:underline">Registrati</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}