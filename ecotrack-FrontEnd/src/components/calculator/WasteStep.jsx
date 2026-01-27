import React from 'react';
import { Trash2, Recycle } from 'lucide-react';

const WasteStep = ({ data, onChange }) => {
    const { bags, recycle } = data || {
        bags: 2,
        recycle: { plastic: false, paper: false, glass: false }
    };

    const handleRecycleChange = (type) => {
        onChange({
            ...data,
            recycle: { ...recycle, [type]: !recycle?.[type] }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* General Waste */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Trash2 className="text-slate-600" /> Rifiuti Indifferenziati
                </h3>
                <div>
                    <label className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                        <span>Sacchi grandi a settimana</span>
                        <span className="text-slate-800 font-bold">{bags || 0}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        value={bags || 0}
                        onChange={(e) => onChange({ ...data, bags: parseInt(e.target.value) })}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                        <span>0</span>
                        <span>5</span>
                        <span>10+</span>
                    </div>
                </div>
            </div>

            {/* Recycling */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Recycle className="text-green-600" /> Riciclaggio Corretto
                </h3>
                <p className="text-sm text-slate-500 mb-4">Seleziona cosa ricicli regolarmente (Riduce la tua impronta!)</p>

                <div className="flex flex-wrap gap-4">
                    {[
                        { id: 'plastic', label: 'Plastica' },
                        { id: 'paper', label: 'Carta/Cartone' },
                        { id: 'glass', label: 'Vetro/Lattine' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleRecycleChange(item.id)}
                            className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${recycle?.[item.id]
                                    ? 'border-green-500 bg-green-50 text-green-700'
                                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default WasteStep;
