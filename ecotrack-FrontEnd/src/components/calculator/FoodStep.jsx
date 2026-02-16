import React from 'react';
import { Utensils, Globe, TrendingDown } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

const FoodStep = ({ data, onChange }) => {
    const { diet, local } = data || { diet: 'average', local: false };

    const diets = [
        { id: 'vegan', label: 'Vegana', desc: 'Solo vegetali.', impact: 'Basso', icon: '🌱', co2: '1.5 kg', borderColor: 'border-green-400', bgColor: 'bg-green-50' },
        { id: 'vegetarian', label: 'Vegetariana', desc: 'No carne/pesce.', impact: 'Medio-Basso', icon: '🥗', co2: '2.5 kg', borderColor: 'border-lime-400', bgColor: 'bg-lime-50' },
        { id: 'average', label: 'Onnivora', desc: 'Carne moderata.', impact: 'Medio', icon: '🍽️', co2: '3.8 kg', borderColor: 'border-orange-400', bgColor: 'bg-orange-50' },
        { id: 'highMeat', label: 'Molta Carne', desc: 'Carne ogni giorno.', impact: 'Alto', icon: '🥩', co2: '5.5 kg', borderColor: 'border-red-400', bgColor: 'bg-red-50' },
    ];

    const selectedDiet = diets.find(d => d.id === diet) || diets[2];

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Utensils className="text-orange-500" size={20} />
                    Alimentazione
                </h2>
                <InfoTooltip content="Le tue scelte alimentari hanno un grande impatto sull'ambiente." />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {diets.map((d) => (
                    <button
                        key={d.id}
                        onClick={() => onChange({ ...data, diet: d.id })}
                        className={`group relative p-4 rounded-xl border-2 text-left transition-all ${diet === d.id
                            ? `${d.borderColor} ${d.bgColor} shadow-sm`
                            : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600 hover:shadow-sm'
                            }`}
                    >
                        <div className="text-2xl mb-2">{d.icon}</div>
                        <div className="font-bold text-sm mb-0.5">{d.label}</div>
                        <div className="text-[10px] text-slate-400 mb-2">{d.desc}</div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wide opacity-60">
                                {d.impact}
                            </span>
                            <span className="text-xs font-bold">{d.co2}</span>
                        </div>
                        {diet === d.id && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                                <span className="text-emerald-600 text-[8px] font-bold">✓</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <Globe className="text-emerald-600" size={20} />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-slate-800">Prodotti a Km 0</div>
                            <div className="text-[10px] text-slate-400">Sostenibilità locale</div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={local || false}
                            onChange={(e) => onChange({ ...data, local: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-emerald-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                </div>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start gap-2">
                <TrendingDown size={14} className="text-orange-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-slate-600 leading-relaxed">
                    La dieta <span className="font-bold">{selectedDiet.label}</span> produce circa {selectedDiet.co2} di emissioni giornaliere.
                </p>
            </div>
        </div>
    );
};

export default FoodStep;
