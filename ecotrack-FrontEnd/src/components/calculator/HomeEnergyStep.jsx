import React from 'react';
import { Droplets, Flame, Zap, CheckCircle2, Lightbulb } from 'lucide-react';
import RangeSlider from './RangeSlider';
import InfoTooltip from './InfoTooltip';

const HomeEnergyStep = ({ data, onChange, subStep }) => {
    const { shower, heating, appliances } = data || {
        shower: { time: 5, hot: true },
        heating: { hours: 4, type: 'gas' },
        appliances: { washingMachine: false, dishwasher: false, oven: false }
    };

    const heatingTypes = [
        { id: 'gas', label: 'Gas', icon: '🔥' },
        { id: 'electric', label: 'Elettrico', icon: '⚡' },
        { id: 'oil', label: 'Gasolio', icon: '🛢️' },
        { id: 'pellet', label: 'Pellet', icon: '🌲' },
        { id: 'heatpump', label: 'Pompa di Calore', icon: '♨️' },
    ];

    const appliancesList = [
        { id: 'washingMachine', label: 'Lavatrice', icon: '🧺' },
        { id: 'dishwasher', label: 'Lavastoviglie', icon: '🍽️' },
        { id: 'oven', label: 'Forno', icon: '🔥' }
    ];

    if (subStep === 'water') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Droplets className="text-blue-500" size={20} />
                        Consumo Idrico
                    </h2>
                    <InfoTooltip content="La doccia calda richiede molta energia per riscaldare l'acqua." />
                </div>

                <RangeSlider
                    value={shower?.time || 5}
                    onChange={(val) => onChange({ ...data, shower: { ...shower, time: val } })}
                    min={1} max={30} step={1}
                    label="Durata media doccia"
                    unit="min"
                    icon={Droplets}
                    markers={['1', '5', '10', '20', '30']}
                />

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                        <div className="font-bold text-sm text-slate-800">Uso Acqua Calda</div>
                        <div className="text-[10px] text-slate-400">Riscaldamento attivo</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={shower?.hot !== false}
                            onChange={(e) => onChange({ ...data, shower: { ...shower, hot: e.target.checked } })}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
        );
    }

    if (subStep === 'heat') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Flame className="text-orange-500" size={20} />
                        Riscaldamento
                    </h2>
                    <InfoTooltip content="Il riscaldamento è spesso la voce principale dei consumi energetici." />
                </div>

                <RangeSlider
                    value={heating?.hours || 4}
                    onChange={(val) => onChange({ ...data, heating: { ...heating, hours: val } })}
                    min={0} max={24} step={1}
                    label="Ore di accensione giornaliere"
                    unit="ore"
                    icon={Flame}
                    markers={['0', '6', '12', '18', '24']}
                />

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-[10px] font-bold text-slate-400 block mb-3 uppercase tracking-wide">Fonte di Calore</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {heatingTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => onChange({ ...data, heating: { ...heating, type: type.id } })}
                                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all text-xs font-semibold ${heating?.type === type.id
                                    ? 'border-orange-400 bg-white shadow-sm'
                                    : 'border-transparent bg-slate-100 text-slate-500 hover:bg-white'
                                    }`}
                            >
                                <span className="text-base">{type.icon}</span>
                                <span>{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // subStep === 'apps'
    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Zap className="text-yellow-500" size={20} />
                    Grandi Apparecchi
                </h2>
                <InfoTooltip content="L'uso frequente di elettrodomestici ad alto consumo impatta sulle emissioni." />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {appliancesList.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => onChange({
                            ...data,
                            appliances: { ...appliances, [app.id]: !appliances?.[app.id] }
                        })}
                        className={`group relative p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${appliances?.[app.id]
                            ? 'border-yellow-400 bg-yellow-50 shadow-sm'
                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:shadow-sm'
                            }`}
                    >
                        <div className="text-3xl">{app.icon}</div>
                        <div className={`font-bold text-xs text-center ${appliances?.[app.id] ? 'text-yellow-700' : 'text-slate-600'}`}>
                            {app.label}
                        </div>
                        {appliances?.[app.id] && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={10} className="text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-start gap-2">
                <Lightbulb size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                    Utilizzare programmi "Eco" e temperature basse può ridurre il consumo fino al 50%.
                </p>
            </div>
        </div>
    );
};

export default HomeEnergyStep;
