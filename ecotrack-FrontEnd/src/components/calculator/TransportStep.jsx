import React from 'react';
import { Car, Bike, Bus, MapPin, Fuel } from 'lucide-react';
import InfoTooltip from './InfoTooltip';
import RangeSlider from './RangeSlider';

const TransportStep = ({ data, onChange, subStep }) => {
    const transportModes = [
        { id: 'car', label: 'Auto', icon: Car, desc: 'Privata / Leasing' },
        { id: 'moto', label: 'Moto', icon: Bike, desc: 'Scooter / Moto' },
        { id: 'public', label: 'Trasporti', icon: Bus, desc: 'Bus / Treno / Metro' },
    ];

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const handleCarDetailChange = (field, value) => {
        onChange({ ...data, carDetails: { ...data.carDetails, [field]: value } });
    };

    if (subStep === 'mode') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Car className="text-emerald-600" size={20} />
                        Come ti sposti?
                    </h2>
                    <InfoTooltip content="Scegli il mezzo di trasporto che utilizzi più spesso." />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {transportModes.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleChange('mode', item.id)}
                            className={`group relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 ${data.mode === item.id
                                ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                                : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
                                }`}
                        >
                            <item.icon
                                size={28}
                                strokeWidth={1.5}
                                className={data.mode === item.id ? 'text-emerald-600 mb-2' : 'text-slate-400 group-hover:text-slate-600 mb-2'}
                            />
                            <div className={`font-bold text-sm ${data.mode === item.id ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {item.label}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                            {data.mode === item.id && (
                                <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <MapPin className="text-emerald-600" size={20} />
                    Dettagli del Viaggio
                </h2>
                <InfoTooltip content="Definisci i km percorsi e il tipo di alimentazione." />
            </div>

            <RangeSlider
                value={data.km || 30}
                onChange={(val) => handleChange('km', val)}
                min={0} max={200} step={5}
                label="Km totali al giorno"
                unit="km"
                icon={MapPin}
                markers={['0', '50', '100', '150', '200+']}
                previewText={`Percorri circa ${(data.km * 365).toLocaleString()} km all'anno.`}
            />

            {data.mode === 'car' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wide">
                        <Fuel className="text-emerald-600" size={14} />
                        Alimentazione
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: 'petrol', label: 'Benzina', icon: '⛽' },
                            { id: 'diesel', label: 'Diesel', icon: '⛽' },
                            { id: 'hybrid', label: 'Ibrida', icon: '🔋' },
                            { id: 'electric', label: 'Elettrica', icon: '⚡' },
                        ].map((fuel) => (
                            <button
                                key={fuel.id}
                                onClick={() => handleCarDetailChange('fuel', fuel.id)}
                                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all text-sm ${data.carDetails?.fuel === fuel.id
                                    ? 'border-emerald-500 bg-white shadow-sm font-bold'
                                    : 'border-transparent bg-slate-100 hover:bg-white text-slate-600'
                                    }`}
                            >
                                <span>{fuel.icon}</span>
                                <span>{fuel.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransportStep;
