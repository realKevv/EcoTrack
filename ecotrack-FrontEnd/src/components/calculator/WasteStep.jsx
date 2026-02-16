import React from 'react';
import { Trash2, Recycle, CheckCircle2, Leaf } from 'lucide-react';
import NumberInput from './NumberInput';
import InfoTooltip from './InfoTooltip';

const WasteStep = ({ data, onChange, subStep }) => {
    const { bags, recycle } = data || {
        bags: 2,
        recycle: { plastic: false, paper: false, glass: false }
    };

    const recycleOptions = [
        { id: 'plastic', label: 'Plastica/Metallo', icon: '🥤' },
        { id: 'paper', label: 'Carta/Cartone', icon: '📦' },
        { id: 'glass', label: 'Vetro', icon: '🍾' },
    ];

    if (subStep === 'bags') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Trash2 className="text-red-500" size={20} />
                        Rifiuti Indifferenziati
                    </h2>
                    <InfoTooltip content="Meno rifiuti produci, meno CO₂ viene emessa per lo smaltimento." />
                </div>

                <div className="max-w-xs mx-auto">
                    <NumberInput
                        value={bags || 0}
                        onChange={(val) => onChange({ ...data, bags: val })}
                        min={0} max={20}
                        label="Sacchetti a settimana"
                        unit="sacchetti"
                        icon={Trash2}
                    />
                </div>

                <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-3">
                    <div className="text-lg">💡</div>
                    <p className="text-xs text-slate-600 italic">
                        "Il miglior rifiuto è quello che non viene prodotto."
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Recycle className="text-emerald-600" size={20} />
                    Riciclaggio Attivo
                </h2>
                <InfoTooltip content="Il riciclo corretto permette di risparmiare enormi quantità di energia." />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {recycleOptions.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onChange({
                            ...data,
                            recycle: { ...recycle, [item.id]: !recycle?.[item.id] }
                        })}
                        className={`group relative p-5 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${recycle?.[item.id]
                            ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:shadow-sm'
                            }`}
                    >
                        <div className="text-3xl">{item.icon}</div>
                        <div className={`font-bold text-xs text-center ${recycle?.[item.id] ? 'text-emerald-700' : 'text-slate-600'}`}>
                            {item.label}
                        </div>
                        {recycle?.[item.id] && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 size={10} className="text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2 text-emerald-600 font-semibold justify-center bg-emerald-50 py-2.5 rounded-lg border border-emerald-100">
                <Leaf size={14} />
                <span className="text-xs">Ogni kg di carta riciclata salva 17 alberi!</span>
            </div>
        </div>
    );
};

export default WasteStep;
