import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Share2, RefreshCw, Trophy } from 'lucide-react'; // <--- AGGIUNGI TROPHY

// AGGIUNGI xpGained e currentLevel alle props
const Results = ({ total, breakdown, onRetake, xpGained, currentLevel }) => {

    const data = [
        { name: 'Trasporti', value: breakdown.transport, color: '#10b981' },
        { name: 'Viaggi', value: breakdown.travel, color: '#3b82f6' },
        { name: 'Casa', value: breakdown.home, color: '#f59e0b' },
        { name: 'Cibo', value: breakdown.food, color: '#ef4444' },
        { name: 'Shopping', value: breakdown.shopping, color: '#8b5cf6' },
        { name: 'Rifiuti', value: breakdown.waste, color: '#64748b' },
    ].filter(d => d.value > 0);

    const average = 6000;

    let message = '';
    let color = '';

    if (total < 4000) {
        message = "Fantastico! Vivi in modo sostenibile.";
        color = "text-emerald-600";
    } else if (total < 7000) {
        message = "Sei nella media, ma puoi migliorare.";
        color = "text-yellow-600";
    } else {
        message = "Attenzione! Il tuo impatto è alto.";
        color = "text-red-600";
    }

    return (
        <div className="animate-in fade-in zoom-in duration-500 space-y-8 text-center bg-white p-4 sm:p-8 rounded-2xl">

            {/* --- SEZIONE GAMIFICATION (NUOVA) --- */}
            {xpGained > 0 && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 p-6 rounded-2xl flex items-center justify-center gap-6 shadow-sm mb-6 relative overflow-hidden">
                    <div className="bg-amber-400 text-white p-4 rounded-full shadow-lg animate-bounce">
                        <Trophy size={32} fill="white" />
                    </div>
                    <div className="text-left z-10">
                        <h3 className="text-amber-900 font-extrabold text-xl">Congratulazioni!</h3>
                        <p className="text-amber-700 font-medium">
                            Hai guadagnato <span className="text-3xl font-black text-amber-600">+{xpGained} XP</span>
                        </p>
                        {currentLevel && (
                            <div className="mt-1 inline-block bg-white/60 px-2 py-0.5 rounded text-xs font-bold text-amber-800 uppercase tracking-wider">
                                Livello Attuale: {currentLevel}
                            </div>
                        )}
                    </div>
                    {/* Decorazione sfondo */}
                    <div className="absolute -right-6 -top-6 text-yellow-200/50 rotate-12">
                        <Trophy size={120} />
                    </div>
                </div>
            )}
            {/* ------------------------------------- */}

            <div>
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Il tuo Risultato</h2>
                <div className={`text-5xl font-black ${color} mb-4`}>
                    {Math.round(total).toLocaleString()} <span className="text-2xl font-bold text-slate-500">kg CO₂/anno</span>
                </div>
                <p className="text-lg text-slate-600 font-medium">{message}</p>
                <p className="text-sm text-slate-400 mt-2">
                    (Media Italiana: ~6.000 kg)
                </p>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${Math.round(value)} kg`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <button
                    onClick={onRetake}
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <RefreshCw size={20} /> Rifai Test
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg">
                    <Share2 size={20} /> Condividi
                </button>
            </div>

        </div>
    );
};

export default Results;