import React from 'react';
import { Plane, Ship, Globe } from 'lucide-react';

const TravelStep = ({ data, onChange }) => {
    const { flights, cruise } = data || {
        flights: { short: 0, medium: 0, long: 0, class: 'economy' },
        cruise: 0
    };

    const handleFlightChange = (type, value) => {
        onChange({
            ...data,
            flights: { ...flights, [type]: Math.max(0, parseInt(value) || 0) }
        });
    };

    const handleClassChange = (value) => {
        onChange({
            ...data,
            flights: { ...flights, class: value }
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Flights Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Plane className="text-emerald-600" /> Voli Aerei (ultimi 12 mesi)
                </h3>

                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-2">Corto Raggio (&lt; 3h)</label>
                            <input
                                type="number"
                                value={flights?.short || 0}
                                onChange={(e) => handleFlightChange('short', e.target.value)}
                                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-2">Medio Raggio (3-6h)</label>
                            <input
                                type="number"
                                value={flights?.medium || 0}
                                onChange={(e) => handleFlightChange('medium', e.target.value)}
                                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-2">Lungo Raggio (&gt; 6h)</label>
                            <input
                                type="number"
                                value={flights?.long || 0}
                                onChange={(e) => handleFlightChange('long', e.target.value)}
                                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-2">Classe di Volo Prevalente</label>
                    <div className="flex gap-2 p-1 bg-slate-200 rounded-xl w-full sm:w-fit">
                        {['economy', 'business', 'first'].map((c) => (
                            <button
                                key={c}
                                onClick={() => handleClassChange(c)}
                                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${flights?.class === c
                                        ? 'bg-white text-emerald-700 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cruise Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Ship className="text-blue-600" /> Crociere
                </h3>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Giorni trascorsi in crociera</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={cruise || 0}
                            onChange={(e) => onChange({ ...data, cruise: parseInt(e.target.value) })}
                            className="flex-grow h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
                        />
                        <span className="font-bold text-2xl text-blue-600 w-16 text-right">{cruise || 0} gg</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TravelStep;
