import React from 'react';
import { Droplets, Flame, Zap, CheckCircle2 } from 'lucide-react';

const HomeEnergyStep = ({ data, onChange }) => {
    const { shower, heating, appliances } = data || {
        shower: { time: 5, hot: true },
        heating: { hours: 4, type: 'gas' },
        appliances: { washingMachine: false, dishwasher: false, oven: false }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Water Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Droplets className="text-blue-500" /> Acqua & Doccia
                </h3>
                <div className="space-y-6">
                    <div>
                        <label className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                            <span>Durata media doccia</span>
                            <span className="text-blue-600 font-bold">{shower?.time || 5} min</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="30"
                            value={shower?.time || 5}
                            onChange={(e) => onChange({ ...data, shower: { ...shower, time: parseInt(e.target.value) } })}
                            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="hotWater"
                            checked={shower?.hot !== false}
                            onChange={(e) => onChange({ ...data, shower: { ...shower, hot: e.target.checked } })}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="hotWater" className="text-slate-700 font-medium">Uso Acqua Calda</label>
                    </div>
                </div>
            </div>

            {/* Heating Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Flame className="text-orange-500" /> Riscaldamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-2">Ore di accensione (inverno)</label>
                        <input
                            type="number"
                            min="0"
                            max="24"
                            value={heating?.hours || 0}
                            onChange={(e) => onChange({ ...data, heating: { ...heating, hours: parseInt(e.target.value) } })}
                            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-2">Fonte di Calore</label>
                        <select
                            value={heating?.type || 'gas'}
                            onChange={(e) => onChange({ ...data, heating: { ...heating, type: e.target.value } })}
                            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                        >
                            <option value="gas">Caldaia a Gas</option>
                            <option value="electric">Elettrico</option>
                            <option value="oil">Gasolio</option>
                            <option value="pellet">Pellet/Legna</option>
                            <option value="heatpump">Pompa di Calore</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Appliances Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Zap className="text-yellow-500" /> Elettrodomestici (Uso frequente)
                </h3>
                <div className="flex flex-wrap gap-4">
                    {[
                        { id: 'washingMachine', label: 'Lavatrice' },
                        { id: 'dishwasher', label: 'Lavastoviglie' },
                        { id: 'oven', label: 'Forno Elettrico' }
                    ].map((app) => (
                        <button
                            key={app.id}
                            onClick={() => onChange({
                                ...data,
                                appliances: { ...appliances, [app.id]: !appliances?.[app.id] }
                            })}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all font-medium ${appliances?.[app.id]
                                    ? 'border-yellow-400 bg-yellow-50 text-yellow-800'
                                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            {appliances?.[app.id] ? <CheckCircle2 size={18} /> : <div className="w-[18px]" />}
                            {app.label}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomeEnergyStep;
