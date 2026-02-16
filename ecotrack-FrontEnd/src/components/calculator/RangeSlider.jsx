import React, { useState } from 'react';

const RangeSlider = ({
    value = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    unit = '',
    markers = [],
    icon: Icon,
    previewText = '',
    className = ''
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const percentage = ((value - min) / (max - min)) * 100;

    const handleChange = (e) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        {Icon && <Icon size={16} className="text-emerald-600" />}
                        {label}
                    </span>
                    <span className="text-emerald-600 font-bold text-2xl tabular-nums">
                        {value} <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{unit}</span>
                    </span>
                </label>
            )}

            {previewText && (
                <div className="text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 inline-block">
                    {previewText}
                </div>
            )}

            <div className="relative pt-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="w-full h-2 bg-emerald-100/50 rounded-full appearance-none cursor-pointer border border-emerald-100"
                    style={{ '--value': `${percentage}%` }}
                    aria-label={label}
                />

                {markers.length > 0 && (
                    <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-medium px-1">
                        {markers.map((marker, index) => (
                            <span key={index}>{marker}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RangeSlider;
