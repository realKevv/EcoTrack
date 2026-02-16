import React from 'react';
import { ShoppingBag, Laptop, Smartphone, ShoppingCart, TrendingUp } from 'lucide-react';
import NumberInput from './NumberInput';
import InfoTooltip from './InfoTooltip';

const ShoppingStep = ({ data, onChange, subStep }) => {
    const { clothes, electronics } = data || {
        clothes: { tshirt: 0, jeans: 0, shoes: 0, secondhand: false },
        electronics: { smartphone: 0, laptop: 0 }
    };

    const handleClothesChange = (field, value) => {
        onChange({ ...data, clothes: { ...clothes, [field]: value } });
    };

    const handleTechChange = (field, value) => {
        onChange({ ...data, electronics: { ...electronics, [field]: value } });
    };

    if (subStep === 'clothes') {
        return (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <ShoppingBag className="text-pink-600" size={20} />
                        Abbigliamento (Mese)
                    </h2>
                    <InfoTooltip content="L'industria tessile è una delle più inquinanti." />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <NumberInput
                        value={clothes?.tshirt || 0}
                        onChange={(val) => handleClothesChange('tshirt', val)}
                        min={0} max={20}
                        label="T-shirt"
                        unit="pezzi"
                        icon={ShoppingBag}
                    />
                    <NumberInput
                        value={clothes?.jeans || 0}
                        onChange={(val) => handleClothesChange('jeans', val)}
                        min={0} max={10}
                        label="Pantaloni"
                        unit="pezzi"
                        icon={ShoppingBag}
                    />
                    <NumberInput
                        value={clothes?.shoes || 0}
                        onChange={(val) => handleClothesChange('shoes', val)}
                        min={0} max={5}
                        label="Scarpe"
                        unit="paia"
                        icon={ShoppingBag}
                    />
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                            <ShoppingCart size={20} className="text-pink-600" />
                        </div>
                        <div>
                            <div className="font-bold text-sm text-slate-800">Second-Hand</div>
                            <div className="text-[10px] text-slate-400">Abbigliamento sostenibile</div>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={clothes?.secondhand || false}
                            onChange={(e) => handleClothesChange('secondhand', e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-pink-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Laptop className="text-indigo-600" size={20} />
                    Tecnologia (Anno)
                </h2>
                <InfoTooltip content="La produzione di elettronica richiede metalli rari e molta energia." />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <NumberInput
                    value={electronics?.smartphone || 0}
                    onChange={(val) => handleTechChange('smartphone', val)}
                    min={0} max={5}
                    label="Smartphone"
                    unit="nuovi"
                    icon={Smartphone}
                />
                <NumberInput
                    value={electronics?.laptop || 0}
                    onChange={(val) => handleTechChange('laptop', val)}
                    min={0} max={3}
                    label="Laptop / Tablet"
                    unit="nuovi"
                    icon={Laptop}
                />
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-start gap-2">
                <TrendingUp size={14} className="text-indigo-600 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                    Un laptop nuovo emette fino a <span className="font-bold">300kg di CO₂</span> solo per la produzione.
                </p>
            </div>
        </div>
    );
};

export default ShoppingStep;
