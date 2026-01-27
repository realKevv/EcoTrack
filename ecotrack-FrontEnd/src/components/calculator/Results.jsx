import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Share2, RefreshCw } from 'lucide-react';

const Results = ({ total, breakdown, onRetake }) => {
    const data = [
        { name: 'Trasporti', value: breakdown.transport, color: '#10b981' }, // emerald-500
        { name: 'Viaggi', value: breakdown.travel, color: '#3b82f6' }, // blue-500
        { name: 'Casa', value: breakdown.home, color: '#f59e0b' }, // amber-500
        { name: 'Cibo', value: breakdown.food, color: '#ef4444' }, // red-500
        { name: 'Shopping', value: breakdown.shopping, color: '#8b5cf6' }, // violet-500
        { name: 'Rifiuti', value: breakdown.waste, color: '#64748b' }, // slate-500
    ].filter(d => d.value > 0);

    // Average Italian footprint approx 5-7 tons (5000-7000 kg)
    const average = 6000;
    const percentage = Math.round((total / average) * 100);

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
