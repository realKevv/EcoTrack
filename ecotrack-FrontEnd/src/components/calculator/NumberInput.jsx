import React from 'react';
import { Plus, Minus } from 'lucide-react';

const NumberInput = ({
    value = 0,
    onChange,
    min = 0,
    max = 100,
    label,
    unit = '',
    icon: Icon,
    className = ''
}) => {
    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > min) onChange(value - 1);
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value) || 0;
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className={`${className}`}>
            {label && (
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    {Icon && <Icon size={16} className="text-emerald-600" />}
                    {label}
                </label>
            )}
            <div className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
                <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={value <= min}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-emerald-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                    aria-label="Decrease"
                >
                    <Minus size={16} strokeWidth={2.5} />
                </button>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    className="flex-1 text-center font-bold text-xl text-slate-900 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-[2.5rem]"
                />
                {unit && <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{unit}</span>}
                <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={value >= max}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-emerald-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                    aria-label="Increase"
                >
                    <Plus size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default NumberInput;
