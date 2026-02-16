import React from 'react';
import { Plane, Ship, MapPin } from 'lucide-react';
import NumberInput from './NumberInput';
import RangeSlider from './RangeSlider';
import InfoTooltip from './InfoTooltip';

const TravelStep = ({ data, onChange, subStep }) => {
    const { flights, cruise } = data || {
        flights: { short: 0, medium: 0, long: 0, class: 'economy' },
        cruise: 0
    };

    const handleFlightChange = (type, value) => {
        onChange({ ...data, flights: { ...flights, [type]: Math.max(0, parseInt(value) || 0) } });
    };

    const handleClassChange = (value) => {
        onChange({ ...data, flights: { ...flights, class: value } });
    };

    const flightClasses = [
        { id: 'economy', label: 'Economy', icon: '💺' },
        { id: 'business', label: 'Business', icon: '🛋️' },
        { id: 'first', label: 'First', icon: '👑' },
    ];

    if (subStep === 'flights') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Plane className="text-sky-600" size={20} />
                        Voli Aerei
                    </h2>
                    <InfoTooltip content="I viaggi aerei sono una delle fonti principali di emissioni." />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <NumberInput
                        value={flights?.short || 0}
                        onChange={(val) => handleFlightChange('short', val)}
                        min={0} max={50}
                        label="Corto Raggio"
                        unit="voli"
                        icon={MapPin}
                    />
                    <NumberInput
                        value={flights?.medium || 0}
                        onChange={(val) => handleFlightChange('medium', val)}
                        min={0} max={30}
                        label="Medio Raggio"
                        unit="voli"
                        icon={MapPin}
                    />
                    <NumberInput
                        value={flights?.long || 0}
                        onChange={(val) => handleFlightChange('long', val)}
                        min={0} max={20}
                        label="Lungo Raggio"
                        unit="voli"
                        icon={MapPin}
                    />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-500 block mb-3 uppercase tracking-wide">Classe di Volo</label>
                    <div className="grid grid-cols-3 gap-3">
                        {flightClasses.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => handleClassChange(c.id)}
                                className={`relative p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${flights?.class === c.id
                                    ? 'border-sky-500 bg-white shadow-sm'
                                    : 'border-transparent bg-slate-100/50 hover:bg-white text-slate-500'
                                    }`}
                            >
                                <div className="text-2xl">{c.icon}</div>
                                <div className={`font-bold text-xs ${flights?.class === c.id ? 'text-sky-700' : 'text-slate-500'}`}>
                                    {c.label}
                                </div>
                                {flights?.class === c.id && (
                                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-[8px] font-bold">✓</span>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Ship className="text-blue-600" size={20} />
                    Crociere
                </h2>
                <InfoTooltip content="Le navi da crociera hanno un impatto molto elevato per passeggero." />
            </div>

            <RangeSlider
                value={cruise || 0}
                onChange={(val) => onChange({ ...data, cruise: val })}
                min={0} max={30} step={1}
                label="Giorni in crociera (ultimo anno)"
                unit="giorni"
                icon={Ship}
                markers={['0', '7', '14', '21', '30+']}
                previewText={cruise > 0 ? `Impatto stimato: circa ${(cruise * 250)} kg CO₂.` : 'Nessuna crociera effettuata.'}
            />
        </div>
    );
};

export default TravelStep;
