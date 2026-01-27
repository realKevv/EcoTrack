import React from 'react';
import { ShoppingBag, Smartphone, Shirt } from 'lucide-react';

const ShoppingStep = ({ data, onChange }) => {
    const { clothes, electronics } = data || {
        clothes: { tshirt: 0, jeans: 0, shoes: 0, secondhand: false },
        electronics: { smartphone: 0, laptop: 0 }
    };

    const handleClothesChange = (field, value) => {
        onChange({ ...data, clothes: { ...clothes, [field]: Math.max(0, parseInt(value) || 0) } });
    };

    const handleElectroChange = (field, value) => {
        onChange({ ...data, electronics: { ...electronics, [field]: Math.max(0, parseInt(value) || 0) } });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Clothing Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Shirt className="text-purple-600" /> Abbigliamento (Acquisti annui)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {['tshirt', 'jeans', 'shoes'].map((item) => (
                        <div key={item}>
                            <label className="text-sm font-semibold text-slate-600 block mb-2 capitalize">{item}</label>
                            <input
                                type="number"
                                value={clothes?.[item] || 0}
                                onChange={(e) => handleClothesChange(item, e.target.value)}
                                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                    <input
                        type="checkbox"
                        id="secondhand"
                        checked={clothes?.secondhand || false}
                        onChange={(e) => onChange({ ...data, clothes: { ...clothes, secondhand: e.target.checked } })}
                        className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300"
                    />
                    <label htmlFor="secondhand" className="font-medium text-slate-700">Compro spesso usato/vintage (-90% CO₂)</label>
                </div>
            </div>

            {/* Electronics Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <Smartphone className="text-indigo-600" /> Elettronica (Acquisti annui)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-2">Smartphone Nuovi</label>
                        <input
                            type="number"
                            value={electronics?.smartphone || 0}
                            onChange={(e) => handleElectroChange('smartphone', e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600 block mb-2">Laptop/Tablet Nuovi</label>
                        <input
                            type="number"
                            value={electronics?.laptop || 0}
                            onChange={(e) => handleElectroChange('laptop', e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ShoppingStep;
