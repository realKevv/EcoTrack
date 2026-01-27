import React from 'react';
import { Utensils, Leaf, Globe } from 'lucide-react';

const FoodStep = ({ data, onChange }) => {
    const { diet, local } = data || { diet: 'average', local: false };

    const diets = [
        { id: 'vegan', label: 'Vegana', desc: 'Solo vegetali. Impatto minimo.', color: 'bg-green-100 border-green-300 text-green-800' },
        { id: 'vegetarian', label: 'Vegetariana', desc: 'No carne/pesce. Uova/latticini ok.', color: 'bg-lime-100 border-lime-300 text-lime-800' },
        { id: 'average', label: 'Onnivora Media', desc: 'Carne alcune volte a settimana.', color: 'bg-orange-100 border-orange-300 text-orange-800' },
        { id: 'highMeat', label: 'Molta Carne', desc: 'Carne rossa quasi ogni giorno.', color: 'bg-red-100 border-red-300 text-red-800' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Utensils className="text-orange-500" /> Abitudini Alimentari
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diets.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => onChange({ ...data, diet: d.id })}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${diet === d.id
                                    ? `${d.color} shadow-md scale-[1.02]`
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                                }`}
                        >
                            <div className="font-bold text-lg">{d.label}</div>
                            <div className="text-sm opacity-80">{d.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Globe className="text-emerald-600" />
                    <div>
                        <div className="font-semibold text-slate-800">Prodotti a Km 0</div>
                        <div className="text-sm text-slate-500">Prediligo cibo locale e di stagione</div>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={local || false}
                        onChange={(e) => onChange({ ...data, local: e.target.checked })}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
            </div>

        </div>
    );
};

export default FoodStep;
