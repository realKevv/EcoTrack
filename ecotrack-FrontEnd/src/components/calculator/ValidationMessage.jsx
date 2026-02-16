import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';

/**
 * ValidationMessage Component
 * Displays validation feedback with icons and animations
 * 
 * @param {string} type - 'success', 'error', 'warning', or 'info'
 * @param {string} message - Message to display
 * @param {boolean} shake - Whether to apply shake animation
 */
const ValidationMessage = ({ type = 'info', message, shake = false, className = '' }) => {
    const config = {
        success: {
            icon: CheckCircle2,
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            textColor: 'text-emerald-800',
            iconColor: 'text-emerald-600'
        },
        error: {
            icon: XCircle,
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-800',
            iconColor: 'text-red-600'
        },
        warning: {
            icon: AlertCircle,
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-800',
            iconColor: 'text-yellow-600'
        },
        info: {
            icon: Info,
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-600'
        }
    };

    const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

    return (
        <div
            className={`flex items-center gap-3 p-3 rounded-xl border ${bgColor} ${borderColor} ${textColor} animate-in slide-in-from-top-2 duration-300 ${shake ? 'shake' : ''} ${className}`}
        >
            <Icon size={20} className={iconColor} />
            <span className="text-sm font-medium flex-1">{message}</span>
        </div>
    );
};

export default ValidationMessage;
