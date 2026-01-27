import React from 'react';
import { Car, Bike, Bus, Fuel, Ruler } from 'lucide-react';

const TransportStep = ({ data, onChange }) => {
    const { mode, carErrors, carDetails, km } = data || { mode: 'car', carDetails: { fuel: 'petrol', size: 'medium' }, km: 30 };

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

    const handleCarDetailChange = (field, value) => {
        onChange({ ...data, carDetails: { ...data.carDetails, [field]: value } });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { id: 'car', label: 'Auto', icon: Car },
                    { id: 'moto', label: 'Moto', icon: Bike },
                    { id: 'public', label: 'Mezzi Pubblici', icon: Bus },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleChange('mode', item.id)}
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${data.mode === item.id
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md transform scale-105'
                            : 'border-slate-200 hover:border-emerald-200 hover:bg-slate-50 text-slate-600'
                            }`}
                    >
                        <item.icon size={32} className="mb-3" />
                        <span className="font-semibold">{item.label}</span>
                    </button>
                ))}
            </div>

            {data.mode === 'car' && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <Fuel size={16} /> Alimentazione
                            </label>
                            <select
                                value={data.carDetails?.fuel || 'petrol'}
                                onChange={(e) => handleCarDetailChange('fuel', e.target.value)}
                                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow bg-white"
                            >
                                <option value="petrol">Benzina</option>
                                <option value="diesel">Diesel</option>
                                <option value="hybrid">Ibrida</option>
                                <option value="electric">Elettrica</option>
                                <option value="gpl">GPL</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <label className="block text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Ruler size={20} className="text-emerald-600" />
                    Km giornalieri stimati: <span className="text-emerald-600 font-bold text-2xl">{data.km || 0} km</span>
                </label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    value={data.km || 0}
                    onChange={(e) => handleChange('km', parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-600 transition-colors"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium uppercase tracking-wide">
                    <span>0 km</span>
                    <span>50 km</span>
                    <span>100 km</span>
                    <span>150 km</span>
                    <span>200+ km</span>
                </div>
            </div>
        </div>
    );
};

export default TransportStep;
